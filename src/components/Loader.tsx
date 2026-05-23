import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Loader({ onFinish }: { onFinish: () => void }) {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
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

  return (
    <div
      aria-hidden={hidden}
      style={{
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
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <div className="logo-wrapper">
        <Logo size={120} />
      </div>
    </div>
  );
}
