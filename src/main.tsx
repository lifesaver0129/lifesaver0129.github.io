import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FarewellPage from './FarewellPage';
import JourneysPage from './JourneysPage';
import './index.css';
import { findTripByPath } from './travel/trips';

const activeTrip = findTripByPath(window.location.pathname);
const activePath = window.location.pathname.replace(/^\/+|\/+$/g, '');
const isJourneysPage = activePath === 'journeys';
const isStandaloneFarewellTemplate = Boolean(
  (window as Window & { __FAREWELL_TEMPLATE__?: boolean }).__FAREWELL_TEMPLATE__,
);
const isFarewellPage = activePath === 'farewell' || isStandaloneFarewellTemplate;
const TravelPage = React.lazy(() => import('./travel/TravelPage'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {activeTrip ? (
      <React.Suspense fallback={null}>
        <TravelPage key={activeTrip.slug} trip={activeTrip} />
      </React.Suspense>
    ) : isFarewellPage ? (
      <FarewellPage />
    ) : isJourneysPage ? (
      <JourneysPage />
    ) : (
      <App />
    )}
  </React.StrictMode>,
);
