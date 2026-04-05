import { Link } from "@tanstack/react-router";
import ScrollReveal from "../components/ScrollReveal";
import { useGetAllSiteTexts } from "../hooks/useQueries";

// Default text fallbacks
const DEFAULTS: Record<string, string> = {
  "privacy.lastUpdated": "April 4, 2026",
  "privacy.contactEmail": "piyushyadavballia751@gmail.com",
  "privacy.contactInstagram": "@psi___quantam",
  "privacy.contactInstagramUrl": "https://instagram.com/psi___quantam",

  "privacy.s01.title": "Introduction",
  "privacy.s01.body":
    "Welcome to PsyQuantum. We are an educational platform dedicated to exploring ideas in science, mathematics, and technology through articles and stories. Our goal is to make complex concepts accessible to students and curious learners everywhere.\n\nThis Privacy Policy explains what information is collected when you visit our website, how it is used, and what choices you have. We have written it in plain language so it is easy to understand — no legal background required.\n\nBy using PsyQuantum, you agree to the practices described in this policy. If you do not agree, please stop using the website.\n\nNote: All content on PsyQuantum is provided for informational and educational purposes only. It does not constitute professional, medical, legal, or financial advice.",

  "privacy.s02.title": "Information We Collect",
  "privacy.s02.body":
    "PsyQuantum does not require you to create an account, log in, or submit any personal details. There are no contact forms or payment systems on this site. This means we never directly collect your name, email address, phone number, or any other sensitive personal information.\n\nHowever, when you browse any website, certain technical data is automatically shared with web servers and analytics tools. On PsyQuantum, this includes:\n\n• Usage and Analytics Data — Pages you visit, how long you spend on them, links you click, and the general flow of your session. Collected via Google Analytics.\n\n• Device and Browser Information — Your device type (mobile, desktop), operating system, browser name and version, and screen resolution.\n\n• Approximate Location — A general geographic location (country or region) based on your IP address. Your precise address is never known or stored.\n\n• Cookies — Small text files stored in your browser to help analytics services recognize repeat visits and improve reporting accuracy.\n\nNone of this data can be used to identify you personally. We do not collect, store, or process any sensitive personal data such as financial information, health data, or government identification numbers.",

  "privacy.s03.title": "How We Use Information",
  "privacy.s03.body":
    "The information collected through analytics is used only to understand how visitors interact with PsyQuantum, so we can improve the content and experience. Specifically, we use this data to:\n\n• Understand which articles and topics are most popular\n• Identify pages that may have technical problems or high exit rates\n• Improve site performance, layout, and navigation\n• Understand what devices and regions our audience uses, so we can ensure compatibility\n\nWe do not sell, rent, or trade any data to third parties for commercial purposes. We do not use your data for targeted marketing, user profiling, or any purpose outside of improving this educational website.",

  "privacy.s04.title": "Third-Party Services",
  "privacy.s04.body":
    "PsyQuantum uses the following third-party services. Each of these has their own privacy policy and handles data independently:\n\nGoogle Analytics: We use Google Analytics to understand website traffic and visitor behavior. Google Analytics uses cookies and collects anonymized usage data. You can opt out via the Google Analytics Opt-out Browser Add-on at https://tools.google.com/dlpage/gaoptout\n\nGoogle AdSense (Future): PsyQuantum may use Google AdSense in the future to display advertisements. If enabled, Google AdSense would use cookies and web beacons to serve ads. Advertising cookies can be managed through Google's Ad Settings at https://adssettings.google.com\n\nThese third-party services operate under their own terms and privacy policies. PsyQuantum is not responsible for how these services collect or process data beyond what is described here.",

  "privacy.s05.title": "Cookies Policy",
  "privacy.s05.body":
    "Cookies are small text files that a website stores on your device. They help services like Google Analytics track visits and behavior across sessions. PsyQuantum itself does not set any first-party cookies; the cookies on this site come from Google Analytics (and, in the future, Google AdSense).\n\nThere are two types of cookies you may encounter on PsyQuantum:\n\n• Analytics Cookies — Used by Google Analytics to count visitors, track page views, and measure engagement.\n\n• Advertising Cookies (future) — If Google AdSense is enabled, it may use cookies to personalize the ads shown to you.\n\nHow to control cookies: You can adjust your browser settings to block or delete cookies at any time. Most modern browsers allow you to do this in their privacy or security settings. Please note that disabling cookies may affect how some parts of the website function. You can also use the Google Analytics opt-out tool to prevent your data from being used for analytics.",

  "privacy.s06.title": "Data Protection and Security",
  "privacy.s06.body":
    "PsyQuantum takes reasonable steps to ensure that any data processed through third-party services is handled responsibly. Because we do not operate our own database of personal information, there is very limited data for us to protect directly.\n\nAll data processed by Google Analytics is anonymized and stored by Google on their secure infrastructure. We do not have access to raw IP addresses or any data that could identify individual users.\n\nWhile no online platform can guarantee absolute security, we believe that by collecting only what is necessary — and nothing more — we reduce the risks to our visitors significantly.",

  "privacy.s07.title": "Your Rights",
  "privacy.s07.body":
    "Even though PsyQuantum does not directly collect personal information, you still have rights regarding the data that third-party services like Google Analytics may process:\n\n• Right to Opt Out — You can prevent Google Analytics from tracking your visits by installing the browser opt-out add-on at https://tools.google.com/dlpage/gaoptout\n\n• Right to Control Cookies — You can accept, block, or delete cookies through your browser settings at any time.\n\n• Right to Ask Questions — If you have any concerns about how your data is handled, you can contact us and we will do our best to help.\n\nIf you are located in the European Union or United Kingdom, you may have additional rights under GDPR, including the right to access, correct, or request deletion of personal data held about you by Google. Please refer to Google's privacy policy for how to exercise those rights.",

  "privacy.s08.title": "Children's Information",
  "privacy.s08.body":
    "PsyQuantum is an educational platform designed to be accessible to students of all ages, including younger learners. We take the privacy of children seriously.\n\nWe do not knowingly collect any personal information from children under the age of 13 (or the applicable age in your country). Since PsyQuantum has no registration system, forms, or payment flows, no personal data is directly submitted by any visitor, regardless of age.\n\nThe analytics data collected through Google Analytics is aggregated and anonymized. It cannot be used to identify individual users, including children.\n\nIf you are a parent or guardian and believe your child has inadvertently shared personal information while using this site, please contact us immediately and we will take appropriate action.\n\nIn the future, if Google AdSense is enabled, we will ensure that ad serving settings are configured to comply with child-directed content policies where required.",

  "privacy.s09.title": "Changes to This Policy",
  "privacy.s09.body":
    "We may update this Privacy Policy from time to time to reflect changes in how we operate, changes to third-party services we use, or changes in applicable laws.\n\nWhen we make changes, we will update the Last updated date at the top of this page. We encourage you to review this policy periodically to stay informed.\n\nContinued use of PsyQuantum after changes are made constitutes your acceptance of the updated policy. If you disagree with any changes, please stop using the site.",

  "privacy.s10.title": "Contact Information",
  "privacy.s10.body":
    "If you have any questions, concerns, or requests related to this Privacy Policy, please reach out to us. We aim to respond to all privacy-related inquiries within a reasonable time.",
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

export default function PrivacyPolicy() {
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

  const lastUpdated = t(siteTexts, "privacy.lastUpdated");
  const contactEmail = t(siteTexts, "privacy.contactEmail");
  const contactInstagram = t(siteTexts, "privacy.contactInstagram");
  const contactInstagramUrl = t(siteTexts, "privacy.contactInstagramUrl");

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
              <span className="text-foreground font-medium">{lastUpdated}</span>
            </p>
          </div>
        </ScrollReveal>

        {sections.map(({ num, key }, idx) => (
          <Section
            key={key}
            number={num}
            title={t(siteTexts, `privacy.${key}.title`)}
            delay={idx * 50 + 50}
          >
            {key === "s10" ? (
              <>
                <BodyText text={t(siteTexts, `privacy.${key}.body`)} />
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
              <BodyText text={t(siteTexts, `privacy.${key}.body`)} />
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
