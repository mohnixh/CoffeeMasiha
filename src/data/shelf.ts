import type { Coffee } from './content';

export const roasters = [
  { name: 'Blue Tokai', url: 'https://bluetokaicoffee.com/collections/roasted-and-ground-coffee-beans', note: 'Estate coffees, from everyday cups to seasonal discoveries.' },
  { name: 'Toffee Coffee Roasters', url: 'https://toffeecoffeeroasters.com/', note: 'Explore their unflavoured estate coffees and roast choices.' },
  { name: 'ARAKU', url: 'https://www.arakucoffee.in/', note: 'Coffee from the Araku Valley, in the Eastern Ghats.' },
  { name: 'Subko', url: 'https://www.subko.coffee/pages/coffee', note: 'Origin-led microlots and a changing world of processes.' },
  { name: 'Naivo', url: 'https://naivo.in/', note: 'Indian and international origins, roasted in India.' },
  { name: 'KC Roasters', url: 'https://kcroasters.com/', note: 'Explore their current selection of freshly roasted coffees.' },
  { name: 'Kāpikottai', url: 'https://kapikottai.coffee/collections/popular-picks', note: 'Small-batch coffees with choices for manual and espresso brewing.' },
  { name: 'Roastery Coffee House', url: 'https://roasterycoffee.co.in/coffee-beans/', note: 'Indian estates, varied processing, and home-brewing blends.' },
  { name: 'Savorworks', url: 'https://www.savorworksroasters.com/', note: 'Another independent coffee shelf to wander through.' },
];
export type Bean = { id: string; name: string; seller: string; roast: string; tone: 'light' | 'medium' | 'dark' | 'filter'; origin: string; notes: string; process: string; thought: string; url: string };
export const beans: Bean[] = [
  { id: 'salawara', name: 'Salawara Estate', seller: 'Blue Tokai', roast: 'Light', tone: 'light', origin: 'Hassan, Karnataka', notes: 'Red apple · pear · almond', process: 'Anaerobic natural', thought: 'For a bright, fruit-led morning pour-over.', url: 'https://bluetokaicoffee.com/collections/light-roast/products/salawara-estate' },
  { id: 'signature', name: 'Signature', seller: 'ARAKU', roast: 'Medium', tone: 'medium', origin: 'Araku Valley, Andhra Pradesh', notes: 'Green pepper · cherry · dark chocolate', process: 'Washed & natural', thought: 'A rounded place to begin exploring black coffee.', url: 'https://www.arakucoffee.in/products/signature' },
  { id: 'yung-gun', name: 'Project Yung Gun', seller: 'Subko', roast: 'Light filter', tone: 'light', origin: 'Kerehaklu, Karnataka', notes: 'Orange creamsicle · green grape · caramel', process: 'Aerobic washed · Lot CW3', thought: 'For a delicate filter cup with a lively citrus edge.', url: 'https://www.subko.coffee/products/project-yung-gun-kerehaklu-cw3-aerobic-washed-light' },
  { id: 'peaberry', name: 'Peaberry Coffee', seller: 'Toffee Coffee Roasters', roast: 'Medium', tone: 'medium', origin: 'Karnataka', notes: 'Floral · bright · delicate', process: 'Peaberry selection', thought: 'A lighter-bodied direction for an unhurried manual brew.', url: 'https://toffeecoffeeroasters.com/products/peaberry-coffee-medium-roast' },
  { id: 'yelnoorkhan', name: 'Yelnoorkhan Estate', seller: 'Naivo', roast: 'Filter', tone: 'filter', origin: 'India', notes: 'Black tea · marmalade · orange blossom', process: 'Anaerobic washed', thought: 'A tea-like direction for a slow pour or an iced filter.', url: 'https://naivo.in/product/yelnoorkhan-estate-anaerobic-washed/' },
  { id: 'attikan', name: 'Attikan Estate', seller: 'Blue Tokai', roast: 'Medium-dark', tone: 'dark', origin: 'Biligiri Hills, Karnataka', notes: 'Dark chocolate · figs · roasted almond', process: 'Washed', thought: 'A starting point for a chocolate-toned Americano or moka pot.', url: 'https://bluetokaicoffee.com/collections/roasted-and-ground-coffee-beans/products/attikan-estate' },
  { id: 'baarbara', name: 'Baarbara Estate', seller: 'Toffee Coffee Roasters', roast: 'Light to medium', tone: 'medium', origin: 'Baarbara Estate, India', notes: 'Almond · cocoa · honey', process: 'Estate coffee', thought: 'For a gentle, rounded cup that leaves room to linger.', url: 'https://toffeecoffeeroasters.com/products/baarbara-estate-coffee-copy' },
  { id: 'vienna', name: 'Vienna Roast', seller: 'Blue Tokai', roast: 'Dark', tone: 'dark', origin: 'Chikmagalur & Shevaroys', notes: 'Cocoa · oaky · bittersweet', process: 'Washed', thought: 'For those who enjoy a distinctly bitter, heavier black cup.', url: 'https://bluetokaicoffee.com/collections/roasted-and-ground-coffee-beans/products/vienna-roast' },
];
export function matchingBeans(coffee: Coffee) {
  const ids = coffee.family === 'Espresso' || coffee.family === 'Stovetop' ? ['attikan', 'signature']
    : coffee.grind.startsWith('Coarse') ? ['vienna', 'baarbara']
    : coffee.family === 'Filter' ? ['yung-gun', 'yelnoorkhan'] : ['salawara', 'peaberry'];
  return ids.map(id => beans.find(bean => bean.id === id)!);
}
