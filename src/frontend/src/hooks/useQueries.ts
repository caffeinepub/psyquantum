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

// Detect if the error is a "canister is stopped" (IC0508) error.
export function isCanisterStopped(e: unknown): boolean {
  const msg = String(e instanceof Error ? e.message : e);
  return (
    msg.includes("IC0508") ||
    msg.includes("Canister is stopped") ||
    msg.includes("canister is stopped")
  );
}

export function friendlyError(e: unknown): string {
  if (isCanisterStopped(e)) {
    return "Server is temporarily offline. Please wait 30–60 seconds and try again. If it keeps failing, the server needs a restart.";
  }
  const msg = e instanceof Error ? e.message : String(e);
  if (msg.includes("fetch") || msg.includes("Failed to fetch")) {
    return "Network error. Check your connection and try again.";
  }
  return msg;
}

// Retry up to `retries` times. For stopped-canister errors, wait longer.
async function withRetry<T>(fn: () => Promise<T>, retries = 5): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i < retries - 1) {
        const delay = isCanisterStopped(e)
          ? 8000 * (i + 1) // 8s, 16s, 24s, 32s for stopped canister
          : 1500 * (i + 1); // 1.5s, 3s, 4.5s, 6s for other errors
        await new Promise((r) => setTimeout(r, delay));
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

// Seed articles are always shown. Backend articles with matching IDs are ignored
// (prevents placeholder seeding from overwriting real content). Backend articles
// with NEW IDs (admin-added) are appended.
function mergeWithSeed(
  seed: SeedArticle[],
  backendArticles: Article[],
): Article[] {
  const seedIds = new Set(seed.map((s) => s.id.toString()));
  // Also filter out backend dummy seeds (IDs 1-6 are reserved for hardcoded articles)
  const RESERVED_IDS = new Set(["1", "2", "3", "4", "5", "6"]);
  const backendOnly = backendArticles.filter(
    (a) => !seedIds.has(a.id.toString()) && !RESERVED_IDS.has(a.id.toString()),
  );
  return [...seed.map(toArticle), ...backendOnly].sort((a, b) =>
    Number(a.displayOrder - b.displayOrder),
  );
}

export function useGetArticles() {
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      try {
        const a = await createActorWithConfig();
        const result = await a.getArticles();
        return mergeWithSeed(allSeedArticles, result);
      } catch {
        return allSeedArticles.map(toArticle);
      }
    },
    staleTime: 0,
    placeholderData: allSeedArticles.map(toArticle),
  });
}

export function useGetConceptArticles() {
  return useQuery<Article[]>({
    queryKey: ["articles", "concept"],
    queryFn: async () => {
      try {
        const a = await createActorWithConfig();
        const result = await a.getArticlesByType(ArticleType.concept);
        return mergeWithSeed(seedConceptArticles, result);
      } catch {
        return seedConceptArticles.map(toArticle);
      }
    },
    staleTime: 0,
    placeholderData: seedConceptArticles.map(toArticle),
  });
}

export function useGetExplainedArticles() {
  return useQuery<Article[]>({
    queryKey: ["articles", "explained"],
    queryFn: async () => {
      try {
        const a = await createActorWithConfig();
        const result = await a.getArticlesByType(ArticleType.explained);
        return mergeWithSeed(seedExplainedArticles, result);
      } catch {
        return seedExplainedArticles.map(toArticle);
      }
    },
    staleTime: 0,
    placeholderData: seedExplainedArticles.map(toArticle),
  });
}

export function useGetArticle(id: bigint) {
  const seedArticle = allSeedArticles.find((a) => a.id === id);
  return useQuery<Article | null>({
    queryKey: ["article", id.toString()],
    queryFn: async () => {
      // Seed articles are always authoritative — no backend lookup needed
      if (seedArticle) return toArticle(seedArticle);
      // For admin-added articles, fetch from backend
      try {
        const a = await createActorWithConfig();
        return await a.getArticle(id);
      } catch {
        return null;
      }
    },
    staleTime: 0,
    // Show seed article immediately while backend loads
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
export const ADMIN_PASSWORD_HASH =
  "bc6d1a775f06c02b22e307bd0acfdd355d1ee8658bf46e01372d278b7b8cd9ae";

// Fixed internal API token sent to backend for all mutations.
// This is SEPARATE from the user-facing admin password, so changing the password
// never breaks backend operations.
export const BACKEND_API_TOKEN = "psq-internal-api-k76-2026";

export async function hashString(s: string): Promise<string> {
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
        // Always create a fresh connection — never reuse potentially stale actor
        const a = await createActorWithConfig();
        return (a as any).createArticle(
          BACKEND_API_TOKEN,
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
      // Force immediate refetch of all article queries
      qc.invalidateQueries({ queryKey: ["articles"] });
      qc.refetchQueries({ queryKey: ["articles"] });
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
        return (a as any).updateArticle(
          BACKEND_API_TOKEN,
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
      qc.refetchQueries({ queryKey: ["articles"] });
    },
  });
}

export function useDeleteArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { secret: string; id: bigint }) => {
      return withRetry(async () => {
        const a = await createActorWithConfig();
        return (a as any).deleteArticle(
          BACKEND_API_TOKEN,
          data.id,
        ) as Promise<void>;
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      qc.refetchQueries({ queryKey: ["articles"] });
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
    mutationFn: async ({ url }: { secret: string; url: string }) => {
      // 1. Save to localStorage immediately — this NEVER fails
      if (url) {
        localStorage.setItem(LS_LOGO_KEY, url);
      } else {
        localStorage.removeItem(LS_LOGO_KEY);
      }
      // 2. Also try backend (best-effort, don't block on failure)
      try {
        const a = await createActorWithConfig();
        await (a as any).setLogoUrl(BACKEND_API_TOKEN, url);
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
    mutationFn: async ({ url }: { secret: string; url: string }) => {
      // 1. Save to localStorage immediately — this NEVER fails
      if (url) {
        localStorage.setItem(LS_CREATOR_KEY, url);
      } else {
        localStorage.removeItem(LS_CREATOR_KEY);
      }
      // 2. Also try backend (best-effort, don't block on failure)
      try {
        const a = await createActorWithConfig();
        await (a as any).setCreatorImageUrl(BACKEND_API_TOKEN, url);
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
        return await (actor as any).getProjects();
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
          BACKEND_API_TOKEN,
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
          BACKEND_API_TOKEN,
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
        return (a as any).deleteProject(
          BACKEND_API_TOKEN,
          data.id,
        ) as Promise<void>;
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
      key,
      value,
    }: { secret: string; key: string; value: string }) => {
      return withRetry(async () => {
        const a = actor ?? (await createActorWithConfig());
        return (a as any).setSiteText(
          BACKEND_API_TOKEN,
          key,
          value,
        ) as Promise<void>;
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["siteTexts"] });
    },
  });
}
