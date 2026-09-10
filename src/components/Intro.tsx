import { CopperThread } from "./CopperThread";

const statement = "Some dreams begin with a grand plan. Mine begins with a quiet counter, a warm cup, and the feeling that you can stay a little longer.";
const dreamNote = "This is my dream of a coffee space, taking its first shape here. A place built around simple cups and the pleasure of slowing down.";

export function Intro() {
  return (
    <section className="manifesto dream-story section-shell" id="dream" data-scroll aria-labelledby="dream-title">
      <CopperThread chapter="dream" />
      <div className="section-kicker"><span className="eyebrow">01 / The dream</span><span className="small-note">Not a place yet. A possibility.</span></div>
      <div className="dream-composition">
        <div className="dream-letter">
          <span className="dream-quotation" aria-hidden="true">“</span>
          <h2 id="dream-title" aria-label={statement}>
            <span className="dream-opening" aria-hidden="true">Some dreams begin<br />with a grand plan.</span>{" "}
            <span className="dream-personal" aria-hidden="true">Mine begins with a <em>quiet counter,</em> a <em>warm cup,</em> and the feeling that you can <em>stay a little longer.</em></span>
          </h2>
        </div>
        <div className="dream-drawing" aria-hidden="true">
          <div className="dream-orbit" />
          <svg viewBox="0 0 400 500" fill="none">
            <defs>
              <clipPath id="dream-arch"><path d="M45 440V195a155 155 0 0 1 310 0v245Z" /></clipPath>
              <linearGradient id="dream-wall" x1="0" y1="0" x2="1" y2="1"><stop className="sketch-wall-start" /><stop offset="1" className="sketch-wall-end" /></linearGradient>
              <radialGradient id="dream-sun"><stop className="sketch-sun-start" /><stop offset="1" className="sketch-sun-end" /></radialGradient>
            </defs>
            <g clipPath="url(#dream-arch)">
              <path className="sketch-wall" d="M45 440V195a155 155 0 0 1 310 0v245Z" />
              <circle className="sketch-sun" cx="288" cy="156" r="53" />
              <path className="sketch-light" d="m263 188-188 252h115l131-252Z" />
              <path d="M227 82v205m-84-120h163M56 287h297M71 287v153m261-153v153M71 337h261M172 337v103" />
              <path d="M82 277h235v10H82zM91 267h214v10H91z" />
              <path className="sketch-cup" d="M130 231h49v18a20 20 0 0 1-20 20h-9a20 20 0 0 1-20-20Z" />
              <ellipse className="sketch-coffee" cx="154.5" cy="232" rx="23" ry="4" />
              <path d="M179 235h7a10 10 0 0 1 0 20h-8m-54 15h65" />
              <g className="sketch-steam"><path d="M145 219c-16-17 13-23 0-42m17 39c-12-15 11-23 0-36" /></g>
              <path d="M264 266v-53m0 21c-25 0-28-22-28-22 26-3 28 22 28 22Zm0 13c26-1 27-23 27-23-25 0-27 23-27 23Zm-14 0h28l-5 20h-18Z" />
              <path d="M103 440v-55h49v55m-56-55h63v-8H96zm171 55v-55h49v55m-56-55h63v-8h-63z" />
              <path d="M45 439h310" />
            </g>
            <path className="sketch-frame" d="M45 440V195a155 155 0 0 1 310 0v245Z" />
            <path className="sketch-outer-frame" d="M37 440V195a163 163 0 0 1 326 0v245" />
            <path className="sketch-dimension" d="M28 459h344m-344-5v10m344-10v10M24 180v260m-5-260h10m-10 260h10" />
          </svg>
          <span className="dream-drawing-mark">01</span>
        </div>
      </div>
      <div className="dream-postscript" data-reveal>
        <div className="dream-signoff"><span className="bean-mark" aria-hidden="true" /><span className="handwritten">One day, CoffeeMasiha.</span></div>
        <p>{dreamNote}<span className="signature">— Mohnish</span></p>
      </div>
    </section>
  );
}
