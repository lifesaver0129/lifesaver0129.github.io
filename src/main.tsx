import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const isNewZealandRoute = window.location.pathname.replace(/\/+$/, '') === '/newzealand';
const NewZealand = React.lazy(() => import('./NewZealand'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {isNewZealandRoute ? (
      <React.Suspense fallback={null}>
        <NewZealand />
      </React.Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>,
);
