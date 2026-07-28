import type { CSSProperties } from 'react';
import { travelTrips } from './travel/trips';

type JourneyCardStyle = CSSProperties & {
  '--journey-accent': string;
};

const JourneysPage = () => (
  <div className="hub-site journeys-site">
    <header className="hub-header">
      <a className="hub-brand" href="/" aria-label="lifesaverHub home">
        lifesaver<span>Hub</span>
      </a>
    </header>

    <main>
      <section className="journeys-hero" id="top" aria-labelledby="journeys-title">
        <div>
          <p className="hub-kicker">TRAVEL JOURNAL ARCHIVE</p>
          <h1 id="journeys-title">
            Every journey,
            <br />
            <em>mapped.</em>
          </h1>
          <p>
            An evolving collection of routes, daily plans, stays, meals, and trip costs—kept in one
            place and ordered from newest to oldest.
          </p>
        </div>
        <dl aria-label="Journal archive summary">
          <div>
            <dt>{String(travelTrips.length).padStart(2, '0')}</dt>
            <dd>Journeys</dd>
          </div>
          <div>
            <dt>{travelTrips.reduce((total, trip) => total + trip.itinerary.days.length, 0)}</dt>
            <dd>Days mapped</dd>
          </div>
        </dl>
      </section>

      <section className="journeys-index" aria-labelledby="journeys-index-title">
        <header>
          <p className="hub-kicker">NEWEST TO OLDEST</p>
          <h2 id="journeys-index-title">All itineraries.</h2>
        </header>

        <div className="journeys-list">
          {travelTrips.map((trip) => {
            const titleId = `archive-${trip.slug}-title`;
            const style: JourneyCardStyle = {
              '--journey-accent': trip.theme.accent,
            };

            return (
              <article className="journeys-card" style={style} aria-labelledby={titleId} key={trip.slug}>
                <div className="journeys-card__heading">
                  <p>{trip.home.kicker}</p>
                  <h3 id={titleId}>{trip.home.title}</h3>
                </div>
                <div className="journeys-card__details">
                  <ul aria-label={`${trip.countryName} trip summary`}>
                    <li>{trip.countryName}</li>
                    <li>{trip.hero.stamp.dates}</li>
                    <li>{trip.itinerary.days.length} days</li>
                  </ul>
                  <p>{trip.home.description}</p>
                  <a href={`/${trip.slug}/`}>
                    Open itinerary <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>

    <footer className="hub-footer">
      <div>
        <span>lifesaverHub</span>
        <p>Travel journal archive</p>
      </div>
      <a href="/">Return home ←</a>
    </footer>
  </div>
);

export default JourneysPage;
