import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useGetArticle } from "../hooks/useQueries";

const SKELETON_LINES = ["line-1", "line-2", "line-3", "line-4", "line-5"];

export default function ExplainedDetail() {
  const { id } = useParams({ from: "/explained/$id" });
  const articleId = BigInt(id);
  const { data: article, isLoading } = useGetArticle(articleId);

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-20 max-w-2xl mx-auto px-4">
        <Skeleton className="h-8 w-24 mb-8" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-6 w-48 mb-10" />
        {SKELETON_LINES.map((k) => (
          <Skeleton key={k} className="h-6 w-full mb-4" />
        ))}
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen pt-24 pb-20 max-w-2xl mx-auto px-4 flex flex-col items-center justify-center">
        <p className="text-muted-foreground text-xl">Article not found.</p>
        <Link to="/explained" className="mt-4 text-primary hover:underline">
          ← Back to Explained
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link
          to="/explained"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Explained
        </Link>

        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/5 text-secondary-foreground text-xs font-medium font-mono mb-6">
            Explained
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-foreground leading-tight mb-6">
            {article.title}
          </h1>
          <div className="border-l-2 border-primary pl-5 mb-8">
            <p className="text-muted-foreground text-xl leading-relaxed italic">
              {article.description}
            </p>
          </div>
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

        <div className="space-y-8">
          {article.content.map((paragraph, i) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-foreground/90 leading-9 text-lg sm:text-xl"
              style={{ fontWeight: i === 0 ? 500 : 400 }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-border">
          <Link
            to="/explained"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all explained
          </Link>
        </div>
      </div>
    </main>
  );
}
