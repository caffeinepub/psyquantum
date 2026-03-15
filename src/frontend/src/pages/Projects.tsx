import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "../components/ScrollReveal";
import { useGetAllSiteTexts, useGetProjects } from "../hooks/useQueries";
import type { Project, ProjectStatus } from "../types/project";

const PULSE_DELAYS = ["0s", "0.3s", "0.6s"];

function statusLabel(s: ProjectStatus): string {
  if (s === "active") return "Active";
  if (s === "inProgress") return "In Progress";
  return "Completed";
}

function statusClass(s: ProjectStatus): string {
  if (s === "active")
    return "bg-green-500/15 text-green-400 border-green-500/30";
  if (s === "inProgress")
    return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
  return "bg-blue-500/15 text-blue-400 border-blue-500/30";
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  return (
    <motion.div
      data-ocid={`projects.item.${idx + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.07 }}
      className="group relative rounded-xl border border-border bg-card/30 p-6 flex flex-col gap-4 hover:border-primary/40 hover:bg-card/60 transition-all duration-300"
      whileHover={{
        boxShadow: "0 0 28px 0 oklch(0.42 0.22 295 / 0.18)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-bold text-lg text-foreground leading-snug">
          {project.title}
        </h3>
        <span
          className={`text-xs font-mono px-2 py-1 rounded-full border whitespace-nowrap flex-shrink-0 ${statusClass(project.status)}`}
        >
          {statusLabel(project.status)}
        </span>
      </div>

      {project.description && (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
      )}

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs text-muted-foreground border-border/60"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {project.link && (
        <div className="mt-auto pt-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 text-primary hover:text-primary px-0"
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5" />
              View Project
            </a>
          </Button>
        </div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const { data: projects = [], isLoading } = useGetProjects();
  const { data: siteTexts = {} } = useGetAllSiteTexts();
  const t = (key: string, fallback: string) => siteTexts[key] || fallback;

  const sorted = [...projects].sort(
    (a, b) => Number(a.displayOrder) - Number(b.displayOrder),
  );

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="flex gap-3">
          {PULSE_DELAYS.map((d) => (
            <div
              key={d}
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: d }}
            />
          ))}
        </div>
      </main>
    );
  }

  if (sorted.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
        <ScrollReveal>
          <div
            className="text-center max-w-xl mx-auto px-4"
            data-ocid="projects.empty_state"
          >
            <div className="flex justify-center mb-10">
              <div
                className="relative w-24 h-24 rounded-2xl border border-border flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.42 0.22 295 / 0.1), transparent)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl border border-primary/20 animate-pulse" />
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <title>Projects in development</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-3.084 3.084A2.25 2.25 0 0115 18.768v.016a2.25 2.25 0 01-2.25 2.25h-1.5A2.25 2.25 0 019 18.784v-.016a2.25 2.25 0 00-.659-1.591L5 14.5"
                  />
                </svg>
              </div>
            </div>

            <p className="text-primary font-mono text-sm mb-4">
              {"// coming soon"}
            </p>
            <h1 className="font-display font-extrabold text-5xl text-foreground mb-6">
              {t("projects.empty.title", "Projects")}
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-4">
              {t(
                "projects.empty.description",
                "Projects currently under development.",
              )}
            </p>
            <p className="text-muted-foreground/60 text-base">
              {t(
                "projects.empty.subtext",
                "Robotics, AI, and experimental technology projects are being built. Check back soon.",
              )}
            </p>

            <div className="mt-10 flex items-center justify-center gap-3">
              {PULSE_DELAYS.map((d) => (
                <div
                  key={d}
                  className="w-2 h-2 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: d }}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <p className="text-primary font-mono text-sm mb-3">
              {"// projects"}
            </p>
            <h1 className="font-display font-extrabold text-5xl text-foreground mb-4">
              {t("projects.title", "Projects")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t(
                "projects.description",
                "Robotics, AI, and experimental technology being built at PsyQuantum.",
              )}
            </p>
          </div>
        </ScrollReveal>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="projects.list"
        >
          {sorted.map((project, idx) => (
            <ProjectCard
              key={project.id.toString()}
              project={project}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
