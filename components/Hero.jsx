import { company, heroSteps } from '@/data/site';
import HeroSlider from './HeroSlider';

export default function Hero() {
  return (
    <section className="hero" id="beranda">
      <HeroSlider />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow eyebrow--light">Mitra Pengelolaan E-Waste Korporat</p>
          <h1>
            Limbah Elektronik Perusahaan Anda, <em>Ditangani dengan Penuh Tanggung Jawab.</em>
          </h1>
          <p className="hero__lead">
            Gudang penuh komputer, server, dan perangkat kantor yang tak lagi terpakai? Jadikan
            <strong> nilai, bukan beban.</strong> {company.name} menaksir aset Anda secara adil dan
            menjemputnya langsung ke lokasi Anda di seluruh Indonesia — lengkap dengan berita acara resmi.
          </p>
          <div className="hero__actions">
            <a href="#kontak" className="btn btn--gold">Konsultasi Gratis</a>
            <a href="#kategori" className="btn btn--ghost">Lihat Barang yang Kami Terima</a>
          </div>
          <ul className="hero__checks">
            <li>Penjemputan ke lokasi</li>
            <li>Penghancuran data terjamin</li>
            <li>Berita acara resmi</li>
          </ul>
        </div>

        <aside className="hero__card" aria-label="Ringkasan layanan">
          <div className="hero__card-head"><span className="dot" /> Layanan Terpadu</div>
          <ol className="hero__steps">
            {heroSteps.map((s, i) => (
              <li key={s}><b>{String(i + 1).padStart(2, '0')}</b><span>{s}</span></li>
            ))}
          </ol>
          <a href="#proses" className="hero__card-link">Pelajari alur kerja kami &rarr;</a>
        </aside>
      </div>
    </section>
  );
}
