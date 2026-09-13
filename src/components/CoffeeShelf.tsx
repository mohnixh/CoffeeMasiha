import { useEffect, useState } from 'react';
import { coffees, type Coffee } from '../data/content';
import { beans, matchingBeans, roasters } from '../data/shelf';

function Arrow() { return <span className="ui-arrow" aria-hidden="true" />; }

export function BrewShelf({ coffee, onExplore }: { coffee: Coffee; onExplore: () => void }) {
  return <aside className="brew-shelf"><p className="eyebrow">Bring this ritual home</p><h3>Two beans to begin with.</h3><p>Our suggested directions for {coffee.name.toLowerCase()}. Choose <strong>{coffee.grind.toLowerCase()}</strong> ground coffee, or whole beans if you have a suitable grinder.</p><div>{matchingBeans(coffee).map(bean => <a key={bean.id} href={bean.url} target="_blank" rel="noreferrer"><span><small>{bean.seller} / {bean.roast}</small><strong>{bean.name}</strong></span><Arrow /></a>)}</div><button type="button" className="shelf-link" onClick={() => { window.dispatchEvent(new CustomEvent("coffee:shelf", { detail: coffee.id })); onExplore(); }}>Explore beans for this cup <Arrow /></button><small>Independent suggestions; shop directly with the roaster. Links open a new tab.</small></aside>;
}

