import { coffees, coffeeImage } from "../data/content";
import { useCoffeeGuide } from "../useCoffeeGuide";
import { BrewGuide } from "./BrewGuide";

const moments = [
  { id: "espresso", title: "A moment,", emphasis: "concentrated.", note: "Small, intense, and complete. A little cup that asks you to slow down.", mood: "A little intensity" },
  { id: "pour-over", title: "A little more", emphasis: "clarity.", note: "A gentle spiral of water. A clear, delicate cup that lets the bean speak.", mood: "A little clarity" },
  { id: "cold-brew", title: "Good things", emphasis: "take their time.", note: "Cool water. A quiet night. A smooth, unhurried way to begin again.", mood: "A little patience" },
].map(moment => ({ ...moment, coffee: coffees.find(coffee => coffee.id === moment.id)! }));

export function CoffeeShowcase() {
  const { selected, open, close } = useCoffeeGuide();
  return (
    <section className="coffee-showcase" id="coffee-moments" data-scroll aria-label="Three ways to pause with coffee">
      <div className="coffee-showcase-stage">
        <p className="showcase-kicker">Choose your kind of pause</p>
        <span className="showcase-word" aria-hidden="true">SLOW DOWN.</span>
        <div className="showcase-scenes">
          {moments.map(({ coffee, title, emphasis, note }, index) => (
            <article className="showcase-scene" data-coffee-scene={index} key={coffee.id} aria-labelledby={`moment-${coffee.id}`}>
              <div className="showcase-copy">
                <p className="showcase-label">{coffee.name}</p>
                <h2 id={`moment-${coffee.id}`}>{title}<br /><em>{emphasis}</em></h2>
                <p className="showcase-description">{note}</p>
                <p className="showcase-tasting">{coffee.family}<span>{coffee.time}</span></p>
                <button className="showcase-ritual" type="button" aria-haspopup="dialog" aria-label={`Explore the ${coffee.name} ritual`} onClick={event => open(coffee, event.currentTarget)}>Explore this ritual</button>
              </div>
              <div className="showcase-art">
                <span className="showcase-orbit" aria-hidden="true" />
                <div className="showcase-photo"><img src={coffeeImage(coffee)} alt={`${coffee.name}, imagined for CoffeeMasiha`} width="800" height="1200" loading="lazy" decoding="async" /></div>
                <i className="showcase-bean showcase-bean-one" aria-hidden="true" /><i className="showcase-bean showcase-bean-two" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
        <div className="showcase-nav" role="group" aria-label="Choose a coffee moment">
          {moments.map(({ coffee, mood }, index) => <button key={coffee.id} type="button" data-coffee-choice={index} aria-pressed={index === 0} onClick={() => window.dispatchEvent(new CustomEvent("coffee:showcase", { detail: index }))}><span>{coffee.name}</span><small>{mood}</small><i aria-hidden="true" /></button>)}
        </div>
      </div>
      {selected && <BrewGuide coffee={selected.coffee} key={selected.coffee.id} returnFocus={selected.trigger} onClose={close} />}
    </section>
  );
}
