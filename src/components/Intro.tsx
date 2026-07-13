import { principles } from "../data/content";

export function Intro() {
  return (
    <section
      className="intro-section"
      aria-label="Shop focus"
    >
      <p className="intro-copy">
        Let water meet the bean, and truth be brewed. Only the dark cup remains:
        patient, wakeful, and without disguise.
      </p>
      <div className="principles-grid" aria-label="Coffee principles">
        {principles.map((item) => (
          <span className="principle-item" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
