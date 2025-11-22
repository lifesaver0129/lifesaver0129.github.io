import React from 'react';

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link?: string;
};

type Experience = {
  title: string;
  place: string;
  period: string;
  focus: string;
  highlights: string[];
};

const projects: Project[] = [
  {
    title: 'Realtime Observability Platform',
    subtitle: 'Telemetry at scale',
    description:
      'Unified ingestion, tracing, and alerting that keeps noisy signals out of the way while surfacing the incidents that matter.',
    tags: ['distributed systems', 'stream processing', 'reliability'],
    link: 'https://github.com/lifesaver0129',
  },
  {
    title: 'Decisioning Engine',
    subtitle: 'Policy-as-code for product teams',
    description:
      'Built a rules engine with feature flags, audit trails, and dry-run modes so teams can iterate quickly without trading off safety.',
    tags: ['architecture', 'typescript', 'governance'],
    link: 'https://github.com/lifesaver0129',
  },
  {
    title: 'Developer Experience Suite',
    subtitle: 'Paved path for shipping',
    description:
      'Golden paths for services, batteries-included observability, and zero-touch deploys that reduce time-to-first-signal for new repos.',
    tags: ['platform engineering', 'tooling', 'mentorship'],
    link: 'https://github.com/lifesaver0129',
  },
  {
    title: 'Safety & Integrity Toolkit',
    subtitle: 'Trustworthy user experiences',
    description:
      'Content safety signals, feature-level gating, and feedback loops that make it easier to build for the happy path and the hard edges.',
    tags: ['trust & safety', 'ml signals', 'product quality'],
    link: 'https://github.com/lifesaver0129',
  },
];

const experiences: Experience[] = [
  {
    title: 'Senior Software Engineer',
    place: 'Microsoft · Link to Windows | CXE | E+D · Beijing, China',
    period: 'Sep 2025 — Present',
    focus: 'Owning Windows-to-phone continuity experiences with an emphasis on reliability and calm UX.',
    highlights: [
      'Leading feature development and quality bars for Link to Windows, partnering across Windows and Android teams.',
      'Driving instrumentation and experimentation to improve cross-device engagement and retention.',
      'Coaching engineers on design, observability-first delivery, and incident playbooks.',
    ],
  },
  {
    title: 'Software Engineer 2',
    place: 'Microsoft · Link to Windows | MMX | STCA | E+D · Beijing, China',
    period: 'Dec 2021 — Aug 2025',
    focus: 'Shipped core Link to Windows capabilities with measurable gains in reliability and user activation.',
    highlights: [
      'Improved stability and perf across device-link flows, reducing user drop-off during onboarding.',
      'Partnered with PM/design on experiments to lift retention and session success rates.',
      'Contributed to cross-team initiatives between Windows and Android for feature parity and quality.',
    ],
  },
  {
    title: 'Software Engineer',
    place: 'Microsoft · Microsoft Launcher | MMX | STCA | E+D · Beijing, China',
    period: 'Jul 2019 — Nov 2021',
    focus: 'Delivered features for Microsoft Launcher with an eye on reliability and delightful UX.',
    highlights: [
      'Owned end-to-end features from design through rollout and telemetry validation.',
      'Collaborated with product to tune experiences for daily active users while keeping crash rates down.',
      'Partnered with platform and services teams to keep client experiences performant and responsive.',
    ],
  },
];

const writing = [
  {
    title: 'Technical Notes & Essays',
    description: 'Occasional writing about engineering decisions, product bets, and lessons from production outages.',
    link: 'https://www.jianshu.com/users/3ce636a7ff80/timeline',
  },
  {
    title: 'Open Source',
    description: 'Reusable patterns and tooling I maintain in the open. Always happy to collaborate.',
    link: 'https://github.com/lifesaver0129',
  },
  {
    title: 'LinkedIn Updates',
    description: 'Shorter updates, talks, and ways to reach me.',
    link: 'https://www.linkedin.com/in/yuxinghu/',
  },
];

const heroFocus = [
  {
    title: 'Systems with clarity',
    copy: 'Simple interfaces over robust internals. I default to boring tech and great instrumentation.',
  },
  {
    title: 'Inclusive leadership',
    copy: 'Pairing, clear RFCs, and feedback loops so teams ship faster together.',
  },
  {
    title: 'Impact with intent',
    copy: 'Aligning engineering bets to business metrics, not vanity dashboards.',
  },
];

