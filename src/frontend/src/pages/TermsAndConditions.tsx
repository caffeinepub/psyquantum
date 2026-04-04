import { Link } from "@tanstack/react-router";
import ScrollReveal from "../components/ScrollReveal";

const LAST_UPDATED = "April 4, 2026";
const CONTACT_EMAIL = "piyushyadavballia751@gmail.com";
const INSTAGRAM = "@psi___quantam";
const INSTAGRAM_URL = "https://instagram.com/psi___quantam";

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

export default function TermsAndConditions() {
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
              <span className="text-foreground font-medium">
                {LAST_UPDATED}
              </span>
            </p>
          </div>
        </ScrollReveal>

        {/* 1. Acceptance of Terms */}
        <Section number="01" title="Acceptance of Terms" delay={50}>
          <p>
            By accessing or using{" "}
            <strong className="text-foreground">PsyQuantum</strong> (the
            "Website"), you agree to be bound by these Terms and Conditions. If
            you do not agree with any part of these terms, please do not use
            this Website.
          </p>
          <p>
            These terms apply to all visitors and users of PsyQuantum. By
            continuing to browse or use the Website, you confirm that you have
            read, understood, and accepted these Terms and Conditions in full.
          </p>
          <p className="text-xs bg-card/60 border border-border rounded-lg px-4 py-3">
            <strong className="text-foreground">Note:</strong> PsyQuantum
            reserves the right to update these terms at any time. Your continued
            use of the Website after any changes constitutes acceptance of the
            revised terms.
          </p>
        </Section>

        {/* 2. Use of Content */}
        <Section number="02" title="Use of Content" delay={100}>
          <p>
            All content published on PsyQuantum — including articles, concept
            explanations, stories, text, graphics, and any other materials — is
            provided for{" "}
            <strong className="text-foreground">
              personal, non-commercial, educational use only
            </strong>
            .
          </p>
          <p>You are permitted to:</p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Read and engage with all content freely on this Website
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Share a link to any page on PsyQuantum for reference or
                recommendation
              </span>
            </li>
          </ul>
          <p className="mt-2">
            You are <strong className="text-foreground">not</strong> permitted
            to:
          </p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
              <span>
                Copy, reproduce, or republish any content from PsyQuantum on
                another website, blog, or platform without explicit written
                permission
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
              <span>
                Redistribute, sell, or use any content for commercial purposes
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
              <span>
                Scrape, extract, or systematically download content from the
                Website using automated tools
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
              <span>
                Modify or adapt the content and present it as your own original
                work
              </span>
            </li>
          </ul>
          <p>
            Unauthorized use of content may result in access being terminated
            and legal action being taken where applicable.
          </p>
        </Section>

        {/* 3. Intellectual Property Rights */}
        <Section number="03" title="Intellectual Property Rights" delay={150}>
          <p>
            All content on PsyQuantum, including but not limited to articles,
            explanations, stories, original concepts, graphics, the website
            design, and the PsyQuantum name and logo, is the intellectual
            property of PsyQuantum and its creator.
          </p>
          <p>
            This content is protected under applicable intellectual property
            laws. No content may be used, copied, or distributed without prior
            written consent from PsyQuantum.
          </p>
          <p>
            If you wish to reference, quote, or collaborate using our content,
            please contact us before doing so. Proper attribution is required
            for any permitted use.
          </p>
        </Section>

        {/* 4. Educational Disclaimer */}
        <Section number="04" title="Educational Disclaimer" delay={200}>
          <p>
            All content on PsyQuantum is created purely for{" "}
            <strong className="text-foreground">
              educational and informational purposes
            </strong>
            . It is not intended to serve as professional, academic, scientific,
            medical, legal, or financial advice of any kind.
          </p>
          <p>
            Our articles and stories explore concepts and ideas in science,
            mathematics, technology, and philosophy. While we strive for
            accuracy, we do not guarantee that all content is complete,
            up-to-date, or error-free.
          </p>
          <p className="text-xs bg-card/60 border border-border rounded-lg px-4 py-3">
            <strong className="text-foreground">Important:</strong> Do not make
            important decisions based solely on content from this Website.
            Always consult qualified professionals for advice specific to your
            situation.
          </p>
          <p>
            Some content may include the author's personal interpretations or
            perspectives. These should not be taken as definitive facts or
            established scientific consensus unless explicitly stated.
          </p>
        </Section>

        {/* 5. Limitation of Liability */}
        <Section number="05" title="Limitation of Liability" delay={250}>
          <p>
            To the maximum extent permitted by law, PsyQuantum and its creator
            shall not be held liable for:
          </p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Any errors, inaccuracies, or omissions in the content published
                on this Website
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Any loss or damage arising from your use of, or inability to
                use, this Website
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Any decisions made based on the information or content available
                on this Website
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Any interruptions, downtime, or technical issues affecting
                access to the Website
              </span>
            </li>
          </ul>
          <p>
            PsyQuantum is provided on an{" "}
            <strong className="text-foreground">"as is"</strong> and{" "}
            <strong className="text-foreground">"as available"</strong> basis
            with no warranties of any kind, either express or implied.
          </p>
        </Section>

        {/* 6. External Links Disclaimer */}
        <Section number="06" title="External Links Disclaimer" delay={300}>
          <p>
            PsyQuantum may contain links to external websites, resources, or
            third-party content for informational purposes. These links are
            provided purely as a convenience.
          </p>
          <p>
            We do <strong className="text-foreground">not</strong> endorse,
            control, or take responsibility for the content, privacy practices,
            or accuracy of any external websites. Visiting external links is
            done entirely at your own risk.
          </p>
          <p>
            We encourage you to review the privacy policies and terms of any
            external website you visit through links on PsyQuantum.
          </p>
        </Section>

        {/* 7. Changes to Terms */}
        <Section number="07" title="Changes to Terms" delay={350}>
          <p>
            PsyQuantum reserves the right to update, modify, or replace these
            Terms and Conditions at any time without prior notice. Changes will
            take effect immediately upon being posted to this page.
          </p>
          <p>
            The <strong className="text-foreground">"Last updated"</strong> date
            at the top of this page will reflect when the most recent changes
            were made. We recommend checking this page periodically.
          </p>
          <p>
            Continued use of PsyQuantum after any changes are posted means you
            accept and agree to the updated terms.
          </p>
        </Section>

        {/* 8. Termination */}
        <Section number="08" title="Termination" delay={400}>
          <p>
            PsyQuantum reserves the right to restrict or terminate access to the
            Website, or any part of it, for any user who is found to be misusing
            the content or violating these Terms and Conditions.
          </p>
          <p>This includes, but is not limited to:</p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Copying, republishing, or redistributing content without
                permission
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Attempting to bypass, hack, or interfere with the Website's
                systems
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Using automated bots or scrapers to extract content in bulk
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Any activity that violates applicable laws or harms the Website
                or its creator
              </span>
            </li>
          </ul>
          <p>
            Such termination may be immediate and without prior warning.
            PsyQuantum reserves the right to take further legal action if
            necessary.
          </p>
        </Section>

        {/* 9. Governing Law */}
        <Section number="09" title="Governing Law" delay={450}>
          <p>
            These Terms and Conditions are governed by and construed in
            accordance with generally accepted principles of international
            internet law and applicable legal standards.
          </p>
          <p>
            Any disputes arising from the use of PsyQuantum or its content shall
            be handled in good faith. If a formal legal resolution is required,
            the jurisdiction of the Website owner's place of residence shall
            apply.
          </p>
          <p>
            If any provision of these Terms is found to be invalid or
            unenforceable, the remaining provisions will continue to apply in
            full force.
          </p>
        </Section>

        {/* 10. Contact Information */}
        <Section number="10" title="Contact Information" delay={500}>
          <p>
            If you have any questions, concerns, or requests related to these
            Terms and Conditions, please reach out to us:
          </p>
          <div className="mt-4 p-5 rounded-xl border border-border/60 bg-card/40 space-y-3">
            <p className="text-foreground font-semibold">PsyQuantum</p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {INSTAGRAM}
              </a>
            </p>
          </div>
          <p>We aim to respond to all inquiries within a reasonable time.</p>
        </Section>

        {/* Back link */}
        <ScrollReveal delay={550}>
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
