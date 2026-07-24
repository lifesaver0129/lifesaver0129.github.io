import { useEffect, useMemo, useRef, useState } from 'react';
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
import './newzealand.css';

type EntryType = 'flight' | 'drive' | 'food' | 'stay' | 'visit';
type Filter = 'all' | EntryType;

type Entry = {
  type: EntryType;
  title: string;
  detail?: string;
};

type Day = {
  id: string;
  date: string;
  day: string;
  place: string;
  weather?: string;
  temperature?: string;
  coordinate: LatLngExpression;
  entries: Entry[];
};

const itinerary: Day[] = [
  {
    id: 'apr-28',
    date: 'APR 28',
    day: 'FRIDAY',
    place: 'Beijing → Auckland',
    weather: 'Cloudy',
    temperature: '15–20°',
    coordinate: [-36.8509, 174.7645],
    entries: [
      {
        type: 'flight',
        title: '17:15–19:20 · MU5138',
        detail: 'Beijing Daxing (PKX) → Shanghai Pudong T1 (PVG)',
      },
      {
        type: 'flight',
        title: '00:15–15:45 · MU779',
        detail: 'Shanghai Pudong T1 (PVG) → Auckland (AKL)',
      },
      { type: 'stay', title: 'voco Auckland' },
    ],
  },
  {
    id: 'apr-29',
    date: 'APR 29',
    day: 'SATURDAY',
    place: 'Auckland → Christchurch',
    weather: 'Sunny',
    temperature: '8–20°',
    coordinate: [-43.5321, 172.6362],
    entries: [
      {
        type: 'flight',
        title: '13:00–14:25 · NZ543',
        detail: 'Auckland (AKL) → Christchurch (CHC)',
      },
      { type: 'food', title: 'Fiddlesticks Restaurant & Bar' },
      { type: 'food', title: 'Countdown Moorhouse' },
      { type: 'stay', title: 'Crowne Plaza Christchurch' },
    ],
  },
  {
    id: 'apr-30',
    date: 'APR 30',
    day: 'SUNDAY',
    place: 'Christchurch → Lake Tekapo',
    weather: 'Partly cloudy',
    temperature: '7–15°',
    coordinate: [-44.0047, 170.4771],
    entries: [
      {
        type: 'drive',
        title: 'Christchurch → Lake Tekapo',
        detail: '222 km · 2 hr 50 min',
      },
      { type: 'food', title: 'Little Pom’s Café' },
      { type: 'food', title: 'Tekapo Lake View Bar' },
      { type: 'food', title: 'Four Square Tekapo' },
      { type: 'stay', title: 'Peppers Bluewater Resort' },
    ],
  },
  {
    id: 'may-1',
    date: 'MAY 01',
    day: 'MONDAY',
    place: 'Aoraki / Mount Cook',
    weather: 'Cloudy',
    temperature: '5–10°',
    coordinate: [-43.734, 170.096],
    entries: [
      {
        type: 'drive',
        title: 'Lake Tekapo → Aoraki / Mount Cook',
        detail: '96.2 km · 1 hr 5 min',
      },
      {
        type: 'drive',
        title: 'Aoraki / Mount Cook → Lake Tekapo',
        detail: '96.2 km · 1 hr 5 min',
      },
      { type: 'food', title: 'The Greedy Cow Café' },
      { type: 'visit', title: 'Dark Sky Project' },
      { type: 'stay', title: 'Peppers Bluewater Resort' },
    ],
  },
  {
    id: 'may-2',
    date: 'MAY 02',
    day: 'TUESDAY',
    place: 'Tekapo → Queenstown',
    weather: 'Rainy',
    temperature: '9–14°',
    coordinate: [-44.611, 169.257],
    entries: [
      {
        type: 'drive',
        title: 'Lake Tekapo → Lake Hāwea',
        detail: '202 km · 2 hr 20 min',
      },
      {
        type: 'drive',
        title: 'Lake Hāwea → Queenstown',
        detail: '80 km · 1 hr 15 min',
      },
      { type: 'food', title: 'High Country Salmon' },
      { type: 'food', title: 'Flame Bar & Grill' },
      { type: 'food', title: 'Four Square Queenstown' },
      { type: 'stay', title: 'Oaks Queenstown Club Suites' },
    ],
  },
  {
    id: 'may-3',
    date: 'MAY 03',
    day: 'WEDNESDAY',
    place: 'Queenstown',
    weather: 'Rainy',
    temperature: '10–15°',
    coordinate: [-45.0312, 168.6626],
    entries: [
      { type: 'visit', title: 'Deer Park Heights' },
      { type: 'food', title: 'Saigon Kingdom' },
      { type: 'stay', title: 'Crowne Plaza Queenstown' },
    ],
  },
  {
    id: 'may-4',
    date: 'MAY 04',
    day: 'THURSDAY',
    place: 'Queenstown',
    weather: 'Rainy',
    temperature: '8–12°',
    coordinate: [-45.0312, 168.6626],
    entries: [{ type: 'stay', title: 'Crowne Plaza Queenstown' }],
  },
  {
    id: 'may-5',
    date: 'MAY 05',
    day: 'FRIDAY',
    place: 'Queenstown → Auckland',
    weather: 'Rainy',
    temperature: '16–21°',
    coordinate: [-36.8509, 174.7645],
    entries: [
      {
        type: 'flight',
        title: '09:40–11:30 · NZ614',
        detail: 'Queenstown (ZQN) → Auckland (AKL)',
      },
      { type: 'stay', title: 'Park Hyatt Auckland' },
    ],
  },
  {
    id: 'may-6',
    date: 'MAY 06',
    day: 'SATURDAY',
    place: 'Auckland → Beijing',
    coordinate: [-36.8509, 174.7645],
    entries: [
      {
        type: 'flight',
        title: '21:00–05:30 +1 · MU780',
        detail: 'Auckland (AKL) → Shanghai Pudong T1 (PVG)',
      },
      {
        type: 'flight',
        title: '09:05–11:20 +1 · MU5129',
        detail: 'Shanghai Pudong T1 (PVG) → Beijing Daxing (PKX)',
      },
    ],
  },
];

