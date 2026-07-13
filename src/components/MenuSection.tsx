import { menu } from "../data/content";
import { SectionHeading } from "./ui";

export function MenuSection() {
  return (
    <section
      className="page-width section-padding"
      id="menu"
      aria-labelledby="menu-title"
    >
      <SectionHeading eyebrow="Daily cups" title="A small menu, brewed with focus." id="menu-title" />
      <div className="menu-grid">
        {menu.map((item) => (
          <article className="menu-card" key={item.name}>
            <div className="menu-image-wrap">
              <img
                className="menu-image"
                src={item.image}
                alt={item.alt}
                loading="lazy"
              />
            </div>
            <div className="menu-content">
              <div className="grid gap-1 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-[2rem] leading-none">{item.name}</h3>
                <span className="shrink-0 text-xs font-extrabold uppercase tracking-[0.06em] text-moss">
                  {item.price}
                </span>
              </div>
              <p className="text-base leading-[1.65] text-muted">{item.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
