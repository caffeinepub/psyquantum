import { Link } from "@tanstack/react-router";
import ScrollReveal from "../components/ScrollReveal";
import { useGetAllSiteTexts } from "../hooks/useQueries";

// Default text fallbacks
const DEFAULTS: Record<string, string> = {
  "terms.lastUpdated": "April 4, 2026",
  "terms.contactEmail": "piyushyadavballia751@gmail.com",
  "terms.contactInstagram": "@psi___quantam",
  "terms.contactInstagramUrl": "https://instagram.com/psi___quantam",

  "terms.s01.title": "Acceptance of Terms",
  "terms.s01.body":
    'By accessing or using PsyQuantum (the "Website"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this Website.\n\nThese terms apply to all visitors and users of PsyQuantum. By continuing to browse or use the Website, you confirm that you have read, understood, and accepted these Terms and Conditions in full.\n\nNote: PsyQuantum reserves the right to update these terms at any time. Your continued use of the Website after any changes constitutes acceptance of the revised terms.',

  "terms.s02.title": "Use of Content",
  "terms.s02.body":
    "All content published on PsyQuantum — including articles, concept explanations, stories, text, graphics, and any other materials — is provided for personal, non-commercial, educational use only.\n\nYou are permitted to:\n• Read and engage with all content freely on this Website\n• Share a link to any page on PsyQuantum for reference or recommendation\n\nYou are not permitted to:\n• Copy, reproduce, or republish any content from PsyQuantum on another website, blog, or platform without explicit written permission\n• Redistribute, sell, or use any content for commercial purposes\n• Scrape, extract, or systematically download content from the Website using automated tools\n• Modify or adapt the content and present it as your own original work\n\nUnauthorized use of content may result in access being terminated and legal action being taken where applicable.",

  "terms.s03.title": "Intellectual Property Rights",
  "terms.s03.body":
    "All content on PsyQuantum, including but not limited to articles, explanations, stories, original concepts, graphics, the website design, and the PsyQuantum name and logo, is the intellectual property of PsyQuantum and its creator.\n\nThis content is protected under applicable intellectual property laws. No content may be used, copied, or distributed without prior written consent from PsyQuantum.\n\nIf you wish to reference, quote, or collaborate using our content, please contact us before doing so. Proper attribution is required for any permitted use.",

  "terms.s04.title": "Educational Disclaimer",
  "terms.s04.body":
    "All content on PsyQuantum is created purely for educational and informational purposes. It is not intended to serve as professional, academic, scientific, medical, legal, or financial advice of any kind.\n\nOur articles and stories explore concepts and ideas in science, mathematics, technology, and philosophy. While we strive for accuracy, we do not guarantee that all content is complete, up-to-date, or error-free.\n\nImportant: Do not make important decisions based solely on content from this Website. Always consult qualified professionals for advice specific to your situation.\n\nSome content may include the author's personal interpretations or perspectives. These should not be taken as definitive facts or established scientific consensus unless explicitly stated.",

  "terms.s05.title": "Limitation of Liability",
  "terms.s05.body":
    'To the maximum extent permitted by law, PsyQuantum and its creator shall not be held liable for:\n\n• Any errors, inaccuracies, or omissions in the content published on this Website\n• Any loss or damage arising from your use of, or inability to use, this Website\n• Any decisions made based on the information or content available on this Website\n• Any interruptions, downtime, or technical issues affecting access to the Website\n\nPsyQuantum is provided on an "as is" and "as available" basis with no warranties of any kind, either express or implied.',

  "terms.s06.title": "External Links Disclaimer",
  "terms.s06.body":
    "PsyQuantum may contain links to external websites, resources, or third-party content for informational purposes. These links are provided purely as a convenience.\n\nWe do not endorse, control, or take responsibility for the content, privacy practices, or accuracy of any external websites. Visiting external links is done entirely at your own risk.\n\nWe encourage you to review the privacy policies and terms of any external website you visit through links on PsyQuantum.",

  "terms.s07.title": "Changes to Terms",
  "terms.s07.body":
    "PsyQuantum reserves the right to update, modify, or replace these Terms and Conditions at any time without prior notice. Changes will take effect immediately upon being posted to this page.\n\nThe Last updated date at the top of this page will reflect when the most recent changes were made. We recommend checking this page periodically.\n\nContinued use of PsyQuantum after any changes are posted means you accept and agree to the updated terms.",

  "terms.s08.title": "Termination",
  "terms.s08.body":
    "PsyQuantum reserves the right to restrict or terminate access to the Website, or any part of it, for any user who is found to be misusing the content or violating these Terms and Conditions.\n\nThis includes, but is not limited to:\n• Copying, republishing, or redistributing content without permission\n• Attempting to bypass, hack, or interfere with the Website's systems\n• Using automated bots or scrapers to extract content in bulk\n• Any activity that violates applicable laws or harms the Website or its creator\n\nSuch termination may be immediate and without prior warning. PsyQuantum reserves the right to take further legal action if necessary.",

  "terms.s09.title": "Governing Law",
  "terms.s09.body":
    "These Terms and Conditions are governed by and construed in accordance with generally accepted principles of international internet law and applicable legal standards.\n\nAny disputes arising from the use of PsyQuantum or its content shall be handled in good faith. If a formal legal resolution is required, the jurisdiction of the Website owner's place of residence shall apply.\n\nIf any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to apply in full force.",

  "terms.s10.title": "Contact Information",
  "terms.s10.body":
    "If you have any questions, concerns, or requests related to these Terms and Conditions, please reach out to us. We aim to respond to all inquiries within a reasonable time.",
};

