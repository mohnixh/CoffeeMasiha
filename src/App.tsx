import { lazy, Suspense } from "react";
import { ApproachSection } from "./components/ApproachSection";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { MenuSection } from "./components/MenuSection";
import { VisitSection } from "./components/VisitSection";

const BrewScrollScene = lazy(() => import("./BrewScrollScene"));

export default function App() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <Intro />
      <Suspense fallback={<section className="h-screen min-h-[580px] bg-[#241a15]" />}>
        <BrewScrollScene />
      </Suspense>
      <MenuSection />
      <ApproachSection />
      <VisitSection />
    </main>
  );
}
