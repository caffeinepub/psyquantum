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

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-14">
            <p className="text-primary font-mono text-sm mb-3">{"// legal"}</p>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated:{" "}
              <span className="text-foreground font-medium">
                {LAST_UPDATED}
              </span>
            </p>
          </div>
        </ScrollReveal>

        {/* 1. Introduction */}
        <Section number="01" title="Introduction" delay={50}>
          <p>
            Welcome to <strong className="text-foreground">PsyQuantum</strong>.
            We are an educational platform dedicated to exploring ideas in
            science, mathematics, and technology through articles and stories.
            Our goal is to make complex concepts accessible to students and
            curious learners everywhere.
          </p>
          <p>
            This Privacy Policy explains what information is collected when you
            visit our website, how it is used, and what choices you have. We
            have written it in plain language so it is easy to understand — no
            legal background required.
          </p>
          <p>
            By using PsyQuantum, you agree to the practices described in this
            policy. If you do not agree, please stop using the website.
          </p>
          <p className="text-xs bg-card/60 border border-border rounded-lg px-4 py-3">
            <strong className="text-foreground">Note:</strong> All content on
            PsyQuantum is provided for informational and educational purposes
            only. It does not constitute professional, medical, legal, or
            financial advice.
          </p>
        </Section>

        {/* 2. Information We Collect */}
        <Section number="02" title="Information We Collect" delay={100}>
          <p>
            PsyQuantum does <strong className="text-foreground">not</strong>{" "}
            require you to create an account, log in, or submit any personal
            details. There are no contact forms or payment systems on this site.
            This means we never directly collect your name, email address, phone
            number, or any other sensitive personal information.
          </p>
          <p>
            However, when you browse any website, certain technical data is
            automatically shared with web servers and analytics tools. On
            PsyQuantum, this includes:
          </p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">
                  Usage and Analytics Data
                </strong>{" "}
                — Pages you visit, how long you spend on them, links you click,
                and the general flow of your session. Collected via Google
                Analytics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">
                  Device and Browser Information
                </strong>{" "}
                — Your device type (mobile, desktop), operating system, browser
                name and version, and screen resolution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">
                  Approximate Location
                </strong>{" "}
                — A general geographic location (country or region) based on
                your IP address. Your precise address is never known or stored.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">Cookies</strong> — Small
                text files stored in your browser to help analytics services
                recognize repeat visits and improve reporting accuracy.
              </span>
            </li>
          </ul>
          <p>
            None of this data can be used to identify you personally. We do not
            collect, store, or process any sensitive personal data such as
            financial information, health data, or government identification
            numbers.
          </p>
        </Section>

        {/* 3. How We Use Information */}
        <Section number="03" title="How We Use Information" delay={150}>
          <p>
            The information collected through analytics is used only to
            understand how visitors interact with PsyQuantum, so we can improve
            the content and experience. Specifically, we use this data to:
          </p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Understand which articles and topics are most popular</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Identify pages that may have technical problems or high exit
                rates
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Improve site performance, layout, and navigation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Understand what devices and regions our audience uses, so we can
                ensure compatibility
              </span>
            </li>
          </ul>
          <p>
            We do <strong className="text-foreground">not</strong> sell, rent,
            or trade any data to third parties for commercial purposes. We do
            not use your data for targeted marketing, user profiling, or any
            purpose outside of improving this educational website.
          </p>
        </Section>

        {/* 4. Third-Party Services */}
        <Section number="04" title="Third-Party Services" delay={200}>
          <p>
            PsyQuantum uses the following third-party services. Each of these
            has their own privacy policy and handles data independently:
          </p>

          <div className="mt-2 space-y-5">
            <div className="p-5 rounded-xl border border-border/60 bg-card/40">
              <h3 className="text-foreground font-semibold mb-2">
                Google Analytics
              </h3>
              <p>
                We use Google Analytics to understand website traffic and
                visitor behavior. Google Analytics uses cookies and collects
                anonymized usage data. Google may process this data on servers
                located in different countries. You can opt out of Google
                Analytics tracking by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
              <p className="mt-2">
                Google's privacy policy:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  policies.google.com/privacy
                </a>
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/60 bg-card/40">
              <h3 className="text-foreground font-semibold mb-2">
                Google AdSense (Future)
              </h3>
              <p>
                PsyQuantum may use Google AdSense in the future to display
                advertisements and support the platform. If enabled, Google
                AdSense would use cookies and web beacons to serve ads based on
                your browsing activity and interests. Advertising cookies can be
                managed through{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google's Ad Settings
                </a>
                .
              </p>
              <p className="mt-2">
                For more information, see:{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  How Google uses cookies in advertising
                </a>
              </p>
            </div>
          </div>

          <p>
            These third-party services operate under their own terms and privacy
            policies. PsyQuantum is not responsible for how these services
            collect or process data beyond what is described here.
          </p>
        </Section>

        {/* 5. Cookies Policy */}
        <Section number="05" title="Cookies Policy" delay={250}>
          <p>
            Cookies are small text files that a website stores on your device.
            They help services like Google Analytics track visits and behavior
            across sessions. PsyQuantum itself does not set any first-party
            cookies; the cookies on this site come from Google Analytics (and,
            in the future, Google AdSense).
          </p>
          <p>There are two types of cookies you may encounter on PsyQuantum:</p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">Analytics Cookies</strong> —
                Used by Google Analytics to count visitors, track page views,
                and measure engagement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">Advertising Cookies</strong>{" "}
                (future) — If Google AdSense is enabled, it may use cookies to
                personalize the ads shown to you.
              </span>
            </li>
          </ul>
          <p>
            <strong className="text-foreground">How to control cookies:</strong>{" "}
            You can adjust your browser settings to block or delete cookies at
            any time. Most modern browsers allow you to do this in their privacy
            or security settings. Please note that disabling cookies may affect
            how some parts of the website function. You can also use the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Analytics opt-out tool
            </a>{" "}
            to prevent your data from being used for analytics.
          </p>
        </Section>

        {/* 6. Data Protection and Security */}
        <Section number="06" title="Data Protection and Security" delay={300}>
          <p>
            PsyQuantum takes reasonable steps to ensure that any data processed
            through third-party services is handled responsibly. Because we do
            not operate our own database of personal information, there is very
            limited data for us to protect directly.
          </p>
          <p>
            All data processed by Google Analytics is anonymized and stored by
            Google on their secure infrastructure. We do not have access to raw
            IP addresses or any data that could identify individual users.
          </p>
          <p>
            While no online platform can guarantee absolute security, we believe
            that by collecting only what is necessary — and nothing more — we
            reduce the risks to our visitors significantly.
          </p>
        </Section>

        {/* 7. User Rights */}
        <Section number="07" title="Your Rights" delay={350}>
          <p>
            Even though PsyQuantum does not directly collect personal
            information, you still have rights regarding the data that
            third-party services like Google Analytics may process:
          </p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">Right to Opt Out</strong> —
                You can prevent Google Analytics from tracking your visits by
                installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  browser opt-out add-on
                </a>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">
                  Right to Control Cookies
                </strong>{" "}
                — You can accept, block, or delete cookies through your browser
                settings at any time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">
                  Right to Ask Questions
                </strong>{" "}
                — If you have any concerns about how your data is handled, you
                can contact us (see Section 10) and we will do our best to help.
              </span>
            </li>
          </ul>
          <p>
            If you are located in the European Union or United Kingdom, you may
            have additional rights under GDPR, including the right to access,
            correct, or request deletion of personal data held about you by
            Google. Please refer to Google's privacy policy for how to exercise
            those rights.
          </p>
        </Section>

        {/* 8. Children's Information */}
        <Section number="08" title="Children's Information" delay={400}>
          <p>
            PsyQuantum is an educational platform designed to be accessible to
            students of all ages, including younger learners. We take the
            privacy of children seriously.
          </p>
          <p>
            We do <strong className="text-foreground">not</strong> knowingly
            collect any personal information from children under the age of 13
            (or the applicable age in your country). Since PsyQuantum has no
            registration system, forms, or payment flows, no personal data is
            directly submitted by any visitor, regardless of age.
          </p>
          <p>
            The analytics data collected through Google Analytics is aggregated
            and anonymized. It cannot be used to identify individual users,
            including children.
          </p>
          <p>
            If you are a parent or guardian and believe your child has
            inadvertently shared personal information while using this site,
            please contact us immediately using the details in Section 10 and we
            will take appropriate action.
          </p>
          <p>
            In the future, if Google AdSense is enabled, we will ensure that ad
            serving settings are configured to comply with child-directed
            content policies where required.
          </p>
        </Section>

        {/* 9. Changes to This Policy */}
        <Section number="09" title="Changes to This Policy" delay={450}>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in how we operate, changes to third-party services we use,
            or changes in applicable laws.
          </p>
          <p>
            When we make changes, we will update the{" "}
            <strong className="text-foreground">"Last updated"</strong> date at
            the top of this page. We encourage you to review this policy
            periodically to stay informed.
          </p>
          <p>
            Continued use of PsyQuantum after changes are made constitutes your
            acceptance of the updated policy. If you disagree with any changes,
            please stop using the site.
          </p>
        </Section>

        {/* 10. Contact Information */}
        <Section number="10" title="Contact Information" delay={500}>
          <p>
            If you have any questions, concerns, or requests related to this
            Privacy Policy, please reach out to us:
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
          <p>
            We aim to respond to all privacy-related inquiries within a
            reasonable time.
          </p>
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
