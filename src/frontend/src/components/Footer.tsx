import { Link } from "@tanstack/react-router";
import { SiInstagram } from "react-icons/si";
import { useGetLogoUrl } from "../hooks/useQueries";

const DEFAULT_LOGO =
  "/assets/uploads/WhatsApp-Image-2026-03-14-at-11.02.13-PM-4.jpeg";

export default function Footer() {
  const year = new Date().getFullYear();
  const { data: logoUrl } = useGetLogoUrl();
  const logo = logoUrl || DEFAULT_LOGO;

  return (
    <footer className="border-t border-border bg-card/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-lg border border-border/50">
              <img
                id="1q7fgha"
                src={logo}
                alt="PsyQuantum"
                className="w-full h-full object-contain"
                style={{ display: "block" }}
              />
            </div>
            <span className="font-display font-bold text-xl gradient-text">
              PsyQuantum
            </span>
          </div>

          <p className="text-muted-foreground text-sm text-center max-w-md">
            Exploring deep ideas in science, mathematics, and technology.
          </p>

          {/* Instagram */}
          <a
            href="https://instagram.com/psi___quantam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
          >
            <SiInstagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">@psi___quantam</span>
          </a>

          {/* Privacy Policy link */}
          <Link
            to="/privacy"
            className="text-muted-foreground hover:text-primary transition-colors duration-200 text-xs"
          >
            Privacy Policy
          </Link>

          <p className="text-muted-foreground text-xs">
            © {year} PsyQuantum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
