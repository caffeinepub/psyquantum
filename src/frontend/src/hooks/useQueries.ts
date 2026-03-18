import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Article, ArticleType } from "../backend";
import { createActorWithConfig } from "../config";
import {
  type SeedArticle,
  allSeedArticles,
  seedConceptArticles,
  seedExplainedArticles,
} from "../data/articles";
import type { Project, ProjectStatus } from "../types/project";
import { useActor } from "./useActor";

async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
      }
    }
  }
  throw lastErr;
}

function toArticle(s: SeedArticle): Article {
  return {
    id: s.id,
    title: s.title,
    description: s.description,
    content: s.content,
    articleType: s.articleType,
    author: s.author,
    createdAt: s.createdAt,
    displayOrder: s.displayOrder,
  };
}

// Merges hardcoded seed articles with backend articles.
// Seed articles are always shown. Backend articles are appended after
// deduplicating by title (case-insensitive) to avoid showing the same
// article twice if admin re-creates a seed article.
function mergeWithSeed(
  seed: SeedArticle[],
  backendArticles: Article[],
): Article[] {
  const seedTitles = new Set(seed.map((s) => s.title.toLowerCase().trim()));
  const backendOnly = backendArticles.filter(
    (a) => !seedTitles.has(a.title.toLowerCase().trim()),
  );
  return [...seed.map(toArticle), ...backendOnly].sort((a, b) =>
    Number(a.displayOrder - b.displayOrder),
  );
}

// localStorage key for admin-created articles (backup cache)
const LS_ADMIN_ARTICLES_KEY = "psq_admin_articles_v3";

function saveAdminArticlesToLS(articles: Article[]) {
  try {
    localStorage.setItem(
      LS_ADMIN_ARTICLES_KEY,
      JSON.stringify(
        articles.map((a) => ({
          ...a,
          id: a.id.toString(),
          displayOrder: a.displayOrder.toString(),
          createdAt: a.createdAt.toString(),
        })),
      ),
    );
  } catch {}
}

function loadAdminArticlesFromLS(): Article[] {
  try {
    const raw = localStorage.getItem(LS_ADMIN_ARTICLES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((a: Record<string, unknown>) => ({
      ...a,
      id: BigInt(a.id as string),
      displayOrder: BigInt(a.displayOrder as string),
      createdAt: BigInt(a.createdAt as string),
    })) as Article[];
  } catch {
    return [];
  }
}

// For the admin panel — shows articles stored in the backend.
// Always creates a fresh actor to avoid stale connection issues.
export function useGetArticles() {
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      try {
        const a = await createActorWithConfig();
        const result = await a.getArticles();
        if (result.length > 0) saveAdminArticlesToLS(result);
        return result;
      } catch (e) {
        console.error("[useGetArticles] backend fetch failed:", e);
        return loadAdminArticlesFromLS();
      }
    },
    placeholderData: loadAdminArticlesFromLS,
    retry: 3,
    retryDelay: 1000,
    staleTime: 0,
  });
}

export function useGetConceptArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles", "concept"],
    queryFn: async () => {
      if (!actor) return seedConceptArticles.map(toArticle);
      try {
        const result = await actor.getArticlesByType(ArticleType.concept);
        return mergeWithSeed(seedConceptArticles, result);
      } catch {
        return seedConceptArticles.map(toArticle);
      }
    },
    enabled: !isFetching,
    placeholderData: seedConceptArticles.map(toArticle),
  });
}

export function useGetExplainedArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles", "explained"],
    queryFn: async () => {
      if (!actor) return seedExplainedArticles.map(toArticle);
      try {
        const result = await actor.getArticlesByType(ArticleType.explained);
        return mergeWithSeed(seedExplainedArticles, result);
      } catch {
        return seedExplainedArticles.map(toArticle);
      }
    },
    enabled: !isFetching,
    placeholderData: seedExplainedArticles.map(toArticle),
  });
}

