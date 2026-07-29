import type { TravelConfig } from '../types';
import { newZealandTrip } from './newZealand';
import { seoulTrip } from './seoul';
import { singaporeTrip } from './singapore';
import { usEastTrip } from './usEast';
import { usWestTrip } from './usWest';

export const travelTrips: TravelConfig[] = [
  usEastTrip,
  seoulTrip,
  usWestTrip,
  singaporeTrip,
  newZealandTrip,
];

export const findTripByPath = (pathname: string) => {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return travelTrips.find((trip) => trip.slug === slug);
};
