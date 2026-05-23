import { ThemeProvider, useTheme, type Theme } from "@/context/ThemeContext";

export { ThemeProvider, useTheme };
export type { Theme };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const opts: { key: Theme; label: string; icon: string }[] = [
    { key: "light", label: "Light", icon: "☀" },
    { key: "dark", label: "Dark", icon: "☾" },
    { key: "mono", label: "Mono", icon: "◐" },
  ];
  return (
    <div
      // className="glass inline-flex p-1 "
      role="radiogroup"
      aria-label="Theme"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {opts.map((o) => {
        const active = theme === o.key;
        return (
          <button
            key={o.key}
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(o.key)}
            className="px-3 py-1 text-xs rounded-full transition-all"
            style={{
              background: active ? "var(--gradient-accent)" : "transparent",
              color: active ? "var(--bg)" : "var(--fg-muted)",
              fontWeight: active ? 600 : 400,
            }}
            title={o.label}
          >
            <span className="mr-1">{o.icon}</span>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
