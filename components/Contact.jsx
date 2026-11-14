import { company, fullAddress, maps, instagramUrl } from '@/data/site';
import { Icon } from './Icons';
import QuoteForm from './QuoteForm';

export default function Contact() {
  return (
    <section className="section" id="kontak">
      <div className="container contact">
        <div className="contact__info">
          <p className="eyebrow">Hubungi Kami</p>
          <h2>Mari Mulai Percakapan</h2>
          <p>Isi formulir di samping atau hubungi kami langsung. Konsultasi dan survei awal tidak dipungut biaya.</p>

          <ul className="contact__list">
            <li>
              <span className="ci"><Icon name="pin" /></span>
              <div><b>Alamat</b><address>{fullAddress}</address></div>
            </li>
            <li>
              <span className="ci"><Icon name="phone" /></span>
              <div><b>Telepon / WhatsApp</b><a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a></div>
            </li>
            <li>
              <span className="ci"><Icon name="mail" /></span>
              <div><b>Email</b><a href={`mailto:${company.email}`}>{company.email}</a></div>
            </li>
            <li>
              <span className="ci"><Icon name="instagram" /></span>
              <div><b>Instagram</b><a href={instagramUrl} target="_blank" rel="noopener">@{company.instagram}</a></div>
            </li>
            <li>
              <span className="ci"><Icon name="clock" /></span>
              <div><b>Jam Operasional</b><span>{company.hours}</span></div>
            </li>
          </ul>
        </div>

        <QuoteForm />
      </div>

      <div className="container">
        <div className="map">
          <iframe
            className="map__frame"
            src={maps.embed}
            title={`Peta lokasi ${company.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map__card">
            <span className="ci"><Icon name="pin" /></span>
            <div>
              <h3>Kantor &amp; Gudang Kami</h3>
              <address>{fullAddress}</address>
              <p className="map__hours">{company.hours}</p>
              <div className="map__actions">
                <a href={maps.directions} target="_blank" rel="noopener" className="btn btn--primary btn--sm">Petunjuk Arah</a>
                <a href={maps.open} target="_blank" rel="noopener" className="btn btn--outline btn--sm">Buka di Google Maps</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
