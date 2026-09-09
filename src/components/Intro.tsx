export const statement = "Some dreams begin with a grand plan. Mine begins with a quiet counter, a warm cup, and the feeling that you can stay a little longer.";
export const dreamNote = "This is my dream of a coffee space, taking its first shape here. A place built around simple cups and the pleasure of slowing down.";
export function Intro() {
  return (
    <section className="manifesto section-shell" id="dream" data-scroll aria-labelledby="dream-title">
      <div className="section-kicker"><span className="eyebrow">01 / The dream</span><span className="small-note">Not a place yet. A possibility.</span></div>
      <h2 id="dream-title" className="manifesto-text" aria-label={statement}>
        {statement.split(" ").map((word, i) => <span data-word aria-hidden="true" key={i}>{word} </span>)}
      </h2>
      <div className="manifesto-bottom" data-reveal>
        <span className="handwritten">One day, CoffeeMasiha.</span>
        <p>{dreamNote}<span className="signature">— Mohnish</span></p>
      </div>
    </section>
  );
}
