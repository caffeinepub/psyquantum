import { Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Calculator, Zap } from "lucide-react";
import ArticleCard from "../components/ArticleCard";
import ParticleCanvas from "../components/ParticleCanvas";
import ScrollReveal from "../components/ScrollReveal";
import { useGetConceptArticles } from "../hooks/useQueries";

export default function Home() {
  const { data: articles } = useGetConceptArticles();
  const latestArticles = (articles ?? []).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleCanvas />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.42 0.22 295 / 0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 50% 50%, oklch(0.65 0.2 220 / 0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Logo — perfectly centered */}
          <div className="flex justify-center items-center mb-8">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border border-primary/30 shadow-glow-lg flex items-center justify-center bg-card/40 backdrop-blur-sm animate-float">
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-14-at-11.02.13-PM-4.jpeg"
                alt="PsyQuantum"
                className="w-full h-full object-contain block mx-auto"
                style={{ display: "block" }}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Knowledge Platform
          </div>

          <h1 className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl text-glow-blue mb-6 tracking-tight">
            <span className="gradient-text">PsyQuantum</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl mb-4 font-light tracking-wide">
            Exploring deep ideas in science, mathematics, and technology.
          </p>

          <p className="text-muted-foreground/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            A platform for curious minds — technical concepts and story-driven
            explanations at the frontier of human knowledge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/concepts"
              data-ocid="hero.concepts_button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-glow group"
            >
              Explore Concepts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/explained"
              data-ocid="hero.explained_button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm border border-border bg-card/50 text-foreground hover:border-primary/50 hover:bg-card transition-all duration-200"
            >
              Read Explained
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40 text-xs">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-primary/40" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Stats bar */}
      <ScrollReveal>
        <section className="border-y border-border bg-card/20 py-8">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
            {[
              { icon: Brain, label: "Concept Articles", value: "5+" },
              { icon: Zap, label: "Explained Stories", value: "4+" },
              { icon: Calculator, label: "Topics Covered", value: "∞" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                <span className="font-display font-bold text-2xl text-foreground">
                  {value}
                </span>
                <span className="text-muted-foreground text-xs">{label}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Latest Concepts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary font-mono text-sm mb-2">
                {"// latest concepts"}
              </p>
              <h2 className="font-display font-bold text-4xl text-foreground">
                Latest Concepts
              </h2>
            </div>
            <Link
              to="/concepts"
              className="hidden sm:inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-200"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article, i) => (
            <ScrollReveal key={article.id.toString()} delay={i * 100}>
              <ArticleCard article={article} index={i} type="concept" />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/concepts"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium"
            >
              View all concepts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA banner */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div
            className="relative overflow-hidden rounded-2xl border border-border p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.1 0.018 275 / 0.8), oklch(0.12 0.025 295 / 0.8))",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.42 0.22 295 / 0.06) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <h2 className="font-display font-bold text-3xl text-foreground mb-4">
                Explore Knowledge in Two Formats
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Every idea presented twice: as a structured technical concept,
                and as an accessible story you can immerse yourself in.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/concepts"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Technical Concepts
                </Link>
                <Link
                  to="/explained"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-secondary/50 text-foreground hover:bg-secondary/10 transition-colors"
                >
                  Story Explanations
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
