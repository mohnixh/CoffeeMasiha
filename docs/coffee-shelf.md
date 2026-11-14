# Coffee shelf

The homepage `#shelf` section is an independent Indian seller directory and curated bean guide. Product URLs in `src/data/shelf.ts` are the source of each listing's roast, origin and tasting descriptions. Reviewed 14 November 2026 against official seller pages. Brew pairings are editorial suggestions, not personal tasting reviews. No affiliate parameters, checkout, or live-stock claims are displayed. Verified 250 g pack prices are dated snapshots; listings without a verified pack price link directly to the seller. Search matches names, roasters, origins, notes, and processes; filters combine roast, roaster, and suggested brew method.

Also consulted Blue Tokai's official articles: https://bluetokaicoffee.com/blogs/blue-tokai-coffee-roasters/why-different-grind-sizes and https://bluetokaicoffee.com/blogs/blue-tokai-coffee-roasters/the-basics-of-different-roast-levels . Grind starting points reuse the existing recipes. Check seasonal products periodically before updating this date.

## Image

Asset: `public/shelf-beans.jpg`. Mode: new image, built-in image generation; converted to JPEG for delivery. Illustrative still life, not a product photograph.

Prompt: Create a premium editorial coffee still life photograph for the CoffeeMasiha website, landscape 3:2. A shallow handmade dark espresso-brown ceramic dish full of roasted coffee beans, a small copper coffee scoop with a few grounds, and loose beans on a warm travertine tabletop. Cropped close, elegant diagonal composition, bowl on right half, lower left showing linen folds and sparse coffee beans. Soft late afternoon window light from upper left, long delicate shadows on textured cocoa-brown plaster, warm parchment and copper palette. Intimate, quiet, tactile, restrained independent coffee journal art direction. Realistic bean anatomy, beautiful irregular ceramics, subtle analog grain, exquisite natural detail. No cup of brewed coffee, no milk, no sugar, no green, no packaging, no logos, no lettering, no watermark, no graphic overlays.

The shelf is integrated after The cups. Three in-page views share one section. The old `/shelf` URL redirects to `/#shelf`. Recipe buttons carry their coffee selection into the grind view and use the shared Lenis instance to scroll after the dialog closes. Reduced-motion visitors receive an instant scroll.

## November refresh

Removed Blue Tokai Salawara Estate because its product page lists all pack sizes as unavailable, and removed KC Roasters from the directory because its homepage no longer exposes a shop. Added the following current Roastery Coffee House listings, including their official packaging photographs:

- Mandalkhan Estate: https://roasterycoffee.co.in/product/mandalkhan-estate-2/ — 250 g ₹650; washed, medium roast.
- C & T Estate: https://roasterycoffee.co.in/product/c-t-estate/ — 250 g ₹750; anoxic fermented washed, light to medium roast.
- Cold Brew Blend: https://roasterycoffee.co.in/product/cold-brew-blend/ — 250 g ₹650; washed and honey blend.

The roaster's public variant data confirmed the three 250 g options in stock during this review. Other displayed 250 g prices: Attikan ₹700, Vienna ₹650, Project Yung Gun ₹1,095, Yelnoorkhan ₹720, from the linked product pages. ARAKU and Toffee pack prices are omitted because their exact 250 g variant prices were not verified. Packaging sources are recorded in `bean-image-sources.txt`; new images are compressed to 900 px wide JPEGs.

Lenis was updated from 1.3.26 to 1.3.27 (https://github.com/darkroomengineering/lenis/releases/tag/v1.3.27). The existing shared animation loop remains; anchor navigation stops leftover inertia, and the loop pauses in hidden tabs. The opening photo now recedes with a transform instead of animating its layout dimensions. Native touch and live reduced-motion preferences are preserved. Shelf browsing uses visible results, a compact sticky section chooser, and single-column cards on phones. Obsolete standalone shelf styling was removed.
