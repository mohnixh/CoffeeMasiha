import { ApproachSection } from "./components/ApproachSection";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { MenuSection } from "./components/MenuSection";
import { VisitSection } from "./components/VisitSection";
import BrewScrollScene from "./BrewScrollScene";
import { CursorGlow } from "./components/CursorGlow";
import { useScrollExperience } from "./useScrollExperience";
import { ShelfPage, ShelfTeaser } from "./components/CoffeeShelf";

export default function App() {
  useScrollExperience();
  const isShelf = window.location.pathname.replace(/\/$/, '') === '/shelf';
  return (
    <>
      <a className="skip-link" href={isShelf ? '#beans' : '#dream'}>{isShelf ? 'Skip to the beans' : 'Skip to the story'}</a>
      <div className="reading-progress" aria-hidden="true" />
      <CursorGlow />
      <main>
        {isShelf ? <ShelfPage /> : <>
        <Hero />
        <Intro />
        <BrewScrollScene />
        <MenuSection />
        <ShelfTeaser />
        <ApproachSection />
        <VisitSection />
        </>}
      </main>
    </>
  );
}
