import { faqs } from '@/data/site';

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <header className="section__head section__head--left">
          <p className="eyebrow">Pertanyaan Umum</p>
          <h2>Hal yang Sering Ditanyakan Klien Kami</h2>
          <p>Belum menemukan jawaban yang Anda cari? Tim kami siap membantu 24 jam, setiap hari.</p>
          <a href="#kontak" className="btn btn--primary">Tanyakan Langsung</a>
        </header>

        <div className="faq__list">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