export function useGetArticle(id: bigint) {
  const { actor, isFetching } = useActor();
  const seedArticle = allSeedArticles.find((a) => a.id === id);
  return useQuery<Article | null>({
    queryKey: ["article", id.toString()],
    queryFn: async () => {
      // Seed articles are always authoritative — no backend lookup needed
      if (seedArticle) return toArticle(seedArticle);
      // For admin-added articles, fetch from backend
      if (!actor) return null;
      try {
        return await actor.getArticle(id);
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
    // Show seed article immediately while actor loads
    placeholderData: seedArticle ? toArticle(seedArticle) : undefined,
  });
}

// Stub — auth is now password-based, not identity-based
export function useIsAdmin() {
  return { data: false, isLoading: false };
}

export function useIsAdminClaimed() {
  return { data: false, isLoading: false };
}

// Stub — no longer needed
export function useClaimFirstAdmin() {
  return useMutation({
    mutationFn: async () => false,
  });
}

// Stub — no longer needed
export function useForceResetAdmin() {
  return useMutation({
    mutationFn: async (_secret: string) => false,
  });
}

// SHA-256 hash of the admin password — plain text is never stored in source
const ADMIN_PASSWORD_HASH =
  "bc6d1a775f06c02b22e307bd0acfdd355d1ee8658bf46e01372d278b7b8cd9ae";

async function hashString(s: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(s),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function useCheckAdminPassword() {
  return useMutation({
    mutationFn: async (secret: string) => {
      const h = await hashString(secret);
      return h === ADMIN_PASSWORD_HASH;
    },
  });
}

export function useCreateArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      secret: string;
      title: string;
      description: string;
      content: string[];
      articleType: ArticleType;
      author: string;
      displayOrder: bigint;
    }) => {
      return withRetry(async () => {
        // Always create a fresh actor to avoid stale connection issues
        const a = await createActorWithConfig();
        return a.createArticle(
          data.secret,
          data.title,
          data.description,
          data.content,
          data.articleType,
          data.author,
          data.displayOrder,
        ) as Promise<bigint>;
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useUpdateArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      secret: string;
      id: bigint;
      title: string;
      description: string;
      content: string[];
      articleType: ArticleType;
      author: string;
      displayOrder: bigint;
    }) => {
      return withRetry(async () => {
        const a = await createActorWithConfig();
        return a.updateArticle(
          data.secret,
          data.id,
          data.title,
          data.description,
          data.content,
          data.articleType,
          data.author,
          data.displayOrder,
        ) as Promise<void>;
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useDeleteArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { secret: string; id: bigint }) => {
      return withRetry(async () => {
        const a = await createActorWithConfig();
        return a.deleteArticle(data.secret, data.id) as Promise<void>;
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

// Logo

const DEFAULT_LOGO =
  "/assets/uploads/WhatsApp-Image-2026-03-14-at-11.02.13-PM-4.jpeg";

const LS_LOGO_KEY = "psq_logo_v2";
const LS_CREATOR_KEY = "psq_creator_v2";

export function useGetLogoUrl() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["logoUrl"],
    queryFn: async () => {
      // 1. Check localStorage first — instant, no network needed
      const cached = localStorage.getItem(LS_LOGO_KEY);
      if (cached) return cached;
      // 2. Try backend
      if (!actor) return DEFAULT_LOGO;
      try {
        const url = await actor.getLogoUrl();
        if (url) {
          localStorage.setItem(LS_LOGO_KEY, url);
          return url;
        }
      } catch {
        // ignore
      }
      return DEFAULT_LOGO;
    },
    enabled: !isFetching,
    placeholderData: DEFAULT_LOGO,
  });
}

export function useSetLogoUrl() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ secret, url }: { secret: string; url: string }) => {
      // 1. Save to localStorage immediately — this NEVER fails
      if (url) {
        localStorage.setItem(LS_LOGO_KEY, url);
      } else {
        localStorage.removeItem(LS_LOGO_KEY);
      }
      // 2. Also try backend (best-effort, don't block on failure)
      try {
        const a = await createActorWithConfig();
        await (a as any).setLogoUrl(secret, url);
      } catch (e) {
        console.warn("Backend logo save failed (localStorage backup used):", e);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["logoUrl"] });
    },
  });
}

// Creator Image

export function useGetCreatorImageUrl() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["creatorImageUrl"],
    queryFn: async () => {
      // 1. Check localStorage first — instant, no network needed
      const cached = localStorage.getItem(LS_CREATOR_KEY);
      if (cached) return cached;
      // 2. Try backend
      if (!actor) return "";
      try {
        const url = await (actor as any).getCreatorImageUrl();
        if (url) {
          localStorage.setItem(LS_CREATOR_KEY, url);
          return url;
        }
      } catch {
        // ignore
      }
      return "";
    },
    enabled: !isFetching,
    placeholderData: "",
  });
}

export function useSetCreatorImageUrl() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ secret, url }: { secret: string; url: string }) => {
      // 1. Save to localStorage immediately — this NEVER fails
      if (url) {
        localStorage.setItem(LS_CREATOR_KEY, url);
      } else {
        localStorage.removeItem(LS_CREATOR_KEY);
      }
      // 2. Also try backend (best-effort, don't block on failure)
      try {
        const a = await createActorWithConfig();
        await (a as any).setCreatorImageUrl(secret, url);
      } catch (e) {
        console.warn(
          "Backend creator image save failed (localStorage backup used):",
          e,
        );
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["creatorImageUrl"] });
    },
  });
}

// Projects

export function useGetProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getProjects();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    placeholderData: [],
  });
}

export function useCreateProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      secret: string;
      title: string;
      description: string;
      status: ProjectStatus;
      tags: string[];
      link: string;
      displayOrder: bigint;
    }) => {
      return withRetry(async () => {
        const a = actor ?? (await createActorWithConfig());
        return (a as any).createProject(
          data.secret,
          data.title,
          data.description,
          data.status,
          data.tags,
          data.link,
          data.displayOrder,
        ) as Promise<bigint>;
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      secret: string;
      id: bigint;
      title: string;
      description: string;
      status: ProjectStatus;
      tags: string[];
      link: string;
      displayOrder: bigint;
    }) => {
      return withRetry(async () => {
        const a = actor ?? (await createActorWithConfig());
        return (a as any).updateProject(
          data.secret,
          data.id,
          data.title,
          data.description,
          data.status,
          data.tags,
          data.link,
          data.displayOrder,
        ) as Promise<void>;
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { secret: string; id: bigint }) => {
      return withRetry(async () => {
        const a = actor ?? (await createActorWithConfig());
        return (a as any).deleteProject(data.secret, data.id) as Promise<void>;
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// Site Texts

export function useGetAllSiteTexts() {
  const { actor, isFetching } = useActor();
  return useQuery<Record<string, string>>({
    queryKey: ["siteTexts"],
    queryFn: async () => {
      if (!actor) return {};
      try {
        const pairs = await (actor as any).getAllSiteTexts();
        return Object.fromEntries(pairs);
      } catch {
        return {};
      }
    },
    enabled: !isFetching,
    placeholderData: {},
  });
}

export function useSetSiteText() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      secret,
      key,
      value,
    }: { secret: string; key: string; value: string }) => {
      return withRetry(async () => {
        const a = actor ?? (await createActorWithConfig());
        return (a as any).setSiteText(secret, key, value) as Promise<void>;
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["siteTexts"] });
    },
  });
}
