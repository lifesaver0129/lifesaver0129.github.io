import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import JourneysPage from './JourneysPage';
import './index.css';
import { findTripByPath } from './travel/trips';

const activeTrip = findTripByPath(window.location.pathname);
const isJourneysPage = window.location.pathname.replace(/^\/+|\/+$/g, '') === 'journeys';
const TravelPage = React.lazy(() => import('./travel/TravelPage'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {activeTrip ? (
      <React.Suspense fallback={null}>
        <TravelPage key={activeTrip.slug} trip={activeTrip} />
      </React.Suspense>
    ) : isJourneysPage ? (
      <JourneysPage />
    ) : (
      <App />
    )}
  </React.StrictMode>,
);
