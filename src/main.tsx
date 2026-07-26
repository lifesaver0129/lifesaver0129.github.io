import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { findTripByPath } from './travel/trips';

const activeTrip = findTripByPath(window.location.pathname);
const TravelPage = React.lazy(() => import('./travel/TravelPage'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {activeTrip ? (
      <React.Suspense fallback={null}>
        <TravelPage key={activeTrip.slug} trip={activeTrip} />
      </React.Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>,
);
