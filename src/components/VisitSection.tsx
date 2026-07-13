import { ButtonLink, Eyebrow } from "./ui";

export function VisitSection() {
  return (
    <section
      className="visit-section"
      id="visit"
      aria-labelledby="visit-title"
    >
      <div>
        <Eyebrow className="text-cream/70">Opening soon in Bengaluru</Eyebrow>
        <h2 id="visit-title" className="section-title max-w-[760px] text-cream">
          A warm counter, a few seats, and a slower cup.
        </h2>
        <p className="mt-5 max-w-[620px] text-base leading-[1.7] text-cream/70">
          Weekend tastings first. Send a note and we will share the first brew
          dates before the doors open.
        </p>
      </div>
      <ButtonLink href="mailto:hello@coffeemasiha.com" className="cream-button">
        hello@coffeemasiha.com
      </ButtonLink>
    </section>
  );
}
