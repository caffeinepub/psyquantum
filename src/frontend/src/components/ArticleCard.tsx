import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type Article, ArticleType } from "../backend";

interface ArticleCardProps {
  article: Article;
  index: number;
  type: "concept" | "explained";
}

export default function ArticleCard({
  article,
  index,
  type,
}: ArticleCardProps) {
  const path =
    type === "concept" ? `/concepts/${article.id}` : `/explained/${article.id}`;
  const ocid =
    type === "concept"
      ? `concepts.card.${index + 1}`
      : `explained.card.${index + 1}`;

  const tagLabel =
    article.articleType === ArticleType.concept ? "Concept" : "Explained";
  const tagColor =
    article.articleType === ArticleType.concept
      ? "bg-primary/10 text-primary border-primary/20"
      : "bg-secondary/10 text-secondary-foreground border-secondary/20";

  return (
    <Link to={path} data-ocid={ocid} className="block group h-full">
      <article className="h-full flex flex-col border border-border rounded-xl p-6 card-hover-glow bg-card/50 relative overflow-hidden">
        {/* Gradient orb background */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all duration-500" />

        <div className="flex items-start justify-between gap-4 mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${tagColor}`}
          >
            {tagLabel}
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-display font-semibold text-foreground text-lg leading-snug mb-3 flex-1 group-hover:text-primary transition-colors duration-200 line-clamp-3">
          {article.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-muted-foreground">
            {article.author || "PsyQuantum"}
          </span>
          <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all duration-200">
            Read more <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}
