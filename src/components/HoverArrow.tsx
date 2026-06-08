type HoverArrowProps = {
  className?: string;
  size?: number;
};

/** Diagonal arrow (↗) — slides on parent `.hover-arrow` hover */
export function HoverArrow({ className = "", size = 14 }: HoverArrowProps) {
  return (
    <svg
      className={`hover-arrow-icon shrink-0 ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
