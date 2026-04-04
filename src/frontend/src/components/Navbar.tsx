import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAllSiteTexts, useGetLogoUrl } from "../hooks/useQueries";

const DEFAULT_LOGO =
  "/assets/uploads/WhatsApp-Image-2026-03-14-at-11.02.13-PM-4.jpeg";

const navBase = [
  { key: "", defaultLabel: "Home", to: "/", ocid: "nav.home_link" },
  {
    key: "nav.concepts",
    defaultLabel: "Concepts",
    to: "/concepts",
    ocid: "nav.concepts_link",
  },
  {
    key: "nav.explained",
    defaultLabel: "Explained",
    to: "/explained",
    ocid: "nav.explained_link",
  },
  {
    key: "nav.projects",
    defaultLabel: "Projects",
    to: "/projects",
    ocid: "nav.projects_link",
  },
  {
    key: "nav.about",
    defaultLabel: "About",
    to: "/about",
    ocid: "nav.about_link",
  },
];

// Legal pages shown in both desktop dropdown and mobile menu
const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

// Show Admin link only when accessed via Caffeine draft/preview or localhost
function isOwnerContext(): boolean {
  const host = window.location.hostname;
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".caffeine.ai") ||
    host === "caffeine.ai"
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const location = useLocation();
  const { data: logoUrl } = useGetLogoUrl();
  const { data: siteTexts = {} } = useGetAllSiteTexts();

  const t = (key: string, fallback: string) =>
    key && siteTexts[key] ? siteTexts[key] : fallback;

  const navLinks = navBase.map((l) => ({
    ...l,
    label: t(l.key, l.defaultLabel),
  }));

  useEffect(() => {
    setShowAdmin(isOwnerContext());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: location.pathname is intentional trigger
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const logo = logoUrl || DEFAULT_LOGO;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-surface border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-ocid="nav.home_link"
          >
            <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-lg border border-border/50 bg-card/50">
              <img
                src={logo}
                alt="PsyQuantum logo"
                className="w-full h-full object-contain"
                style={{ display: "block" }}
              />
            </div>
            <span className="font-display font-bold text-lg gradient-text tracking-wide">
              PsyQuantum
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  data-ocid={link.ocid}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.to
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Legal links (desktop) */}
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.to
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {showAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="ml-2 px-4 py-2 rounded-md text-sm font-medium border border-primary/40 text-primary hover:bg-primary/10 transition-colors duration-200"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden glass-surface border-t border-border pb-4">
            <ul className="flex flex-col gap-1 pt-2 px-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-ocid={link.ocid}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* Divider */}
              <li className="my-1 border-t border-border/40" />
              {/* Legal links (mobile) */}
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {showAdmin && (
                <li>
                  <Link
                    to="/admin"
                    className="block px-4 py-3 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
