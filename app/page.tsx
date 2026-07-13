import type { Metadata } from "next";
import BrewScrollScene from "./BrewScrollScene";

export const metadata: Metadata = {
  title: "CoffeeMasiha by Mohnish",
  description:
    "A cosy minimal coffee shop for black coffee, cold brew, AeroPress, and water-led brewing.",
};

const menu = [
  {
    name: "Black Coffee",
    note: "Rotating single-origin brews served clean, bright, and unsweetened.",
    image: "/menu-black-coffee.jpg",
    alt: "Handmade ceramic cup filled with black coffee on a walnut cafe table",
  },
  {
    name: "Cold Brew",
    note: "Slow steeped for 18 hours, poured over clear ice with a soft finish.",
    image: "/menu-cold-brew.jpg",
    alt: "Cold brew coffee over clear ice in a chilled glass",
  },
  {
    name: "AeroPress",
    note: "Made to order with a paper-filtered cup that keeps every note precise.",
    image: "/menu-aeropress.jpg",
    alt: "AeroPress dripping freshly brewed black coffee into a ceramic cup",
  },
];

const principles = [
  "Water first",
  "No sugar",
  "No milk",
  "Patient brewing",
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-label="CoffeeMasiha by Mohnish introduction">
        <div className="hero__image" aria-hidden="true">
          <img
            src="/coffee-ritual.png"
            alt=""
            className="hero__photo"
          />
          <div className="hero__veil" />
        </div>

        <header className="nav">
          <a className="brand" href="#top" aria-label="CoffeeMasiha by Mohnish home">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__text">
              <span className="brand__name">CoffeeMasiha</span>
              <span className="brand__byline">by Mohnish</span>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#menu">Menu</a>
            <a href="#approach">Approach</a>
            <a href="#visit">Visit</a>
          </nav>
        </header>

        <div className="hero__content" id="top">
          <p className="eyebrow">Water. Bean. Time.</p>
          <h1>Brewed dark. Served without illusion.</h1>
          <p className="hero__copy">
            No milk. No sugar. Only water, patience, and the quiet fate of the
            bean.
          </p>
          <div className="hero__actions" aria-label="Primary actions">
            <a className="button button--dark" href="#menu">
              See the menu
            </a>
            <a className="button button--light" href="#visit">
              Plan a visit
            </a>
          </div>
        </div>
      </section>

      <section className="intro" aria-label="Shop focus">
        <p>
          Let water meet the bean, and truth be brewed. Only the dark cup
          remains: patient, wakeful, and without disguise.
        </p>
        <div className="principles" aria-label="Coffee principles">
          {principles.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <BrewScrollScene />

      <section className="section menu" id="menu" aria-labelledby="menu-title">
        <div className="section__heading">
          <p className="eyebrow">Daily cups</p>
          <h2 id="menu-title">A small menu, brewed with focus.</h2>
        </div>
        <div className="menu__grid">
          {menu.map((item) => (
            <article className="menu-card" key={item.name}>
              <div className="menu-card__image-wrap">
                <img
                  className="menu-card__image"
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                />
              </div>
              <div className="menu-card__content">
                <h3>{item.name}</h3>
                <p>{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section approach"
        id="approach"
        aria-labelledby="approach-title"
      >
        <div className="approach__text">
          <p className="eyebrow">The approach</p>
          <h2 id="approach-title">Clean cups need quiet decisions.</h2>
          <p>
            Every brew starts with filtered water, a measured recipe, and beans
            roasted for clarity. We keep the menu narrow so each cup can be
            served with the right grind, temperature, and rest time.
          </p>
        </div>
        <div className="brew-notes" aria-label="Brewing notes">
          <div>
            <span>01</span>
            <p>Grind fresh, brew slow, serve immediately.</p>
          </div>
          <div>
            <span>02</span>
            <p>Use cold brew for roundness, AeroPress for detail.</p>
          </div>
          <div>
            <span>03</span>
            <p>Leave sweetness to the bean, the roast, and the water.</p>
          </div>
        </div>
      </section>

      <section className="visit" id="visit" aria-labelledby="visit-title">
        <div>
          <p className="eyebrow">Opening soon</p>
          <h2 id="visit-title">A warm counter, a few seats, and a slower cup.</h2>
        </div>
        <a className="button button--dark" href="mailto:hello@coffeemasiha.com">
          hello@coffeemasiha.com
        </a>
      </section>
    </main>
  );
}
