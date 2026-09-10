import { coffees, type Temperature } from "./content.ts";

export type Character = "gentle" | "bold";
export type Pace = "quick" | "unhurried";
const suggestions: Record<`${Temperature}-${Character}-${Pace}`, { id: string; reason: string }[]> = {
  "warm-gentle-quick": [
    { id: "hot-americano", reason: "A balanced espresso, softened with water. A familiar place to begin." },
    { id: "aeropress", reason: "A short steep and a gentle press, with room to adjust the strength." },
  ],
  "warm-gentle-unhurried": [
    { id: "pour-over", reason: "A clear, delicate cup for someone who enjoys the act of pouring." },
    { id: "chemex", reason: "A clean filter brew, with enough to share your pause." },
  ],
  "warm-bold-quick": [
    { id: "espresso", reason: "A concentrated little cup with a long finish." },
    { id: "ristretto", reason: "A shorter yield for a small, rich coffee moment." },
    { id: "long-black", reason: "Espresso character with just a little room to open up." },
  ],
  "warm-bold-unhurried": [
    { id: "french-press", reason: "Four minutes of stillness, then a full-bodied cup." },
    { id: "moka-pot", reason: "A deep stovetop brew with a ritual of its own." },
    { id: "turkish", reason: "An unfiltered, slowly heated cup with plenty of presence." },
  ],
  "iced-gentle-quick": [
    { id: "iced-americano", reason: "Fresh espresso, water and ice. Crisp, simple, and adjustable." },
    { id: "japanese-iced", reason: "A fragrant filter brew chilled immediately over ice." },
  ],
  "iced-gentle-unhurried": [
    { id: "cold-brew", reason: "Start tonight for tomorrow: a mellow 12–16 hour refrigerated steep." },
    { id: "japanese-iced", reason: "Prefer to brew now? Take a few quiet minutes over a slow pour." },
  ],
  "iced-bold-quick": [
    { id: "iced-aeropress", reason: "A concentrated press, finished with ice and cool water." },
    { id: "sparkling-espresso", reason: "Espresso character with an unexpected sparkling finish." },
  ],
  "iced-bold-unhurried": [
    { id: "nitro-cold-brew", reason: "For texture lovers: prepare the base overnight, then use a dedicated nitro dispenser." },
    { id: "iced-aeropress", reason: "A simpler equipment option: a concentrated press to savour over ice." },
  ],
};
export function findCoffees(temperature: Temperature, character: Character, pace: Pace) {
  return suggestions[`${temperature}-${character}-${pace}`].map(suggestion => {
    const coffee = coffees.find(coffee => coffee.id === suggestion.id);
    if (!coffee) throw new Error(`Unknown coffee suggestion: ${suggestion.id}`);
    return { coffee, reason: suggestion.reason };
  });
}
