import { company, fullAddress, navLinks, serviceAreas, serviceRegion, instagramUrl } from '@/data/site';
import { halaman } from '@/data/halaman';
import { Icon } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <a href="/" className="brand brand--light">
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

        <nav aria-label="Layanan dan informasi">
          <h4>Layanan &amp; Info</h4>
          {halaman.map((h) => <a key={h.slug} href={`/${h.slug}/`}>{h.h1}</a>)}
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
        <h4>Area Layanan — {serviceRegion}</h4>
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
