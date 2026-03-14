import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useGetArticle } from "../hooks/useQueries";

const SKELETON_LINES = ["line-1", "line-2", "line-3", "line-4"];

export default function ConceptDetail() {
  const { id } = useParams({ from: "/concepts/$id" });
  const articleId = BigInt(id);
  const { data: article, isLoading } = useGetArticle(articleId);

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-20 max-w-3xl mx-auto px-4">
        <Skeleton className="h-8 w-24 mb-8" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-6 w-48 mb-10" />
        {SKELETON_LINES.map((k) => (
          <Skeleton key={k} className="h-6 w-full mb-3" />
        ))}
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen pt-24 pb-20 max-w-3xl mx-auto px-4 flex flex-col items-center justify-center">
        <p className="text-muted-foreground text-xl">Article not found.</p>
        <Link to="/concepts" className="mt-4 text-primary hover:underline">
          ← Back to Concepts
        </Link>
      </main>
    );
  }

  const date = new Date(
    Number(article.createdAt / 1000000n),
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          to="/concepts"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Concepts
        </Link>

        <header className="mb-10 pb-10 border-b border-border">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium font-mono mb-6">
            Concept
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-foreground leading-tight mb-6">
            {article.title}
          </h1>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            {article.description}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {article.author || "PsyQuantum"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
          </div>
        </header>

        <div className="space-y-6">
          {article.content.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-foreground/85 leading-8 text-base sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-border">
          <Link
            to="/concepts"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all concepts
          </Link>
        </div>
      </div>
    </main>
  );
}
