/** Decorative, scroll-drawn thread. Its progress is set by the shared Lenis frame. */
export function CopperThread({ chapter }: { chapter: "opening" | "dream" }) {
  return <div className={`copper-thread copper-thread-${chapter}`} aria-hidden="true">
    <svg viewBox="0 0 100 1000" preserveAspectRatio="none" fill="none">
      <path className="thread-track" d="M30 0V280C30 380 78 360 78 465S30 550 30 660V1000" />
      <path className="thread-ink" pathLength="1" d="M30 0V280C30 380 78 360 78 465S30 550 30 660V1000" />
    </svg>
  </div>;
}
