import { categories } from '@/data/site';

export default function Categories() {
  return (
    <section className="section" id="kategori">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Yang Kami Terima</p>
          <h2>Beragam Kategori Limbah Elektronik &amp; Aset IT</h2>
          <p>Kondisi berfungsi, rusak, maupun tidak lengkap — semuanya dapat kami terima dan proses.</p>
        </header>

        <div className="cats">
          {categories.map((c, i) => (
            <article className="cat" key={c.title}>
              <div className="cat__media">
                <img
                  src={`/kategori/${c.img}.webp`}
                  alt={`Penerimaan limbah elektronik kategori ${c.title}`}
                  width="720"
                  height="450"
                  loading="lazy"
                  decoding="async"
                />
                <span className="cat__num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="cat__body">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <a href="#kontak" className="cat__link">Tawarkan Aset <span aria-hidden="true">&rarr;</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
