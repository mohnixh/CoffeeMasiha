import { brewNotes } from "../data/content";
import { Eyebrow } from "./ui";

export function ApproachSection() {
  return (
    <section
      className="approach-section"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div>
        <Eyebrow>The approach</Eyebrow>
        <h2 id="approach-title" className="section-title">
          Clean cups need quiet decisions.
        </h2>
        <p className="body-copy mt-6 max-w-[600px]">
          Every brew starts with filtered water, a measured recipe, and beans
          roasted for clarity. We keep the menu narrow so each cup can be served
          with the right grind, temperature, and rest time.
        </p>
      </div>
      <div
        className="brew-notes"
        aria-label="Brewing notes"
      >
        {brewNotes.map((note, index) => (
          <div className="brew-note" key={note}>
            <span className="font-extrabold text-amber">{String(index + 1).padStart(2, "0")}</span>
            <p className="leading-[1.55] text-[#40372d]">{note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
