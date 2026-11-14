'use client';

import { useCallback, useEffect, useState } from 'react';
import { heroSlides } from '@/data/site';

const INTERVAL = 6000; // ganti gambar setiap 6 detik

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;

  const go = useCallback((i) => setIndex((i + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  // Jeda saat tab browser tidak aktif
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <>
      <div className="hero__slides" aria-hidden="true">
        {heroSlides.map((s, i) => (
          <div key={s.src} className={`hero__slide${i === index ? ' is-active' : ''}`}>
            <img
              src={`/hero/${s.src}-1920.webp`}
              srcSet={`/hero/${s.src}-960.webp 960w, /hero/${s.src}-1920.webp 1920w`}
              sizes="100vw"
              alt=""
              width="1920"
              height="1080"
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__controls container" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <span className="hero__caption" aria-live="polite">
          <b>{String(index + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')} — {heroSlides[index].caption}
        </span>
        <div className="hero__dots" role="tablist" aria-label="Pilih gambar">
          {heroSlides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Gambar ${i + 1}: ${s.caption}`}
              className={i === index ? 'is-active' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
