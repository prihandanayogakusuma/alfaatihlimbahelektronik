'use client';

import { useEffect, useRef, useState } from 'react';
import { stats } from '@/data/site';

const fmt = (n) => n.toLocaleString('id-ID');

function Counter({ value, suffix }) {
  const ref = useRef(null);
  // Nilai akhir tetap ada di HTML (baik untuk SEO), animasi berjalan setelah halaman dimuat
  const [display, setDisplay] = useState(fmt(value) + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf;
    setDisplay('0' + suffix);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let start;
      const step = (t) => {
        start ??= t;
        const p = Math.min((t - start) / 1600, 1);
        setDisplay(fmt(Math.floor(value * (1 - Math.pow(1 - p, 3)))) + suffix);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, suffix]);

  return <strong ref={ref} suppressHydrationWarning>{display}</strong>;
}

export default function Stats() {
  return (
    <section className="stats" aria-label="Pencapaian perusahaan">
      <div className="container stats__grid">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <Counter value={s.value} suffix={s.suffix} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
