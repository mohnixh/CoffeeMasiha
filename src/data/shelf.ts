import type { Coffee } from './content';

export const shelfReviewed = '14 November 2026';
export const brewStyles = [
  { id: 'filter', label: 'Pour-over' },
  { id: 'immersion', label: 'AeroPress & French press' },
  { id: 'espresso', label: 'Espresso & moka pot' },
  { id: 'cold', label: 'Cold brew' },
] as const;
export type BrewStyle = typeof brewStyles[number]['id'];

export const roasters = [
  { name: 'Blue Tokai', url: 'https://bluetokaicoffee.com/collections/roasted-and-ground-coffee-beans', note: 'Estate coffees, from everyday cups to seasonal discoveries.' },
  { name: 'Toffee Coffee Roasters', url: 'https://toffeecoffeeroasters.com/', note: 'Explore their unflavoured estate coffees and roast choices.' },
  { name: 'ARAKU', url: 'https://www.arakucoffee.in/', note: 'Coffee from the Araku Valley, in the Eastern Ghats.' },
  { name: 'Subko', url: 'https://www.subko.coffee/pages/coffee', note: 'Origin-led microlots and a changing world of processes.' },
  { name: 'Naivo', url: 'https://naivo.in/', note: 'Indian and international origins, roasted in India.' },
  { name: 'Kāpikottai', url: 'https://kapikottai.coffee/collections/popular-picks', note: 'Small-batch coffees with choices for manual and espresso brewing.' },
  { name: 'Roastery Coffee House', url: 'https://roasterycoffee.co.in/coffee-beans/', note: 'Indian estates, varied processing, and home-brewing blends.' },
  { name: 'Savorworks', url: 'https://www.savorworksroasters.com/', note: 'Another independent coffee shelf to wander through.' },
];
export type Bean = { id: string; image: string; name: string; seller: string; roast: string; tone: 'light' | 'medium' | 'dark' | 'filter'; origin: string; notes: string; process: string; thought: string; url: string; brews: BrewStyle[]; price250?: number };
export const beans: Bean[] = [
  { id: 'mandalkhan', image: '/beans/mandalkhan-estate-2.jpg', name: 'Mandalkhan Estate', seller: 'Roastery Coffee House', roast: 'Medium', tone: 'medium', origin: 'Chikmagalur, Karnataka', notes: 'Caramel · chocolate · orange berry', process: 'Washed', thought: 'An easy everyday direction for a clean, balanced black coffee.', brews: ['filter', 'immersion'], price250: 650, url: 'https://roasterycoffee.co.in/product/mandalkhan-estate-2/' },
  { id: 'c-t-estate', image: '/beans/c-t-estate.jpg', name: 'C & T Estate', seller: 'Roastery Coffee House', roast: 'Light to medium', tone: 'light', origin: 'Chikmagalur, Karnataka', notes: 'Mixed berries · orange zest · milk chocolate', process: 'Anoxic fermented washed', thought: 'A fruit-led pour with a softer chocolate finish. Milk chocolate is a tasting note, not an ingredient.', brews: ['filter', 'immersion'], price250: 750, url: 'https://roasterycoffee.co.in/product/c-t-estate/' },
  { id: 'cold-brew-blend', image: '/beans/cold-brew-blend.jpg', name: 'Cold Brew Blend', seller: 'Roastery Coffee House', roast: 'Filter', tone: 'filter', origin: 'Chikmagalur, Karnataka', notes: 'Caramel · chocolate', process: 'Washed & honey blend', thought: 'For a slow overnight steep and a mellow glass over ice.', brews: ['cold'], price250: 650, url: 'https://roasterycoffee.co.in/product/cold-brew-blend/' },
  { id: 'signature', image: '/beans/signature.png', name: 'Signature', seller: 'ARAKU', roast: 'Medium', tone: 'medium', origin: 'Araku Valley, Andhra Pradesh', notes: 'Green pepper · cherry · dark chocolate', process: 'Washed & natural', thought: 'A rounded place to begin exploring black coffee.', brews: ['espresso', 'immersion', 'cold'], url: 'https://www.arakucoffee.in/products/signature' },
  { id: 'yung-gun', image: '/beans/yung-gun.png', name: 'Project Yung Gun', seller: 'Subko', roast: 'Light filter', tone: 'light', origin: 'Kerehaklu, Karnataka', notes: 'Orange creamsicle · green grape · caramel', process: 'Aerobic washed · Lot CW3', thought: 'For a delicate filter cup with a lively citrus edge.', brews: ['filter'], price250: 1095, url: 'https://www.subko.coffee/products/project-yung-gun-kerehaklu-cw3-aerobic-washed-light' },
  { id: 'peaberry', image: '/beans/peaberry.jpg', name: 'Peaberry Coffee', seller: 'Toffee Coffee Roasters', roast: 'Medium', tone: 'medium', origin: 'Karnataka', notes: 'Floral · bright · delicate', process: 'Peaberry selection', thought: 'A lighter-bodied direction for an unhurried manual brew.', brews: ['filter', 'immersion'], url: 'https://toffeecoffeeroasters.com/products/peaberry-coffee-medium-roast' },
  { id: 'yelnoorkhan', image: '/beans/yelnoorkhan.png', name: 'Yelnoorkhan Estate', seller: 'Naivo', roast: 'Filter', tone: 'filter', origin: 'India', notes: 'Black tea · marmalade · orange blossom', process: 'Anaerobic washed', thought: 'A tea-like direction for a slow pour or an iced filter.', brews: ['filter'], price250: 720, url: 'https://naivo.in/product/yelnoorkhan-estate-anaerobic-washed/' },
  { id: 'attikan', image: '/beans/attikan.jpg', name: 'Attikan Estate', seller: 'Blue Tokai', roast: 'Medium-dark', tone: 'dark', origin: 'Biligiri Hills, Karnataka', notes: 'Dark chocolate · figs · roasted almond', process: 'Washed', thought: 'A starting point for a chocolate-toned Americano or moka pot.', brews: ['espresso', 'immersion', 'cold'], price250: 700, url: 'https://bluetokaicoffee.com/collections/roasted-and-ground-coffee-beans/products/attikan-estate' },
  { id: 'baarbara', image: '/beans/baarbara.png', name: 'Baarbara Estate', seller: 'Toffee Coffee Roasters', roast: 'Light to medium', tone: 'medium', origin: 'Baarbara Estate, India', notes: 'Almond · cocoa · honey', process: 'Estate coffee', thought: 'For a gentle, rounded cup that leaves room to linger.', brews: ['immersion', 'cold'], url: 'https://toffeecoffeeroasters.com/products/baarbara-estate-coffee-copy' },
  { id: 'vienna', image: '/beans/vienna.jpg', name: 'Vienna Roast', seller: 'Blue Tokai', roast: 'Dark', tone: 'dark', origin: 'Chikmagalur & Shevaroys', notes: 'Cocoa · oaky · bittersweet', process: 'Washed', thought: 'A very roast-led cup. The roaster recommends it with milk; expect pronounced bitterness when brewed black.', brews: ['espresso', 'cold'], price250: 650, url: 'https://bluetokaicoffee.com/collections/roasted-and-ground-coffee-beans/products/vienna-roast' },
];
export function matchingBeans(coffee: Coffee) {
  const ids = ['cold-brew', 'nitro-cold-brew'].includes(coffee.id) ? ['cold-brew-blend', 'attikan']
    : coffee.family === 'Espresso' || coffee.family === 'Stovetop' ? ['attikan', 'signature']
    : coffee.grind.startsWith('Coarse') ? ['baarbara', 'attikan']
    : coffee.family === 'Filter' ? ['yung-gun', 'yelnoorkhan'] : ['c-t-estate', 'peaberry'];
  return ids.map(id => beans.find(bean => bean.id === id)!);
}
