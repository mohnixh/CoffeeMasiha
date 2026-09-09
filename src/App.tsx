import { ApproachSection } from "./components/ApproachSection";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { MenuSection } from "./components/MenuSection";
import { VisitSection } from "./components/VisitSection";
import BrewScrollScene from "./BrewScrollScene";
import { CursorGlow } from "./components/CursorGlow";
import { useScrollExperience } from "./useScrollExperience";
import { DreamExperiment } from "./components/DreamExperiment";
import { ThemeExperiments, useThemeExperiment } from "./components/ThemeExperiments";

export default function App() {
  useScrollExperience();
  const { palette, selectPalette, showStudio } = useThemeExperiment();
  return (
    <>
      <a className="skip-link" href="#dream">Skip to the story</a>
      <div className="reading-progress" aria-hidden="true" />
      <CursorGlow />
      <main>
        <Hero />
        {palette ? <DreamExperiment /> : <Intro />}
        <BrewScrollScene />
        <MenuSection />
        <ApproachSection />
        <VisitSection />
      </main>
      {palette && showStudio && <ThemeExperiments palette={palette} onSelect={selectPalette} />}
    </>
  );
}
