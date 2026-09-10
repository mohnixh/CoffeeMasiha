import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { Coffee } from "./data/content";

export function useCoffeeGuide() {
  const [selected, setSelected] = useState<{ coffee: Coffee; trigger: HTMLButtonElement } | null>(null);
  const source = useRef<HTMLElement | null>(null);
  const transition = useRef<ViewTransition | null>(null);
  const busy = useRef(false);
  const pendingClose = useRef(false);
  useEffect(() => () => { transition.current?.skipTransition(); source.current?.style.removeProperty("view-transition-name"); }, []);

  function change(update: () => void, after: () => void) {
    if (busy.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) { update(); after(); return; }
    busy.current = true;
    const active = document.startViewTransition(update);
    transition.current = active;
    // A skipped or unsupported capture must never block the guide itself.
    void active.ready.catch(() => {});
    void active.finished.catch(() => {}).finally(() => {
      after(); busy.current = false; transition.current = null;
      if (pendingClose.current) { pendingClose.current = false; close(); }
    });
  }
  function open(coffee: Coffee, trigger: HTMLButtonElement) {
    if (busy.current) return;
    const photo = trigger.closest("article")?.querySelector<HTMLElement>(".cup-photo, .finder-photo") ?? null;
    source.current = photo;
    photo?.style.setProperty("view-transition-name", "coffee-photo");
    change(() => {
      photo?.style.removeProperty("view-transition-name");
      flushSync(() => setSelected({ coffee, trigger }));
    }, () => photo?.style.removeProperty("view-transition-name"));
  }
  function close() {
    if (busy.current) { pendingClose.current = true; transition.current?.skipTransition(); return; }
    change(() => {
      flushSync(() => setSelected(null));
      source.current?.style.setProperty("view-transition-name", "coffee-photo");
    }, () => { source.current?.style.removeProperty("view-transition-name"); source.current = null; });
  }
  return { selected, open, close };
}
