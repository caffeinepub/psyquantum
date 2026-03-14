import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetLogoUrl } from "../hooks/useQueries";

const DEFAULT_LOGO =
  "/assets/uploads/WhatsApp-Image-2026-03-14-at-11.02.13-PM-4.jpeg";

const navLinks = [
  { label: "Home", to: "/", ocid: "nav.home_link" },
  { label: "Concepts", to: "/concepts", ocid: "nav.concepts_link" },
  { label: "Explained", to: "/explained", ocid: "nav.explained_link" },
  { label: "Projects", to: "/projects", ocid: "nav.projects_link" },
  { label: "About", to: "/about", ocid: "nav.about_link" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: logoUrl } = useGetLogoUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  });

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
            <li>
              <Link
                to="/admin"
                className="ml-2 px-4 py-2 rounded-md text-sm font-medium border border-primary/40 text-primary hover:bg-primary/10 transition-colors duration-200"
              >
                Admin
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

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
              <li>
                <Link
                  to="/admin"
                  className="block px-4 py-3 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
