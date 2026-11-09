import { useEffect, useState } from 'react';
import { DotMatrix, SparkleStar } from '@shared/index';
import { getCatalogImageUrl } from '@modules/catalog/data/imageLoader';
import './HeroBanner.css';

const HERO_SLIDES = [
  {
    file: '05b8a963ee05f060.jpg',
    alt: 'Maceta Pensador Zen impresa en 3D en tono verde salvia',
  },
  {
    file: '112453a5803d2597.jpg',
    alt: 'Maceta Abrazo Terracota impresa en 3D con cactus en flor',
  },
  {
    file: '0d39315a5f6aa94c.jpg',
    alt: 'Maceta Calada Art Déco negra con relieve geométrico',
  },
] as const;

export function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="hero" aria-label="Presentación 3 Monos">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__copy-card">
            <SparkleStar className="hero__sparkle" width={30} height={30} />

            <div className="hero__copy-content">
              <h1 className="hero__title font-display">
                Objetos 3D para tu espacio
              </h1>
              <p className="hero__subtitle">
                Diseño e impresión mayorista a medida.
              </p>
            </div>

            <DotMatrix className="hero__dots-decor" width={36} height={36} />
          </div>

          <div className="hero__visual-card">
            {HERO_SLIDES.map((slide, index) => {
              const src = getCatalogImageUrl(slide.file);
              if (!src) return null;
              return (
                <img
                  key={slide.file}
                  src={src}
                  alt={slide.alt}
                  className={`hero__image ${index === activeSlide ? 'hero__image--active' : ''}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              );
            })}

            <div className="hero__slide-controls" role="tablist" aria-label="Destacados del estudio">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.file}
                  type="button"
                  role="tab"
                  aria-selected={index === activeSlide}
                  aria-label={`Ver pieza destacada ${index + 1}`}
                  className={`hero__slide-dot ${index === activeSlide ? 'hero__slide-dot--active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
