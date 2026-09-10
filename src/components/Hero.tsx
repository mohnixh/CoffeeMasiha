import { CopperThread } from "./CopperThread";

export function Hero() {
  return (
    <section className="hero-scroll" id="top" data-scroll aria-labelledby="hero-title">
      <div className="hero">
        <CopperThread chapter="opening" />
        <div className="hero-contours" aria-hidden="true"><svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">{[0,1,2,3,4,5].map(i => <ellipse key={i} cx="770" cy="470" rx={260+i*95} ry={100+i*75} transform={`rotate(-28 770 470)`} />)}</svg></div>
        <div className="hero-orbit-type" aria-hidden="true"><span>WATER. <em>BEAN.</em> WATER.</span><span><em>TIME.</em> INTENTION. <em>TIME.</em></span></div>
        <div className="hero-visual" aria-hidden="true"><div className="hero-photo"><picture>
          <source srcSet="/hero-coffee-v2-small.jpg 800w, /hero-coffee-v2.jpg 1536w" sizes="100vw" />
          <img src="/hero-coffee-v2.jpg" alt="" width="1536" height="1024" fetchPriority="high" />
        </picture></div><div className="hero-visual-shade" /><span className="hero-photo-caption">A simple cup. An entire world.</span></div>
        <header className="site-header">
          <a className="brand" href="#top" aria-label="CoffeeMasiha home"><span className="bean-mark" aria-hidden="true" />CoffeeMasiha<span className="byline">by Mohnish</span></a>
          <nav aria-label="Main navigation"><a href="#dream">The dream</a><a href="#ritual">The ritual</a><a href="#cups">The cups</a></nav>
          <a className="header-note" href="#connect">A dream in progress <span className="status-dot" /></a>
        </header>
        <div className="hero-content">
          <p className="eyebrow hero-enter">Water. Bean. Time.</p>
          <h1 id="hero-title"><span className="title-line"><span>A slower cup.</span></span><span className="title-line"><span>A bigger <em>dream.</em></span></span></h1>
          <div className="hero-bottom hero-enter"><p>A little coffee space I dream of bringing to life.<br />Black coffee. Warm light. A moment of your own.</p><a className="round-link" href="#dream"><span>Step inside the dream</span><span className="round-arrow" aria-hidden="true"><span className="ui-arrow ui-arrow-down-right" /></span></a></div>
        </div>
        <div className="hero-whisper" aria-hidden="true"><span className="eyebrow">The world can wait a moment.</span><p>Good things<br /><em>take their time.</em></p></div>
        <div className="hero-foot"><span>An idea by Mohnish</span><span className="scroll-cue">Scroll to unfold <span className="ui-arrow ui-arrow-down" aria-hidden="true" /></span><span>Made of possibility</span></div>
        <div className="hero-end-note" aria-hidden="true"><span>01 / A dream taking shape</span><span>Keep wandering <span className="ui-arrow ui-arrow-down" /></span></div>
      </div>
    </section>
  );
}
