import type { TravelConfig } from '../types';

export const seoulTrip: TravelConfig = {
  slug: 'seoul',
  countryName: 'South Korea · Seoul',
  theme: {
    ink: '#18263a',
    inkRgb: '24, 38, 58',
    cream: '#e8edf0',
    creamRgb: '232, 237, 240',
    paper: '#fbf8f2',
    paperRgb: '251, 248, 242',
    accent: '#d54a3f',
    accentRgb: '213, 74, 63',
    secondary: '#aab9c3',
  },
  brand: {
    code: 'KR',
    year: '24',
  },
  home: {
    kicker: 'FIELD NOTE · DEC 2023—JAN 2024',
    title: 'New year beneath Seoul’s winter lights.',
    description:
      'Three winter days between Myeongdong, Yeouido, and Gangnam—good food, Seoul shopping, and a New Year’s turn.',
    actionLabel: 'Open the Seoul itinerary',
  },
  hero: {
    kicker: 'SEOUL · NEW YEAR 2024',
    title: ['Winter streets,', 'midnight lights.'],
    intro:
      'A quick New Year escape through Seoul: Myeongdong on arrival, a full day across Yeouido and Gangnam, then one last city stop before flying home.',
    stamp: {
      number: '03',
      label: 'DAYS IN SEOUL',
      dates: '30 DEC — 01 JAN',
      ariaLabel: 'Trip dates December 30, 2023 to January 1, 2024',
    },
    facts: [
      { value: '01', label: 'winter city' },
      { value: '02', label: 'flight legs' },
      { value: '02', label: 'nights away' },
    ],
  },
  route: {
    kicker: 'THE SEOUL ROUTE',
    title: 'Myeongdong, Yeouido, then Gangnam.',
    mapAriaLabel: 'Interactive map of the Seoul itinerary',
    center: [37.535, 126.965],
    zoom: 10,
    minZoom: 9,
    roads: [
      [
        [37.4602, 126.4407],
        [37.5636, 126.9869],
        [37.5219, 126.9245],
        [37.5254, 127.0286],
        [37.4602, 126.4407],
      ],
    ],
    flights: [],
  },
  itinerary: {
    kicker: 'DAY BY DAY',
    title: 'The Seoul itinerary.',
    days: [
      {
        id: 'dec-30',
        date: 'DEC 30',
        day: 'SATURDAY',
        place: 'Beijing → Seoul · Myeongdong',
        coordinate: [37.5636, 126.9869],
        entries: [
          {
            type: 'flight',
            title: 'Beijing → Seoul',
            detail: 'Beijing to Seoul · airfare for two travelers',
            cost: 3622,
            costNote: 'CNY 1,811 each · shared round-trip fare',
            costShared: true,
          },
          {
            type: 'drive',
            title: 'Uber',
            detail: 'Airport and city transfer',
            cost: 100,
          },
          {
            type: 'food',
            title: 'Airport dining',
            detail: 'Arrival-day meal',
            cost: 227,
          },
          {
            type: 'stay',
            title: 'Moxy Seoul, Myeongdong',
            cost: 717,
            costNote: '1 night',
          },
        ],
      },
      {
        id: 'dec-31',
        date: 'DEC 31',
        day: 'SUNDAY',
        place: 'Yeouido → Gangnam',
        coordinate: [37.5254, 127.0286],
        entries: [
          {
            type: 'drive',
            title: 'Seoul subway',
            detail: 'City travel across the day',
            cost: 162,
          },
          {
            type: 'food',
            title: 'Yeouido Minari Samgyeop',
            cost: 899,
          },
          {
            type: 'food',
            title: 'Kyochon Chicken',
            cost: 186,
          },
          {
            type: 'visit',
            title: 'Seoul shopping',
            detail: 'The North Face · Hyundai Department Store · Aueohom Poodiumin',
          },
          {
            type: 'food',
            title: 'Andaz room service + B',
            cost: 1260,
          },
          {
            type: 'stay',
            title: 'Andaz Seoul Gangnam',
            cost: 659,
            costNote: '1 night',
          },
        ],
      },
      {
        id: 'jan-1',
        date: 'JAN 01',
        day: 'MONDAY',
        place: 'Gangnam → Seoul Incheon → Beijing',
        coordinate: [37.4602, 126.4407],
        entries: [
          {
            type: 'visit',
            title: 'Gentle Monster',
            detail: 'New Year’s Day shopping stop',
          },
          {
            type: 'food',
            title: 'Airport dining',
            detail: 'Departure-day meal',
            cost: 160,
          },
          {
            type: 'flight',
            title: 'Seoul → Beijing',
            detail: 'Seoul Incheon to Beijing · return leg',
            cost: 3622,
            costNote: 'Shared round-trip fare',
            costShared: true,
          },
        ],
      },
    ],
  },
  costs: {
    currency: 'CNY',
    summaries: {
      all: { label: 'Trip total · 2 people', total: 12277 },
      flight: { label: 'Flights total · 2 people', total: 3622 },
      drive: { label: 'Ground transport total', total: 262 },
      food: { label: 'Dining total', total: 2733 },
      stay: { label: 'Stays total', total: 1376 },
      visit: { label: 'Experiences total', total: 0 },
    },
    other: [
      { filter: 'all', category: 'Purchases', item: 'The North Face', cost: 1633 },
      { filter: 'all', category: 'Purchases', item: 'Hyundai Department Store clothing', cost: 904 },
      { filter: 'all', category: 'Purchases', item: 'Aueohom Poodiumin', cost: 115 },
      { filter: 'all', category: 'Purchases', item: 'Gentle Monster', cost: 1632 },
    ],
    note: 'Hotels 1,376 · transport 3,884 · dining 2,733 · purchases 4,284',
  },
  footer: {
    mark: 'SEOUL / 23—24',
    note: 'Mapped from three winter days in Seoul over New Year 2024.',
  },
};
