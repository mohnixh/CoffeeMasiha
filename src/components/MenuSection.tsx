import { useState } from "react";
import { coffeeCollection, coffeeImage, type Temperature } from "../data/content";
import { BrewGuide } from "./BrewGuide";
import { CoffeeFinder } from "./CoffeeFinder";
import { useCoffeeGuide } from "../useCoffeeGuide";

export function MenuSection() {
  const [temperature, setTemperature] = useState<Temperature>("warm");
  const { selected, open, close } = useCoffeeGuide();
  const collection = coffeeCollection[temperature];
  return (
    <section className="cups section-shell" id="cups" aria-labelledby="cups-title">
      <div className="section-kicker"><span className="eyebrow">03 / The cups</span><span className="small-note">Sixteen possibilities. Zero milk. Zero sugar.</span></div>
      <div className="cups-heading" data-reveal><h2 id="cups-title">One love.<br /><em>So many ways to brew.</em></h2><p>Find a cup that feels like you.<br />Then discover how to make it.</p></div>
      <CoffeeFinder onChoose={open} />
      <div className="cup-controls"><div className="temperature-tabs" role="group" aria-label="Choose coffee temperature">
        <button type="button" aria-pressed={temperature === "warm"} aria-controls="coffee-collection" onClick={() => setTemperature("warm")}>Served warm <span>10</span></button>
        <button type="button" aria-pressed={temperature === "iced"} aria-controls="coffee-collection" onClick={() => setTemperature("iced")}>Over ice <span>06</span></button>
      </div><p className="collection-note"><span className="ui-arrow ui-arrow-up-right" aria-hidden="true" /> Every cup has a ritual. Click to explore.</p></div>
      <p className="sr-only" role="status">Showing {collection.length} {temperature} coffee ideas.</p>
      <div className="cups-grid" id="coffee-collection">{collection.map((cup, i) => <article className="cup-card" key={cup.id} data-scroll data-reveal>
        <div className="cup-photo"><img src={coffeeImage(cup)} alt={`${cup.name}, imagined for CoffeeMasiha`} loading="lazy" decoding="async" width="800" height="1200" /><span className="cup-number">{String(i + 1).padStart(2, "0")}</span><span className="cup-detail">{cup.detail}</span><span className="photo-open-icon" aria-hidden="true"><span className="ui-arrow ui-arrow-up-right" /></span></div>
        <p className="eyebrow cup-mood">{cup.mood}</p><h3 id={`cup-${cup.id}`}>{cup.name}</h3><p className="cup-note">{cup.note}</p>
        <div className="cup-footer"><span>{cup.family}</span><span>Discover the ritual <span className="ui-arrow ui-arrow-up-right" aria-hidden="true" /></span></div>
        <button className="cup-open" type="button" onClick={event => open(cup, event.currentTarget)} aria-label={`Discover how to make ${cup.name}`} aria-haspopup="dialog"><span className="sr-only">Open {cup.name} brewing guide</span></button>
      </article>)}</div>
      <p className="collection-caption">An imagined collection, illustrated with individually created AI photographs. Recipes are starting points for your own ritual.</p>
      {selected && <BrewGuide coffee={selected.coffee} key={selected.coffee.id} returnFocus={selected.trigger} onClose={close} />}
    </section>
  );
}
