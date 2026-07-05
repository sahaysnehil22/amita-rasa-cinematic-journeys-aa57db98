import { useEffect, useRef } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current!;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    let raf = 0;
    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY; el.style.opacity = "1";
      const target = e.target as HTMLElement;
      const interactive = !!target.closest("a, button, [role='button'], input, textarea, select, .flip-card, [data-interactive]");
      el.classList.toggle("is-interactive", interactive);
    };
    const leave = () => { el.style.opacity = "0"; };
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseout", leave); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="luxe-cursor" aria-hidden>
      <span className="leaf">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 4C10 4 4 10 4 20c8 0 14-4 16-16z"/>
          <path d="M4 20C8 16 12 12 16 8"/>
        </svg>
      </span>
    </div>
  );
}