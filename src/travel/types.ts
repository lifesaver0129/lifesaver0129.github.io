export type Coordinate = [number, number];
export type EntryType = 'flight' | 'drive' | 'food' | 'stay' | 'visit';
export type Filter = 'all' | EntryType;

export type TravelEntry = {
  type: EntryType;
  title: string;
  detail?: string;
  cost?: number;
  costNote?: string;
  costShared?: boolean;
};

export type TravelDay = {
  id: string;
  date: string;
  day: string;
  place: string;
  weather?: string;
  temperature?: string;
  coordinate: Coordinate;
  entries: TravelEntry[];
};

export type TravelTheme = {
  ink: string;
  inkRgb: string;
  cream: string;
  creamRgb: string;
  paper: string;
  paperRgb: string;
  accent: string;
  accentRgb: string;
  secondary: string;
};

export type CostSummary = {
  label: string;
  total: number;
};

export type OtherTripCost = {
  filter: Filter;
  category: string;
  item: string;
  detail?: string;
  cost: number;
};

export type TravelConfig = {
  slug: string;
  countryName: string;
  theme: TravelTheme;
  brand: {
    code: string;
    year: string;
  };
  home: {
    kicker: string;
    title: string;
    description: string;
    actionLabel: string;
  };
  hero: {
    kicker: string;
    title: string[];
    intro: string;
    stamp: {
      number: string;
      label: string;
      dates: string;
      ariaLabel: string;
    };
    facts: Array<{
      value: string;
      label: string;
    }>;
  };
  route: {
    kicker: string;
    title: string;
    mapAriaLabel: string;
    center: Coordinate;
    zoom: number;
    minZoom: number;
    roads: Coordinate[][];
    flights: Coordinate[][];
  };
  itinerary: {
    kicker: string;
    title: string;
    days: TravelDay[];
  };
  costs: {
    currency: string;
    summaries: Record<Filter, CostSummary>;
    other: OtherTripCost[];
    note?: string;
  };
  footer: {
    mark: string;
    note: string;
  };
};
