import { company } from '@/data/site';

export default function About() {
  return (
    <section className="section" id="tentang">
      <div className="container about">
        <div className="about__visual">
          <div className="about__frame">
            <img
              src="/logo.png"
              alt={`${company.name} — penerima dan pengelola limbah elektronik perusahaan`}
              className="about__art"
              width="720"
              height="727"
              loading="lazy"
            />
          </div>
          <div className="about__badge" aria-hidden="true">
            <strong>Aman</strong>
            <span>Data &amp; lingkungan terlindungi</span>
          </div>
        </div>

        <div className="about__text">
          <p className="eyebrow">Tentang Kami</p>
          <h2>Menutup Siklus Hidup Perangkat Elektronik dengan Cara yang Benar</h2>
          <p>
            Setiap perangkat yang telah selesai mengabdi bagi perusahaan Anda menyimpan dua hal penting:{' '}
            <strong>data yang harus dilindungi</strong> dan{' '}
            <strong>material yang tidak boleh mencemari lingkungan</strong>. {company.name} hadir untuk
            memastikan keduanya tertangani dengan tepat.
          </p>
          <p>
            Kami adalah mitra penerima limbah elektronik bagi perusahaan, instansi, dan institusi pendidikan.
            Dengan proses yang tertata, penilaian yang jujur, serta dokumentasi yang siap diaudit, kami membantu
            Anda melepas aset lama dengan tenang — tanpa risiko kebocoran data, tanpa beban logistik, dan tanpa
            meninggalkan jejak buruk bagi bumi.
          </p>

          <div className="vm">
            <div className="vm__item">
              <h3>Visi</h3>
              <p>Menjadi mitra pengelolaan limbah elektronik paling tepercaya di Indonesia, yang mendorong praktik bisnis berkelanjutan.</p>
            </div>
            <div className="vm__item">
              <h3>Misi</h3>
              <ul>
                <li>Memberikan layanan yang aman, transparan, dan akuntabel.</li>
                <li>Menjaga kerahasiaan data setiap klien tanpa kompromi.</li>
                <li>Memaksimalkan daur ulang dan meminimalkan pencemaran.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
