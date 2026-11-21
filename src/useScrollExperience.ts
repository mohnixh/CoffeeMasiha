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
    let showcase: HTMLElement | null = null;
    let coffeeScenes: HTMLElement[] = [];
    let coffeeChoices: HTMLButtonElement[] = [];
    const progress = document.querySelector<HTMLElement>(".reading-progress");
    let lenis: Lenis | undefined;
    let frame = 0;
    let needsUpdate = true;
    let modalOpen = false;

    const update = () => {
      const height = window.innerHeight;
      const reduced = preference.matches;
      // Short viewports and reduced motion use the complete, unpinned story.
      const showcaseEnabled = !reduced && height >= (window.innerWidth <= 600 ? 660 : 600);
      if (showcase) showcase.dataset.enhanced = String(showcaseEnabled);
      // Read all section geometry first; update styles together afterwards.
      const bounds = sections.map(section => section.getBoundingClientRect());
      sections.forEach((section, index) => {
        const rect = bounds[index];
        if (!reduced && section !== showcase && (rect.bottom < -height || rect.top > height * 2)) return;
        const travel = clamp((height - rect.top) / (height + rect.height));
        const pinned = clamp(-rect.top / Math.max(1, rect.height - height));
        section.style.setProperty("--travel", reduced ? "0.5" : travel.toFixed(4));
        section.style.setProperty("--p", reduced ? "0" : pinned.toFixed(4));
        if (section === showcase) {
          const stageHeight = section.querySelector<HTMLElement>(".coffee-showcase-stage")?.offsetHeight ?? height;
          const coffeeProgress = clamp(-rect.top / Math.max(1, rect.height - stageHeight));
          const selected = Math.min(2, Math.floor(coffeeProgress * 3));
          section.style.setProperty("--showcase-progress", showcaseEnabled ? coffeeProgress.toFixed(4) : "0");
          section.style.setProperty("--showcase-drift", showcaseEnabled ? (Math.min(.9999, coffeeProgress) * 3 % 1 - .5).toFixed(4) : "0");
          coffeeScenes.forEach((scene, i) => {
            if (showcaseEnabled) scene.setAttribute("aria-hidden", String(selected !== i));
            else scene.removeAttribute("aria-hidden");
            scene.inert = showcaseEnabled && selected !== i;
          });
          coffeeChoices.forEach((button, i) => {
            button.setAttribute("aria-pressed", String(selected === i));
            button.style.setProperty("--fill", clamp(coffeeProgress * 3 - i).toFixed(4));
          });
          const stage = section.querySelector<HTMLElement>(".coffee-showcase-stage");
          if (stage) stage.style.backgroundColor = showcaseEnabled ? ["#efe0c8", "#ede2c8", "#dfc9aa"][selected] : "";
        }
        if (section.classList.contains("dream-drawing")) {
          const ink = smooth((height * .85 - rect.top) / Math.max(1, Math.min(rect.height, height * .65)));
          section.style.setProperty("--sketch", reduced ? "1" : ink.toFixed(4));
        }
        if (section.classList.contains("hero-scroll") || section.classList.contains("dream-story")) {
          const drawn = section.classList.contains("hero-scroll") ? pinned : clamp((height * .65 - rect.top) / rect.height);
          section.style.setProperty("--thread", reduced ? "1" : drawn.toFixed(4));
        }
        if (section.classList.contains("hero-scroll")) {
          section.style.setProperty("--recede", reduced ? "0" : smooth((pinned - .08) / .75).toFixed(4));
        }
        if (section.classList.contains("ritual")) {
          const first = smooth((pinned - .24) / .18);
          const second = smooth((pinned - .58) / .18);
          const weights = [1 - first, first * (1 - second), second];
          const stage = weights.indexOf(Math.max(...weights));
          section.dataset.stage = String(stage);
          section.style.setProperty("--turn-one", first.toFixed(4));
          section.style.setProperty("--turn-two", second.toFixed(4));
          weights.forEach((weight, i) => section.style.setProperty(`--act-${i}`, weight.toFixed(4)));
          chapters.forEach((chapter, i) => {
            if (reduced) chapter.removeAttribute("aria-hidden");
            else chapter.setAttribute("aria-hidden", String(stage !== i));
            chapter.style.setProperty("--chapter-opacity", reduced ? "1" : weights[i].toFixed(4));
            const direction = i === 0 || (i === 1 && pinned > .5) ? -1 : 1;
            chapter.style.setProperty("--chapter-y", `${reduced ? 0 : (1 - weights[i]) * 10 * direction}px`);
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
      if (lenis && !frame && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      needsUpdate = true;
      if (!frame && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const configure = () => {
      lenis?.destroy();
      lenis = undefined;
      if (!preference.matches) {
        lenis = new Lenis({ autoRaf: false, lerp: .1, smoothWheel: true, anchors: { duration: 1.15 }, stopInertiaOnNavigate: true });
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
      showcase = document.getElementById("coffee-moments");
      coffeeScenes = Array.from(document.querySelectorAll<HTMLElement>("[data-coffee-scene]"));
      coffeeChoices = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-coffee-choice]"));
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
    const handleVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else { lenis?.resize(); schedule(); }
    };
    const scrollToSection = (event: Event) => {
      const selector = (event as CustomEvent<string>).detail;
      if (selector !== '#shelf-browser') return;
      const target = document.getElementById('shelf-browser');
      if (!target) return;
      target.focus({ preventScroll: true });
      if (lenis) { lenis.resize(); lenis.scrollTo(target, { duration: 1.3 }); }
      else target.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    const chooseCoffee = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      if (!showcase || !Number.isInteger(index) || index < 0 || index >= coffeeScenes.length || modalOpen) return;
      const stage = showcase.querySelector<HTMLElement>(".coffee-showcase-stage");
      if (!stage) return;
      const target = showcase.getBoundingClientRect().top + window.scrollY +
        Math.max(0, showcase.offsetHeight - stage.offsetHeight) * ((index + .25) / coffeeScenes.length);
      if (lenis) { lenis.resize(); lenis.scrollTo(target, { duration: 1.15 }); }
      else window.scrollTo({ top: target, behavior: "instant" });
      schedule();
    };
    resizeObserver.observe(document.body);
    window.addEventListener("coffee:modal", handleModal);
    window.addEventListener('coffee:scroll-to', scrollToSection);
    window.addEventListener('coffee:showcase', chooseCoffee);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener('visibilitychange', handleVisibility);
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
      window.removeEventListener('coffee:scroll-to', scrollToSection);
      window.removeEventListener('coffee:showcase', chooseCoffee);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener('visibilitychange', handleVisibility);
      preference.removeEventListener("change", configure);
    };
  }, []);
}
