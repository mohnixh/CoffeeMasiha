import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let x = 0;
    let y = 0;
    let card: HTMLElement | null = null;
    let nextCard: HTMLElement | null = null;
    const resetCard = () => {
      card?.style.removeProperty("--tilt-x");
      card?.style.removeProperty("--tilt-y");
      card = null;
      nextCard = null;
    };
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      nextCard = event.target instanceof Element ? event.target.closest<HTMLElement>(".cup-card, .bean-card") : null;
      if (!frame) frame = requestAnimationFrame(() => {
        if (card !== nextCard) {
          const target = nextCard;
          resetCard();
          card = target;
          nextCard = target;
        }
        const photo = card?.querySelector<HTMLElement>(".cup-photo, .bean-photo");
        if (photo && card) {
          const rect = photo.getBoundingClientRect();
          const horizontal = Math.max(-1, Math.min(1, (x - rect.left) / rect.width * 2 - 1));
          const vertical = Math.max(-1, Math.min(1, (y - rect.top) / rect.height * 2 - 1));
          card.style.setProperty("--tilt-x", `${(-vertical * 2.2).toFixed(2)}deg`);
          card.style.setProperty("--tilt-y", `${(horizontal * 2.2).toFixed(2)}deg`);
        }
        root.style.setProperty("--cursor-x", `${x}px`);
        root.style.setProperty("--cursor-y", `${y}px`);
        root.style.setProperty("--cursor-visible", "1");
        frame = 0;
      });
    };
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      root.style.setProperty("--cursor-visible", "0");
      resetCard();
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", resetCard, { passive: true });
    preference.addEventListener("change", hide);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", resetCard);
      preference.removeEventListener("change", hide);
      hide();
    };
  }, []);
  return <div className="cursor-glow" aria-hidden="true" />;
}
