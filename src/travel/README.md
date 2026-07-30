# Adding a journey

The travel site has one shared renderer (`TravelPage.tsx`) and one configuration
file per trip under `trips/`.

For a new trip:

1. Add a `TravelConfig` file with its story, map coordinates, itinerary, costs,
   and theme.
2. Register it in `trips/index.ts`.
3. Add `<slug>/index.html` with that trip's title, description, and favicon.

The Vite build discovers registered trip paths automatically. The page renderer
provides the responsive map, day navigation, filters, cost disclosures, and
animations for every trip.

## Cost rule

Displayed trip costs exclude personal purchases. Do not add purchase items to
`costs.other`, and set the `all` summary to the source total excluding
purchases. Souvenirs and travel preparation costs remain part of the trip total.
The shared renderer also hides any cost row categorized as `Purchases`.

## Color direction

Use the destination's national flag as the starting point, not as the entire
palette. Choose one dark flag color for structure and one brighter flag color
for accents, then pair them with warm neutral paper and background tones. Check
text contrast before finalizing the theme.
