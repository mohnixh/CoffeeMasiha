# CoffeeMasiha

Mohnish's personal coffee dream, presented as a responsive editorial website. This is an imagined space, not an operating cafe or a launch announcement.

## Development

Use Node.js 22.13 or newer in the 22.x release line.

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Experience

- Lenis smooth wheel and anchor scrolling, with native touch scrolling.
- A pinned opening that recedes from a full-screen photograph into a rotated frame, counter-moving oversized typography, word illumination, three stacking photographic ritual chapters, cup parallax, and an expanding daydream image. Lenis and the progress-driven visuals run in one shared animation frame. A small pointer glow follows fine-pointer devices and is disabled for touch and reduced motion.
- Sixteen coffee ideas: ten warm and six iced, all without milk, added sugar, or sweeteners. Each opens a keyboard-accessible native dialog with ingredients, equipment, four steps, check-off progress, and optional pauseable bloom/steep timers.
- Reduced-motion preferences disable smooth scrolling and present all ritual chapters as a normal vertical story. Preferences can change while the page is open.
- Email and Instagram invitations; no prices, location, opening hours, or signup promises.

## Source

### Colour versions

Espresso is the selected main design at `/`, with warm parchment, chocolate and copper details. The redesigned dream section keeps the original copy and adds a drawn coffee counter.

- Original green design and original dream layout: `/?theme=original`.
- Five studies with a collapsible comparison panel: `/?theme=espresso`, `/?theme=terracotta`, `/?theme=midnight`, `/?theme=burgundy`, `/?theme=graphite`.
- Append `#dream` to open the redesigned section directly. The default main site has no comparison panel.
- `src/experiments.css` contains scoped palette and alternate layout styles. `src/components/DreamExperiment.tsx` contains the new section; `Intro.tsx` retains the original layout and shared copy.

- `src/useScrollExperience.ts`: Lenis lifecycle and shared scroll effects.
- `src/BrewScrollScene.tsx`: the photographic ritual sequence.
- `src/data/content.ts`: warm and iced collection, recipes and brewing references.
- `src/components/BrewGuide.tsx`: native dialog, focus return and scroll lock.
- `src/components/BrewTimer.tsx`: optional wall-clock countdown with pause/resume/reset.
- `src/components/CursorGlow.tsx`: pointer glow with event cleanup.
- `src/components/`: page sections.
- `src/styles.css`: responsive layouts and UI components.
- `src/motion.css`: scroll choreography and responsive/reduced-motion fallbacks.
- `public/coffee/`: 16 individual AI-generated editorial coffee photographs.
- `public/dream-interior.jpg`, `public/ritual-water.jpg`: distinct generated story photographs.
- `public/hero-coffee-v2.jpg`, `public/ritual-bloom-v2.jpg`: the matching replacement hero and brewing imagery.
- `docs/image-prompts.json`: generation method and exact prompt set.
- Original full-resolution generated images are retained outside the project; the site uses optimized JPEG assets.

Lenis integration follows https://github.com/darkroomengineering/lenis. Motion direction was informed by the user-provided https://landonorris.com/ reference; code and coffee assets are original to this project.

`npm run build` type-checks and creates `dist/`. Vercel deployment settings are in `vercel.json`.