function t(siteTexts: Record<string, string>, key: string): string {
  const val = siteTexts[key];
  return val?.trim() ? val : (DEFAULTS[key] ?? "");
}

function Section({
  number,
  title,
  children,
  delay = 0,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <section className="mb-10 p-8 rounded-2xl border border-border bg-card/30">
        <h2 className="font-display font-bold text-xl text-foreground mb-5 flex items-center gap-3">
          <span className="text-primary font-mono text-sm font-normal">
            {number}.
          </span>
          {title}
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed text-[0.95rem]">
          {children}
        </div>
      </section>
    </ScrollReveal>
  );
}

function BodyText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static list
        <p key={i}>{para}</p>
      ))}
    </>
  );
}

export default function TermsAndConditions() {
  const { data: siteTexts = {} } = useGetAllSiteTexts();

  const sections = [
    { num: "01", key: "s01" },
    { num: "02", key: "s02" },
    { num: "03", key: "s03" },
    { num: "04", key: "s04" },
    { num: "05", key: "s05" },
    { num: "06", key: "s06" },
    { num: "07", key: "s07" },
    { num: "08", key: "s08" },
    { num: "09", key: "s09" },
    { num: "10", key: "s10" },
  ];

  const lastUpdated = t(siteTexts, "terms.lastUpdated");
  const contactEmail = t(siteTexts, "terms.contactEmail");
  const contactInstagram = t(siteTexts, "terms.contactInstagram");
  const contactInstagramUrl = t(siteTexts, "terms.contactInstagramUrl");

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-14">
            <p className="text-primary font-mono text-sm mb-3">{"// legal"}</p>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-foreground mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated:{" "}
              <span className="text-foreground font-medium">{lastUpdated}</span>
            </p>
          </div>
        </ScrollReveal>

        {sections.map(({ num, key }, idx) => (
          <Section
            key={key}
            number={num}
            title={t(siteTexts, `terms.${key}.title`)}
            delay={idx * 50 + 50}
          >
            {key === "s10" ? (
              <>
                <BodyText text={t(siteTexts, `terms.${key}.body`)} />
                <div className="mt-4 p-5 rounded-xl border border-border/60 bg-card/40 space-y-3">
                  <p className="text-foreground font-semibold">PsyQuantum</p>
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-primary hover:underline"
                    >
                      {contactEmail}
                    </a>
                  </p>
                  <p>
                    Instagram:{" "}
                    <a
                      href={contactInstagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {contactInstagram}
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <BodyText text={t(siteTexts, `terms.${key}.body`)} />
            )}
          </Section>
        ))}

        {/* Back link */}
        <ScrollReveal delay={600}>
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
