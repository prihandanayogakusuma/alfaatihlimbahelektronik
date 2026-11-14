import { steps } from '@/data/site';

export default function Process() {
  return (
    <section className="section section--dark" id="proses">
      <div className="container">
        <header className="section__head section__head--light">
          <p className="eyebrow eyebrow--light">Alur Kerja</p>
          <h2>Lima Langkah Sederhana, Hasil yang Pasti</h2>
          <p>Proses kami dirancang agar perusahaan Anda cukup mengambil satu keputusan — sisanya, kami yang bekerja.</p>
        </header>

        <ol className="process">
          {steps.map((s, i) => (
            <li className="step" key={s.title}>
              <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
