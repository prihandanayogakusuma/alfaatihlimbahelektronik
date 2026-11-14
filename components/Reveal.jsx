'use client';

import { useEffect } from 'react';

// Animasi halus saat elemen muncul di layar.
// Konten tetap terlihat di HTML awal (aman untuk SEO); kelas animasi baru ditambahkan di browser.
const SELECTOR =
  '.section__head, .service, .cat, .step, .why__item, .about__visual, .about__text, .faq__list, .form, .contact__info';

export default function Reveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(SELECTOR).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) return; // sudah terlihat, jangan disembunyikan
      el.classList.add('reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return null;
}
