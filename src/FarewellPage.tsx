import React, { useEffect, useState } from 'react';
import './farewell.css';

type Memory = {
  image: string;
  alt: string;
  label?: string;
  caption?: string;
  className?: string;
};

type Note = {
  author: string;
  role: string;
  message: string;
  accent: string;
};

type YearStop = {
  year: number;
  label: string;
  detail: string;
};

const memoryFrames: Pick<Memory, 'image' | 'alt'>[] = [
  {
    image: '/farewell/lunch.png',
    alt: 'Avery laughing with teammates over lunch',
  },
  {
    image: '/farewell/presentation.png',
    alt: 'Avery presenting an idea to the team',
  },
  {
    image: '/farewell/coffee.png',
    alt: 'Avery smiling and holding a cup of coffee',
  },
  {
    image: '/farewell/celebration.png',
    alt: 'Avery celebrating with a group of coworkers',
  },
  {
    image: '/farewell/team-collaboration.jpg',
    alt: 'Coworkers collaborating around a table of sketches and sticky notes',
  },
  {
    image: '/farewell/launch-celebration.jpg',
    alt: 'Coworkers celebrating a successful launch with coffee and confetti',
  },
  {
    image: '/farewell/coffee-break.jpg',
    alt: 'Three coworkers laughing together over coffee',
  },
  {
    image: '/farewell/mentoring.jpg',
    alt: 'Two coworkers sharing ideas beside a laptop',
  },
  {
    image: '/farewell/park-picnic.jpg',
    alt: 'Coworkers sharing a picnic lunch in a leafy park',
  },
  {
    image: '/farewell/team-dinner.jpg',
    alt: 'Coworkers gathering for a cheerful team dinner photo',
  },
];

const yearStops: YearStop[] = [
  { year: 2019, label: 'Hello, team', detail: 'The first coffee' },
  { year: 2020, label: 'Finding a rhythm', detail: 'The lunch club begins' },
  { year: 2021, label: 'Growing together', detail: 'The big ideas arrive' },
  { year: 2022, label: 'Big ideas', detail: 'The good stuff' },
  { year: 2023, label: 'Building momentum', detail: 'The legendary launches' },
  { year: 2024, label: 'Full speed', detail: 'A very good year' },
  { year: 2025, label: 'One more chapter', detail: 'The favorite projects' },
  { year: 2026, label: 'New coordinates', detail: 'One last cheer' },
];

