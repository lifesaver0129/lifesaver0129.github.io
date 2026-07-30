import type { TravelConfig } from '../types';

export const singaporeTrip: TravelConfig = {
  slug: 'singapore',
  countryName: 'Singapore',
  theme: {
    ink: '#4b1f2a',
    inkRgb: '75, 31, 42',
    cream: '#f1e6dc',
    creamRgb: '241, 230, 220',
    paper: '#fffaf5',
    paperRgb: '255, 250, 245',
    accent: '#d94b57',
    accentRgb: '217, 75, 87',
    secondary: '#c5b7ad',
  },
  brand: {
    code: 'SG',
    year: '23',
  },
  home: {
    kicker: 'FIELD NOTE · JUNE 2023',
    title: 'Four days between skyline and Sentosa.',
    description:
      'A compact Singapore stop—Marina Bay after arrival, one full Universal Studios day, and a final city-to-Changi wander.',
    actionLabel: 'Open the Singapore itinerary',
  },
  hero: {
    kicker: 'SINGAPORE · JUNE 2023',
    title: ['Skyline days,', 'Sentosa thrills.'],
    intro:
      'A short tropical city break built around Singapore’s glowing waterfront, a full day at Universal Studios, and one last stop at Jewel before flying home.',
    stamp: {
      number: '04',
      label: 'DAYS IN SINGAPORE',
      dates: '21 JUN — 24 JUN',
      ariaLabel: 'Trip dates June 21 to June 24, 2023',
    },
    facts: [
      { value: '01', label: 'island city' },
      { value: '02', label: 'flight legs' },
      { value: '03', label: 'nights away' },
    ],
  },
  route: {
    kicker: 'THE SINGAPORE ROUTE',
    title: 'Marina Bay, Sentosa, then Changi.',
    mapAriaLabel: 'Interactive map of the Singapore itinerary',
    center: [1.31, 103.865],
    zoom: 11,
    minZoom: 10,
    roads: [
      [
        [1.2997, 103.8586],
        [1.254, 103.8238],
        [1.2816, 103.8636],
        [1.3644, 103.9915],
      ],
    ],
    flights: [],
  },
  itinerary: {
    kicker: 'DAY BY DAY',
    title: 'The Singapore itinerary.',
    days: [
      {
        id: 'jun-21',
        date: 'JUN 21',
        day: 'WEDNESDAY',
        place: 'Beijing → Singapore',
        coordinate: [1.2997, 103.8586],
        entries: [
          {
            type: 'flight',
            title: 'SQ807',
            detail: 'Beijing (PEK) → Singapore Changi (SIN)',
            cost: 4718,
            costNote: 'Round-trip airfare · 2 people',
            costShared: true,
          },
          { type: 'visit', title: 'Marina Bay evening walk' },
          {
            type: 'stay',
            title: 'Andaz Singapore',
            cost: 4200,
            costNote: '2-night total',
            costShared: true,
          },
        ],
      },
      {
        id: 'jun-22',
        date: 'JUN 22',
        day: 'THURSDAY',
        place: 'Universal Studios Singapore',
        coordinate: [1.254, 103.8238],
        entries: [
          {
            type: 'visit',
            title: 'Universal Studios Singapore',
            cost: 858,
            costNote: 'Admission · 2 people',
          },
          {
            type: 'visit',
            title: 'Universal Express Pass',
            cost: 860,
            costNote: '2 people',
          },
          { type: 'food', title: 'Universal Studios food and souvenirs', cost: 135 },
          {
            type: 'stay',
            title: 'Andaz Singapore',
            cost: 4200,
            costNote: '2-night total',
            costShared: true,
          },
        ],
      },
      {
        id: 'jun-23',
        date: 'JUN 23',
        day: 'FRIDAY',
        place: 'Singapore → Changi',
        coordinate: [1.2816, 103.8636],
        entries: [
          { type: 'visit', title: 'Singapore city walk' },
          { type: 'visit', title: 'Marina Bay and Gardens by the Bay' },
          { type: 'visit', title: 'Jewel Changi Airport' },
          {
            type: 'stay',
            title: 'YOTELAIR Singapore Changi Airport',
            cost: 1134,
            costNote: '1 night',
          },
        ],
      },
      {
        id: 'jun-24',
        date: 'JUN 24',
        day: 'SATURDAY',
        place: 'Singapore → Beijing',
        coordinate: [1.3644, 103.9915],
        entries: [
          {
            type: 'flight',
            title: 'SQ802',
            detail: 'Singapore Changi (SIN) → Beijing (PEK)',
            cost: 4718,
            costNote: 'Round-trip airfare · 2 people',
            costShared: true,
          },
        ],
      },
    ],
  },
  costs: {
    currency: 'CNY',
    summaries: {
      all: { label: 'Trip total · 2 people · purchases excluded', total: 14556 },
      flight: { label: 'Flights total · 2 people', total: 4718 },
      drive: { label: 'Ground transport total · 2 people', total: 522 },
      food: { label: 'Dining total · 2 people', total: 1409 },
      stay: { label: 'Stays total · 2 people', total: 5334 },
      visit: { label: 'Activities total · 2 people', total: 1718 },
    },
    other: [
      { filter: 'drive', category: 'Transport', item: 'Grab', cost: 522 },
      { filter: 'food', category: 'Dining', item: 'General food and beverages', cost: 1274 },
      { filter: 'all', category: 'Souvenirs', item: 'General souvenirs', detail: 'TWG tea, pineapple cake, and phone cards', cost: 855 },
    ],
  },
  footer: {
    mark: 'SINGAPORE / 23',
    note: 'Mapped from four tropical days in Singapore in June 2023.',
  },
};
