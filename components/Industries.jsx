import { industries } from '@/data/site';

export default function Industries() {
  return (
    <section className="section section--tint section--compact" aria-labelledby="industri-title">
      <div className="container industries">
        <h2 id="industri-title">Dipercaya Beragam Sektor Industri</h2>
        <ul className="industries__list">
          {industries.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </div>
    </section>
  );
}
