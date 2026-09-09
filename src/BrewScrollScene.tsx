const chapters = [
  { number: "01", label: "The beginning", title: <>First, <em>water.</em></>, text: "Clear. Measured. Unhurried. Every cup begins with the simplest thing, given a little more care.", image: "/ritual-water.jpg", alt: "Clear water poured from a gooseneck kettle into a glass carafe" },
  { number: "02", label: "The becoming", title: <>Then, <em>patience.</em></>, text: "Freshly ground beans. A gentle pour. The small, beautiful pause while water becomes something more.", image: "/ritual-bloom-v2.jpg", alt: "Hot water poured into blooming coffee grounds in an olive ceramic dripper" },
  { number: "03", label: "The moment", title: <>Just <em>coffee.</em></>, text: "No milk. No sugar. Nothing between you and the bean. A dark cup, with room for a brighter thought.", image: "/menu-black-coffee.jpg", alt: "Black coffee in a handmade ceramic cup" },
];
export default function BrewScrollScene() {
  return (
    <section className="ritual" id="ritual" data-scroll data-stage="0" aria-label="The brewing ritual, in three acts">
      <div className="ritual-sticky">
        <div className="ritual-images" aria-hidden="true">
          {chapters.map((chapter, i) => <div className={`ritual-image ritual-image-${i}`} key={chapter.number}><img src={chapter.image} alt="" loading="lazy" width="1536" height="1024" /></div>)}
        </div>
        <div className="ritual-shade" />
        <div className="ritual-side-note" aria-hidden="true">The art of doing a little less.</div>
        <div className="ritual-top"><span className="eyebrow">02 / The ritual</span><span className="small-note">Nothing hurried. Nothing hidden.</span></div>
        <div className="ritual-type" aria-hidden="true"><span>Water.</span><span>Patience.</span><span>Coffee.</span></div>
        <div className="ritual-chapters">
          {chapters.map((chapter, i) => <article className="ritual-chapter" key={chapter.number} aria-hidden={i !== 0}>
            <img className="ritual-static-image" src={chapter.image} alt={chapter.alt} loading="lazy" />
            <p className="eyebrow">{chapter.number} — {chapter.label}</p><h2>{chapter.title}</h2><p>{chapter.text}</p>
          </article>)}
        </div>
        <div className="ritual-bottom"><span>Three quiet acts</span><div className="chapter-track" aria-hidden="true">{chapters.map(c => <span key={c.number}>{c.number}<i /></span>)}</div><span className="ritual-scroll">Keep wandering ↓</span></div>
      </div>
    </section>
  );
}
