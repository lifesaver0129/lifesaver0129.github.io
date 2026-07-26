import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { travelTrips } from './src/travel/trips';

const travelInputs = Object.fromEntries(
  travelTrips.map((trip) => [trip.slug, resolve(__dirname, trip.slug, 'index.html')]),
);

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...travelInputs,
      },
    },
  },
});
