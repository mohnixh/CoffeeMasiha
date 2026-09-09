import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${x}px`);
        root.style.setProperty("--cursor-y", `${y}px`);
        root.style.setProperty("--cursor-visible", "1");
        frame = 0;
      });
    };
    const hide = () => root.style.setProperty("--cursor-visible", "0");
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    preference.addEventListener("change", hide);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      preference.removeEventListener("change", hide);
      hide();
    };
  }, []);
  return <div className="cursor-glow" aria-hidden="true" />;
}
