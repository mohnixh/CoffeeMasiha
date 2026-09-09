import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p); };

/** Lenis and all scroll-linked visuals share a single animation frame. */
export function useScrollExperience() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sections: HTMLElement[] = [];
    let chapters: HTMLElement[] = [];
    const progress = document.querySelector<HTMLElement>(".reading-progress");
    let lenis: Lenis | undefined;
    let frame = 0;
    let needsUpdate = true;
    let modalOpen = false;

    const update = () => {
      const height = window.innerHeight;
      const reduced = preference.matches;
      // Read all section geometry first; update styles together afterwards.
      const bounds = sections.map(section => section.getBoundingClientRect());
      sections.forEach((section, index) => {
        const rect = bounds[index];
        if (!reduced && (rect.bottom < -height || rect.top > height * 2)) return;
        const travel = clamp((height - rect.top) / (height + rect.height));
        const pinned = clamp(-rect.top / Math.max(1, rect.height - height));
        section.style.setProperty("--travel", reduced ? "0.5" : travel.toFixed(4));
        section.style.setProperty("--p", reduced ? "0" : pinned.toFixed(4));
        if (section.classList.contains("hero-scroll")) {
          section.style.setProperty("--recede", reduced ? "0" : smooth((pinned - .08) / .75).toFixed(4));
        }
        if (section.classList.contains("ritual")) {
          const stage = Math.min(2, Math.floor(pinned * 3));
          const local = pinned * 3 - stage;
          section.dataset.stage = String(stage);
          section.style.setProperty("--turn-one", smooth((pinned - .22) / .16).toFixed(4));
          section.style.setProperty("--turn-two", smooth((pinned - .55) / .16).toFixed(4));
          chapters.forEach((chapter, i) => {
            if (reduced) chapter.removeAttribute("aria-hidden");
            else chapter.setAttribute("aria-hidden", String(stage !== i));
            const enter = i === 0 ? 1 : smooth(local / .16);
            const leave = i === 2 ? 1 : smooth((1 - local) / .13);
            chapter.style.setProperty("--chapter-opacity", reduced ? "1" : String(stage === i ? enter * leave : 0));
            chapter.style.setProperty("--chapter-y", `${reduced ? 0 : (1 - enter) * 35 - (1 - leave) * 25}px`);
          });
        }
      });
      const total = document.documentElement.scrollHeight - height;
      progress?.style.setProperty("--progress", String(total > 0 ? clamp(window.scrollY / total) : 0));
    };
    const tick = (time: number) => {
      frame = 0;
      lenis?.raf(time);
      if (needsUpdate) { needsUpdate = false; update(); }
      if (lenis && !frame) frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      needsUpdate = true;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const configure = () => {
      lenis?.destroy();
      lenis = undefined;
      if (!preference.matches) {
        lenis = new Lenis({ autoRaf: false, lerp: .09, smoothWheel: true, anchors: true });
        lenis.on("scroll", () => { needsUpdate = true; });
        if (modalOpen) lenis.stop();
      }
      schedule();
    };
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("revealed"); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: .1 });
    const refresh = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
      chapters = Array.from(document.querySelectorAll<HTMLElement>(".ritual-chapter"));
      document.querySelectorAll("[data-reveal]:not(.revealed)").forEach(element => revealObserver.observe(element));
      schedule();
    };
    const collectionObserver = new MutationObserver(records => {
      const selector = "[data-scroll], [data-reveal], #coffee-collection";
      if (records.some(record => [...record.addedNodes, ...record.removedNodes].some(node =>
        node instanceof Element && (node.matches(selector) || node.querySelector(selector))))) refresh();
    });
    const main = document.querySelector("main");
    if (main) collectionObserver.observe(main, { childList: true, subtree: true });
    const handleModal = (event: Event) => {
      modalOpen = Boolean((event as CustomEvent<boolean>).detail);
      if (modalOpen) lenis?.stop();
      else { lenis?.start(); schedule(); }
    };
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
    window.addEventListener("coffee:modal", handleModal);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", configure);
    refresh();
    configure();
    let cancelled = false;
    let anchorFrame = 0;
    // Initial section links resolve after font loading establishes the layout.
    if (window.location.hash) void document.fonts.ready.then(() => {
      if (cancelled) return;
      anchorFrame = requestAnimationFrame(() => {
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
        schedule();
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(anchorFrame);
      lenis?.destroy();
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      resizeObserver.disconnect();
      collectionObserver.disconnect();
      window.removeEventListener("coffee:modal", handleModal);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", configure);
    };
  }, []);
}
