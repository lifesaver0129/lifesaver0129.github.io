import React, { useEffect, useRef, useState } from 'react';
import { farewellPhotosByYear, type FarewellPhoto } from './farewellPhotos';
import './farewell.css';

type Note = {
  author: string;
  message: string;
  accent: string;
};

type YearStop = {
  year: number;
  label: string;
};

const yearStops: YearStop[] = [
  { year: 2019, label: 'Hello, team' },
  { year: 2020, label: 'Finding a rhythm' },
  { year: 2021, label: 'Growing together' },
  { year: 2022, label: 'Big ideas' },
  { year: 2023, label: 'Building momentum' },
  { year: 2024, label: 'Full speed' },
  { year: 2025, label: 'One more chapter' },
  { year: 2026, label: 'New coordinates' },
];

const notes: Note[] = [
  {
    author: 'Ying Zhou',
    message:
      'Thank you for making every hard problem feel solvable—and every quiet teammate feel heard. Toronto is getting one of the very best.',
    accent: 'coral',
  },
  {
    author: 'Jingwen Xu',
    message:
      'I will miss your unreasonably good questions, your emergency snack drawer, and the way you somehow fixed things before the rest of us noticed.',
    accent: 'blue',
  },
  {
    author: 'Na Li',
    message:
      'This is not goodbye. It is merely a very inconvenient timezone change. Keep a seat for us by the lake.',
    accent: 'yellow',
  },
  {
    author: 'Yuxing Hu',
    message:
      'You brought so much kindness to ordinary days. I hope this next chapter brings you the same joy you gave all of us.',
    accent: 'pink',
  },
  {
    author: 'Chunxue Wang',
    message:
      'May your winter coat be sturdy, your poutine warm, and your video calls only occasionally scheduled at impossible hours.',
    accent: 'green',
  },
  {
    author: 'Zelin Liao',
    message:
      'Thank you for all the tiny acts of care that made this team feel like a team. We will carry that kindness forward.',
    accent: 'coral',
  },
  {
    author: 'Hongyang Jiang',
    message:
      'Toronto gets your ideas, your laughter, and your legendary lunch recommendations. We expect regular updates on all three.',
    accent: 'blue',
  },
  {
    author: 'Wenlong Ruan',
    message:
      'Different city. Same group chat. We are so proud of you, Clarissa—and so excited to see where your curiosity takes you next.',
    accent: 'navy',
  },
];

const confetti = ['✦', '●', '★', '◆', '♥', '✦', '●', '★', '◆', '♥', '✦', '●'];

const createBalancedPhotoRows = (photos: FarewellPhoto[], compact: boolean) => {
  if (photos.length < 2) return [photos];

  const maximumItems = compact ? 3 : 4;
  const targetAspectRatio = compact ? 3 : 4.5;
  const costs = Array(photos.length + 1).fill(Number.POSITIVE_INFINITY);
  const previousBreak = Array<number | null>(photos.length + 1).fill(null);
  costs[0] = 0;

  for (let end = 1; end <= photos.length; end += 1) {
    for (let itemCount = 2; itemCount <= maximumItems; itemCount += 1) {
      const start = end - itemCount;
      if (start < 0 || !Number.isFinite(costs[start])) continue;

      const rowAspectRatio = photos
        .slice(start, end)
        .reduce((total, photo) => total + photo.width / photo.height, 0);
      const candidateCost = costs[start] + (rowAspectRatio - targetAspectRatio) ** 2;

      if (candidateCost < costs[end]) {
        costs[end] = candidateCost;
        previousBreak[end] = start;
      }
    }
  }

  if (previousBreak[photos.length] === null) return [photos];

  const rows: FarewellPhoto[][] = [];
  let end = photos.length;
  while (end > 0) {
    const start = previousBreak[end] ?? 0;
    rows.unshift(photos.slice(start, end));
    end = start;
  }

  return rows;
};

const isBirthdayPhoto = (photo: FarewellPhoto) => photo.date.startsWith('March 6,');

const birthdayCakes = Array.from({ length: 30 });

type YearSelectorProps = {
  onYearChange: (year: number) => void;
  placement: 'top' | 'bottom';
  selectedYear: number;
};

