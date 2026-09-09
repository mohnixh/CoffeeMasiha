import { useEffect, useLayoutEffect, useState } from "react";

export const palettes = [
  { id: "espresso", name: "Espresso", description: "Roasted cocoa & parchment", colors: ["#281b16", "#efe0c8", "#8b512e"] },
  { id: "terracotta", name: "Terracotta", description: "Fired clay & warm sand", colors: ["#61392e", "#f4e5d6", "#a44830"] },
  { id: "midnight", name: "Midnight", description: "Ink blue & porcelain", colors: ["#192c42", "#e9edf0", "#426589"] },
  { id: "burgundy", name: "Burgundy", description: "Wine & rose paper", colors: ["#42212e", "#f2e5e4", "#90475a"] },
  { id: "graphite", name: "Graphite", description: "Charcoal & gallery ivory", colors: ["#262626", "#eeede8", "#65615c"] },
] as const;
type Palette = typeof palettes[number]["id"];
function readPalette(): Palette | null {
  const value = new URLSearchParams(window.location.search).get("theme");
  if (value === "original") return null;
  return palettes.find(p => p.id === value)?.id ?? "espresso";
}
const isStudy = () => palettes.some(p => p.id === new URLSearchParams(window.location.search).get("theme"));
export function useThemeExperiment() {
  const [palette, setPalette] = useState(readPalette);
  const [showStudio, setShowStudio] = useState(isStudy);
  useLayoutEffect(() => {
    if (palette) document.documentElement.dataset.palette = palette;
    else delete document.documentElement.dataset.palette;
    return () => { delete document.documentElement.dataset.palette; };
  }, [palette]);
  useEffect(() => {
    const restore = () => { setPalette(readPalette()); setShowStudio(isStudy()); };
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  useEffect(() => {
    if (!readPalette() || !window.location.hash) return;
    let cancelled = false;
    let frame = 0;
    // Resolve section links after the web fonts have established the page height.
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" }));
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, []);
  const selectPalette = (next: Palette) => {
    const url = new URL(window.location.href);
    url.searchParams.set("theme", next);
    window.history.pushState(null, "", url);
    setPalette(next);
    setShowStudio(true);
  };
  return { palette, selectPalette, showStudio };
}

export function ThemeExperiments({ palette, onSelect }: { palette: Palette; onSelect: (palette: Palette) => void }) {
  const [expanded, setExpanded] = useState(true);
  const current = palettes.find(p => p.id === palette)!;
  return (
    <aside className={`theme-studio ${expanded ? "is-expanded" : ""}`} aria-label="Design alternatives">
      <button className="theme-studio-toggle" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="theme-options">
        <span><span className="theme-live-dot" />Colour study <b>{current.name}</b></span><span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <div id="theme-options" hidden={!expanded}>
        <p className="theme-studio-note">Five palettes. The same dream.</p>
        <div className="theme-swatches" role="group" aria-label="Colour themes">
          {palettes.map((p, index) => <button key={p.id} aria-pressed={palette === p.id} aria-label={`${p.name}: ${p.description}`} onClick={() => onSelect(p.id)}>
            <span className="theme-swatch-colors" aria-hidden="true">{p.colors.map(color => <i key={color} style={{ background: color }} />)}</span>
            <span className="theme-swatch-label">0{index + 1} <b>{p.name}</b></span>
          </button>)}
        </div>
        <div className="theme-studio-footer"><a href="#dream">See the new dream ↗</a><a href="/?theme=original">Original green ↗</a></div>
      </div>
    </aside>
  );
}
