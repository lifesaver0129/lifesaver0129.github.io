import type { TravelConfig } from '../types';

export const jejuTrip: TravelConfig = {
  slug: 'jeju',
  countryName: 'South Korea · Jeju',
  theme: {
    ink: '#0b4f6c',
    inkRgb: '11, 79, 108',
    cream: '#fff7e6',
    creamRgb: '255, 247, 230',
    paper: '#fffdf8',
    paperRgb: '255, 253, 248',
    accent: '#ffad42',
    accentRgb: '255, 173, 66',
    secondary: '#cd2e3a',
  },
  brand: {
    code: 'JJ',
    year: '26',
  },
  home: {
    kicker: 'DEC 2025—JAN 2026',
    title: 'New year on Jeju Island.',
    description:
      'Three easy winter days on Jeju—an island hotel, a full day without a fixed plan, and a table of memorable meals.',
    actionLabel: 'Open the Jeju itinerary',
  },
  hero: {
    kicker: 'JEJU · NEW YEAR 2026',
    title: ['New year,', 'island time.'],
    intro:
      'A short New Year reset built around Grand Hyatt Jeju, one unhurried island day, and the restaurants that became the trip’s landmarks.',
    stamp: {
      number: '03',
      label: 'DAYS ON JEJU',
      dates: '31 DEC — 02 JAN',
      ariaLabel: 'Trip dates December 31, 2025 to January 2, 2026',
    },
    facts: [
      { value: '01', label: 'island base' },
      { value: '08', label: 'food stops' },
      { value: '02', label: 'nights away' },
    ],
  },
  route: {
    kicker: 'THE JEJU ROUTE',
    title: 'Arrival, one open island day, then home.',
    mapAriaLabel: 'Interactive map of the Jeju itinerary',
    center: [33.42, 126.52],
    zoom: 9,
    minZoom: 8,
    roads: [
      [
        [33.5104, 126.4914],
        [33.485, 126.481],
        [33.3617, 126.5292],
        [33.485, 126.481],
        [33.5104, 126.4914],
      ],
    ],
    flights: [],
  },
  itinerary: {
    kicker: 'DAY BY DAY',
    title: 'The Jeju itinerary.',
    days: [
      {
        id: 'dec-31',
        date: 'DEC 31',
        day: 'WEDNESDAY',
        place: 'Beijing → Jeju',
        coordinate: [33.485, 126.481],
        entries: [
          {
            type: 'flight',
            title: 'Beijing → Jeju',
            detail: 'Round-trip airfare for two travelers',
            cost: 2504,
            costNote: 'CNY 1,252 each · round-trip fare',
            costShared: true,
          },
          {
            type: 'drive',
            title: 'Uber',
            detail: 'Airport and island rides · combined trip total',
            cost: 180,
          },
          { type: 'food', title: 'McDonald’s', cost: 64 },
          { type: 'food', title: 'Forty Five', cost: 225 },
          {
            type: 'stay',
            title: 'Grand Hyatt Jeju',
            cost: 1418,
            costNote: 'Night 1 of 2 · two-night total',
            costShared: true,
          },
        ],
      },
      {
        id: 'jan-1',
        date: 'JAN 01',
        day: 'THURSDAY',
        place: 'Jeju Island',
        coordinate: [33.3617, 126.5292],
        entries: [
          {
            type: 'visit',
            title: 'An open Jeju day',
            detail: 'No fixed itinerary—an unhurried New Year’s Day around the island',
          },
          { type: 'food', title: 'Barbecue', cost: 270 },
          { type: 'food', title: 'Champion Kkotge 1st Branch', cost: 216 },
          { type: 'food', title: 'BHC', cost: 243 },
          { type: 'food', title: 'Comma', cost: 42 },
          {
            type: 'stay',
            title: 'Grand Hyatt Jeju',
            cost: 1418,
            costNote: 'Night 2 of 2 · two-night total',
            costShared: true,
          },
        ],
      },
      {
        id: 'jan-2',
        date: 'JAN 02',
        day: 'FRIDAY',
        place: 'Jeju → Beijing',
        coordinate: [33.5104, 126.4914],
        entries: [
          {
            type: 'visit',
            title: 'A final Jeju morning',
            detail: 'A slow start before returning to the airport',
          },
          { type: 'food', title: 'Leizi Pump', cost: 73 },
          { type: 'food', title: 'Airport meal', cost: 150 },
          {
            type: 'flight',
            title: 'Jeju → Beijing',
            detail: 'Return leg of the round-trip itinerary',
          },
        ],
      },
    ],
  },
  costs: {
    currency: 'CNY',
    summaries: {
      all: { label: 'Trip total · 2 people · purchases excluded', total: 5659 },
      flight: { label: 'Flights total · 2 people', total: 2504 },
      drive: { label: 'Ground transport total', total: 180 },
      food: { label: 'Dining total', total: 1283 },
      stay: { label: 'Stays total', total: 1418 },
      visit: { label: 'Experiences total', total: 0 },
    },
    other: [
      { filter: 'all', category: 'Souvenirs', item: 'Cookies', cost: 274 },
    ],
    note: 'Hotels 1,418 · transport 2,684 · dining 1,283 · souvenirs 274',
  },
  footer: {
    mark: 'JEJU / 25—26',
    note: 'Mapped from three easy New Year days on Jeju Island.',
  },
};