const yearStories: Record<number, Pick<Memory, 'label' | 'caption'>[]> = {
  2019: [
    { label: 'THE FIRST TEAM LUNCH', caption: 'New faces, shared noodles, and the start of something very good.' },
    { label: 'HELLO, WHITEBOARD', caption: 'The first idea you made clearer for everyone in the room.' },
    { label: 'WEEK ONE FUEL', caption: 'A new desk, a brave hello, and one very necessary coffee.' },
    { label: 'THE GROUP CHAT BEGINS', caption: 'Before the inside jokes had years of backstory.' },
  ],
  2020: [
    { label: 'FINDING OUR RHYTHM', caption: 'A year of adapting, learning, and finding new ways to stay close.' },
    { label: 'THE REMOTE PITCH', caption: 'You made a tiny video-call square feel like the center of the room.' },
    { label: 'HOME OFFICE FUEL', caption: 'Coffee, courage, and an impressive number of open tabs.' },
    { label: 'STILL TOGETHER', caption: 'Different desks, same generous team spirit.' },
  ],
  2021: [
    { label: 'BACK AROUND THE TABLE', caption: 'The conversations picked up exactly where we left them.' },
    { label: 'THE BIG IDEA', caption: 'A sketch, a question, and the beginning of something ambitious.' },
    { label: 'ANOTHER COFFEE RUN', caption: 'Some traditions were far too important to leave behind.' },
    { label: 'GROWING TOGETHER', caption: 'New challenges, stronger friendships, and plenty to celebrate.' },
  ],
  2022: [
    { label: 'THE FIRST TEAM LUNCH', caption: 'New faces, shared noodles, and the start of something very good.' },
    { label: 'HELLO, WHITEBOARD', caption: 'The first idea you made clearer for everyone in the room.' },
    { label: 'WEEK ONE FUEL', caption: 'A new desk, a brave hello, and one very necessary coffee.' },
    { label: 'THE GROUP CHAT BEGINS', caption: 'Before the inside jokes had years of backstory.' },
  ],
  2023: [
    { label: 'TUESDAY LUNCH CLUB', caption: 'The meeting that never needed an agenda.' },
    { label: 'THE BIG PITCH', caption: 'You asked the question that changed the whole plan.' },
    { label: 'PROTOTYPE FUEL', caption: 'Powered by oat lattes and unreasonable optimism.' },
    { label: 'WE SHIPPED IT', caption: 'Equal parts relief, pride, and very loud cheering.' },
  ],
  2024: [
    { label: 'THE LONG LUNCH', caption: 'When a quick bite became the best conversation of the week.' },
    { label: 'THE GOOD IDEA WALL', caption: 'You made complicated things feel wonderfully obvious.' },
    { label: 'CALM IN THE CHAOS', caption: 'Somehow, you always knew which problem mattered first.' },
    { label: 'THE MIDWAY CHEER', caption: 'Halfway through the story and already so much worth framing.' },
  ],
  2025: [
    { label: 'NO-AGENDA MEETING', caption: 'Good food, better gossip, and absolutely no action items.' },
    { label: 'ONE MORE AMBITIOUS IDEA', caption: 'The sketch that quietly became everyone’s favorite project.' },
    { label: 'THE 4 PM RESET', caption: 'Coffee first. Miracles shortly afterward.' },
    { label: 'A VERY GOOD YEAR', caption: 'Big launches, tiny victories, and the people who made both matter.' },
  ],
  2026: [
    { label: 'ONE LAST LUNCH', caption: 'The meeting we wished could stay on the calendar forever.' },
    { label: 'PASSING IT FORWARD', caption: 'One more generous explanation before the next adventure.' },
    { label: 'COFFEE FOR THE ROAD', caption: 'Same order, different city, brand-new view.' },
    { label: 'ONE MORE FOR THE WALL', caption: 'Proof that the best projects were always the people.' },
  ],
};

const notes: Note[] = [
  {
    author: 'Maya',
    role: 'Design',
    message:
      'Thank you for making every hard problem feel solvable—and every quiet teammate feel heard. Toronto is getting one of the very best.',
    accent: 'coral',
  },
  {
    author: 'Theo',
    role: 'Engineering',
    message:
      'I will miss your unreasonably good questions, your emergency snack drawer, and the way you somehow fixed things before the rest of us noticed.',
    accent: 'blue',
  },
  {
    author: 'Priya',
    role: 'Product',
    message:
      'This is not goodbye. It is merely a very inconvenient timezone change. Keep a seat for us by the lake.',
    accent: 'yellow',
  },
  {
    author: 'Jin',
    role: 'Operations',
    message:
      'You brought so much kindness to ordinary days. I hope this next chapter brings you the same joy you gave all of us.',
    accent: 'pink',
  },
  {
    author: 'Sam',
    role: 'Research',
    message:
      'May your winter coat be sturdy, your poutine warm, and your video calls only occasionally scheduled at impossible hours.',
    accent: 'green',
  },
  {
    author: 'The whole team',
    role: 'Your fan club',
    message:
      'Different city. Same group chat. We are so proud of you, Avery—and so excited to see where your curiosity takes you next.',
    accent: 'navy',
  },
];

const confetti = ['✦', '●', '★', '◆', '♥', '✦', '●', '★', '◆', '♥', '✦', '●'];

