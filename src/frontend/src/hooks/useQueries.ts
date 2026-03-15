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
  const backendOnly = backendArticles.filter(
    (a) => !seedIds.has(a.id.toString()),
  );
  return [...seed.map(toArticle), ...backendOnly].sort((a, b) =>
    Number(a.displayOrder - b.displayOrder),
  );
}

export function useGetArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      if (!actor) return allSeedArticles.map(toArticle);
      try {
        const result = await actor.getArticles();
        return mergeWithSeed(allSeedArticles, result);
      } catch {
        return allSeedArticles.map(toArticle);
      }
    },
    enabled: !isFetching,
    placeholderData: allSeedArticles.map(toArticle),
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

// New: check admin password via backend
export function useCheckAdminPassword() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (secret: string) => {
      // If actor isn't ready yet, create a fresh anonymous one so login never fails with "Not connected"
      const a = actor ?? (await createActorWithConfig());
      return (a as any).checkAdminPassword(secret) as Promise<boolean>;
    },
  });
}

export function useCreateArticle() {
  const { actor } = useActor();
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
      const a = actor ?? (await createActorWithConfig());
      // backend.ts types are pre-update; cast to any for new secret param
      return (a as any).createArticle(
        data.secret,
        data.title,
        data.description,
        data.content,
        data.articleType,
        data.author,
        data.displayOrder,
      ) as Promise<bigint>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useUpdateArticle() {
  const { actor } = useActor();
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
      const a = actor ?? (await createActorWithConfig());
      return (a as any).updateArticle(
        data.secret,
        data.id,
        data.title,
        data.description,
        data.content,
        data.articleType,
        data.author,
        data.displayOrder,
      ) as Promise<void>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useDeleteArticle() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { secret: string; id: bigint }) => {
      const a = actor ?? (await createActorWithConfig());
      return (a as any).deleteArticle(data.secret, data.id) as Promise<void>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

// Logo

const DEFAULT_LOGO =
  "/assets/uploads/WhatsApp-Image-2026-03-14-at-11.02.13-PM-4.jpeg";

export function useGetLogoUrl() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["logoUrl"],
    queryFn: async () => {
      if (!actor) return DEFAULT_LOGO;
      try {
        const url = await actor.getLogoUrl();
        return url || DEFAULT_LOGO;
      } catch {
        return DEFAULT_LOGO;
      }
    },
    enabled: !isFetching,
    placeholderData: DEFAULT_LOGO,
  });
}

export function useSetLogoUrl() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ secret, url }: { secret: string; url: string }) => {
      const a = actor ?? (await createActorWithConfig());
      return (a as any).setLogoUrl(secret, url) as Promise<void>;
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
      if (!actor) return "";
      try {
        return await (actor as any).getCreatorImageUrl();
      } catch {
        return "";
      }
    },
    enabled: !isFetching,
    placeholderData: "",
  });
}

export function useSetCreatorImageUrl() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ secret, url }: { secret: string; url: string }) => {
      const a = actor ?? (await createActorWithConfig());
      return (a as any).setCreatorImageUrl(secret, url) as Promise<void>;
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
      const a = actor ?? (await createActorWithConfig());
      return (a as any).deleteProject(data.secret, data.id) as Promise<void>;
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
      const a = actor ?? (await createActorWithConfig());
      return (a as any).setSiteText(secret, key, value) as Promise<void>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["siteTexts"] });
    },
  });
}
