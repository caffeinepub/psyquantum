import { User } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import ScrollReveal from "../components/ScrollReveal";
import { useGetAllSiteTexts, useGetCreatorImageUrl } from "../hooks/useQueries";

export default function About() {
  const { data: creatorImageUrl } = useGetCreatorImageUrl();
  const { data: siteTexts = {} } = useGetAllSiteTexts();
  const t = (key: string, fallback: string) => siteTexts[key] || fallback;

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-primary font-mono text-sm mb-3">{"// about"}</p>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-foreground mb-4">
              About PsyQuantum
            </h1>
          </div>
        </ScrollReveal>

        {/* About the Platform */}
        <ScrollReveal delay={100}>
          <section className="mb-16 p-8 rounded-2xl border border-border bg-card/30">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-primary" />
              About the Platform
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                {t(
                  "about.platform.p1",
                  "PsyQuantum is a knowledge exploration platform dedicated to the most interesting frontiers of human thought — science, mathematics, philosophy, artificial intelligence, and the strange intersections between them.",
                )}
              </p>
              <p>
                {t(
                  "about.platform.p2",
                  "Every idea on PsyQuantum is presented in two distinct formats:",
                )}
              </p>
              <ul className="space-y-3 pl-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">
                      Technical Concepts
                    </strong>{" "}
                    — Structured, rigorous explorations for those who want the
                    full depth of an idea.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">
                      Story-Based Explained
                    </strong>{" "}
                    — Narrative versions of the same ideas, written to make
                    complex concepts accessible and immersive.
                  </span>
                </li>
              </ul>
              <p>
                {t(
                  "about.platform.p3",
                  "The platform is built on the belief that deep ideas should be available to everyone — not just those with academic training.",
                )}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* The Creator */}
        <ScrollReveal delay={200}>
          <section className="mb-16 p-8 rounded-2xl border border-border bg-card/30">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-primary" />
              The Creator
            </h2>
            <div className="flex items-start gap-6">
              {/* Circular profile image */}
              <div
                className="w-28 h-28 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-primary/60"
                style={{
                  boxShadow: "0 0 18px 2px oklch(var(--primary) / 0.35)",
                }}
              >
                {creatorImageUrl ? (
                  <img
                    src={creatorImageUrl}
                    alt="Creator"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-card flex items-center justify-center">
                    <User className="w-10 h-10 text-primary/60" />
                  </div>
                )}
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {t(
                    "about.creator.p1",
                    "PsyQuantum was created by Piyush, a student with a deep interest in science, artificial intelligence, robotics, and the kind of questions that don't have easy answers.",
                  )}
                </p>
                <p>
                  {t(
                    "about.creator.p2",
                    "The goal of PsyQuantum is to explore ideas that exist at the edges of what is known — and present them in a way that sparks curiosity, not just comprehension.",
                  )}
                </p>
                <p>
                  {t(
                    "about.creator.p3",
                    "Piyush believes that extraordinary ideas, whether in mathematics, neuroscience, philosophy, or technology, deserve to be explored deeply and shared widely.",
                  )}
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal delay={300}>
          <section className="p-8 rounded-2xl border border-border bg-card/30">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-primary" />
              Contact
            </h2>
            <p className="text-muted-foreground mb-6">
              {t(
                "about.contact.text",
                "Reach out on Instagram for questions, ideas, or collaboration:",
              )}
            </p>
            <a
              href="https://instagram.com/psi___quantam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-border bg-card/50 text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
            >
              <SiInstagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium">@psi___quantam</span>
            </a>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}
