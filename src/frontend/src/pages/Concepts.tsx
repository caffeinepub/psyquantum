import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "../components/ArticleCard";
import ScrollReveal from "../components/ScrollReveal";
import { useGetConceptArticles } from "../hooks/useQueries";

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

export default function Concepts() {
  const { data: articles, isLoading } = useGetConceptArticles();

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 max-w-2xl">
            <p className="text-primary font-mono text-sm mb-3">
              {"// technical concepts"}
            </p>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-foreground mb-4">
              Concepts
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Structured philosophical and technical explorations. Ideas
              presented in a rigorous, analytical format.
            </p>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="concepts.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(articles ?? []).map((article, i) => (
              <ScrollReveal key={article.id.toString()} delay={i * 80}>
                <ArticleCard article={article} index={i} type="concept" />
              </ScrollReveal>
            ))}
          </div>
        )}

        {!isLoading && (articles ?? []).length === 0 && (
          <div className="text-center py-20" data-ocid="concepts.empty_state">
            <p className="text-muted-foreground">No concept articles yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