const YearSelector: React.FC<YearSelectorProps> = ({ onYearChange, placement, selectedYear }) => {
  const activeYear = yearStops.find((stop) => stop.year === selectedYear) ?? yearStops[0];
  const firstYear = yearStops[0].year;
  const lastYear = yearStops[yearStops.length - 1].year;
  const progress = ((selectedYear - firstYear) / (yearStops.length - 1)) * 100;
  const isBottom = placement === 'bottom';
  const placementSuffix = isBottom ? ' at the end of the gallery' : '';

  return (
    <div
      aria-label={isBottom ? "Choose another year from Clarissa's journey" : "Choose a year from Clarissa's journey"}
      className={`farewell-route farewell-route--${placement}`}
    >
      <div className="farewell-route__summary">
        <span>PEK · Beijing</span>
        <strong>{selectedYear}</strong>
        <span>YYZ · Toronto</span>
      </div>
      <div className="farewell-route__control">
        <button
          aria-label={`Show the previous year${placementSuffix}`}
          disabled={selectedYear === firstYear}
          onClick={() => onYearChange(Math.max(firstYear, selectedYear - 1))}
          type="button"
        >
          ←
        </button>
        <div
          className="farewell-flight-slider"
          style={{ '--farewell-flight-progress': `${progress}%` } as React.CSSProperties}
        >
          <div className="farewell-flight-slider__track" aria-hidden="true" />
          <span className="farewell-flight-slider__plane" aria-hidden="true">✈</span>
          <input
            aria-controls="memories"
            aria-label={isBottom ? 'Choose the year after the photos' : 'Choose the year of the photos'}
            aria-valuetext={`${selectedYear}: ${activeYear.label}`}
            max={lastYear}
            min={firstYear}
            onChange={(event) => onYearChange(Number(event.currentTarget.value))}
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
          aria-label={`Show the next year${placementSuffix}`}
          disabled={selectedYear === lastYear}
          onClick={() => onYearChange(Math.min(lastYear, selectedYear + 1))}
          type="button"
        >
          →
        </button>
      </div>
    </div>
  );
};

