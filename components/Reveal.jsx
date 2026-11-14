'use client';

import { useEffect } from 'react';

// Animasi muncul saat digulir.
// - Elemen di dalam grid muncul BERURUTAN (stagger), bukan serentak.
// - Konten tetap ada di HTML awal (aman untuk SEO); kelas animasi baru ditambahkan di browser.
// - Setelah animasi selesai, kelas dilepas agar efek hover kartu tetap responsif.
const GROUPS = [
  // [selector, variasi animasi]
  ['.section__head', 'up'],
  ['.about__visual', 'left'],
  ['.about__text', 'right'],
  ['.service', 'zoom'],
  ['.cat', 'zoom'],
  ['.step', 'up'],
  ['.why__item', 'up'],
  ['.gal__grid > li', 'zoom'],
  ['.seo-link', 'zoom'],
  ['.prose > section', 'up'],
  ['.article__aside', 'up'],
  ['.industries__list li', 'up'],
  ['.faq__list details', 'up'],
  ['.contact__info', 'left'],
  ['.form', 'right'],
  ['.map', 'up'],
  ['.cta__inner', 'up'],
  ['.footer__grid > *', 'up'],
];

export default function Reveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add('is-visible');
        io.unobserve(el);
        const delay = parseFloat(el.style.getPropertyValue('--d')) || 0;
        // lepas kelas setelah selesai -> transisi hover kembali normal
        setTimeout(() => {
          el.classList.remove('reveal', 'is-visible', 'r-up', 'r-left', 'r-right', 'r-zoom');
          el.style.removeProperty('--d');
        }, 900 + delay * 1000);
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    for (const [sel, variant] of GROUPS) {
      document.querySelectorAll(sel).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9) return; // sudah terlihat saat dibuka: jangan disembunyikan
        // urutan di dalam induknya -> jeda bertahap (maks 0,6 detik)
        const idx = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
        el.style.setProperty('--d', `${Math.min(idx % 4, 6) * 0.1}s`);
        el.classList.add('reveal', `r-${variant}`);
        io.observe(el);
      });
    }
    return () => io.disconnect();
  }, []);

  return null;
}
