import { reasons } from '@/data/site';

export default function WhyUs() {
  return (
    <section className="section" id="keunggulan">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Mengapa Al Faatih</p>
          <h2>Alasan Perusahaan Mempercayakan Asetnya kepada Kami</h2>
        </header>

        <div className="why">
          {reasons.map((r) => (
            <div className="why__item" key={r.title}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
