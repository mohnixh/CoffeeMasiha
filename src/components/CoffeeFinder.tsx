import { useState } from "react";
import { coffeeImage, type Coffee, type Temperature } from "../data/content";
import { findCoffees, type Character, type Pace } from "../data/finder";

export function CoffeeFinder({ onChoose }: { onChoose: (coffee: Coffee, trigger: HTMLButtonElement) => void }) {
  const [temperature, setTemperature] = useState<Temperature | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [pace, setPace] = useState<Pace | null>(null);
  const complete = temperature && character && pace;
  const results = complete ? findCoffees(temperature, character, pace) : [];
  const answered = [temperature, character, pace].filter(Boolean).length;
  return <section className="coffee-finder" aria-labelledby="finder-title">
    <div className="finder-intro"><div><p className="eyebrow">A little nudge, if you need one</p><h3 id="finder-title">Find <em>your cup.</em></h3></div><p>Three small choices.<br /> A few cups you might love.</p></div>
    <div className="finder-questions">
      <fieldset><legend><span>01</span> How do you like it?</legend><div className="finder-options">{([['warm', 'Warm'], ['iced', 'Iced']] as const).map(([value, label]) => <label key={value}><input type="radio" name="finder-temperature" value={value} checked={temperature === value} onChange={() => setTemperature(value)} /><span>{label}</span></label>)}</div></fieldset>
      <fieldset><legend><span>02</span> What feels like you?</legend><div className="finder-options">{([['gentle', 'Gentle'], ['bold', 'Bold']] as const).map(([value, label]) => <label key={value}><input type="radio" name="finder-character" value={value} checked={character === value} onChange={() => setCharacter(value)} /><span>{label}</span></label>)}</div></fieldset>
      <fieldset><legend><span>03</span> A moment or a ritual?</legend><div className="finder-options">{([['quick', 'A quick cup'], ['unhurried', 'No hurry']] as const).map(([value, label]) => <label key={value}><input type="radio" name="finder-pace" value={value} checked={pace === value} onChange={() => setPace(value)} /><span>{label}</span></label>)}</div></fieldset>
    </div>
    <div className="finder-status"><p role="status">{complete ? `${results.length} cups for your kind of moment.` : `${answered} of 3 choices made. Follow your mood.`}</p>{answered > 0 && <button type="button" onClick={() => { setTemperature(null); setCharacter(null); setPace(null); }}>Start again</button>}</div>
    {complete && <div className="finder-results" key={`${temperature}-${character}-${pace}`}>
      {results.map(({ coffee, reason }) => <article className="finder-result" key={coffee.id}>
        <div className="finder-photo"><img src={coffeeImage(coffee)} alt={coffee.name} width="800" height="1200" /></div>
        <div><p className="eyebrow">{coffee.time}</p><h4>{coffee.name}</h4><p>{reason}</p><button type="button" onClick={event => onChoose(coffee, event.currentTarget)} aria-label={`Make ${coffee.name} from your matches`}>Make this cup <span className="ui-arrow ui-arrow-up-right" aria-hidden="true" /></button></div>
      </article>)}
      <p className="finder-footnote">A starting point for your taste. Beans and brewing change the character; each guide lists the equipment and time you’ll need.</p>
    </div>}
  </section>;
}
