import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Article, ArticleType } from "../backend";
import {
  type SeedArticle,
  allSeedArticles,
  seedConceptArticles,
  seedExplainedArticles,
} from "../data/articles";
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

export function useGetArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      if (!actor) return allSeedArticles.map(toArticle);
      try {
        const result = await actor.getArticles();
        return result.length > 0 ? result : allSeedArticles.map(toArticle);
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
        return result.length > 0 ? result : seedConceptArticles.map(toArticle);
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
        return result.length > 0
          ? result
          : seedExplainedArticles.map(toArticle);
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
  return useQuery<Article | null>({
    queryKey: ["article", id.toString()],
    queryFn: async () => {
      const seed = allSeedArticles.find((a) => a.id === id);
      if (!actor) return seed ? toArticle(seed) : null;
      try {
        return await actor.getArticle(id);
      } catch {
        return seed ? toArticle(seed) : null;
      }
    },
    enabled: !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !isFetching,
  });
}

export function useIsAdminClaimed() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdminClaimed"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isAdminClaimed();
      } catch {
        return false;
      }
    },
    enabled: !isFetching,
  });
}

export function useClaimFirstAdmin() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.claimFirstAdmin();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["isAdmin"] });
      qc.invalidateQueries({ queryKey: ["isAdminClaimed"] });
    },
  });
}

export function useCreateArticle() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      content: string[];
      articleType: ArticleType;
      author: string;
      displayOrder: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createArticle(
        data.title,
        data.description,
        data.content,
        data.articleType,
        data.author,
        data.displayOrder,
      );
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
      id: bigint;
      title: string;
      description: string;
      content: string[];
      articleType: ArticleType;
      author: string;
      displayOrder: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateArticle(
        data.id,
        data.title,
        data.description,
        data.content,
        data.articleType,
        data.author,
        data.displayOrder,
      );
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
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteArticle(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}
