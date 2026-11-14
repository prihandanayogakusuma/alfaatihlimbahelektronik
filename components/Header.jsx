'use client';

import { useEffect, useState } from 'react';
import { company, navLinks, instagramUrl } from '@/data/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Tandai menu aktif sesuai bagian yang sedang dilihat
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('/#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  // Tandai body saat menu HP terbuka (untuk menyembunyikan tombol WhatsApp melayang)
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <span>Melayani perusahaan di seluruh Indonesia</span>
          <div className="topbar__links">
            <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={instagramUrl} target="_blank" rel="noopener">IG @{company.instagram}</a>
          </div>
        </div>
      </div>

      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container header__inner">
          <a href="/" className="brand" aria-label={`${company.name} — Beranda`}>
            <img src="/logo-192.png" alt={`Logo ${company.name}`} className="brand__logo" width="190" height="192" />
            <span className="brand__text">
              <strong>{company.shortName}</strong>
              <small>{company.tagline}</small>
            </span>
          </a>

          <nav className={`nav${open ? ' is-open' : ''}`} id="nav" aria-label="Navigasi utama">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={close} className={active === l.href ? 'is-active' : undefined}>
                {l.label}
              </a>
            ))}
            <a href="#kontak" onClick={close} className="btn btn--gold btn--sm nav__cta">Minta Penawaran</a>
          </nav>

          <button
            className="nav-toggle"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            aria-controls="nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
    </>
  );
}
