export type Temperature = "warm" | "iced";
export type BrewStep = { title: string; text: string; seconds?: number };
export type Coffee = {
  id: string; name: string; mood: string; note: string; detail: string;
  temperature: Temperature; family: string; time: string; grind: string;
  ingredients: string[]; equipment: string; steps: BrewStep[]; tip: string;
  source?: { label: string; url: string };
};
const espressoSource = { label: "Breville · Espresso preparations", url: "https://www.breville.com/content/dam/breville/us/en/assets/miscellaneous/instruction-manual/espresso/BES840-instruction-manual.pdf" };
const aeroSource = { label: "AeroPress · Brewing instructions", url: "https://aeropress.com/pages/how-to-use" };
const harioSource = { label: "Hario · Cold and iced brewing", url: "https://www.hario-usa.com/blogs/cold-brew-recipes-and-guides" };
const shot = { title: "Pull the espresso", text: "Grind 18 g of coffee into a suitable double basket. Distribute evenly, tamp level, then extract about 36 g of espresso. Use roughly 25–30 seconds as a starting point; adjust the grind to taste." };
export const coffees: Coffee[] = [
  {
    id: "hot-americano", name: "Hot Americano", mood: "A softer start", temperature: "warm", family: "Espresso", time: "2–3 min", grind: "Fine",
    note: "Espresso opened up with hot water. A full-flavoured cup with room to linger.", detail: "Espresso · Hot water",
    ingredients: ["18 g coffee, yielding about 36 g espresso", "120–150 ml hot filtered water"], equipment: "Espresso machine, grinder, scale, warm mug",
    steps: [shot, { title: "Warm the cup", text: "Rinse your mug with a little hot water, then empty it." }, { title: "Open it up", text: "Pour the espresso into the mug. Gently add 120–150 ml hot water, depending on the strength you enjoy." }, { title: "Give it a moment", text: "Stir once, let the temperature settle, and taste. Add a little more water if you prefer a lighter cup." }],
    tip: "The added water changes strength, not the espresso extraction. Start with a balanced shot.", source: espressoSource,
  },
  {
    id: "long-black", name: "Long Black", mood: "Water first. Character intact.", temperature: "warm", family: "Espresso", time: "2–3 min", grind: "Fine",
    note: "Espresso poured over hot water. A shorter, bolder cousin of the Americano.", detail: "Hot water · Espresso on top",
    ingredients: ["18 g coffee, yielding about 36 g espresso", "60–90 ml hot filtered water"], equipment: "Espresso machine, grinder, scale, small cup",
    steps: [{ title: "Begin with water", text: "Add 60–90 ml hot water to a small warmed cup." }, shot, { title: "Float the shot", text: "Pour the freshly extracted espresso gently onto the hot water, keeping as much of its natural crema as possible." }, { title: "Taste the layers", text: "Take a moment before sipping. Stir lightly if you prefer an even flavour from first sip to last." }],
    tip: "Water first is the defining gesture. Use less water for a more concentrated cup.", source: { label: "Breville · Long Black", url: "https://www.breville.com/us/en/coffee-journey/recipes/long-black.html" },
  },
  {
    id: "espresso", name: "Espresso", mood: "A moment, concentrated", temperature: "warm", family: "Espresso", time: "25–30 sec extraction", grind: "Fine",
    note: "Small, intense, and complete. Coffee and water, brought together under pressure.", detail: "Short · Bold · Pure",
    ingredients: ["18 g freshly ground coffee", "Filtered brewing water", "Target: about 36 g in the cup"], equipment: "Espresso machine, correctly sized double basket, grinder, scale, tamper",
    steps: [{ title: "Prepare", text: "Warm the machine and cup. Dry the basket and weigh 18 g coffee, or use the dose your basket is designed for." }, { title: "Make an even bed", text: "Grind fine. Distribute the grounds evenly and tamp level so water can pass through evenly." }, { title: "Extract", text: "Start brewing and weighing the output. For an 18 g dose, begin with a 36 g yield in roughly 25–30 seconds; the target yield matters more than a rigid timer." }, { title: "Find your balance", text: "Stir and taste. If the shot runs very quickly, grind finer next time. If it struggles to flow, try a little coarser." }],
    tip: "A starting recipe, not a rule: roast, machine, and basket all influence the result.", source: espressoSource,
  },
  {
    id: "ristretto", name: "Ristretto", mood: "Less water. More presence.", temperature: "warm", family: "Espresso", time: "20–30 sec extraction", grind: "Fine",
    note: "An intentionally shorter espresso. A tiny cup with a lingering impression.", detail: "Restricted yield · Rich texture",
    ingredients: ["18 g freshly ground coffee", "Filtered brewing water", "Target: 18–27 g in the cup"], equipment: "Espresso machine, double basket, grinder, scale, tamper",
    steps: [{ title: "Keep the dose", text: "Use 18 g coffee in a basket suited to that dose. Distribute and tamp evenly." }, { title: "Shorten the yield", text: "Begin extraction and stop at 18–27 g of brewed coffee, rather than a typical 36 g double espresso." }, { title: "Adjust the grind", text: "Use taste to guide the next shot. A slightly finer grind can help a short extraction develop balance, but avoid choking the machine." }, { title: "Sip slowly", text: "Stir gently and serve straight away in a small warmed cup." }],
    tip: "Ristretto means less beverage from the same dose; it is not just a smaller dose of coffee.", source: espressoSource,
  },
  {
    id: "pour-over", name: "V60 Pour-over", mood: "For the little details", temperature: "warm", family: "Filter", time: "2½–3½ min", grind: "Medium-fine",
    note: "A gentle spiral of water. A clear cup that lets the bean speak.", detail: "Paper filter · Slow pour",
    ingredients: ["15 g coffee", "250 g filtered water at about 93°C"], equipment: "V60 dripper, paper filter, kettle, grinder, scale, server",
    steps: [{ title: "Rinse & ready", text: "Rinse the filter in the dripper, discard the rinse water, then add 15 g medium-fine coffee. Level the bed." }, { title: "Let it bloom", text: "Pour 45 g water evenly over the grounds. Swirl gently to wet any dry pockets, then wait about 30 seconds.", seconds: 30 }, { title: "Pour in circles", text: "Slowly add water in two pours, bringing the total to 250 g. Keep the stream gentle and avoid pouring down the paper walls." }, { title: "Let it finish", text: "Allow the water to drain; aim for roughly 2½–3½ minutes overall. Swirl the server and pour." }],
    tip: "Adjust the grind rather than forcing a precise finish time. Every bean drains a little differently.", source: harioSource,
  },
  {
    id: "chemex", name: "Chemex", mood: "Clarity worth sharing", temperature: "warm", family: "Filter", time: "4–5 min", grind: "Medium-coarse",
    note: "A generous, clean brew through a thick paper filter. Made for a longer conversation.", detail: "Slow filter · Two small cups",
    ingredients: ["30 g coffee", "500 g filtered water at about 93°C"], equipment: "Chemex carafe, bonded paper filter, kettle, grinder, scale",
    steps: [{ title: "Set the filter", text: "Place the folded filter with its three-layer side against the spout. Rinse with hot water, empty the rinse, then add the grounds." }, { title: "Bloom", text: "Add 60 g water to wet the coffee. Let the bed bloom for about 40 seconds.", seconds: 40 }, { title: "Build the brew", text: "Pour slowly in stages until the scale reads 500 g total water. Keep the filter from collapsing into the spout." }, { title: "Share the pause", text: "Let the bed drain, usually around 4–5 minutes overall. Remove the filter, swirl the carafe, and serve." }],
    tip: "The spout is also an air channel. Keep it open so the coffee can drain freely.", source: { label: "Chemex · Brewing guidance", url: "https://chemexcoffeemaker.com/pages/faq" },
  },
  {
    id: "aeropress", name: "AeroPress", mood: "For the curious soul", temperature: "warm", family: "Immersion", time: "2 min", grind: "Medium-fine",
    note: "A short steep and a gentle press. A small ritual with room to experiment.", detail: "Steeped · Gently pressed",
    ingredients: ["15 g coffee", "220 g filtered water at about 90°C"], equipment: "AeroPress, paper filter, sturdy mug, kettle, scale",
    steps: [{ title: "Stand it upright", text: "Fit a paper filter and fasten the filter cap. Stand the brewer upright on a sturdy mug, then add 15 g coffee." }, { title: "Add & stir", text: "Add 220 g hot water, stir gently, and insert the plunger just enough to make a seal." }, { title: "A short pause", text: "Allow the coffee to steep for 60 seconds.", seconds: 60 }, { title: "Press gently", text: "Press slowly and steadily over about 30 seconds. If it resists strongly, stop and use a coarser grind next time; do not force it." }],
    tip: "This is an upright recipe. Keep the mug and brewer stable throughout the press.", source: aeroSource,
  },
  {
    id: "french-press", name: "French Press", mood: "A little more body", temperature: "warm", family: "Immersion", time: "4–5 min", grind: "Coarse",
    note: "An unhurried immersion brew. Full-bodied, textured, and quietly comforting.", detail: "Full immersion · Metal filter",
    ingredients: ["20 g coffee", "300 g filtered water at about 93°C"], equipment: "French press, kettle, grinder, scale",
    steps: [{ title: "Warm & weigh", text: "Rinse the press with hot water and empty it. Add 20 g coarse coffee." }, { title: "Immerse", text: "Pour in 300 g hot water. Stir gently so all the grounds are wet, and place the lid on with the plunger raised." }, { title: "Wait four minutes", text: "Let the grounds steep without pressing.", seconds: 240 }, { title: "Press & decant", text: "Lower the plunger slowly. Pour all the coffee into your cup or a separate server so it does not keep sitting on the grounds." }],
    tip: "Some fine sediment is natural with a metal filter. Pour gently and leave the last little sip.", source: { label: "Blue Bottle · Brew guides", url: "https://bluebottlecoffee.com/brew-guides" },
  },
  {
    id: "moka-pot", name: "Moka Pot", mood: "A stovetop morning", temperature: "warm", family: "Stovetop", time: "4–6 min", grind: "Medium-fine, not espresso-fine",
    note: "A small stovetop pot, a deep brew, and a familiar morning ritual.", detail: "Stovetop · Deep & aromatic",
    ingredients: ["Coffee to loosely fill your pot’s basket", "Water to the maker’s fill line, below the valve"], equipment: "Moka pot, suitable stove, coffee grinder",
    steps: [{ title: "Fill the base", text: "Follow your pot’s instructions. Add water to its fill line without covering the safety valve." }, { title: "Fill, never tamp", text: "Loosely fill the basket with moka-ground coffee and level it. Do not compress the grounds. Clean the rim and assemble securely." }, { title: "Use gentle heat", text: "Heat on low to medium. Keep the flame under the base, away from the handle, and attend the pot as the coffee rises." }, { title: "Finish softly", text: "Remove from heat as the flow becomes pale and begins to sputter. Pour the coffee; let the pot cool fully before opening it." }],
    tip: "Use the full basket and the correct water level for your pot’s size. It makes concentrated coffee, not machine espresso.", source: { label: "Bialetti · Moka Express instructions", url: "https://m.media-amazon.com/images/I/913VOwvygKL.pdf" },
  },
  {
    id: "turkish", name: "Turkish Coffee", mood: "An older kind of slow", temperature: "warm", family: "Stovetop", time: "3–4 min", grind: "Extra-fine, powdery",
    note: "Finely ground coffee, gently heated in a cezve. Rich tradition, served unsweetened.", detail: "Cezve · Unfiltered · Sade",
    ingredients: ["7 g extra-fine coffee", "70 ml cool filtered water"], equipment: "Cezve / ibrik, small cup, low heat source",
    steps: [{ title: "Bring them together", text: "Add 70 ml cool water and 7 g powder-fine coffee to the cezve. Stir to combine. This version is sade: without sugar." }, { title: "Warm slowly", text: "Set over low heat. Let the coffee warm gently rather than rushing it into a rolling boil." }, { title: "Watch the foam", text: "As a fine foam rises toward the rim, lift the cezve away from the heat. Do not let it boil over." }, { title: "Pour & settle", text: "Pour gently into a small cup. Give the grounds about a minute to settle before drinking; leave the sediment at the bottom.", seconds: 60 }],
    tip: "The coffee is not filtered. That soft sediment belongs at the bottom of the cup.", source: { label: "illy · Turkish coffee preparation", url: "https://illy.com.au/pages/how-to-make-turkish-coffee" },
  },
  {
    id: "iced-americano", name: "Iced Americano", mood: "A brighter pause", temperature: "iced", family: "Espresso", time: "2–3 min", grind: "Fine",
    note: "Espresso, cool water, and clear ice. Honest character with a crisp change of pace.", detail: "Espresso · Water · Ice",
    ingredients: ["18 g coffee, yielding about 36 g espresso", "120 ml cold filtered water", "100 g ice made from water"], equipment: "Espresso machine, grinder, scale, glass",
    steps: [shot, { title: "Build the chill", text: "Add 100 g ice and 120 ml cold water to a glass with enough room for the espresso." }, { title: "Pour the coffee", text: "Gently pour the fresh shot over the cold water and ice." }, { title: "Bring it together", text: "Stir once and taste. Add a splash more cold water if you want a lighter cup." }],
    tip: "Use plain water ice. Larger cubes melt a little more slowly.", source: espressoSource,
  },
  {
    id: "cold-brew", name: "Cold Brew", mood: "For the long afternoon", temperature: "iced", family: "Immersion", time: "12–16 hr", grind: "Coarse",
    note: "Time does the work. A mellow brew steeped in cool water, never heated.", detail: "Cool water · Long steep",
    ingredients: ["50 g coarse coffee", "600 g cold filtered water", "Plain ice to serve, optional"], equipment: "Clean covered jar or cold-brew bottle, strainer and paper filter, refrigerator",
    steps: [{ title: "Combine", text: "Add 50 g coarse coffee and 600 g cold water to a clean jar. Stir gently to wet all the grounds." }, { title: "Let time work", text: "Cover and refrigerate for 12–16 hours. This recipe is a ready-to-drink starting point, not a strong concentrate." }, { title: "Filter patiently", text: "Strain the grounds, then pass the coffee through a paper filter if you want a cleaner cup. Do not squeeze the grounds." }, { title: "Serve cold", text: "Taste chilled, with plain ice if you like. Dilute with a little water to your preference and keep the remaining brew refrigerated." }],
    tip: "A coarser grind makes filtering easier. Start a batch the evening before you want it.", source: harioSource,
  },
  {
    id: "japanese-iced", name: "Japanese Iced Coffee", mood: "Freshly brewed, flash chilled", temperature: "iced", family: "Filter", time: "2½–3½ min", grind: "Medium-fine",
    note: "Hot filter coffee lands straight on ice, capturing a bright, aromatic cup.", detail: "Hot extraction · Instant chill",
    ingredients: ["20 g coffee", "200 g hot filtered water at about 93°C", "120 g plain ice in the server"], equipment: "V60, paper filter, heatproof server, kettle, grinder, scale",
    steps: [{ title: "Prepare the cold half", text: "Rinse the filter and discard that water. Put 120 g ice in the server, then place the dripper on top and add 20 g coffee." }, { title: "Bloom", text: "Wet the grounds with 40 g hot water. Wait about 30 seconds.", seconds: 30 }, { title: "Brew onto ice", text: "Pour slowly in stages until you have added 200 g hot water in total. Let the coffee drain directly onto the ice." }, { title: "Swirl & serve", text: "Swirl until most of the ice melts. Pour into a glass; add a little fresh ice if needed." }],
    tip: "The ice is part of the recipe’s total water. Do not brew a full hot-water recipe and simply add lots of ice.", source: harioSource,
  },
  {
    id: "iced-aeropress", name: "Iced AeroPress", mood: "A little summer ritual", temperature: "iced", family: "Immersion", time: "2 min", grind: "Medium-fine",
    note: "A concentrated press, chilled and opened up with water. Bright and refreshing.", detail: "Pressed · Chilled · Clear",
    ingredients: ["18 g coffee", "120 g hot filtered water at about 90°C", "80 g plain ice + 40 g cold water"], equipment: "AeroPress, paper filter, sturdy heatproof mug, scale, glass",
    steps: [{ title: "Set up upright", text: "Fasten the filtered cap and stand the AeroPress on a sturdy heatproof mug. Add 18 g coffee." }, { title: "Brew stronger", text: "Add 120 g hot water and stir gently. Insert the plunger to make a seal and steep for 60 seconds.", seconds: 60 }, { title: "Press slowly", text: "Press gently into the mug over about 30 seconds. Never press onto a fragile drinking glass." }, { title: "Chill & dilute", text: "In a separate glass, combine 80 g ice and 40 g cold water. Pour the brewed coffee over it and stir." }],
    tip: "The sturdy brewing mug takes the pressure; the drinking glass only receives the finished coffee.", source: { label: "AeroPress · Flash-brewed iced coffee", url: "https://aeropress.com/blogs/aeropress-recipes/japanese-coffee" },
  },
  {
    id: "sparkling-espresso", name: "Sparkling Espresso", mood: "A little unexpected", temperature: "iced", family: "Espresso", time: "2–3 min", grind: "Fine",
    note: "Espresso meets plain sparkling water. A lively cup with absolutely no syrup or tonic.", detail: "Espresso · Unsweetened bubbles",
    ingredients: ["18 g coffee, yielding about 36 g espresso", "120 ml plain unsweetened sparkling water", "80–100 g plain ice"], equipment: "Espresso machine, grinder, scale, tall glass",
    steps: [shot, { title: "Add ice & bubbles", text: "Put the ice in a tall glass, then slowly add 120 ml cold plain sparkling water. Leave generous space at the top." }, { title: "Pour slowly", text: "Let the espresso cool briefly, then pour it gently over the back of a spoon into the glass. It may foam as it meets the bubbles." }, { title: "Sip while lively", text: "Give it one gentle stir and enjoy while the carbonation is fresh." }],
    tip: "Choose plain sparkling water with no sweeteners. Tonic water is a different ingredient and often contains sugar.",
  },
  {
    id: "nitro-cold-brew", name: "Nitro Cold Brew", mood: "Texture, without the milk", temperature: "iced", family: "Nitrogen", time: "12–16 hr + dispensing", grind: "Coarse for the base",
    note: "Cold brew with a cascading nitrogen texture. A soft coffee head, with no dairy involved.", detail: "Black cold brew · Nitrogen",
    ingredients: ["Chilled, finely filtered black cold brew", "Food-grade nitrogen specified for your nitro device"], equipment: "A purpose-built nitro cold-brew dispenser; its manufacturer-approved gas and instructions",
    steps: [{ title: "Make the base", text: "Prepare unsweetened cold brew: steep 50 g coarse coffee in 600 g cold water in the refrigerator for 12–16 hours, then strain." }, { title: "Filter & chill", text: "Paper-filter the brew to remove fine particles, and chill it thoroughly. Follow your dispenser’s required coffee strength and temperature." }, { title: "Use the right equipment", text: "Fill and charge a purpose-built nitro coffee dispenser only as its manufacturer instructs. Use its specified food-grade nitrogen; do not improvise pressure vessels or substitute gas cartridges." }, { title: "Watch the cascade", text: "Dispense into a clean glass as directed. Serve without ice to enjoy the cascading bubbles and natural coffee head." }],
    tip: "This one needs specialist equipment. Its texture comes from nitrogen, not milk, cream, or sugar.",
  },
];
export const coffeeCollection = {
  warm: coffees.filter(coffee => coffee.temperature === "warm"),
  iced: coffees.filter(coffee => coffee.temperature === "iced"),
};
export const coffeeImage = (coffee: Coffee) => `/coffee/${coffee.id}.jpg`;
