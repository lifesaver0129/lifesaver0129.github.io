import React from 'react';
import { travelTrips } from './travel/trips';

type Experience = {
  title: string;
  place: string;
  period: string;
  focus: string;
};

const experiences: Experience[] = [
  {
    title: 'Software Engineer',
    place: 'Microsoft',
    period: 'JUL 2019 — NOW',
    focus:
      'Building dependable cross-device experiences across Windows and Android—from client features and onboarding through reliability, experimentation, telemetry, retention, and calm daily use.',
  },
  {
    title: 'M.S. Computer Science',
    place: 'Georgia Institute of Technology · OMSCS',
    period: '2019 — 2022',
    focus:
      'Studied scalable systems and human-centered computing while working full time and applying the lessons directly in production.',
  },
  {
    title: 'B.Eng. Computer Science',
    place: 'Southern University of Science and Technology',
    period: '2015 — 2019',
    focus: 'Built foundations in software engineering, algorithms, applied research, and hardware-software systems.',
  },
];

const App: React.FC = () => (
  <div className="hub-site">
    <header className="hub-header">
      <a className="hub-brand" href="#top" aria-label="lifesaverHub home">
        lifesaver<span>Hub</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#about">Profile</a>
        <a href="#journey">Journey</a>
        <a href="#experience">Experience</a>
      </nav>
    </header>

    <main>
      <section className="hub-hero" id="top">
        <div className="hub-hero__copy">
          <p className="hub-kicker">YUXING HU</p>
          <h1>
            Building the
            <br />
            invisible parts
            <br />
            <em>people trust.</em>
          </h1>
          <p className="hub-intro">
            I shape cross-device products and the dependable systems behind them—turning complicated
            engineering into experiences that feel clear, fast, and unsurprising.
          </p>
          <div className="hub-actions">
            <a href="#experience">
              View experience <span aria-hidden="true">↓</span>
            </a>
            <a href={`/${travelTrips[0].slug}/`}>
              Explore latest journey <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hub-hero__graphic" aria-hidden="true">
          <span className="hub-orbit hub-orbit--outer" />
          <span className="hub-orbit hub-orbit--inner" />
          <span className="hub-orbit__dot hub-orbit__dot--one" />
          <span className="hub-orbit__dot hub-orbit__dot--two" />
          <p>
            <span>PRODUCT</span>
            <span>SYSTEMS</span>
            <span>RELIABILITY</span>
          </p>
        </div>
      </section>

      <section className="hub-profile" id="about" aria-labelledby="profile-title">
        <p className="hub-profile__eyebrow">THE SHORT VERSION</p>
        <h2 id="profile-title">
          Product-minded engineering,
          <br />
          from interface to infrastructure.
        </h2>
        <div className="hub-profile__details">
          <p>
            My work lives where client experience, platform thinking, and measurable product outcomes
            overlap. I care about the edge cases, the launch plan, and what the telemetry says afterward.
          </p>
          <dl>
            <div>
              <dt>BASE</dt>
              <dd>Beijing · building globally</dd>
            </div>
            <div>
              <dt>FOCUS</dt>
              <dd>Cross-device products</dd>
            </div>
            <div>
              <dt>MODE</dt>
              <dd>Systems · reliability · impact</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="hub-travels" id="journey" aria-labelledby="travels-title">
        <header>
          <p className="hub-kicker">TRAVEL JOURNALS</p>
          <h2 id="travels-title">Journeys, mapped.</h2>
        </header>
        <div className="hub-journey-list">
          {travelTrips.map((trip) => {
            const titleId = `journey-${trip.slug}-title`;

            return (
              <article className="hub-journey" aria-labelledby={titleId} key={trip.slug}>
                <div className="hub-journey__heading">
                  <p className="hub-kicker">{trip.home.kicker}</p>
                  <h3 id={titleId}>{trip.home.title}</h3>
                </div>
                <div className="hub-journey__details">
                  <p>{trip.home.description}</p>
                  <a href={`/${trip.slug}/`}>
                    {trip.home.actionLabel} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="hub-experience" id="experience" aria-labelledby="experience-title">
        <header>
          <p className="hub-kicker">EXPERIENCE</p>
          <h2 id="experience-title">
            Products, platforms,
            <br />
            and the path between.
          </h2>
          <p>
            A career built across client details and system health—making ambitious experiences dependable
            enough for daily use.
          </p>
        </header>

        <div className="hub-timeline">
          {experiences.map((item) => (
            <article key={`${item.title}-${item.period}`}>
              <div className="hub-timeline__date">{item.period}</div>
              <div className="hub-timeline__body">
                <p>{item.place}</p>
                <h3>{item.title}</h3>
                <span>{item.focus}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hub-contact" id="contact">
        <p className="hub-kicker">OPEN CHANNEL</p>
        <h2>Let’s make the complicated feel obvious.</h2>
        <div>
          <p>
            I’m always interested in thoughtful systems, useful products, and the teams bringing them
            together.
          </p>
          <div className="hub-contact__links" aria-label="External profiles">
            <a href="https://github.com/lifesaver0129" target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/yuxinghu/" target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer className="hub-footer">
      <div>
        <span>lifesaverHub</span>
        <p>Yuxing Hu</p>
      </div>
      <a href="#top">Back to top ↑</a>
    </footer>
  </div>
);

export default App;
