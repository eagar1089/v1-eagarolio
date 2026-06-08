import React, { useEffect, useId, useRef, useState } from "react";

type LogoProps = {
  size?: number;
  /** Hover: S morphs to SGR */
  interactive?: boolean;
  /** Page-load draw sequence (use on loader) */
  intro?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function Logo({
  size = 20,
  interactive = false,
  intro = false,
  className = "",
  style,
}: LogoProps) {
  const [hovered, setHovered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const leaveTimer = useRef<number | null>(null);
  const uid = useId().replace(/:/g, "");
  const frameGradId = `logo-frame-${uid}`;
  const monoGradId = `logo-mono-${uid}`;
  const glowId = `logo-glow-${uid}`;

  useEffect(() => {
    return () => {
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
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
    leaveTimer.current = window.setTimeout(() => setLeaving(false), 720);
  };

  const logoStateClass = [
    "logo-mark",
    intro ? "logo-intro" : "logo-ready",
    interactive ? "logo-interactive" : "",
    hovered ? "is-hovered" : "",
    leaving ? "is-leaving" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="Sagar Parab — SGR"
      className={[logoStateClass, className].filter(Boolean).join(" ")}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <title>Sagar Parab</title>
      <defs>
        <linearGradient id={frameGradId} x1="12%" y1="8%" x2="88%" y2="92%">
          <stop offset="0%" stopColor="var(--logo-grad-start)" />
          <stop offset="40%" stopColor="var(--logo-grad-mid)" />
          <stop offset="75%" stopColor="var(--logo-grad-violet)" />
          <stop offset="100%" stopColor="var(--logo-grad-end)" />
        </linearGradient>
        <linearGradient id={monoGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--logo-grad-start)" />
          <stop offset="50%" stopColor="var(--logo-core)" />
          <stop offset="100%" stopColor="var(--logo-letter)" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="48%" r="50%">
          <stop offset="0%" stopColor="var(--logo-grad-start)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--logo-grad-end)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glow */}
      <circle className="logo-glow" cx="50" cy="50" r="42" fill={`url(#${glowId})`} />

      {/* Hex frame */}
      <path
        className="logo-shell"
        d="M50 7 L79 21 L91 50 L79 79 L50 93 L21 79 L9 50 L21 21 Z"
        stroke={`url(#${frameGradId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Orbit ring — spins on hover */}
      <circle
        className="logo-orbit"
        cx="50"
        cy="50"
        r="34"
        stroke="var(--logo-core)"
        strokeWidth="1.2"
        strokeDasharray="8 14"
        fill="none"
        opacity="0.55"
      />

      {/* Corner nodes (dev / network motif) */}
      <g className="logo-nodes" stroke="var(--logo-core)" strokeWidth="2" strokeLinecap="round">
        <line x1="50" y1="18" x2="50" y2="24" />
        <line x1="50" y1="76" x2="50" y2="82" />
        <line x1="18" y1="50" x2="24" y2="50" />
        <line x1="76" y1="50" x2="82" y2="50" />
      </g>

      {/* Centered mark — S default, SGR on hover */}
      <g className="logo-center">
        <g className="logo-mono-s">
          <path
            className="logo-s-path"
            d="M64 33
               C64 26 57 22 50 22
               C39 22 33 28 33 36
               C33 42 39 46 50 48
               C60 50 67 54 67 62
               C67 72 59 78 49 78
               C39 78 33 72 33 64"
            stroke={`url(#${monoGradId})`}
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle className="logo-core-dot" cx="50" cy="50" r="3.5" fill="var(--logo-letter)" />
        </g>

        <g
          className="logo-sgr"
          fill={`url(#${monoGradId})`}
          fontFamily="var(--font-mono), IBM Plex Mono, monospace"
          fontWeight="700"
        >
          <text className="logo-sgr-s" x="36" y="52" fontSize="22" textAnchor="middle">
            S
          </text>
          <text className="logo-sgr-g" x="50" y="52" fontSize="22" textAnchor="middle">
            G
          </text>
          <text className="logo-sgr-r" x="64" y="52" fontSize="22" textAnchor="middle">
            R
          </text>
        </g>
      </g>
    </svg>
  );
}
