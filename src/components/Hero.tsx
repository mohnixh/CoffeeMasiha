import { ButtonLink, Eyebrow } from "./ui";

const navItems = [
  { href: "#menu", label: "Menu" },
  { href: "#approach", label: "Approach" },
  { href: "#visit", label: "Visit" },
];

export function Hero() {
  return (
    <section
      className="hero-section"
      aria-label="CoffeeMasiha by Mohnish introduction"
    >
      <div className="hero-image-wrap" aria-hidden="true">
        <img
          src="/coffee-ritual.png"
          alt=""
          className="hero-image"
          fetchPriority="high"
        />
        <div className="hero-overlay" />
      </div>

      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="CoffeeMasiha by Mohnish home">
          <span className="brand-mark" />
          <span className="grid gap-px leading-none">
            <span className="brand-name">CoffeeMasiha</span>
            <span className="brand-byline">by Mohnish</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <a className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div id="top" className="hero-content">
        <Eyebrow>Water. Bean. Time.</Eyebrow>
        <h1 className="hero-title">
          Brewed dark. Served without illusion.
        </h1>
        <p className="hero-copy">
          No milk. No sugar. Only water, patience, and the quiet fate of the bean.
        </p>
        <div className="flex w-full flex-wrap justify-center gap-3 sm:w-auto" aria-label="Primary actions">
          <ButtonLink href="#menu">See the menu</ButtonLink>
          <ButtonLink href="#visit" className="light-button">
            Join opening list
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
