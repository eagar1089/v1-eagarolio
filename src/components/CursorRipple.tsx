import { useEffect, useRef } from 'react';

export function CursorRipple() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !rippleLayerRef.current) return;

    const cursor = cursorRef.current;
    const core = cursor.querySelector('.cursor-core') as HTMLElement;
    const ring = cursor.querySelector('.cursor-ring') as HTMLElement;
    const rippleLayer = rippleLayerRef.current;

    // smooth position via lerp
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    const ease = 0.28; // increased for faster response

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    window.addEventListener('mousemove', onMouseMove);

    function raf() {
      curX += (mouseX - curX) * ease;
      curY += (mouseY - curY) * ease;
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // hover / interactive detection
    const hoverables = ['a', 'button', 'input', 'textarea', 'label', '[role="button"]'];
    function checkHover(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest(hoverables.join(','));
      if (el) {
        cursor.classList.add('hover');
      } else {
        cursor.classList.remove('hover');
      }
    }
    window.addEventListener('mousemove', checkHover, { passive: true });

    // click ripple
    function createRipple(x: number, y: number, type: string = 'neutral') {
      const r = document.createElement('span');
      r.className = 'ripple ' + type;
      r.style.left = x + 'px';
      r.style.top = y + 'px';
      rippleLayer.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
    }

    // normalize click types
    function clickAt(x: number, y: number) {
      cursor.classList.add('click');
      setTimeout(() => cursor.classList.remove('click'), 160);
      createRipple(x, y, 'neutral');
    }

    // success / error with color variants and temporary ring tint
    function showSuccessAt(x: number, y: number) {
      createRipple(x, y, 'success');
      cursor.classList.add('success');
      setTimeout(() => cursor.classList.remove('success'), 750);
    }

    function showErrorAt(x: number, y: number) {
      createRipple(x, y, 'error');
      cursor.classList.add('error');
      setTimeout(() => cursor.classList.remove('error'), 750);
    }

    // global click listener (left button)
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      clickAt(e.clientX, e.clientY);
    };
    window.addEventListener('pointerdown', handlePointerDown);

    // accessibility: keyboard triggers on focused elements
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const el = document.activeElement as HTMLElement;
        const rect = el && el.getBoundingClientRect && el.getBoundingClientRect();
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
        clickAt(x, y);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // optional utility to trigger programmatic success/error
    (window as any).cursorUI = {
      clickAt: (x: number, y: number) => clickAt(x, y),
      successAt: (x: number, y: number) => showSuccessAt(x, y),
      errorAt: (x: number, y: number) => showErrorAt(x, y),
    };

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --cursor-size: 12px;
          --ring-size: 36px;
          --accent: #0f766e;
          --bg: #0b1220;
          --muted: #94a3b8;
          --ripple-neutral: rgba(255,255,255,0.12);
          --ripple-success: rgba(34,197,94,0.18);
          --ripple-error: rgba(239,68,68,0.18);
          --glass: rgba(255,255,255,0.04);
          --transition: 300ms cubic-bezier(.2,.8,.2,1);
        }

        /* Hide native cursor globally */
        html {
          cursor: none;
        }

        /* Cursor base */
        #cursor-ripple {
          position: fixed;
          left: 0;
          top: 0;
          pointer-events: none;
          z-index: 9999;
          transform: translate3d(-50%, -50%, 0);
          will-change: transform;
        }

        .cursor-core {
          width: var(--cursor-size);
          height: var(--cursor-size);
          background: linear-gradient(180deg, #ffffff, #dfefff);
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(7,15,30,0.6), inset 0 1px 0 rgba(255,255,255,0.6);
          transform: translate3d(-50%, -50%, 0);
          position: relative;
          left: 50%;
          top: 50%;
          transition: transform 140ms linear, background var(--transition);
          mix-blend-mode: screen;
        }

        /* ring that scales on hover / click */
        .cursor-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--ring-size);
          height: var(--ring-size);
          transform: translate3d(-50%, -50%, 0) scale(1);
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 4px 30px rgba(2,8,20,0.6);
          transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
          pointer-events: none;
          backdrop-filter: blur(6px);
          background: transparent;
        }

        /* hover state for interactive items (JS toggles .hover) */
        #cursor-ripple.hover .cursor-core {
          transform: translate3d(-50%, -50%, 0) scale(0.9);
          background: linear-gradient(180deg, #e6fff6, #bff5ea);
        }

        #cursor-ripple.hover .cursor-ring {
          transform: translate3d(-50%, -50%, 0) scale(1.6);
          border-color: rgba(111,207,190,0.9);
          box-shadow: 0 8px 30px rgba(16,99,83,0.18);
        }

        /* click feedback small shrink */
        #cursor-ripple.click .cursor-core {
          transform: translate3d(-50%, -50%, 0) scale(0.8);
          transition: transform 120ms cubic-bezier(.2,.7,0,1);
        }

        #cursor-ripple.click .cursor-ring {
          transform: translate3d(-50%, -50%, 0) scale(0.9);
        }

        /* success / error accent styles that briefly tint the ring */
        #cursor-ripple.success .cursor-ring {
          border-color: rgba(34,197,94,0.95);
          box-shadow: 0 10px 40px rgba(34,197,94,0.12);
        }

        #cursor-ripple.error .cursor-ring {
          border-color: rgba(239,68,68,0.95);
          box-shadow: 0 10px 40px rgba(239,68,68,0.12);
        }

        /* ripple layer sits above everything for click ripples */
        #ripple-layer {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9998;
          overflow: visible;
        }

        /* ripple bubble */
        .ripple {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
          will-change: transform, opacity;
          pointer-events: none;
          animation: ripple-scale 700ms cubic-bezier(.2,.8,.2,1) forwards;
          box-shadow: 0 8px 30px rgba(2,8,20,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* colors */
        .ripple.neutral {
          background: var(--ripple-neutral);
        }

        .ripple.success {
          background: var(--ripple-success);
          box-shadow: 0 12px 40px rgba(34,197,94,0.12);
        }

        .ripple.error {
          background: var(--ripple-error);
          box-shadow: 0 12px 40px rgba(239,68,68,0.12);
        }

        @keyframes ripple-scale {
          0% {
            transform: translate(-50%, -50%) scale(0.35);
            opacity: 0.9;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(9);
            opacity: 0;
          }
        }

        /* Responsive: hide on mobile */
        @media (max-width: 720px) {
          #cursor-ripple {
            display: none;
          }
          #ripple-layer {
            display: none;
          }
          html {
            cursor: auto;
          }
        }
      `}</style>

      {/* cursor elements */}
      <div ref={cursorRef} id="cursor-ripple">
        <div className="cursor-core"></div>
        <div className="cursor-ring"></div>
      </div>

      {/* ripple container */}
      <div ref={rippleLayerRef} id="ripple-layer" aria-hidden="true"></div>
    </>
  );
}
