import React, { useEffect, useRef, useState } from "react";

export function Logo({ size = 20, interactive = false, className = "", style, }: { size?: number; interactive?: boolean; className?: string; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const leaveTimer = useRef<number | null>(null);

  useEffect(() => {
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
    leaving ? "is-leaving" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 84 96"
      fill="none"
      className={[logoStateClass, className].filter(Boolean).join(" ")}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <title>Sagar Parab Logo</title>
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <g transform="translate(-8.000000, -2.000000)">
        <path
          className="logo-shell"
          d="M50,5 L75,12 L87,26 L87,68 L75,82 L50,89 L25,82 L13,68 L13,26 L25,12 Z"
          stroke="url(#logoGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <g className="logo-core-lines">
          <path
            d="M50,28 L50,66 M37,40 L63,54 M63,40 L37,54"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
        </g>
        <text
          className="logo-core-s"
          x="50"
          y="55"
          textAnchor="middle"
          fontFamily="SF Mono, monospace"
          fontSize="28"
          fontWeight="700"
          fill="var(--accent)"
        >
          S
        </text>
      </g>
    </svg>
  );
}
