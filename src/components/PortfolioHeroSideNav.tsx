import { Github, Linkedin, Codepen, Mail } from "lucide-react";
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
      {/* Desktop logo */}
      <div className="fixed left-6 top-5 z-50 hidden md:block">
        <Logo />
      </div>

      {/* Desktop theme button */}
      <div className="fixed right-6 top-5 z-50 hidden md:block">
        <ThemeToggle />
      </div>

      {/* Desktop left social rail */}
      <aside className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-5 md:flex">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="text-slate-300 transition hover:-translate-y-1 hover:text-cyan-300"
          >
            <Icon width={21} height={21} />
          </a>
        ))}

        <div className="h-24 w-px bg-slate-400/40" />
      </aside>

      {/* Desktop right email rail */}
      <aside className="fixed bottom-0 right-6 z-40 hidden flex-col items-center gap-5 md:flex">
        <a
          href={`mailto:${email}`}
          className="vertical-rl text-xs tracking-[0.28em] text-slate-300 transition hover:-translate-y-1 hover:text-cyan-300"
          style={{ writingMode: "vertical-rl" }}
        >
          {email}
        </a>

        <div className="h-24 w-px bg-slate-400/40" />
      </aside>

      {/* Mobile bottom social bar */}
      <nav
        className="
          fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2
          rounded-full border border-white/10 bg-slate-950/75 px-3 py-2
          shadow-2xl shadow-black/30 backdrop-blur md:hidden
        "
        aria-label="Social links"
      >
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="grid h-10 w-10 place-items-center rounded-full text-slate-200 transition hover:bg-cyan-300/10 hover:text-cyan-300"
          >
            <Icon width={19} height={19} />
          </a>
        ))}

        <a
          href={`mailto:${email}`}
          aria-label="Email"
          className="grid h-10 w-10 place-items-center rounded-full text-slate-200 transition hover:bg-cyan-300/10 hover:text-cyan-300"
        >
          <Mail width={19} height={19} />
        </a>

        <div className="grid h-10 w-10 place-items-center">
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}