const FarewellPage: React.FC = () => {
  const [celebration, setCelebration] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2019);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const activeYear = yearStops.find((stop) => stop.year === selectedYear) ?? yearStops[0];
  const yearProgress = ((selectedYear - yearStops[0].year) / (yearStops.length - 1)) * 100;
  const yearOffset = selectedYear - yearStops[0].year;
  const memories = memoryFrames.map((_, index) => memoryFrames[(index + yearOffset) % memoryFrames.length]);

  useEffect(() => {
    if (previewIndex === null) return undefined;

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewIndex(null);
      if (event.key === 'ArrowLeft') {
        setPreviewIndex((index) => index === null ? null : (index - 1 + memories.length) % memories.length);
      }
      if (event.key === 'ArrowRight') {
        setPreviewIndex((index) => index === null ? null : (index + 1) % memories.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewIndex, memories.length]);

  return (
    <div className="farewell-site">
      <header className="farewell-nav">
        <a className="farewell-mark" href="#top" aria-label="Avery's farewell page home">
          A <span>→</span> A
        </a>
        <p>Beijing · 2019—2026</p>
        <a className="farewell-nav__link" href="#notes">
          Read the notes <span aria-hidden="true">↓</span>
        </a>
      </header>

      <main>
        <section className="farewell-hero" id="top" aria-labelledby="farewell-title">
          <div className="farewell-hero__copy">
            <p className="farewell-eyebrow">A FAREWELL FOR AVERY · MADE WITH A LOT OF LOVE</p>
            <h1 id="farewell-title">
              Not goodbye.
              <br />
              Just new <em>coordinates.</em>
            </h1>
            <p className="farewell-hero__intro">
              Seven brilliant years, hundreds of shared lunches, and one very exciting next chapter.
              Here’s a little corner of the internet to take with you.
            </p>
            <div className="farewell-hero__actions">
              <a href="#memories">Take the trip</a>
              <span>Approx. 10,600 km of adventure</span>
            </div>
          </div>

          <div className="farewell-route" aria-label="Choose a year from Avery's journey">
            <div className="farewell-route__summary">
              <span>PEK · Beijing</span>
              <strong>{selectedYear}</strong>
              <span>YYZ · Toronto</span>
            </div>
            <div className="farewell-route__control">
              <button
                aria-label="Show the previous year"
                disabled={selectedYear === yearStops[0].year}
                onClick={() => setSelectedYear((year) => Math.max(yearStops[0].year, year - 1))}
                type="button"
              >
                ←
              </button>
              <div
                className="farewell-flight-slider"
                style={{ '--farewell-flight-progress': `${yearProgress}%` } as React.CSSProperties}
              >
                <div className="farewell-flight-slider__track" aria-hidden="true" />
                <span className="farewell-flight-slider__plane" aria-hidden="true">✈</span>
                <input
                  aria-controls="memories"
                  aria-label="Choose the year of the photos"
                  aria-valuetext={`${selectedYear}: ${activeYear.label}`}
                  max={yearStops[yearStops.length - 1].year}
                  min={yearStops[0].year}
                  onChange={(event) => setSelectedYear(Number(event.currentTarget.value))}
                  step="1"
                  type="range"
                  value={selectedYear}
                />
                <div className="farewell-flight-slider__years" aria-hidden="true">
                  {yearStops.map((stop) => (
                    <span data-active={selectedYear === stop.year} key={stop.year}>{stop.year}</span>
                  ))}
                </div>
              </div>
              <button
                aria-label="Show the next year"
                disabled={selectedYear === yearStops[yearStops.length - 1].year}
                onClick={() => setSelectedYear((year) => Math.min(yearStops[yearStops.length - 1].year, year + 1))}
                type="button"
              >
                →
              </button>
            </div>
            <div className="farewell-route__footer">
              <span>Drag or swipe the plane</span>
              <strong>{activeYear.label} · {activeYear.detail}</strong>
              <span>Use arrows for one year</span>
            </div>
          </div>

        </section>

        <section className="farewell-memories" id="memories" aria-labelledby="memories-title">
          <header className="farewell-section-heading">
            <p className="farewell-eyebrow">{selectedYear} · {activeYear.label}</p>
            <h2 id="memories-title">The {selectedYear} camera roll.</h2>
            <p>Somewhere between the deadlines and the decks, we made a whole lot of good days.</p>
          </header>

          <div className="farewell-memory-grid" aria-live="polite">
            {memories.map((memory, index) => (
              <button
                aria-label={`Open photo ${index + 1} of ${memories.length}`}
                className="farewell-memory"
                key={`${selectedYear}-${memory.image}`}
                onClick={() => setPreviewIndex(index)}
                type="button"
              >
                <img src={memory.image} alt={memory.alt} loading="lazy" />
              </button>
            ))}
          </div>

          {previewIndex !== null && (
            <div
              aria-label={`Photo ${previewIndex + 1} of ${memories.length}`}
              aria-modal="true"
              className="farewell-lightbox"
              onClick={() => setPreviewIndex(null)}
              role="dialog"
            >
              <button
                aria-label="Close photo preview"
                className="farewell-lightbox__close"
                onClick={() => setPreviewIndex(null)}
                type="button"
              >
                ×
              </button>
              <button
                aria-label="Previous photo"
                className="farewell-lightbox__arrow farewell-lightbox__arrow--previous"
                onClick={(event) => {
                  event.stopPropagation();
                  setPreviewIndex((previewIndex - 1 + memories.length) % memories.length);
                }}
                type="button"
              >
                ←
              </button>
              <img
                alt={memories[previewIndex].alt}
                onClick={(event) => event.stopPropagation()}
                src={memories[previewIndex].image}
              />
              <p>{String(previewIndex + 1).padStart(2, '0')} / {memories.length}</p>
              <button
                aria-label="Next photo"
                className="farewell-lightbox__arrow farewell-lightbox__arrow--next"
                onClick={(event) => {
                  event.stopPropagation();
                  setPreviewIndex((previewIndex + 1) % memories.length);
                }}
                type="button"
              >
                →
              </button>
            </div>
          )}
        </section>

        <section className="farewell-notes" id="notes" aria-labelledby="notes-title">
          <header className="farewell-section-heading farewell-section-heading--light">
            <p className="farewell-eyebrow">PINNED TO YOUR NOTICEBOARD</p>
            <h2 id="notes-title">A few notes for the road.</h2>
            <p>Read these whenever the newness feels a little too new.</p>
          </header>

          <div className="farewell-note-grid">
            {notes.map((note) => (
              <article className={`farewell-note farewell-note--${note.accent}`} key={note.author}>
                <span className="farewell-note__pin" aria-hidden="true" />
                <p>“{note.message}”</p>
                <footer>
                  <strong>{note.author}</strong>
                  <span>{note.role}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="farewell-carry" aria-labelledby="carry-title">
          <header className="farewell-section-heading">
            <p className="farewell-eyebrow">YOUR VERY UNOFFICIAL PACKING LIST</p>
            <h2 id="carry-title">Things to carry forward.</h2>
          </header>

          <div className="farewell-carry__grid">
            <article>
              <span>01</span>
              <h3>Your curiosity</h3>
              <p>The kind that turns “what if?” into everyone’s favorite project.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Your calm</h3>
              <p>For snowy commutes, new beginnings, and the occasional mysterious error message.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Our number</h3>
              <p>For recommendations, reality checks, or an emergency dose of old-team chaos.</p>
            </article>
          </div>
        </section>

        <section className="farewell-final" aria-labelledby="final-title">
          <div className="farewell-final__stamp" aria-hidden="true">
            PEK
            <span>→</span>
            YYZ
          </div>
          <div className="farewell-final__copy">
            <p className="farewell-eyebrow">ONE LAST THING</p>
            <h2 id="final-title">Toronto has no idea how lucky it is.</h2>
            <p>
              Go make a life full of new favorite places, brave decisions, and stories worth retelling.
              We’ll be right here—cheering obnoxiously loudly.
            </p>
            <button type="button" onClick={() => setCelebration((value) => value + 1)}>
              Send Avery some love <span aria-hidden="true">♥</span>
            </button>
            <p className="farewell-final__response" aria-live="polite">
              {celebration > 0 ? `Love sent${celebration > 1 ? ` × ${celebration}` : ''}. It travels well.` : '\u00a0'}
            </p>
          </div>

          {celebration > 0 && (
            <div className="farewell-confetti" key={celebration} aria-hidden="true">
              {confetti.map((piece, index) => (
                <span key={`${celebration}-${index}`}>{piece}</span>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="farewell-footer">
        <p>Made by your Beijing crew · 2026</p>
        <p>Sample names, notes, and photos for preview purposes.</p>
        <a href="#top">Back to the beginning ↑</a>
      </footer>
    </div>
  );
};

export default FarewellPage;
