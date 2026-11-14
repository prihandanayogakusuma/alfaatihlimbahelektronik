import { services } from '@/data/site';
import { Icon } from './Icons';

export default function Services() {
  return (
    <section className="section section--tint" id="layanan">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Layanan Kami</p>
          <h2>Solusi Menyeluruh untuk Aset Elektronik Perusahaan</h2>
          <p>
            Dari satu unit laptop hingga ribuan perangkat data center — kami menangani setiap tahapnya dengan
            standar yang sama: cermat, aman, dan terdokumentasi.
          </p>
        </header>

        <div className="services">
          {services.map((s) => (
            <article className="service" key={s.title}>
              <div className="service__icon"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
