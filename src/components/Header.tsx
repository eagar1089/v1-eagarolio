import { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeProvider";

const NAV = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Experience", href: "#experience" },
  { num: "03", label: "Projects", href: "#projects" },
  { num: "04", label: "Contact", href: "#contact" },
];

export function Header({ revealed }: { revealed: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = useMemo(() => NAV, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (y / scrollable) * 100 : 0;

      setScrolled(y > 50);
      setScrollProgress(Math.max(0, Math.min(100, progress)));

      if (y > 100 && y > lastY) {
        setHidden(true);
      } else if (y < lastY) {
        setHidden(false);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const overlay = menuRef.current;
    const focusables = overlay?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
    );
    focusables?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" style={{ transform: hidden && !menuOpen ? "translateY(-104%)" : "translateY(0)" }}>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Top-left pinned logo: aligns with the left social rail */}
      <div className="pointer-events-none fixed left-6 top-4 z-50 hidden md:flex md:items-start lg:left-8 xl:left-12">
        <a
          href="#"
          aria-label="home"
          className="pointer-events-auto block transition-transform duration-700"
          style={{
            transform: revealed ? "scale(1)" : "scale(0)",
            opacity: revealed ? 1 : 0,
          }}
        >
          <Logo size={42} interactive />
        </a>
      </div>

      <div
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "var(--glass-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          borderBottom: scrolled ? "1px solid var(--glass-border)" : "1px solid transparent",
          height: scrolled ? "70px" : "100px",
          top: 4,
        }}
      >
      <nav className="h-full flex items-center justify-between px-6 md:px-12 max-w-400 mx-auto">
        {/* logo moved to a fixed top-left position to align with social rail */}
        <h1 className="sr-only">Sagar Parab - Software Engineer</h1>

        <ol className="hidden md:flex items-center gap-2">
          {navItems.map((item, i) => (
            <li
              key={item.label}
              className="nav-item"
              style={{
                animationDelay: revealed ? `${i * 0.1}s` : "0s",
                animationPlayState: revealed ? "running" : "paused",
                opacity: revealed ? undefined : 0,
              }}
            >
              <a href={item.href} className="nav-link">
                <span className="nav-num">{item.num}.</span>
                {item.label}
              </a>
            </li>
          ))}
          <li
            className="nav-item ml-2"
            style={{
              animationDelay: revealed ? `${NAV.length * 0.1}s` : "0s",
              animationPlayState: revealed ? "running" : "paused",
              opacity: revealed ? undefined : 0,
            }}
          >
          </li>
          <li className="nav-item ml-3" style={{   animationDelay: revealed ? `${(NAV.length + 1) * 0.1}s` : "0s",   animationPlayState: revealed ? "running" : "paused",   opacity: revealed ? undefined : 0, }}
          >
            <ThemeToggle />
          </li>
        </ol>

        <button
          aria-label="Menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col gap-1.5 z-50 w-10 h-10 items-center justify-center"
          style={{ opacity: revealed ? 1 : 0, transition: "opacity 0.5s ease" }}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
        >
          <span
            className="block w-6 h-0.5 transition-transform"
            style={{
              background: "var(--accent)",
              transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5"
            style={{ background: "var(--accent)", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 transition-transform"
            style={{
              background: "var(--accent)",
              transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none",
            }}
          />
        </button>
      </nav>
      </div>

      <div
        id="mobile-nav"
        ref={menuRef}
        className="mobile-menu md:hidden fixed inset-0 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          zIndex: 40,
        }}
      >
        <ol className="flex flex-col gap-8 text-center">
          {navItems.map((item, index) => (
            <li
              key={item.label}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 260ms ease ${index * 70}ms, transform 260ms ease ${index * 70}ms`,
              }}
            >
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="nav-link text-xl flex-col items-center gap-1"
              >
                <span className="nav-num text-sm">{item.num}.</span>
                {item.label}
              </a>
            </li>
          ))}
          <li
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 260ms ease ${navItems.length * 70}ms, transform 260ms ease ${navItems.length * 70}ms`,
            }}
          >
          </li>
          <li
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 260ms ease ${(navItems.length + 1) * 70}ms, transform 260ms ease ${(navItems.length + 1) * 70}ms`,
            }}
          >
            <ThemeToggle />
          </li>
        </ol>
      </div>
    </header>
  );
}
