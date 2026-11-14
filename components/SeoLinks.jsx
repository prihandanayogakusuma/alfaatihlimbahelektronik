import { halaman } from '@/data/halaman';

// Bagian beranda yang menautkan ke halaman layanan/area/artikel (internal link untuk SEO)
export default function SeoLinks() {
  return (
    <section className="section section--tint" id="layanan-unggulan">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Layanan &amp; Panduan</p>
          <h2>Temukan Solusi yang Anda Butuhkan</h2>
          <p>Informasi lengkap seputar layanan limbah elektronik kami untuk perusahaan di Jabodetabek dan seluruh Indonesia.</p>
        </header>
        <div className="seo-links">
          {halaman.map((h) => (
            <a key={h.slug} href={`/${h.slug}/`} className="seo-link">
              <span className="seo-link__tag">{h.jenis}</span>
              <h3>{h.h1}</h3>
              <p>{h.lead}</p>
              <span className="seo-link__more">Selengkapnya <span aria-hidden="true">&rarr;</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