export function ShelfSection() {
  const initialBrew = new URLSearchParams(window.location.search).get('brew');
  const [brewId, setBrewId] = useState(coffees.some(c => c.id === initialBrew) ? initialBrew! : 'pour-over');
  const [view, setView] = useState('beans');
  const [roast, setRoast] = useState('all');
  const [seller, setSeller] = useState('all');
  const coffee = coffees.find(c => c.id === brewId)!;
  const visible = beans.filter(b => (roast === 'all' || b.tone === roast) && (seller === 'all' || b.seller === seller));
  const recommended = matchingBeans(coffee);
  const grind = coffee.grind.toLowerCase();
  const particleSize = grind.includes('extra-fine') ? 1 : grind.startsWith('coarse') ? 7 : grind.includes('coarse') ? 5 : grind.includes('medium') ? 3 : 2;
  useEffect(() => {
    let transition: ReturnType<typeof setTimeout>;
    const explore = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (coffees.some(c => c.id === id)) setBrewId(id);
      setView('grind');
      transition = setTimeout(() => window.dispatchEvent(new CustomEvent('coffee:scroll-to', { detail: '#shelf-browser' })), 80);
    };
    window.addEventListener('coffee:shelf', explore);
    return () => { clearTimeout(transition); window.removeEventListener('coffee:shelf', explore); };
  }, []);
  return <section className="shelf-page shelf-inline" id="shelf" aria-labelledby="shelf-title" data-scroll>
    <div className="shelf-opening section-shell">
      <div className="shelf-opening-copy" data-reveal><p className="eyebrow">From our cups to your counter / The shelf</p><h2 id="shelf-title">A lovely cup.<br /><em>Now make it yours.</em></h2><p>The café is still a dream. Your next coffee doesn’t have to wait. Find a bean, get to know your grind, and meet the Indian roasters behind it.</p><a className="shelf-link" href="#shelf-browser">Find your starting point <Arrow /></a></div>
      <figure className="shelf-opening-image"><img src="/shelf-beans.jpg" alt="An imagined still life of coffee beans and a copper scoop" loading="lazy" width="1536" height="1024" /><figcaption>Water. Bean. A little possibility.</figcaption></figure>
    </div>
    <div className="shelf-browser" id="shelf-browser" tabIndex={-1}>
      <div className="shelf-view-controls" role="group" aria-label="Explore the coffee shelf">{[['beans', '01', 'Find your beans'], ['grind', '02', 'Know your grind'], ['roasters', '03', 'Meet the roasters']].map(([id, number, label]) => <button key={id} type="button" aria-pressed={view === id} aria-controls="shelf-panel" onClick={() => setView(id)}><span>{number}</span>{label}<span className="shelf-tab-dot" aria-hidden="true" /></button>)}</div>
      <div id="shelf-panel" key={view} className="shelf-panel">
      {view === 'beans' && <>
    <section className="shelf-beans section-shell" id="beans" aria-labelledby="beans-heading"><div className="shelf-section-top"><div><p className="eyebrow">The bean collection</p><h2 id="beans-heading">A cup for <em>your kind of day.</em></h2></div><button type="button" className="shelf-text-button" onClick={() => setView("roasters")}>Meet all 9 sellers <Arrow /></button></div><p className="shelf-notes">Chocolate, honey, fruit: these are tasting impressions, not added ingredients. Our featured selection is plain coffee, for brewing without milk or sugar.</p>
      <div className="shelf-filters"><div className="shelf-filter-buttons" role="group" aria-label="Filter by roast">{[['all', 'All roasts'], ['light', 'Light'], ['medium', 'Medium'], ['dark', 'Medium-dark & dark'], ['filter', 'Filter']].map(([id, label]) => <button key={id} aria-pressed={roast === id} onClick={() => setRoast(id)}>{label}</button>)}</div><label>Roaster<select value={seller} onChange={e => setSeller(e.target.value)}><option value="all">All featured roasters</option>{[...new Set(beans.map(b => b.seller))].map(name => <option key={name}>{name}</option>)}</select></label></div><p className="shelf-roast-hint">{({ all: "Follow your taste: light is often brighter, medium more rounded, dark more roast-led.", light: "Often brighter and fruit-led. Try a gentle filter brew to explore the detail.", medium: "A rounded starting point, balancing fruit with developed sweetness.", dark: "A deeper roast character, with more bitterness and a lingering finish.", filter: "Roasted with filter brewing in mind. This is a brew style, not a universal roast colour." } as Record<string, string>)[roast]}</p><p className="shelf-caption" role="status">{visible.length} {visible.length === 1 ? 'coffee' : 'coffees'} to explore</p>
      <div className="bean-grid">{visible.map(bean => <article className={`bean-card bean-card-${bean.tone}`} key={bean.id}><div className="bean-card-top"><span className="eyebrow">{bean.seller}</span><span>{bean.roast} roast</span></div><div className="bean-emblem" aria-hidden="true"><span className="roast-bean" /><i /><i /></div><p className="shelf-caption">{bean.origin}</p><h3>{bean.name}</h3><p className="bean-notes">{bean.notes}</p><p className="bean-thought">{bean.thought}</p><div className="bean-card-bottom"><span>{bean.process}</span><a href={bean.url} target="_blank" rel="noreferrer">Shop at {bean.seller} <Arrow /></a></div></article>)}</div>
      {visible.length === 0 && <div className="shelf-empty"><h3>A different shade, perhaps?</h3><p>No featured beans match this combination yet.</p><button onClick={() => { setRoast('all'); setSeller('all'); }}>Show all coffees</button></div>}
      <p className="shelf-caption">Roast and tasting descriptions come from the roasters; brew pairings are our editorial starting points, not personal tasting reviews. External shop links open a new tab. Availability, ingredients, grind options, delivery, and prices are confirmed on the seller’s site.</p>
    </section>
    </>}
    {view === 'grind' && <section className="shelf-grind section-shell" id="grind" aria-labelledby="grind-heading"><div><p className="eyebrow">The small detail that changes the cup</p><h2 id="grind-heading">Right bean.<br /><em>Right grind.</em></h2><p>Choose the cup you want to make. We’ll help with a starting grind and two directions to explore.</p><label htmlFor="shelf-brew">I’m making<select id="shelf-brew" value={brewId} onChange={e => setBrewId(e.target.value)}>{coffees.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label><p className="shelf-caption">Have a grinder? Choose whole beans. Otherwise, select your brewing method on the roaster’s site. Their named grind options are more useful than a universal grinder number.</p></div><div className="grind-result" aria-live="polite"><svg viewBox="0 0 300 140" aria-hidden="true">{Array.from({ length: 140 }, (_, i) => <circle key={i} cx={15 + (i * 47 % 270)} cy={12 + (i * 31 % 116)} r={particleSize * (.4 + (i % 4) / 5)} fill="currentColor" />)}</svg><span className="eyebrow">Your starting grind</span><h3>{coffee.grind}</h3><p>For {coffee.name.toLowerCase()} · {coffee.time}</p><div className="grind-matches">{recommended.map(b => <a key={b.id} href={b.url} target="_blank" rel="noreferrer"><span><small>{b.seller}</small>{b.name}</span><Arrow /></a>)}</div><p className="shelf-caption">Grind illustration is indicative. Adjust to your equipment and taste.</p></div></section>
    }
    {view === 'roasters' && <section className="shelf-directory section-shell" id="roasters"><p className="eyebrow">Keep wandering / The Indian roaster directory</p><h2>There’s a whole world<br /><em>in our own backyard.</em></h2><p>More shelves, more origins, more people putting their care into coffee. Explore each seller’s current collection; choose plain, unflavoured coffee for our water-only rituals.</p><div>{roasters.map((r, i) => <a href={r.url} key={r.name} target="_blank" rel="noreferrer"><span className="eyebrow">{String(i + 1).padStart(2, '0')}</span><h3>{r.name}</h3><p>{r.note}</p><Arrow /></a>)}</div><p className="shelf-caption">Independent links, with no affiliate tracking or paid placements. CoffeeMasiha does not sell or fulfil these products. Listings reviewed September 2026; seasonal collections change.</p></section>
    }
      </div>
    </div>
  </section>;
}