const toolkit = ['TypeScript', 'React', 'Go', 'Node.js', 'Kubernetes', 'Azure', 'PostgreSQL', 'Redis', 'GraphQL', 'Kafka'];

const Badge = ({ label }: { label: string }) => <span className="badge">{label}</span>;

const App: React.FC = () => {
  return (
    <div className="page">
      <header className="top-nav">
        <div className="brand">lifesaverHUB</div>
        <nav>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#writing">Writing</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero__content">
            <p className="eyebrow">Yuxing Hu · Senior Software Engineer</p>
            <h1>Shipping reliable products with calm, intentional engineering.</h1>
            <p className="lede">
              I design and build systems that stay fast under load, come with great defaults, and keep teams focused on outcomes instead of
              busywork. Currently shipping cross-device experiences on Link to Windows at Microsoft.
            </p>
            <div className="actions">
              <a className="button" href="#work">
                See the work
              </a>
              <a className="button ghost" href="https://github.com/lifesaver0129" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
            <div className="hero__grid">
              {heroFocus.map((item) => (
                <div className="hero-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__visual">
            <div className="visual-card">
              <p>Product-minded engineering</p>
              <h2>Built for users, measured in impact.</h2>
              <div className="chips">
                <Badge label="Resilience" />
                <Badge label="Observability" />
                <Badge label="DX" />
              </div>
            </div>
            <div className="visual-image">
              <img src="/images/pic01.jpg" alt="Yuxing Hu" />
            </div>
          </div>
        </section>

        <section className="panel" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Leading teams through ambiguity to reliable launches.</h2>
            <p className="lede">
              From prototyping to production hardening, I partner closely with product and data teams to deliver systems that earn trust.
            </p>
          </div>
          <div className="timeline">
            {experiences.map((item) => (
              <article className="timeline-card" key={item.title}>
                <header>
                  <div>
                    <p className="eyebrow">{item.place}</p>
                    <h3>{item.title}</h3>
                  </div>
                  <span className="period">{item.period}</span>
                </header>
                <p className="focus">{item.focus}</p>
                <ul>
                  {item.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" id="work">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>Systems, platforms, and experiments that moved the needle.</h2>
          </div>
          <div className="grid">
            {projects.map((project) => (
              <article className="card" key={project.title}>
                <div className="card__header">
                  <div>
                    <p className="eyebrow">{project.subtitle}</p>
                    <h3>{project.title}</h3>
                  </div>
                  {project.link && (
                    <a className="inline-link" href={project.link} target="_blank" rel="noreferrer">
                      View
                    </a>
                  )}
                </div>
                <p className="card__description">{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <Badge label={tag} key={tag} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel toolkit">
          <div className="section-heading">
            <p className="eyebrow">Toolkit</p>
            <h2>Pragmatic stack, tuned for delivery.</h2>
            <p className="lede">I default to proven tools and observability-first development to de-risk launches.</p>
          </div>
          <div className="chips">
            {toolkit.map((item) => (
              <Badge label={item} key={item} />
            ))}
          </div>
        </section>

        <section className="panel" id="writing">
          <div className="section-heading">
            <p className="eyebrow">Signals</p>
            <h2>Writing, open source, and where to follow along.</h2>
          </div>
          <div className="grid grid--three">
            {writing.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p className="card__description">{item.description}</p>
                <a className="inline-link" href={item.link} target="_blank" rel="noreferrer">
                  Explore
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="panel contact" id="contact">
          <div className="contact__content">
            <p className="eyebrow">Let&apos;s build</p>
            <h2>Working on something user-centric and technically bold?</h2>
            <p className="lede">I love pairing early on problems to find the simplest path to reliable impact.</p>
            <div className="actions">
              <a className="button" href="https://www.linkedin.com/in/yuxinghu/" target="_blank" rel="noreferrer">
                Connect on LinkedIn
              </a>
              <a className="button ghost" href="https://github.com/lifesaver0129" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
          <div className="contact__visual">
            <img src="/images/pic02.jpg" alt="Working session" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <p className="eyebrow">lifesaverHUB</p>
          <p className="lede">Built with React + TypeScript. Always iterating.</p>
        </div>
        <div className="footer__links">
          <a href="https://github.com/lifesaver0129" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/yuxinghu/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://www.jianshu.com/users/3ce636a7ff80/timeline" target="_blank" rel="noreferrer">
            Writing
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
