import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, input, textarea, select, label, [role='button'], .hover-arrow, .nav-link, .glass-card-interactive";
const CARD_HOVER = ".glass-card-interactive, .project-card.is-focused, .project-card";

export function CursorRipple() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !rippleLayerRef.current) return;

    const cursor = cursorRef.current;
    const rippleLayer = rippleLayerRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
      document.documentElement.classList.add("has-custom-cursor");
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    const ease = reducedMotion ? 1 : 0.18;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target as HTMLElement;
      const interactive = target.closest(INTERACTIVE);
      const onCard = target.closest(CARD_HOVER);

      cursor.classList.toggle("is-hover", !!interactive);
      cursor.classList.toggle("is-card", !!onCard && !interactive);
      cursor.classList.toggle(
        "is-external",
        !!target.closest("a[target='_blank'], a[href^='http']")
      );
    };

    const tick = () => {
      curX += (mouseX - curX) * ease;
      curY += (mouseY - curY) * ease;
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const createRipple = (x: number, y: number) => {
      const r = document.createElement("span");
      r.className = "cursor-ripple-burst";
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      rippleLayer.appendChild(r);
      r.addEventListener("animationend", () => r.remove());
    };

    const clickAt = (x: number, y: number) => {
      cursor.classList.add("is-click");
      window.setTimeout(() => cursor.classList.remove("is-click"), 140);
      if (!reducedMotion) createRipple(x, y);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      clickAt(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id="cursor-ripple" aria-hidden>
        <div className="cursor-dot" />
        <div className="cursor-ring" />
      </div>
      <div ref={rippleLayerRef} id="ripple-layer" aria-hidden />
    </>
  );
}