const entryMeta: Record<EntryType, { icon: string; label: string }> = {
  flight: { icon: '✈', label: 'Flight' },
  drive: { icon: '↗', label: 'Drive' },
  food: { icon: '●', label: 'Food' },
  stay: { icon: '⌂', label: 'Stay' },
  visit: { icon: '✦', label: 'Experience' },
};

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All plans' },
  { value: 'flight', label: 'Flights' },
  { value: 'drive', label: 'Road trip' },
  { value: 'food', label: 'Food' },
  { value: 'stay', label: 'Stays' },
  { value: 'visit', label: 'Experiences' },
];

const roadRoute: LatLngExpression[] = [
  [-43.5321, 172.6362],
  [-44.0047, 170.4771],
  [-43.734, 170.096],
  [-44.0047, 170.4771],
  [-44.611, 169.257],
  [-45.0312, 168.6626],
];

const flightRoutes: LatLngExpression[][] = [
  [
    [-36.8509, 174.7645],
    [-43.5321, 172.6362],
  ],
  [
    [-45.0312, 168.6626],
    [-36.8509, 174.7645],
  ],
];

const numberedIcon = (number: number, active: boolean) =>
  L.divIcon({
    className: 'nz-marker-wrap',
    html: `<span class="nz-marker${active ? ' is-active' : ''}">${number}</span>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

const MapFocus = ({ coordinate }: { coordinate: LatLngExpression }) => {
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
      map.flyTo(coordinate, Math.max(map.getZoom(), 6), { duration: 0.8 });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [coordinate, map]);

  return null;
};

const MapVisibility = ({ visible }: { visible: boolean }) => {
  const map = useMap();

  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(
        [
          [-46.1, 168],
          [-35.8, 175.9],
        ],
        { animate: false, padding: [22, 22] },
      );
    }, 120);

    return () => window.clearTimeout(timer);
  }, [map, visible]);

  return null;
};

const RouteMap = ({
  selectedDay,
  onSelectDay,
  mobileVisible,
}: {
  selectedDay: number;
  onSelectDay: (index: number) => void;
  mobileVisible: boolean;
}) => (
  <MapContainer
    className="route-map"
    center={[-41.35, 172.2]}
    zoom={5}
    minZoom={4}
    scrollWheelZoom
    zoomControl
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Polyline positions={roadRoute} pathOptions={{ color: '#e65b37', weight: 4, opacity: 0.9 }} />
    {flightRoutes.map((route, index) => (
      <Polyline
        key={index}
        positions={route}
        pathOptions={{ color: '#122b25', weight: 2, opacity: 0.65, dashArray: '8 10' }}
      />
    ))}
    {roadRoute.map((coordinate, index) => (
      <CircleMarker
        key={`road-${index}`}
        center={coordinate}
        radius={3.5}
        pathOptions={{ color: '#fff7e7', fillColor: '#e65b37', fillOpacity: 1, weight: 1 }}
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
    <MapFocus coordinate={itinerary[selectedDay].coordinate} />
    <MapVisibility visible={mobileVisible} />
  </MapContainer>
);

const NewZealand = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedDay, setSelectedDay] = useState(0);
  const [mobileView, setMobileView] = useState<'itinerary' | 'map'>('itinerary');
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

  const selectDay = (index: number, scroll = false) => {
    setSelectedDay(index);
    if (scroll) {
      cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectMapDay = (index: number) => {
    const isCompactLayout = window.matchMedia('(max-width: 700px)').matches;
    selectDay(index, !isCompactLayout);
  };

  return (
    <div className="nz-site">
      <header className="nz-header">
        <a className="nz-brand" href="/" aria-label="Back to lifesaverHUB">
          <span>NZ</span>
          <span className="nz-brand__year">23</span>
        </a>
        <nav aria-label="Trip sections">
          <a href="#route">Route</a>
          <a href="#itinerary">Itinerary</a>
        </nav>
        <a className="nz-back" href="/">
          <span aria-hidden="true">←</span> lifesaverHUB
        </a>
      </header>

      <main>
        <section className="nz-hero">
          <div className="nz-hero__copy">
            <p className="nz-kicker">AOTEAROA · AUTUMN 2023</p>
            <h1>
              Nine days,
              <br />
              two islands.
            </h1>
            <p className="nz-intro">
              From Auckland’s harbour to the alpine roads of the South Island — a compact field guide to
              every flight, stop, meal, and stay.
            </p>
            <a className="nz-cta" href="#itinerary">
              Explore the journey <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="nz-hero__stamp" aria-label="Trip dates April 28 to May 6, 2023">
            <span className="nz-hero__number">09</span>
            <span className="nz-hero__label">DAYS ON THE ROAD</span>
            <span className="nz-hero__dates">28 APR — 06 MAY</span>
          </div>
          <div className="nz-hero__facts">
            <div>
              <strong>696</strong>
              <span>km by road</span>
            </div>
            <div>
              <strong>06</strong>
              <span>flight legs</span>
            </div>
            <div>
              <strong>08</strong>
              <span>nights away</span>
            </div>
          </div>
        </section>

        <section className="nz-route" id="route" aria-labelledby="route-title">
          <div className="nz-section-heading">
            <div>
              <p className="nz-kicker">THE ROUTE</p>
              <h2 id="route-title">North to south, then home.</h2>
            </div>
            <p>
              Select a numbered stop to match the map with its day in the itinerary. Solid orange is the
              road trip; the dashed line is in the air.
            </p>
          </div>

          <div
            className={`nz-map-shell ${mobileView === 'map' ? 'is-mobile-visible' : ''}`}
            role="region"
            aria-label="Interactive map of the New Zealand itinerary"
          >
            <RouteMap
              selectedDay={selectedDay}
              onSelectDay={selectMapDay}
              mobileVisible={mobileView === 'map'}
            />
            <div className="nz-map-card" aria-live="polite">
              <span>DAY {String(selectedDay + 1).padStart(2, '0')}</span>
              <strong>{itinerary[selectedDay].place}</strong>
              <small>{itinerary[selectedDay].date.replace(' ', ' · ')}</small>
              <div className="nz-map-card__entries">
                {itinerary[selectedDay].entries.map((entry, index) => (
                  <div
                    className={`nz-map-mini-entry nz-map-mini-entry--${entry.type}`}
                    key={`${entry.title}-${index}`}
                  >
                    <span className="nz-map-mini-entry__icon" aria-hidden="true">
                      {entryMeta[entry.type].icon}
                    </span>
                    <div>
                      <span className="nz-map-mini-entry__type">{entryMeta[entry.type].label}</span>
                      <strong>{entry.title}</strong>
                      {entry.detail && <small>{entry.detail}</small>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="nz-map-key" aria-label="Map legend">
              <span><i className="is-road" /> Road</span>
              <span><i className="is-flight" /> Flight</span>
            </div>
          </div>
        </section>

        <section className="nz-itinerary" id="itinerary" aria-labelledby="itinerary-title">
          <div className="nz-section-heading nz-section-heading--itinerary">
            <div>
              <p className="nz-kicker">DAY BY DAY</p>
              <h2 id="itinerary-title">The full itinerary.</h2>
            </div>
            <p>Use the filters to turn the schedule into a quick list of flights, meals, drives, or hotels.</p>
          </div>

          <div className="nz-filters" aria-label="Filter itinerary">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                className={filter === item.value ? 'is-active' : ''}
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className={`nz-timeline ${mobileView === 'map' ? 'is-mobile-hidden' : ''}`}>
            {visibleDays.map((item) => (
              <article
                key={item.id}
                ref={(element) => {
                  cardRefs.current[item.originalIndex] = element;
                }}
                className={`nz-day ${selectedDay === item.originalIndex ? 'is-selected' : ''}`}
                onMouseEnter={() => setSelectedDay(item.originalIndex)}
              >
                <button
                  className="nz-day__selector"
                  type="button"
                  onClick={() => selectDay(item.originalIndex)}
                  aria-label={`Show ${item.date}, ${item.place} on the map`}
                >
                  <span className="nz-day__number">{String(item.originalIndex + 1).padStart(2, '0')}</span>
                  <span className="nz-day__date">
                    <strong>{item.date}</strong>
                    <small>{item.day}</small>
                  </span>
                </button>

                <div className="nz-day__content">
                  <header>
                    <h3>{item.place}</h3>
                    {item.weather && (
                      <div className="nz-weather">
                        <span aria-hidden="true">{item.weather === 'Sunny' ? '☀' : item.weather === 'Rainy' ? '☂' : '◒'}</span>
                        <span>{item.weather}</span>
                        <strong>{item.temperature}</strong>
                      </div>
                    )}
                  </header>

                  <div className="nz-entries">
                    {item.entries.map((entry, index) => (
                      <div className={`nz-entry nz-entry--${entry.type}`} key={`${entry.title}-${index}`}>
                        <span className="nz-entry__icon" aria-hidden="true">{entryMeta[entry.type].icon}</span>
                        <div>
                          <span className="nz-entry__type">{entryMeta[entry.type].label}</span>
                          <strong>{entry.title}</strong>
                          {entry.detail && <p>{entry.detail}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <div className="nz-mobile-switch" aria-label="Choose mobile view">
        <button
          type="button"
          className={mobileView === 'itinerary' ? 'is-active' : ''}
          aria-pressed={mobileView === 'itinerary'}
          onClick={() => setMobileView('itinerary')}
        >
          Itinerary
        </button>
        <button
          type="button"
          className={mobileView === 'map' ? 'is-active' : ''}
          aria-pressed={mobileView === 'map'}
          onClick={() => {
            setMobileView('map');
            document.querySelector('#route')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Map
        </button>
      </div>

      <footer className="nz-footer">
        <div>
          <span className="nz-footer__mark">NZ / 23</span>
          <p>Made from the road notes of one unforgettable autumn.</p>
        </div>
        <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top ↑
        </a>
      </footer>
    </div>
  );
};

export default NewZealand;
