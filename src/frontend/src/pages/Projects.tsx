import ScrollReveal from "../components/ScrollReveal";

const PULSE_DELAYS = ["0s", "0.3s", "0.6s"];

export default function Projects() {
  return (
    <main className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
      <ScrollReveal>
        <div className="text-center max-w-xl mx-auto px-4">
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
            Projects
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed mb-4">
            Projects currently under development.
          </p>
          <p className="text-muted-foreground/60 text-base">
            Robotics, AI, and experimental technology projects are being built.
            Check back soon.
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
