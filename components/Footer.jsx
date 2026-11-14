import { company, fullAddress, navLinks, categories, serviceAreas, serviceRegion, instagramUrl } from '@/data/site';
import { Icon } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <a href="#beranda" className="brand brand--light">
            <img src="/logo-192.png" alt={`Logo ${company.name}`} className="brand__logo" width="190" height="192" loading="lazy" />
            <span className="brand__text"><strong>{company.shortName}</strong><small>{company.tagline}</small></span>
          </a>
          <p className="footer__about">
            Mitra tepercaya perusahaan dalam pengelolaan limbah elektronik dan aset IT — aman bagi data Anda,
            bertanggung jawab bagi lingkungan.
          </p>
        </div>

        <nav aria-label="Tautan perusahaan">
          <h4>Perusahaan</h4>
          {navLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a href="#kontak">Kontak</a>
        </nav>

        <nav aria-label="Kategori">
          <h4>Kategori</h4>
          {categories.slice(0, 5).map((c) => <a key={c.title} href="#kategori">{c.title}</a>)}
        </nav>

        <div>
          <h4>Kontak</h4>
          <p>{fullAddress}</p>
          <p><a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a></p>
          <p><a href={`mailto:${company.email}`}>{company.email}</a></p>
          <a href={instagramUrl} target="_blank" rel="noopener" className="social" aria-label={`Instagram @${company.instagram}`}>
            <Icon name="instagram" /> <span>@{company.instagram}</span>
          </a>
        </div>
      </div>

      <div className="container footer__seo">
        <h4>Area Layanan Penjemputan — {serviceRegion}</h4>
        <p>{serviceAreas.join(' · ')}</p>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {company.name}. Seluruh hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
