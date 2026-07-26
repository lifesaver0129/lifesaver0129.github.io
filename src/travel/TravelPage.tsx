import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './travel.css';
import { EntryType, Filter, TravelConfig } from './types';

const entryMeta: Record<EntryType, { icon: string; label: string }> = {
  flight: { icon: "✈", label: "Flight" },
  drive: { icon: "↗", label: "Drive" },
  food: { icon: "🍴", label: "Food" },
  stay: { icon: "⌂", label: "Stay" },
  visit: { icon: "✦", label: "Experience" },
};

const filters: { value: Filter; label: string }[] = [
  { value: "flight", label: "Flights" },
  { value: "drive", label: "Road trip" },
  { value: "food", label: "Food" },
  { value: "stay", label: "Stays" },
  { value: "visit", label: "Experiences" },
];

const costFormatter = new Intl.NumberFormat("en-US");

const numberedIcon = (number: number, active: boolean) =>
  L.divIcon({
    className: 'travel-marker-wrap',
    html: `<span class="travel-marker${active ? ' is-active' : ''}">${number}</span>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

const MapFocus = ({
  coordinate,
  focusZoom,
}: {
  coordinate: LatLngExpression;
  focusZoom: number;
}) => {
  const map = useMap();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const size = map.getSize();
      if (!Number.isFinite(size.x) || !Number.isFinite(size.y) || size.x <= 0 || size.y <= 0) return;

      map.stop();
      map.invalidateSize();
      map.flyTo(coordinate, Math.max(map.getZoom(), focusZoom), { duration: 0.8 });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [coordinate, focusZoom, map]);

  return null;
};

const RouteMap = ({
  trip,
  selectedDay,
  onSelectDay,
}: {
  trip: TravelConfig;
  selectedDay: number;
  onSelectDay: (index: number) => void;
}) => {
  const { itinerary, route, theme } = {
    itinerary: trip.itinerary.days,
    route: trip.route,
    theme: trip.theme,
  };

  return (
    <MapContainer
      className="route-map"
      center={route.center}
      zoom={route.zoom}
      minZoom={route.minZoom}
      scrollWheelZoom
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={route.road} pathOptions={{ color: theme.accent, weight: 4, opacity: 0.9 }} />
      {route.flights.map((flightRoute, index) => (
        <Polyline
          key={index}
          positions={flightRoute}
          pathOptions={{ color: theme.ink, weight: 2, opacity: 0.65, dashArray: '8 10' }}
        />
      ))}
      {route.road.map((coordinate, index) => (
        <CircleMarker
          key={`road-${index}`}
          center={coordinate}
          radius={3.5}
          pathOptions={{ color: theme.paper, fillColor: theme.accent, fillOpacity: 1, weight: 1 }}
        />
      ))}
      {itinerary.map((item, index) => (
        <Marker
          key={item.id}
          position={item.coordinate}
          icon={numberedIcon(index + 1, index === selectedDay)}
          eventHandlers={{ click: () => onSelectDay(index) }}
          zIndexOffset={index === selectedDay ? 1000 : 0}
        >
          <Tooltip direction="top" offset={[0, -18]}>
            <strong>{item.date}</strong>
            <br />
            {item.place}
          </Tooltip>
        </Marker>
      ))}
      <MapFocus coordinate={itinerary[selectedDay].coordinate} focusZoom={route.zoom + 1} />
    </MapContainer>
  );
};

const TravelPage = ({ trip }: { trip: TravelConfig }) => {
  const itinerary = trip.itinerary.days;
  const otherTripCosts = trip.costs.other;
  const currency = trip.costs.currency;
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedDay, setSelectedDay] = useState(0);
  const [mapCardExpanded, setMapCardExpanded] = useState(false);
  const [showCosts, setShowCosts] = useState(false);
  const [otherCostsExpanded, setOtherCostsExpanded] = useState(false);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const visibleDays = useMemo(
    () =>
      itinerary
        .map((item, index) => ({
          ...item,
          originalIndex: index,
          entries: filter === 'all' ? item.entries : item.entries.filter((entry) => entry.type === filter),
        }))
        .filter((item) => item.entries.length > 0),
    [filter],
  );
  const visibleOtherTripCosts =
    filter === 'all'
      ? otherTripCosts
      : otherTripCosts.filter((expense) => expense.filter === filter);
  const visibleCostSummary = trip.costs.summaries[filter];
  const themeStyle = {
    '--travel-ink': trip.theme.ink,
    '--travel-ink-rgb': trip.theme.inkRgb,
    '--travel-cream': trip.theme.cream,
    '--travel-cream-rgb': trip.theme.creamRgb,
    '--travel-paper': trip.theme.paper,
    '--travel-paper-rgb': trip.theme.paperRgb,
    '--travel-accent': trip.theme.accent,
    '--travel-accent-rgb': trip.theme.accentRgb,
    '--travel-secondary': trip.theme.secondary,
  } as CSSProperties;

  const selectDay = (index: number, scroll = false) => {
    setSelectedDay(index);
    if (scroll) {
      cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectMapDay = (index: number) => {
    selectDay(index);
    setMapCardExpanded(false);
  };

  const showMap = (centerMap = false) => {
    setMapCardExpanded(false);

    if (centerMap) {
      window.requestAnimationFrame(() => {
        document
          .querySelector('.travel-map-shell')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  };

  return (
    <div className="travel-site" style={themeStyle}>
      <header className="travel-header">
        <a className="travel-brand" href="/" aria-label="Back to lifesaverHub">
          <span>{trip.brand.code}</span>
          <span className="travel-brand__year">{trip.brand.year}</span>
        </a>
        <nav aria-label="Trip sections">
          <a href="#route">Route</a>
          <a href="#itinerary">Itinerary</a>
        </nav>
        <a className="travel-back" href="/">
          <span aria-hidden="true">←</span> lifesaverHub
        </a>
      </header>

      <main>
        <section className="travel-hero" id="top">
          <div className="travel-hero__copy">
            <p className="travel-kicker">{trip.hero.kicker}</p>
            <h1>
              {trip.hero.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="travel-intro">{trip.hero.intro}</p>
            <div className="travel-hero__actions">
              <a
                className="travel-cta"
                href="#route"
                onClick={(event) => {
                  const isNarrowLayout = window.matchMedia('(max-width: 700px)').matches;
                  if (isNarrowLayout) event.preventDefault();
                  showMap(isNarrowLayout);
                }}
              >
                Explore by map <span aria-hidden="true">↘</span>
              </a>
              <a
                className="travel-cta travel-cta--secondary"
                href="#itinerary"
                onClick={() => setMapCardExpanded(false)}
              >
                Explore by day <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="travel-hero__stamp" aria-label={trip.hero.stamp.ariaLabel}>
            <span className="travel-hero__number">{trip.hero.stamp.number}</span>
            <span className="travel-hero__label">{trip.hero.stamp.label}</span>
            <span className="travel-hero__dates">{trip.hero.stamp.dates}</span>
          </div>
          <div className="travel-hero__facts">
            {trip.hero.facts.map((fact) => (
              <div key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="travel-route" id="route" aria-labelledby="route-title">
          <div className="travel-section-heading">
            <div>
              <p className="travel-kicker">{trip.route.kicker}</p>
              <h2 id="route-title">{trip.route.title}</h2>
            </div>
          </div>

          <div className="travel-route-layout">
            <div
              className="travel-map-shell"
              role="region"
              aria-label={trip.route.mapAriaLabel}
            >
              <RouteMap
                trip={trip}
                selectedDay={selectedDay}
                onSelectDay={selectMapDay}
              />
              <div
                className={`travel-map-card ${mapCardExpanded ? 'is-expanded' : ''}`}
                aria-live="polite"
              >
                <button
                  className="travel-map-card__toggle"
                  type="button"
                  aria-expanded={mapCardExpanded}
                  aria-controls="map-itinerary-panel"
                  onClick={() => setMapCardExpanded((expanded) => !expanded)}
                >
                  <span className="travel-map-card__meta">
                    <span>DAY {String(selectedDay + 1).padStart(2, '0')}</span>
                    <small>{itinerary[selectedDay].date.replace(' ', ' · ')}</small>
                    <i aria-hidden="true">{mapCardExpanded ? '−' : '+'}</i>
                  </span>
                  <strong>{itinerary[selectedDay].place}</strong>
                </button>
                <nav className="travel-map-card__nav" aria-label="Navigate map itinerary days">
                  <button
                    type="button"
                    disabled={selectedDay === 0}
                    onClick={() => selectDay(selectedDay - 1)}
                    aria-label={
                      selectedDay === 0
                        ? 'No previous day'
                        : `Previous day: ${itinerary[selectedDay - 1].date}, ${itinerary[selectedDay - 1].place}`
                    }
                  >
                    <span aria-hidden="true">←</span>
                    <small>Previous</small>
                  </button>
                  <button
                    type="button"
                    disabled={selectedDay === itinerary.length - 1}
                    onClick={() => selectDay(selectedDay + 1)}
                    aria-label={
                      selectedDay === itinerary.length - 1
                        ? 'No next day'
                        : `Next day: ${itinerary[selectedDay + 1].date}, ${itinerary[selectedDay + 1].place}`
                    }
                  >
                    <small>Next</small>
                    <span aria-hidden="true">→</span>
                  </button>
                </nav>
                <div
                  className="travel-map-card__entries"
                  id="map-itinerary-panel"
                  aria-hidden={!mapCardExpanded}
                >
                  <div>
                    {itinerary[selectedDay].entries.map((entry, index) => (
                      <div
                        className={`travel-map-mini-entry travel-map-mini-entry--${entry.type}`}
                        key={`${entry.title}-${index}`}
                      >
                        <span className="travel-map-mini-entry__icon" aria-hidden="true">
                          {entryMeta[entry.type].icon}
                        </span>
                        <div>
                          <span className="travel-map-mini-entry__type">{entryMeta[entry.type].label}</span>
                          <strong>{entry.title}</strong>
                          {entry.detail && <small>{entry.detail}</small>}
                          {showCosts && entry.cost && (
                            <small className="travel-map-mini-entry__cost">
                              {currency} {costFormatter.format(entry.cost)}
                              {entry.costShared ? ' · shared fare' : ''}
                            </small>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="travel-map-key" aria-label="Map legend">
                <span><i className="is-road" /> Road</span>
                <span><i className="is-flight" /> Flight</span>
              </div>
            </div>

            <aside className="travel-route-panel" aria-live="polite" aria-label="Selected day itinerary">
              <div className="travel-route-panel__meta">
                <span>DAY {String(selectedDay + 1).padStart(2, '0')}</span>
                <small>{itinerary[selectedDay].date.replace(' ', ' · ')}</small>
              </div>
              <h3>{itinerary[selectedDay].place}</h3>
              {(itinerary[selectedDay].weather || itinerary[selectedDay].temperature) && (
                <div className="travel-route-panel__weather">
                  <span aria-hidden="true">
                    {itinerary[selectedDay].weather === 'Sunny'
                      ? '☀'
                      : itinerary[selectedDay].weather === 'Rainy'
                        ? '☂'
                        : '◒'}
                  </span>
                  <span>{itinerary[selectedDay].weather}</span>
                  <strong>{itinerary[selectedDay].temperature}</strong>
                </div>
              )}
              <div className="travel-route-panel__entries">
                {itinerary[selectedDay].entries.map((entry, index) => (
                  <div
                    className={`travel-map-mini-entry travel-map-mini-entry--${entry.type}`}
                    key={`${entry.title}-${index}`}
                  >
                    <span className="travel-map-mini-entry__icon" aria-hidden="true">
                      {entryMeta[entry.type].icon}
                    </span>
                    <div>
                      <span className="travel-map-mini-entry__type">{entryMeta[entry.type].label}</span>
                      <strong>{entry.title}</strong>
                      {entry.detail && <small>{entry.detail}</small>}
                      {showCosts && entry.cost && (
                        <small className="travel-map-mini-entry__cost">
                          {currency} {costFormatter.format(entry.cost)}
                          {entry.costShared ? ' · shared fare' : ''}
                        </small>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <nav className="travel-route-panel__nav" aria-label="Navigate itinerary days">
                <button
                  type="button"
                  disabled={selectedDay === 0}
                  onClick={() => selectMapDay(selectedDay - 1)}
                  aria-label={
                    selectedDay === 0
                      ? 'No previous day'
                      : `Previous day: ${itinerary[selectedDay - 1].date}, ${itinerary[selectedDay - 1].place}`
                  }
                >
                  <span aria-hidden="true">←</span>
                  <small>Previous</small>
                </button>
                <button
                  type="button"
                  disabled={selectedDay === itinerary.length - 1}
                  onClick={() => selectMapDay(selectedDay + 1)}
                  aria-label={
                    selectedDay === itinerary.length - 1
                      ? 'No next day'
                      : `Next day: ${itinerary[selectedDay + 1].date}, ${itinerary[selectedDay + 1].place}`
                  }
                >
                  <small>Next</small>
                  <span aria-hidden="true">→</span>
                </button>
              </nav>
            </aside>
          </div>
        </section>

        <section className="travel-itinerary" id="itinerary" aria-labelledby="itinerary-title">
          <div className="travel-section-heading travel-section-heading--itinerary">
            <div>
              <p className="travel-kicker">{trip.itinerary.kicker}</p>
              <h2 id="itinerary-title">{trip.itinerary.title}</h2>
            </div>
          </div>

          <div className="travel-filter-stack">
            <div className="travel-filters" aria-label="Filter itinerary">
              <div className="travel-filter-list">
                {filters.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={filter === item.value ? 'is-active' : ''}
                    aria-pressed={filter === item.value}
                    onClick={() => {
                      setFilter(filter === item.value ? 'all' : item.value);
                      setOtherCostsExpanded(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="travel-cost-bar">
              <div className="travel-cost-control">
                <button
                  className="travel-cost-toggle"
                  type="button"
                  aria-pressed={showCosts}
                  onClick={() => {
                    setShowCosts((visible) => !visible);
                    setOtherCostsExpanded(false);
                  }}
                >
                  <span>Show costs</span>
                  <i aria-hidden="true">
                    <b />
                  </i>
                </button>
                {showCosts && (
                  <p className="travel-cost-total" aria-live="polite">
                    <small>{visibleCostSummary.label}</small>
                    <strong>{currency} {costFormatter.format(visibleCostSummary.total)}</strong>
                    {filter === 'all' && trip.costs.note && <em>{trip.costs.note}</em>}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="travel-timeline">
            {visibleDays.map((item) => (
              <article
                key={item.id}
                ref={(element) => {
                  cardRefs.current[item.originalIndex] = element;
                }}
                className={`travel-day ${selectedDay === item.originalIndex ? 'is-selected' : ''}`}
                onMouseEnter={() => setSelectedDay(item.originalIndex)}
              >
                <button
                  className="travel-day__selector"
                  type="button"
                  onClick={() => selectDay(item.originalIndex)}
                  aria-label={`Show ${item.date}, ${item.place} on the map`}
                >
                  <span className="travel-day__number">{String(item.originalIndex + 1).padStart(2, '0')}</span>
                  <span className="travel-day__date">
                    <strong>{item.date}</strong>
                    <small>{item.day}</small>
                  </span>
                </button>

                <div className="travel-day__content">
                  <header>
                    <h3>{item.place}</h3>
                    {item.weather && (
                      <div className="travel-weather">
                        <span aria-hidden="true">{item.weather === 'Sunny' ? '☀' : item.weather === 'Rainy' ? '☂' : '◒'}</span>
                        <span>{item.weather}</span>
                        <strong>{item.temperature}</strong>
                      </div>
                    )}
                  </header>

                  <div className="travel-entries">
                    {item.entries.map((entry, index) => (
                      <div className={`travel-entry travel-entry--${entry.type}`} key={`${entry.title}-${index}`}>
                        <span className="travel-entry__icon" aria-hidden="true">{entryMeta[entry.type].icon}</span>
                        <div>
                          <span className="travel-entry__type">{entryMeta[entry.type].label}</span>
                          <strong>{entry.title}</strong>
                          {entry.detail && <p>{entry.detail}</p>}
                          {showCosts && entry.cost && (
                            <p className="travel-entry__cost">
                              <span>
                                {currency} {costFormatter.format(entry.cost)}
                                {entry.costShared ? ' · shared fare' : ''}
                              </span>
                              {entry.costNote && <small>{entry.costNote}</small>}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {showCosts && visibleOtherTripCosts.length > 0 && (
            <aside
              className={`travel-other-costs ${otherCostsExpanded ? 'is-expanded' : ''}`}
              aria-labelledby="other-costs-title"
            >
              <header>
                <button
                  type="button"
                  aria-expanded={otherCostsExpanded}
                  aria-controls="other-costs-list"
                  onClick={() => setOtherCostsExpanded((expanded) => !expanded)}
                >
                  <span>
                    <small className="travel-kicker">OTHER TRIP COSTS</small>
                    <strong id="other-costs-title">Not tied to a specific day.</strong>
                  </span>
                  <span className="travel-other-costs__summary">
                    Included in the {currency} {costFormatter.format(visibleCostSummary.total)}{' '}
                    {filter === 'all' ? 'trip' : filters.find((item) => item.value === filter)?.label.toLowerCase()} total for 2 people.
                  </span>
                  <i aria-hidden="true">+</i>
                </button>
              </header>
              <div
                className="travel-other-costs__body"
                id="other-costs-list"
                aria-hidden={!otherCostsExpanded}
              >
                <div>
                  <div className="travel-other-costs__list">
                    {visibleOtherTripCosts.map((expense) => (
                      <div className="travel-other-cost" key={`${expense.category}-${expense.item}`}>
                        <span>{expense.category}</span>
                        <div>
                          <strong>{expense.item}</strong>
                          {expense.detail && <small>{expense.detail}</small>}
                        </div>
                        <b>{currency} {costFormatter.format(expense.cost)}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </section>
      </main>

      <footer className="travel-footer">
        <div>
          <span className="travel-footer__mark">{trip.footer.mark}</span>
          <p>{trip.footer.note}</p>
        </div>
        <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top ↑
        </a>
      </footer>
    </div>
  );
};

export default TravelPage;
