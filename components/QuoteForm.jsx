'use client';

import { useState } from 'react';
import { company, categories, waLink } from '@/data/site';

const initial = { nama: '', perusahaan: '', telepon: '', kota: '', jenis: categories[0].title, pesan: '' };
const required = ['nama', 'perusahaan', 'telepon'];

export default function QuoteForm() {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | error | sent

  const set = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: false }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = Object.fromEntries(required.map((k) => [k, !data[k].trim()]));
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return setStatus('error');

    const msg =
      `Halo ${company.name}, saya ingin meminta penawaran.\n\n` +
      `Nama: ${data.nama}\nPerusahaan: ${data.perusahaan}\nTelepon: ${data.telepon}\n` +
      `Kota: ${data.kota || '-'}\nJenis aset: ${data.jenis}\nKeterangan: ${data.pesan || '-'}`;
    window.open(waLink(msg), '_blank', 'noopener');
    setStatus('sent');
  };

  const cls = (k) => (errors[k] ? 'is-invalid' : undefined);

  return (
    <form className="form" onSubmit={submit} noValidate>
      <h3>Formulir Permintaan Penawaran</h3>
      <div className="form__row">
        <label>Nama Lengkap
          <input name="nama" value={data.nama} onChange={set} className={cls('nama')} required autoComplete="name" />
        </label>
        <label>Nama Perusahaan
          <input name="perusahaan" value={data.perusahaan} onChange={set} className={cls('perusahaan')} required autoComplete="organization" />
        </label>
      </div>
      <div className="form__row">
        <label>Nomor Telepon / WA
          <input type="tel" name="telepon" value={data.telepon} onChange={set} className={cls('telepon')} required autoComplete="tel" />
        </label>
        <label>Kota
          <input name="kota" value={data.kota} onChange={set} autoComplete="address-level2" />
        </label>
      </div>
      <label>Jenis Aset
        <select name="jenis" value={data.jenis} onChange={set}>
          {categories.map((c) => <option key={c.title}>{c.title}</option>)}
          <option>Campuran / Lainnya</option>
        </select>
      </label>
      <label>Perkiraan Jumlah &amp; Keterangan
        <textarea name="pesan" rows={4} value={data.pesan} onChange={set} placeholder="Contoh: 40 unit laptop, 5 server rack, sebagian rusak" />
      </label>
      <button type="submit" className="btn btn--primary btn--block">Kirim via WhatsApp</button>
      <p className={`form__note${status === 'error' ? ' is-error' : ''}`} role="status">
        {status === 'error'
          ? 'Mohon lengkapi nama, perusahaan, dan nomor telepon.'
          : status === 'sent'
            ? 'Terima kasih! Silakan lanjutkan pengiriman pesan di WhatsApp.'
            : 'Data Anda kami jaga kerahasiaannya dan hanya digunakan untuk keperluan penawaran.'}
      </p>
    </form>
  );
}
