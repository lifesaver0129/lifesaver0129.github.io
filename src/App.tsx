import React from 'react';

type Experience = {
  title: string;
  place: string;
  period: string;
  focus: string;
};

const experiences: Experience[] = [
  {
    title: 'Senior Software Engineer',
    place: 'Microsoft · Link to Windows',
    period: 'SEP 2025 — NOW',
    focus:
      'Owning Windows-to-phone continuity experiences with an emphasis on reliability, instrumentation, and calm user experience.',
  },
  {
    title: 'Software Engineer 2',
    place: 'Microsoft · Link to Windows',
    period: 'DEC 2021 — AUG 2025',
    focus:
      'Shipped core cross-device capabilities and improved stability, onboarding, experimentation, and retention across Windows and Android.',
  },
  {
    title: 'Software Engineer',
    place: 'Microsoft · Microsoft Launcher',
    period: 'JUL 2019 — NOV 2021',
    focus:
      'Owned client features from design through rollout, using production telemetry to keep daily experiences fast and dependable.',
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
      <a className="hub-brand" href="#top" aria-label="lifesaverHUB home">
        <span>YH</span>
        <span>HUB</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#about">Profile</a>
        <a href="#journey">Journey</a>
        <a href="#experience">Experience</a>
      </nav>
      <a
        className="hub-header__contact"
        href="https://www.linkedin.com/in/yuxinghu/"
        target="_blank"
        rel="noreferrer"
      >
        Connect <span aria-hidden="true">↗</span>
      </a>
    </header>

    <main>
      <section className="hub-hero" id="top">
        <div className="hub-hero__copy">
          <p className="hub-kicker">YUXING HU · SENIOR SOFTWARE ENGINEER</p>
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
            <a href="/newzealand/">
              Explore New Zealand ’23 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hub-hero__graphic" aria-hidden="true">
          <span className="hub-orbit hub-orbit--outer" />
          <span className="hub-orbit hub-orbit--inner" />
          <span className="hub-orbit__dot hub-orbit__dot--one" />
          <span className="hub-orbit__dot hub-orbit__dot--two" />
          <strong>01</strong>
          <p>
            PRODUCT
            <br />
            SYSTEMS
            <br />
            RELIABILITY
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

      <section className="hub-journey" id="journey" aria-labelledby="journey-title">
        <div className="hub-journey__index" aria-hidden="true">
          <span>02</span>
          <small>PERSONAL PROJECT</small>
        </div>
        <div className="hub-journey__copy">
          <p className="hub-kicker">FIELD NOTE · MAY 2023</p>
          <h2 id="journey-title">A road trip, reconstructed day by day.</h2>
          <p>
            An interactive record of nine days across Aotearoa—from Auckland’s harbour to Tekapo’s dark
            skies, Aoraki / Mount Cook, and rain-softened Queenstown.
          </p>
          <a href="/newzealand/">
            Open the interactive itinerary <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hub-journey__route" aria-hidden="true">
          <div className="hub-route-line" />
          <span className="hub-route-stop hub-route-stop--one">AKL</span>
          <span className="hub-route-stop hub-route-stop--two">CHC</span>
          <span className="hub-route-stop hub-route-stop--three">TEKAPO</span>
          <span className="hub-route-stop hub-route-stop--four">ZQN</span>
          <strong>09</strong>
          <small>DAYS · TWO ISLANDS</small>
        </div>
      </section>

      <section className="hub-experience" id="experience" aria-labelledby="experience-title">
        <header>
          <p className="hub-kicker">EXPERIENCE · 03</p>
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
          {experiences.map((item, index) => (
            <article key={`${item.title}-${item.period}`}>
              <span className="hub-timeline__number">{String(index + 1).padStart(2, '0')}</span>
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
        <p className="hub-kicker">OPEN CHANNEL · 04</p>
        <h2>Let’s make the complicated feel obvious.</h2>
        <div>
          <p>
            I’m always interested in thoughtful systems, useful products, and the teams bringing them
            together.
          </p>
          <a href="https://www.linkedin.com/in/yuxinghu/" target="_blank" rel="noreferrer">
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>

    <footer className="hub-footer">
      <div>
        <span>lifesaverHUB</span>
        <p>Yuxing Hu · Beijing</p>
      </div>
      <nav aria-label="Social links">
        <a href="https://github.com/lifesaver0129" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/yuxinghu/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </nav>
      <a href="#top">Back to top ↑</a>
    </footer>
  </div>
);

export default App;
