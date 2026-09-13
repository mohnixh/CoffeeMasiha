import { ApproachSection } from "./components/ApproachSection";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { MenuSection } from "./components/MenuSection";
import { VisitSection } from "./components/VisitSection";
import BrewScrollScene from "./BrewScrollScene";
import { CursorGlow } from "./components/CursorGlow";
import { useScrollExperience } from "./useScrollExperience";
import { ShelfSection } from "./components/CoffeeShelf";

export default function App() {
  useScrollExperience();
  return (
    <>
      <a className="skip-link" href="#dream">Skip to the story</a>
      <div className="reading-progress" aria-hidden="true" />
      <CursorGlow />
      <main>
        <Hero />
        <Intro />
        <BrewScrollScene />
        <MenuSection />
        <ShelfSection />
        <ApproachSection />
        <VisitSection />
      </main>
    </>
  );
}
