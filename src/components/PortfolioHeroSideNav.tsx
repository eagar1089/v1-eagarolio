import { Github, Linkedin, Codepen } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeProvider";

type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type PortfolioHeroSideNavProps = {
  email?: string;
  socialLinks?: SocialLink[];
};

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/eagar1089",
    icon: Github,
  },
  {
    label: "CodePen",
    href: "https://codepen.io/",
    icon: Codepen,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sagar-parab1089",
    icon: Linkedin,
  },
];

export function PortfolioHeroSideNav({
  email = "sgrp9801@gmail.com",
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: PortfolioHeroSideNavProps) {
  return (
    <>
      {/* Top-left pinned logo (visible on md+) — aligns with social rail left offsets */}
      <div className="pointer-events-none fixed left-6 top-4 z-50 hidden md:flex md:items-start lg:left-8 xl:left-12">
        <a
          href="#"
          aria-label="home"
          className="pointer-events-auto block transition-transform duration-700"
          title="Home"
        >
          <Logo size={42} interactive />
        </a>
      </div>

      {/* Left Side: Social Icons */}
      <div className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 md:flex md:flex-col md:items-center lg:left-8 xl:left-12">
        <div className="pointer-events-auto flex flex-col items-center gap-6">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              title={label}
              className="group relative flex items-center justify-center transition-all duration-300 ease-out"
              style={{
                color: "var(--fg-muted, rgba(204,214,246,0.62))",
                width: "24px",
                height: "24px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.color = "var(--accent, #64ffda)";
                e.currentTarget.style.textShadow = "0 0 10px var(--accent, #64ffda)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.color = "var(--fg-muted, rgba(204,214,246,0.62))";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Vertical line below icons */}
        <div
          className="absolute left-1/2 top-full mt-6 h-screen w-px"
          style={{
            transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, var(--border, rgba(168,178,209,0.12)), transparent)",
          }}
        />
      </div>

      {/* Right Side: Email Navigation */}
      <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 md:flex md:items-center lg:right-8 xl:right-12">
        {/* Vertical line beside email */}
        <div
          className="absolute left-1/2 top-full mt-6 h-screen w-px"
          style={{
            transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, var(--border, rgba(168,178,209,0.12)), transparent)",
          }}
        />

        <a
          href={`mailto:${email}`}
          className="pointer-events-auto flex items-center justify-center text-[15px] font-light"
          style={{
            color: "var(--fg-muted, rgba(204,214,246,0.62))",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            letterSpacing: "0.15em",
            animation: "emailPulse 2.5s ease-in-out infinite",
            lineHeight: "1.2",
            whiteSpace: "nowrap",
          }}
          title={email}
        >

          <span
            style={{
              color: "var(--fg, #ccd6f6)",
              opacity: 0.8,
            }}
          >
            {email}
          </span>
        </a>
      </div>

      <style>{`@keyframes emailPulse { 0%, 100% {color: var(--fg-muted, rgba(204,214,246,0.62));text-shadow: 0 0 0px var(--accent, #64ffda);opacity: 0.7;} 50% {color: var(--fg, #ccd6f6);text-shadow: 0 0 8px var(--accent, #64ffda);opacity: 1; } }`}</style>
    </>
  );
}
