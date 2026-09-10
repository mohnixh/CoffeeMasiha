import { useLayoutEffect, useRef, useState } from "react";
import { coffeeImage, type Coffee } from "../data/content";
import { BrewTimer } from "./BrewTimer";

export function BrewGuide({ coffee, returnFocus, onClose }: { coffee: Coffee; returnFocus: HTMLButtonElement; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>(".brew-close")?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("coffee:modal", { detail: true }));
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      window.dispatchEvent(new CustomEvent("coffee:modal", { detail: false }));
      returnFocus.focus({ preventScroll: true });
    };
  }, [returnFocus]);
  return <dialog ref={dialogRef} className="brew-dialog" aria-labelledby="brew-title" onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={(event) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }} onClose={(event) => { if (!event.currentTarget.open) onClose(); }} onClick={(event) => {
    if (event.target === event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }
  }}>
    <div className="brew-dialog-scroll" data-lenis-prevent>
      <button autoFocus type="button" className="brew-close" aria-label="Close brewing guide" onClick={onClose}><span className="close-mark" aria-hidden="true" /></button>
      <div className="brew-cover"><img src={coffeeImage(coffee)} alt={`${coffee.name}, an imagined CoffeeMasiha preparation`} /><div className="brew-cover-copy"><span className="eyebrow">The CoffeeMasiha brew journal</span><span className="brew-cover-mark">A little care.<br /><em>A lovely cup.</em></span><span className="eyebrow">Coffee. Water. Nothing to hide.</span></div></div>
      <div className="brew-content">
        <p className="eyebrow">{coffee.temperature === "warm" ? "Served warm" : "Over ice"} / {coffee.family}</p>
        <h2 id="brew-title">{coffee.name}</h2><p className="brew-intro">{coffee.note}</p>
        <dl className="brew-facts"><div><dt>Take your time</dt><dd>{coffee.time}</dd></div><div><dt>The grind</dt><dd>{coffee.grind}</dd></div></dl>
        <div className="brew-prep"><div><h3>What goes in</h3><ul>{coffee.ingredients.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>What you’ll use</h3><p>{coffee.equipment}</p></div></div>
        <div className="brew-method-heading"><h3>The little ritual</h3><span role="status">{completed.length} / {coffee.steps.length} steps</span></div>
        <div className="brew-completion" aria-hidden="true"><i style={{ width: `${completed.length / coffee.steps.length * 100}%` }} /></div>
        <div className="brew-companion" aria-hidden="true"><div className="companion-cup"><span style={{ height: `${completed.length / coffee.steps.length * 85}%` }} /></div><p>{completed.length === coffee.steps.length ? "A moment, made by you." : "A little closer with every step."}</p></div>
        <ol className="brew-steps">{coffee.steps.map((step, i) => <li key={step.title} className={completed.includes(i) ? "step-done" : ""}>
          <button type="button" className="step-check" aria-label={`Mark step ${i + 1}: ${step.title} ${completed.includes(i) ? "incomplete" : "complete"}`} aria-pressed={completed.includes(i)} onClick={() => setCompleted(current => current.includes(i) ? current.filter(n => n !== i) : [...current, i])}>{completed.includes(i) ? <span className="check-mark" aria-hidden="true" /> : String(i + 1).padStart(2, "0")}</button>
          <div><h4>{step.title}</h4><p>{step.text}</p>{step.seconds && <BrewTimer seconds={step.seconds} />}</div>
        </li>)}</ol>
        {completed.length === coffee.steps.length && <p className="brew-finished" role="status">Your moment is ready. Enjoy your cup.</p>}
        <aside className="brew-tip"><span className="eyebrow">One little detail</span><p>{coffee.tip}</p></aside>
        <p className="brew-footnote">These are starting recipes to explore. Adjust to your beans, equipment, and taste. No milk, added sugar, syrups, or sweeteners.</p>
        {coffee.source && <a className="brew-source" href={coffee.source.url} target="_blank" rel="noreferrer">Further brewing guidance: {coffee.source.label} <span className="ui-arrow ui-arrow-up-right" aria-hidden="true" /></a>}
        <button type="button" className="back-collection" onClick={onClose}><span className="ui-arrow ui-arrow-left" aria-hidden="true" /> Back to the collection</button>
      </div>
    </div><div className="cursor-glow" aria-hidden="true" />
  </dialog>;
}
