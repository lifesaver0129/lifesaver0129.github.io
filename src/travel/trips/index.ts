import type { TravelConfig } from '../types';
import { newZealandTrip } from './newZealand';
import { usWestTrip } from './usWest';

export const travelTrips: TravelConfig[] = [
  usWestTrip,
  newZealandTrip,
];

export const findTripByPath = (pathname: string) => {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return travelTrips.find((trip) => trip.slug === slug);
};
