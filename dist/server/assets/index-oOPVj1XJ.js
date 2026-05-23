import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-De19GAfq.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Logo({ size = 84, interactive = false }) {
  const [hovered, setHovered] = reactExports.useState(false);
  const [leaving, setLeaving] = reactExports.useState(false);
  const leaveTimer = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
      if (leaveTimer.current) {
        window.clearTimeout(leaveTimer.current);
      }
    };
  }, []);
  const handleMouseEnter = () => {
    if (!interactive) return;
    if (leaveTimer.current) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setLeaving(false);
    setHovered(true);
  };
  const handleMouseLeave = () => {
    if (!interactive) return;
    setHovered(false);
    setLeaving(true);
    leaveTimer.current = window.setTimeout(() => {
      setLeaving(false);
    }, 900);
  };
  const logoStateClass = [
    "logo-mark",
    interactive ? "logo-interactive" : "",
    hovered ? "is-hovered" : "",
    leaving ? "is-leaving" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 84 96",
      fill: "none",
      className: logoStateClass,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Sagar Parab Logo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "logoGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--accent)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--accent-2)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(-8.000000, -2.000000)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              className: "logo-shell",
              d: "M50,5 L75,12 L87,26 L87,68 L75,82 L50,89 L25,82 L13,68 L13,26 L25,12 Z",
              stroke: "url(#logoGrad)",
              strokeWidth: "5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("g", { className: "logo-core-lines", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M50,28 L50,66 M37,40 L63,54 M63,40 L37,54",
              stroke: "var(--accent)",
              strokeWidth: "2",
              strokeLinecap: "round",
              fill: "none",
              opacity: "0.75"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              className: "logo-core-s",
              x: "50",
              y: "55",
              textAnchor: "middle",
              fontFamily: "SF Mono, monospace",
              fontSize: "28",
              fontWeight: "700",
              fill: "var(--accent)",
              children: "S"
            }
          )
        ] })
      ]
    }
  );
}
function Loader({ onFinish }) {
  const [fading, setFading] = reactExports.useState(false);
  const [hidden, setHidden] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2200);
    const t2 = setTimeout(() => {
      setHidden(true);
      onFinish();
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": hidden,
      style: {
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        backgroundImage: "var(--gradient-hero)",
        zIndex: hidden ? -1 : 100,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease, z-index 0s linear 0.5s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: hidden ? "none" : "auto"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logo-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 120 }) })
    }
  );
}
const STORAGE_KEY = "theme";
const ThemeContext = reactExports.createContext(null);
function isTheme(value) {
  return value === "light" || value === "dark" || value === "mono";
}
function ThemeProvider({ children }) {
  const [theme, setTheme] = reactExports.useState("dark");
  reactExports.useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (isTheme(saved)) {
      setTheme(saved);
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);
  reactExports.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
    }
  }, [theme]);
  const value = reactExports.useMemo(() => {
    const cycleOrder = ["dark", "light", "mono"];
    return {
      theme,
      setTheme,
      cycleTheme: () => {
        const idx = cycleOrder.indexOf(theme);
        const next = cycleOrder[(idx + 1) % cycleOrder.length];
        setTheme(next);
      }
    };
  }, [theme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const context = reactExports.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const opts = [
    { key: "light", label: "Light", icon: "☀" },
    { key: "dark", label: "Dark", icon: "☾" },
    { key: "mono", label: "Mono", icon: "◐" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "glass inline-flex p-1 rounded-full",
      role: "radiogroup",
      "aria-label": "Theme",
      style: { fontFamily: "var(--font-mono)" },
      children: opts.map((o) => {
        const active = theme === o.key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            role: "radio",
            "aria-checked": active,
            onClick: () => setTheme(o.key),
            className: "px-3 py-1 text-xs rounded-full transition-all",
            style: {
              background: active ? "var(--gradient-accent)" : "transparent",
              color: active ? "var(--bg)" : "var(--fg-muted)",
              fontWeight: active ? 600 : 400
            },
            title: o.label,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: o.icon }),
              o.label
            ]
          },
          o.key
        );
      })
    }
  );
}
const NAV = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Experience", href: "#experience" },
  { num: "03", label: "Projects", href: "#projects" },
  { num: "04", label: "Contact", href: "#contact" }
];
function Header({ revealed }) {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const [hidden, setHidden] = reactExports.useState(false);
  const [scrollProgress, setScrollProgress] = reactExports.useState(0);
  const menuRef = reactExports.useRef(null);
  const navItems = reactExports.useMemo(() => NAV, []);
  reactExports.useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? y / scrollable * 100 : 0;
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
  reactExports.useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const overlay = menuRef.current;
    const focusables = overlay?.querySelectorAll(
      "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
    );
    focusables?.[0]?.focus();
    const onKeyDown = (event) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "site-header", style: { transform: hidden && !menuOpen ? "translateY(-104%)" : "translateY(0)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scroll-progress", style: { width: `${scrollProgress}%` } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        style: {
          background: scrolled ? "var(--glass-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          borderBottom: scrolled ? "1px solid var(--glass-border)" : "1px solid transparent",
          height: scrolled ? "70px" : "100px",
          top: 4
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "h-full flex items-center justify-between px-6 md:px-12 max-w-400 mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#",
              "aria-label": "home",
              className: "block transition-transform duration-700",
              style: {
                transform: revealed ? "scale(1)" : "scale(0)",
                opacity: revealed ? 1 : 0
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 42, interactive: true })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "hidden md:flex items-center gap-2", children: [
            navItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: "nav-item",
                style: {
                  animationDelay: revealed ? `${i * 0.1}s` : "0s",
                  animationPlayState: revealed ? "running" : "paused",
                  opacity: revealed ? void 0 : 0
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: item.href,
                    className: "px-3 py-2 text-sm transition-colors",
                    style: { fontFamily: "var(--font-mono)", color: "var(--heading)" },
                    onMouseEnter: (e) => e.currentTarget.style.color = "var(--accent)",
                    onMouseLeave: (e) => e.currentTarget.style.color = "var(--heading)",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--accent)" }, className: "mr-1", children: [
                        item.num,
                        "."
                      ] }),
                      item.label
                    ]
                  }
                )
              },
              item.label
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: "nav-item ml-2",
                style: {
                  animationDelay: revealed ? `${NAV.length * 0.1}s` : "0s",
                  animationPlayState: revealed ? "running" : "paused",
                  opacity: revealed ? void 0 : 0
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/resume-sagar-parab.pdf",
                    target: "_blank",
                    rel: "noreferrer",
                    className: "px-4 py-2 rounded text-sm transition-all",
                    style: {
                      fontFamily: "var(--font-mono)",
                      border: "1px solid var(--accent)",
                      color: "var(--accent)"
                    },
                    children: "Resume"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: "nav-item ml-3",
                style: {
                  animationDelay: revealed ? `${(NAV.length + 1) * 0.1}s` : "0s",
                  animationPlayState: revealed ? "running" : "paused",
                  opacity: revealed ? void 0 : 0
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              "aria-label": "Menu",
              onClick: () => setMenuOpen((prev) => !prev),
              className: "md:hidden flex flex-col gap-1.5 z-50 w-10 h-10 items-center justify-center",
              style: { opacity: revealed ? 1 : 0, transition: "opacity 0.5s ease" },
              "aria-expanded": menuOpen,
              "aria-controls": "mobile-nav",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block w-6 h-0.5 transition-transform",
                    style: {
                      background: "var(--accent)",
                      transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block w-6 h-0.5",
                    style: { background: "var(--accent)", opacity: menuOpen ? 0 : 1 }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block w-6 h-0.5 transition-transform",
                    style: {
                      background: "var(--accent)",
                      transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none"
                    }
                  }
                )
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        id: "mobile-nav",
        ref: menuRef,
        className: "mobile-menu md:hidden fixed inset-0 flex items-center justify-center",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Mobile navigation",
        style: {
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          zIndex: 40
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "flex flex-col gap-8 text-center", children: [
          navItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "li",
            {
              style: {
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 260ms ease ${index * 70}ms, transform 260ms ease ${index * 70}ms`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: item.href,
                  onClick: () => setMenuOpen(false),
                  className: "text-xl",
                  style: { fontFamily: "var(--font-mono)", color: "var(--heading)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "var(--accent)" }, className: "text-sm mb-1", children: [
                      item.num,
                      "."
                    ] }),
                    item.label
                  ]
                }
              )
            },
            item.label
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "li",
            {
              style: {
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 260ms ease ${navItems.length * 70}ms, transform 260ms ease ${navItems.length * 70}ms`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/resume-sagar-parab.pdf",
                  target: "_blank",
                  rel: "noreferrer",
                  className: "inline-block px-6 py-3 rounded",
                  style: {
                    fontFamily: "var(--font-mono)",
                    border: "1px solid var(--accent)",
                    color: "var(--accent)"
                  },
                  children: "Resume"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "li",
            {
              style: {
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 260ms ease ${(navItems.length + 1) * 70}ms, transform 260ms ease ${(navItems.length + 1) * 70}ms`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
            }
          )
        ] })
      }
    )
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "min-h-screen flex flex-col justify-center max-w-250 mx-auto px-6 md:px-12 pt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "hero-line d1 mb-5",
        style: { color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "clamp(14px,5vw,16px)" },
        children: "Hi, my name is"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h1",
      {
        className: "hero-line d2 font-bold leading-[1.1]",
        style: { fontSize: "clamp(40px,8vw,80px)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glitch-text gradient-text", "data-text": "Sagar Parab.", children: "Sagar Parab." })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        className: "hero-line d3 font-bold leading-[1.1] mt-2",
        style: { color: "var(--fg-muted)", fontSize: "clamp(32px,8vw,70px)" },
        children: "I build resilient infrastructure."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "hero-line d4 mt-6 max-w-xl leading-relaxed", style: { color: "var(--fg-muted)" }, children: [
      "I'm a Linux Administrator and DevOps Engineer specializing in automating infrastructure, building scalable CI/CD pipelines, and crafting full-stack applications. Currently shaping reliable systems at",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://justdial.com", target: "_blank", rel: "noreferrer", className: "inline-link", children: "Justdial" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-line d5 mt-12 flex gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "#projects",
          className: "px-7 py-4 rounded transition-all hover:opacity-90",
          style: {
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            background: "var(--gradient-accent)",
            color: "var(--bg)",
            fontWeight: 600,
            boxShadow: "var(--shadow-soft)"
          },
          children: "Check out my work!"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/resume-sagar-parab.pdf",
          target: "_blank",
          rel: "noreferrer",
          className: "px-7 py-4 rounded transition-all glass",
          style: {
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            color: "var(--accent)"
          },
          children: "View Resume"
        }
      )
    ] })
  ] });
}
function Reveal({ children, className = "" }) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: `reveal ${visible ? "visible" : ""} ${className}`, children });
}
const CACHE_KEY = "now-card-cache-v1";
const TTL_MS = 60 * 60 * 1e3;
const FALLBACK = {
  updatedAt: "",
  currentlyLearning: "Karpenter & Kyverno",
  reading: "Designing Data-Intensive Applications",
  building: "A portfolio with cinematic interactions"
};
function NowCard() {
  const [data, setData] = reactExports.useState(FALLBACK);
  reactExports.useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < TTL_MS) {
            if (!ignore) setData(parsed.data);
            return;
          }
        }
      } catch {
      }
      try {
        const response = await fetch("/now.json", { cache: "no-store" });
        if (!response.ok) throw new Error("Unable to fetch now.json");
        const json = await response.json();
        if (!ignore) {
          setData(json);
          localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: json }));
        }
      } catch {
        if (!ignore) setData(FALLBACK);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "now-card glass", "aria-label": "Current status", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Now" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "📚" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Currently learning: ",
          data.currentlyLearning
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "📖" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Reading: ",
          data.reading
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "🛠️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Building: ",
          data.building
        ] })
      ] })
    ] }),
    data.updatedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "now-updated", children: [
      "Updated: ",
      new Date(data.updatedAt).toLocaleDateString()
    ] })
  ] });
}
const SKILLS = ["Linux", "Bash / Python", "AWS", "Docker", "Kubernetes", "CI/CD", "React / Node"];
const MILESTONES = ["Linux", "Scripting", "AWS", "Docker", "K8s"];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "py-24 max-w-225 mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "numbered-heading", "data-num": "01", children: "About Me" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[3fr_2fr] gap-12 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 leading-relaxed", style: { color: "var(--fg-muted)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hello! I'm Sagar, an engineer who finds joy in keeping servers humming and turning manual toil into elegant automation. My journey started the first time I opened a terminal — and I haven't stopped tinkering since." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "I worked as a Linux Administrator at Justdial where I automate deployments, harden infrastructure, and build internal tools. On the side, I love shipping full-stack applications that bridge IoT, the cloud, and the people who use them." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--heading)" }, children: "My journey so far:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap gap-x-3 gap-y-2 mt-2", children: MILESTONES.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-center gap-3 text-sm transition-colors",
            style: { fontFamily: "var(--font-mono)", color: "var(--fg)" },
            onMouseEnter: (e) => e.currentTarget.style.color = "var(--accent)",
            onMouseLeave: (e) => e.currentTarget.style.color = "var(--fg)",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m }),
              i < MILESTONES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--accent)" }, children: "→" })
            ]
          },
          m
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6", children: "Technologies I work with:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            className: "grid grid-cols-2 gap-2 mt-2 text-sm",
            style: { fontFamily: "var(--font-mono)" },
            children: SKILLS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", style: { color: "var(--fg)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--accent)" }, children: "▹" }),
              s
            ] }, s))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group max-w-75 mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-xl overflow-hidden glass", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "aspect-square",
            style: { background: "var(--gradient-accent)", opacity: 0.85 }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-xl translate-x-4 translate-y-4 transition-transform group-hover:translate-x-3 group-hover:translate-y-3",
            style: { border: "2px solid var(--accent)", zIndex: -1 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NowCard, {}) })
      ] })
    ] })
  ] }) });
}
const TIMELINE_STEPS = [
  { year: "2022", title: "Onboarding", summary: "Joined infra team and standardized Linux hardening baselines." },
  { year: "2023", title: "AWS Migration", summary: "Lifted workloads to AWS with guardrails and observability." },
  { year: "2024", title: "Kubernetes", summary: "Containerized services and rolled out resilient K8s deployments." },
  { year: "2025", title: "Platform CI/CD", summary: "Built reusable pipelines and release automation across teams." }
];
function Experience() {
  const [activeIndex, setActiveIndex] = reactExports.useState(-1);
  const [beamProgress, setBeamProgress] = reactExports.useState(0);
  const [triggered, setTriggered] = reactExports.useState(false);
  const [parallax, setParallax] = reactExports.useState(0);
  const [isExpanded, setIsExpanded] = reactExports.useState(true);
  const [isMobile, setIsMobile] = reactExports.useState(false);
  const sectionRef = reactExports.useRef(null);
  const trackRef = reactExports.useRef(null);
  const stepWidthPercent = reactExports.useMemo(() => 100 / Math.max(TIMELINE_STEPS.length - 1, 1), []);
  reactExports.useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const apply = () => {
      const mobile = media.matches;
      setIsMobile(mobile);
      setIsExpanded((prev) => {
        if (!mobile) return true;
        return prev;
      });
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  reactExports.useEffect(() => {
    if (triggered || !isExpanded) return;
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isExpanded, triggered]);
  reactExports.useEffect(() => {
    if (!triggered || !isExpanded) return;
    let step = 0;
    setActiveIndex(0);
    setBeamProgress(0);
    const interval = window.setInterval(() => {
      step += 1;
      setActiveIndex(step);
      setBeamProgress(Math.min(step * stepWidthPercent, 100));
      if (step >= TIMELINE_STEPS.length - 1) {
        window.clearInterval(interval);
      }
    }, 500);
    return () => window.clearInterval(interval);
  }, [isExpanded, stepWidthPercent, triggered]);
  reactExports.useEffect(() => {
    const scroller = trackRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      const ratio = max > 0 ? scroller.scrollLeft / max : 0;
      setParallax(ratio * 28);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);
  const beamStyle = isMobile ? { height: `${beamProgress}%`, width: "2px" } : { width: `${beamProgress}%` };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "experience", ref: sectionRef, className: "py-24 max-w-280 mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "htl-title-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "numbered-heading", "data-num": "02", children: "Experience Timeline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "htl-toggle",
          onClick: () => setIsExpanded((prev) => !prev),
          "aria-expanded": isExpanded,
          "aria-controls": "experience-timeline-content",
          children: isExpanded ? "Minimize" : "Expand"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "htl-shell glass", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        id: "experience-timeline-content",
        className: `htl-collapsible ${isExpanded ? "open" : "closed"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "htl-track", ref: trackRef, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "htl-line", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "htl-beam", "aria-hidden": "true", style: beamStyle }),
          TIMELINE_STEPS.map((step, index) => {
            const active = index <= activeIndex;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "article",
              {
                className: `htl-step ${active ? "active" : ""} ${triggered ? "entered" : ""}`,
                style: {
                  transform: `translateY(${active ? 0 : 14}px) translateX(${isMobile ? 0 : parallax * (index / TIMELINE_STEPS.length)}px)`,
                  transitionDelay: `${index * 110}ms`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "htl-dot", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "htl-year", children: step.year }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: step.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: step.summary })
                ]
              },
              `${step.year}-${step.title}`
            );
          })
        ] })
      }
    ) })
  ] }) });
}
const SKILL_CELLS = [
  { key: "linux", icon: "🐧", label: "Linux" },
  { key: "docker", icon: "🐳", label: "Docker" },
  { key: "k8s", icon: "☸️", label: "Kubernetes" },
  { key: "aws", icon: "☁️", label: "AWS" },
  { key: "core", icon: "◉", label: "CYBERSPACE CORE", center: true },
  { key: "python", icon: "🐍", label: "Python" },
  { key: "react", icon: "⚛️", label: "React" },
  { key: "jenkins", icon: "🧩", label: "Jenkins" },
  { key: "terraform", icon: "🛰️", label: "Terraform" }
];
function ParticleCore() {
  const canvasRef = reactExports.useRef(null);
  const { theme } = useTheme();
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const particles = Array.from({ length: 36 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 22 + Math.random() * 36,
      speed: 2e-3 + Math.random() * 5e-3,
      size: 1 + Math.random() * 2.2,
      offset: Math.random() * 1e3
    }));
    const parseColor = (value, alpha) => {
      const raw = value.trim();
      if (raw.startsWith("#")) {
        const hex = raw.length === 4 ? raw.slice(1).split("").map((h) => h + h).join("") : raw.slice(1);
        const num = Number.parseInt(hex, 16);
        const r = num >> 16 & 255;
        const g = num >> 8 & 255;
        const b = num & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      return `color-mix(in srgb, ${raw} ${Math.round(alpha * 100)}%, transparent)`;
    };
    let raf = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (time) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#64ffda";
      ctx.clearRect(0, 0, w, h);
      const pulse = (Math.sin(time * 3e-3) + 1) / 2;
      const coreRadius = 14 + pulse * 8;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 66);
      glow.addColorStop(0, parseColor(accent, 0.55));
      glow.addColorStop(0.7, parseColor(accent, 0.2));
      glow.addColorStop(1, parseColor(accent, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 66, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = parseColor(accent, 0.92);
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();
      particles.forEach((particle) => {
        const angle = particle.angle + time * particle.speed;
        const dynamicRadius = particle.radius + Math.sin(time * 2e-3 + particle.offset) * 4;
        const px = cx + Math.cos(angle) * dynamicRadius;
        const py = cy + Math.sin(angle) * dynamicRadius;
        ctx.strokeStyle = parseColor(accent, 0.2);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.fillStyle = parseColor(accent, 0.85);
        ctx.beginPath();
        ctx.arc(px, py, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = window.requestAnimationFrame(draw);
    };
    resize();
    raf = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { className: "skills-core-canvas", ref: canvasRef, "aria-hidden": "true" });
}
function Skills() {
  const onMoveCard = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "skills", className: "py-24 max-w-280 mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "numbered-heading", "data-num": "03", children: "Skills Matrix" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skills-bento-grid", children: SKILL_CELLS.map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: `skills-cell glass ${cell.center ? "skills-cell-core" : ""}`,
        onMouseMove: onMoveCard,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skills-cell-glow", "aria-hidden": "true" }),
          cell.center ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skills-core-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleCore, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: cell.label })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skills-icon", "aria-hidden": "true", children: cell.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: cell.label })
          ] })
        ]
      },
      cell.key
    )) })
  ] }) });
}
const MODULES = [
  {
    title: "Certifications",
    summary: "AWS + Kubernetes path",
    details: "AWS Solution Architecture prep, Kubernetes security hardening, and production incident drills."
  },
  {
    title: "Key Projects",
    summary: "Platform reliability builds",
    details: "Automated release checks, infra observability dashboards, and cost-aware autoscaling strategy."
  },
  {
    title: "Leadership",
    summary: "Cross-team enablement",
    details: "Mentoring peers on Linux internals, Docker workflows, and SRE runbooks for faster recovery."
  }
];
function Resume3D() {
  const sectionRef = reactExports.useRef(null);
  const canvasWrapRef = reactExports.useRef(null);
  const [inView, setInView] = reactExports.useState(false);
  const [expanded, setExpanded] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  reactExports.useEffect(() => {
    if (!inView || !canvasWrapRef.current) return;
    let raf = 0;
    let renderer;
    let stop = false;
    const init = async () => {
      const THREE = await import("./three.module-KP1l_9FU.js");
      if (stop || !canvasWrapRef.current) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 5.5);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      canvasWrapRef.current.innerHTML = "";
      canvasWrapRef.current.appendChild(renderer.domElement);
      const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 180, 32);
      const color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#64ffda";
      const material = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.25,
        metalness: 0.68,
        transmission: 0.05
      });
      const knot = new THREE.Mesh(geometry, material);
      scene.add(knot);
      const lightA = new THREE.PointLight(16777215, 1.2, 30);
      lightA.position.set(4, 4, 5);
      scene.add(lightA);
      const lightB = new THREE.PointLight(16777215, 0.8, 30);
      lightB.position.set(-4, -3, 2);
      scene.add(lightB);
      const resize = () => {
        if (!canvasWrapRef.current || !renderer) return;
        const rect = canvasWrapRef.current.getBoundingClientRect();
        const size = Math.min(rect.width, 420);
        renderer.setSize(size, size, false);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      };
      const onMove = (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 0.7;
        const y = (event.clientY / window.innerHeight - 0.5) * 0.7;
        knot.rotation.y = x;
        knot.rotation.x = y;
      };
      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", onMove, { passive: true });
      const tick = () => {
        const scrollFactor = Math.min(window.scrollY / 1200, 1);
        knot.rotation.z += 8e-3 + scrollFactor * 3e-3;
        knot.rotation.y += 4e-3;
        renderer.render(scene, camera);
        raf = window.requestAnimationFrame(tick);
      };
      tick();
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMove);
      };
    };
    let cleanup;
    init().then((fn) => {
      cleanup = fn;
    });
    return () => {
      stop = true;
      if (raf) window.cancelAnimationFrame(raf);
      cleanup?.();
      renderer?.dispose?.();
      if (canvasWrapRef.current) {
        canvasWrapRef.current.innerHTML = "";
      }
    };
  }, [inView]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "resume", ref: sectionRef, className: "py-24 max-w-280 mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "numbered-heading", "data-num": "04", children: "Interactive Resume" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resume-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resume-3d glass", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: canvasWrapRef, className: "resume-3d-canvas", "aria-label": "3D timeline visualization" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Rotate by moving the cursor. Scroll subtly changes motion speed for a cinematic feel." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "resume-modules", children: MODULES.map((module, index) => {
        const open = expanded === index;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: `resume-module glass ${open ? "open" : ""}`,
            onClick: () => setExpanded(open ? null : index),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resume-module-head", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: module.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: open ? "−" : "+" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "resume-module-summary", children: module.summary }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "resume-module-details", "aria-hidden": !open, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: module.details }) })
            ]
          },
          module.title
        );
      }) })
    ] })
  ] }) });
}
const PROJECTS = [
  {
    title: "IoT Production Tracker",
    description: "Real-time production line monitoring system that ingests sensor data, surfaces anomalies, and renders live dashboards for plant operators.",
    tech: ["Node.js", "MQTT", "InfluxDB", "React", "Grafana"],
    github: "https://github.com/isgr9801",
    live: "#"
  },
  {
    title: "Digital MemoryJar",
    description: "A heartfelt full-stack app where families collaboratively capture memories — text, photos, voice notes — into a shared digital jar.",
    tech: ["React", "Express", "MongoDB", "AWS S3"],
    github: "https://github.com/isgr9801",
    live: "#"
  },
  {
    title: "K8s Local Deployment",
    description: "Reproducible local Kubernetes lab using Minikube and Helm to spin up multi-service applications with one command for rapid prototyping.",
    tech: ["Kubernetes", "Helm", "Docker", "Bash"],
    github: "https://github.com/isgr9801",
    live: "#"
  }
];
const FolderIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "40", height: "40", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1", style: { color: "var(--accent)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" }) });
const ExternalIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "15 3 21 3 21 9" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "10", y1: "14", x2: "21", y2: "3" })
] });
const GithubIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" }) });
function Projects() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "projects", className: "py-24 max-w-[1000px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "numbered-heading", "data-num": "03", children: "Some Things I've Built" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: PROJECTS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project-card glass p-6 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FolderIcon, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", style: { color: "var(--fg)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: p.github,
              target: "_blank",
              rel: "noreferrer",
              "aria-label": "GitHub",
              onMouseEnter: (e) => e.currentTarget.style.color = "var(--accent)",
              onMouseLeave: (e) => e.currentTarget.style.color = "var(--fg)",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(GithubIcon, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: p.live,
              "aria-label": "Case Study",
              onMouseEnter: (e) => e.currentTarget.style.color = "var(--accent)",
              onMouseLeave: (e) => e.currentTarget.style.color = "var(--fg)",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalIcon, {})
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "text-xl font-semibold mb-3 transition-colors",
          style: { color: "var(--heading)" },
          onMouseEnter: (e) => e.currentTarget.style.color = "var(--accent)",
          onMouseLeave: (e) => e.currentTarget.style.color = "var(--heading)",
          children: p.title
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed flex-grow", style: { color: "var(--fg-muted)" }, children: p.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "ul",
        {
          className: "flex flex-wrap gap-x-3 gap-y-1 mt-6 text-xs",
          style: { fontFamily: "var(--font-mono)", color: "var(--fg-muted)" },
          children: p.tech.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t }, t))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: p.github,
            target: "_blank",
            rel: "noreferrer",
            className: "text-xs px-3 py-1.5 rounded transition-all",
            style: {
              fontFamily: "var(--font-mono)",
              background: "var(--gradient-accent)",
              color: "var(--bg)",
              fontWeight: 600
            },
            children: "GitHub"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: p.live,
            className: "text-xs px-3 py-1.5 rounded transition-all",
            style: {
              fontFamily: "var(--font-mono)",
              border: "1px solid var(--accent)",
              color: "var(--accent)"
            },
            children: "Case Study"
          }
        )
      ] })
    ] }, p.title)) })
  ] }) });
}
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "py-24 max-w-150 mx-auto px-6 md:px-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", style: { color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "16px" }, children: "04. What's Next?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold gradient-text", children: "Get In Touch" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 leading-relaxed", style: { color: "var(--fg-muted)" }, children: "I'm always open to discussing infrastructure challenges, automation opportunities, or interesting full-stack projects. Whether you have a question or just want to say hi, my inbox is open — I'll get back to you!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: "mailto:sgrp9801@gmail.com",
        className: "inline-block mt-10 px-8 py-4 rounded transition-all hover:opacity-90",
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: "14px",
          background: "var(--gradient-accent)",
          color: "var(--bg)",
          fontWeight: 600,
          boxShadow: "var(--shadow-soft)"
        },
        children: "Say Hello"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mt-16 flex justify-center gap-6",
        style: { fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--fg-muted)" },
        children: [
          { l: "GitHub", h: "https://github.com/isgr9801" },
          { l: "LinkedIn", h: "https://linkedin.com/in/sagar-parab1089" },
          { l: "sgrp9801@gmail.com", h: "mailto:sgrp9801@gmail.com" }
        ].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: x.h,
            target: "_blank",
            rel: "noreferrer",
            onMouseEnter: (e) => e.currentTarget.style.color = "var(--accent)",
            onMouseLeave: (e) => e.currentTarget.style.color = "var(--fg-muted)",
            children: x.l
          },
          x.l
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 text-xs", style: { fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }, children: "Built by Sagar Parab" })
  ] }) });
}
function Index() {
  const [loaded, setLoaded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#content", className: "sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-200 focus:bg-accent focus:text-(--navy) focus:px-4 focus:py-2 focus:rounded", children: "Skip to Content" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { onFinish: () => setLoaded(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { revealed: loaded }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { id: "content", style: {
      filter: loaded ? "blur(0px)" : "blur(6px)",
      transition: "filter 0.4s ease"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Experience, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skills, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Resume3D, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {})
    ] })
  ] });
}
export {
  Index as component
};
