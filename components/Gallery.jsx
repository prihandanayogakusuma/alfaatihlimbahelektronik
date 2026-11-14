'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import galeri from '@/data/galeri.json';

const TABS = [
  { key: 'semua', label: 'Semua' },
  { key: 'penjemputan', label: 'Penjemputan' },
  { key: 'pembelian', label: 'Pembelian Barang' },
];
const LABEL = { penjemputan: 'Penjemputan', pembelian: 'Pembelian Barang' };

export default function Gallery() {
  const [tab, setTab] = useState('semua');
  const [open, setOpen] = useState(-1);

  const items = useMemo(() => (tab === 'semua' ? galeri : galeri.filter((f) => f.kategori === tab)), [tab]);
  const tabs = TABS.filter((t) => t.key === 'semua' || galeri.some((f) => f.kategori === t.key));

  const close = useCallback(() => setOpen(-1), []);
  const step = useCallback((d) => setOpen((i) => (i + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, close, step]);

  if (!galeri.length) return null; // belum ada foto -> bagian galeri tidak ditampilkan

  const cur = items[open];

  return (
    <section className="section section--tint" id="galeri">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Galeri Kegiatan</p>
          <h2>Dokumentasi Penjemputan &amp; Pembelian Barang</h2>
          <p>Bukti kerja nyata kami di lapangan — setiap penjemputan ditangani tertib, rapi, dan terdokumentasi.</p>
        </header>

        {tabs.length > 2 && (
          <div className="gal__tabs" role="tablist" aria-label="Filter galeri">
            {tabs.map((t) => (
              <button key={t.key} type="button" role="tab" aria-selected={tab === t.key}
                className={tab === t.key ? 'is-active' : undefined} onClick={() => setTab(t.key)}>
                {t.label}
                <span>{t.key === 'semua' ? galeri.length : galeri.filter((f) => f.kategori === t.key).length}</span>
              </button>
            ))}
          </div>
        )}

        <ul className="gal__grid">
          {items.map((f, i) => {
            const alt = f.judul || `${LABEL[f.kategori]} limbah elektronik oleh PT Al Faatih Limbah Elektronik`;
            return (
              <li key={f.id}>
                <button type="button" className="gal__item" onClick={() => setOpen(i)} aria-label={`Perbesar foto: ${alt}`}>
                  <img src={f.thumb} alt={alt} width="640" height="480" loading="lazy" decoding="async" />
                  <span className="gal__tag">{LABEL[f.kategori]}</span>
                  {(f.judul || f.keterangan) && (
                    <span className="gal__cap">
                      {f.judul && <b>{f.judul}</b>}
                      {f.keterangan && <small>{f.keterangan}</small>}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {cur && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Tampilan foto" onClick={close}>
          <figure className="lb__fig" onClick={(e) => e.stopPropagation()}>
            <img src={cur.src} alt={cur.judul || LABEL[cur.kategori]} width={cur.width} height={cur.height} />
            <figcaption>
              <span className="lb__tag">{LABEL[cur.kategori]}</span>
              {cur.judul && <b>{cur.judul}</b>}
              {cur.keterangan && <span>{cur.keterangan}</span>}
              <em>{open + 1} / {items.length}</em>
            </figcaption>
          </figure>
          <button type="button" className="lb__btn lb__close" onClick={close} aria-label="Tutup">×</button>
          {items.length > 1 && (
            <>
              <button type="button" className="lb__btn lb__prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Foto sebelumnya">‹</button>
              <button type="button" className="lb__btn lb__next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Foto berikutnya">›</button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