const FarewellPage: React.FC = () => {
  const [celebration, setCelebration] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2019);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [openNotes, setOpenNotes] = useState<Set<string>>(() => new Set());
  const laughAudioRef = useRef<HTMLAudioElement | null>(null);
  const [compactGallery, setCompactGallery] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
  ));
  const memories = farewellPhotosByYear[selectedYear] ?? [];
  const memoryRows = createBalancedPhotoRows(memories, compactGallery);

  const sendLove = () => {
    setCelebration((value) => value + 1);

    const audio = laughAudioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)');
    const updateGalleryDensity = () => setCompactGallery(mediaQuery.matches);
    updateGalleryDensity();
    mediaQuery.addEventListener('change', updateGalleryDensity);
    return () => mediaQuery.removeEventListener('change', updateGalleryDensity);
  }, []);

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
        <a className="farewell-mark" href="#top" aria-label="Clarissa's farewell page home">
          A FAREWELL FOR CLARISSA
        </a>
        <p>Beijing · 2019—2026</p>
        <a className="farewell-nav__link" href="#notes">
          Read the notes <span aria-hidden="true">↓</span>
        </a>
      </header>

      <main>
        <section className="farewell-hero" id="top" aria-labelledby="farewell-title">
          <div className="farewell-hero__copy">
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

          <YearSelector onYearChange={setSelectedYear} placement="top" selectedYear={selectedYear} />

        </section>

        <section className="farewell-memories" id="memories" aria-labelledby="memories-title">
          <header className="farewell-section-heading">
            <h2 id="memories-title">The {selectedYear} camera roll.</h2>
          </header>

          <div className="farewell-memory-grid" aria-live="polite">
            {memoryRows.map((row) => (
              <div className="farewell-memory-row" key={row[0].src}>
                {row.map((memory) => {
                  const index = memories.indexOf(memory);
                  const birthdayPhoto = isBirthdayPhoto(memory);
                  return (
                    <button
                      aria-label={`Open photo from ${memory.date}, ${index + 1} of ${memories.length}${birthdayPhoto ? ', birthday memory' : ''}`}
                      className={`farewell-memory farewell-memory--${memory.orientation}`}
                      key={memory.src}
                      onClick={() => setPreviewIndex(index)}
                      style={{ '--farewell-photo-ratio': memory.width / memory.height } as React.CSSProperties}
                      type="button"
                    >
                      <img
                        alt={memory.alt}
                        decoding="async"
                        height={memory.height}
                        loading={index < 4 ? 'eager' : 'lazy'}
                        src={memory.src}
                        width={memory.width}
                      />
                      {birthdayPhoto && (
                        <span className="farewell-memory__birthday-badge">🎂 Birthday</span>
                      )}
                      <span className="farewell-memory__date">{memory.date}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <YearSelector onYearChange={setSelectedYear} placement="bottom" selectedYear={selectedYear} />

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
                src={memories[previewIndex].src}
              />
              <p>
                <span>{memories[previewIndex].date}</span>
                <span>{String(previewIndex + 1).padStart(2, '0')} / {memories.length}</span>
              </p>
              {isBirthdayPhoto(memories[previewIndex]) && (
                <div
                  className="farewell-birthday-shower"
                  key={memories[previewIndex].src}
                  aria-hidden="true"
                >
                  {birthdayCakes.map((_, index) => (
                    <span
                      key={index}
                      style={{
                        '--farewell-cake-delay': `${(index % 10) * 90}ms`,
                        '--farewell-cake-drift': `${((index % 7) - 3) * 24}px`,
                        '--farewell-cake-duration': `${1700 + (index % 6) * 170}ms`,
                        '--farewell-cake-left': `${2 + ((index * 37) % 95)}%`,
                        '--farewell-cake-size': `${1.7 + (index % 5) * 0.45}rem`,
                      } as React.CSSProperties}
                    >
                      🎂
                    </span>
                  ))}
                </div>
              )}
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
            <h2 id="notes-title">A few notes for the road.</h2>
          </header>

          <div className="farewell-note-grid">
            {notes.map((note) => {
              const isOpen = openNotes.has(note.author);
              return (
                <article
                  className={`farewell-note farewell-note--${note.accent}`}
                  data-open={isOpen}
                  key={note.author}
                >
                  <button
                    aria-label={`${isOpen ? 'Fold' : 'Open'} note from ${note.author}`}
                    aria-pressed={isOpen}
                    className="farewell-note__button"
                    onClick={() => setOpenNotes((current) => {
                      const next = new Set(current);
                      if (next.has(note.author)) next.delete(note.author);
                      else next.add(note.author);
                      return next;
                    })}
                    type="button"
                  >
                    <span className="farewell-note__inner">
                      <span aria-hidden={isOpen} className="farewell-note__face farewell-note__front">
                        <span className="farewell-note__pin" aria-hidden="true" />
                        <span className="farewell-note__front-copy">
                          <span className="farewell-note__kicker">A note from</span>
                          <strong>{note.author}</strong>
                          <span className="farewell-note__hint">Click to unfold ↗</span>
                        </span>
                      </span>
                      <span aria-hidden={!isOpen} className="farewell-note__face farewell-note__back">
                        <span className="farewell-note__pin" aria-hidden="true" />
                        <span className="farewell-note__message">“{note.message}”</span>
                        <span className="farewell-note__footer">
                          <strong>{note.author}</strong>
                          <span>Click to fold back</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="farewell-final" aria-labelledby="final-title">
          <div className="farewell-final__copy">
            <p className="farewell-eyebrow">ONE LAST THING</p>
            <h2 id="final-title">Toronto has no idea how lucky it is.</h2>
            <p>
              Go make a life full of new favorite places, brave decisions, and stories worth retelling.
              We’ll be right here—cheering obnoxiously loudly.
            </p>
            <button type="button" onClick={sendLove}>
              Send Clarissa some love <span aria-hidden="true">♥</span>
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
        <p>Made by your Beijing crew</p>
        <a href="#top">Back to the beginning ↑</a>
      </footer>

      <audio ref={laughAudioRef} preload="auto" src="/farewell/woman-laugh.mp3" />
    </div>
  );
};

export default FarewellPage;
