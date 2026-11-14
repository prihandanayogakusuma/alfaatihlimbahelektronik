// ==========================================================
// PEMROSES FOTO GALERI
// Jalankan:  npm run galeri
//
// 1. Taruh foto asli (JPG/PNG/WEBP/HEIC dari HP) ke:
//      foto-galeri/penjemputan/
//      foto-galeri/pembelian/
// 2. Jalankan perintah di atas.
// 3. Isi judul & keterangan tiap foto di data/galeri.json (opsional).
//
// Script ini: memutar foto sesuai orientasi HP, mengecilkan ukuran,
// mengubah ke WebP, membuat thumbnail, dan MENGHAPUS data GPS/EXIF.
// Judul & keterangan yang sudah Anda isi tidak akan tertimpa.
// ==========================================================
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const SRC = path.join(ROOT, 'foto-galeri');
const OUT = path.join(ROOT, 'public', 'galeri');
const DATA = path.join(ROOT, 'data', 'galeri.json');
const KATEGORI = { penjemputan: 'Penjemputan', pembelian: 'Pembelian Barang' };
const EXT = /\.(jpe?g|png|webp|heic|heif|tiff?)$/i;

const slug = (s) =>
  s.toLowerCase().replace(/\.[^.]+$/, '').normalize('NFKD').replace(/[^\w\s-]/g, '')
    .trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 60) || 'foto';

// Opsi per foto di data/galeri.json (semua angka = pecahan 0–1 dari ukuran foto ASLI):
//   "potong":   { "atas": 0.05, "bawah": 0.1, "kiri": 0, "kanan": 0 }   -> buang tepi (mis. bar status HP)
//   "samarkan": [ { "x": 0.4, "y": 0.6, "w": 0.3, "h": 0.07 } ]         -> buramkan area (plat nomor, wajah, logo)
async function siapkan(file, potong, samarkan) {
  let buf = await sharp(file).rotate().toBuffer();
  const { width: W, height: H } = await sharp(buf).metadata();
  const px = (v, max) => Math.max(0, Math.min(max, Math.round(v * max)));

  if (Array.isArray(samarkan) && samarkan.length) {
    const layers = [];
    for (const r of samarkan) {
      const left = px(r.x, W), top = px(r.y, H);
      const width = Math.max(1, Math.min(W - left, px(r.w, W))), height = Math.max(1, Math.min(H - top, px(r.h, H)));
      // pikselasi kasar + blur agar benar-benar tidak terbaca
      const small = await sharp(buf).extract({ left, top, width, height })
        .resize(Math.max(1, Math.round(width / 18)), Math.max(1, Math.round(height / 18))).toBuffer();
      const tile = await sharp(small).resize(width, height, { kernel: 'nearest' }).blur(6).toBuffer();
      layers.push({ input: tile, left, top });
    }
    buf = await sharp(buf).composite(layers).toBuffer();
  }

  if (potong) {
    const a = px(potong.atas || 0, H), b = px(potong.bawah || 0, H), k = px(potong.kiri || 0, W), n = px(potong.kanan || 0, W);
    buf = await sharp(buf).extract({ left: k, top: a, width: W - k - n, height: H - a - b }).toBuffer();
  }
  return buf;
}

// Pengaman: jika folder foto asli kosong sama sekali (mis. proyek hasil clone dari GitHub,
// karena foto asli tidak diunggah), jangan hapus galeri yang sudah jadi.
const adaFotoAsli = Object.keys({ penjemputan: 1, pembelian: 1 }).some((k) => {
  const d = path.join(SRC, k);
  return fs.existsSync(d) && fs.readdirSync(d).some((f) => EXT.test(f));
});
if (!adaFotoAsli && fs.existsSync(DATA) && JSON.parse(fs.readFileSync(DATA, 'utf8')).length) {
  console.log('Folder foto-galeri/ kosong — galeri yang sudah ada TIDAK diubah.');
  console.log('Untuk menambah foto, taruh foto asli di foto-galeri/penjemputan atau foto-galeri/pembelian.');
  process.exit(0);
}

const lama = fs.existsSync(DATA) ? JSON.parse(fs.readFileSync(DATA, 'utf8')) : [];
const byId = new Map(lama.map((f) => [f.id, f]));
const hasil = [];
let baru = 0;

for (const kat of Object.keys(KATEGORI)) {
  const dir = path.join(SRC, kat);
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(path.join(OUT, kat), { recursive: true });
  const files = fs.readdirSync(dir).filter((f) => EXT.test(f)).sort();

  for (const file of files) {
    const id = `${kat}/${slug(file)}`;
    const full = `/galeri/${id}.webp`;
    const thumb = `/galeri/${id}-thumb.webp`;
    const outFull = path.join(ROOT, 'public', full);
    const outThumb = path.join(ROOT, 'public', thumb);
    const srcPath = path.join(dir, file);
    const ada = byId.get(id) || {};
    const opsi = JSON.stringify({ potong: ada.potong || null, samarkan: ada.samarkan || null });
    const perlu = !fs.existsSync(outFull) || fs.statSync(srcPath).mtimeMs > fs.statSync(outFull).mtimeMs || ada._opsi !== opsi;

    let w, h;
    try {
      if (perlu) {
        // .rotate() = ikuti orientasi kamera; sharp tidak menyalin EXIF/GPS ke file hasil
        const base = await siapkan(srcPath, ada.potong, ada.samarkan);
        const info = await sharp(base).resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 74 }).toFile(outFull);
        await sharp(base).resize(640, 480, { fit: 'cover', position: 'attention' })
          .webp({ quality: 68 }).toFile(outThumb);
        ({ width: w, height: h } = info);
        baru++;
        console.log('  ✓', id);
      } else {
        ({ width: w, height: h } = await sharp(outFull).metadata());
      }
    } catch (e) {
      console.log('  ✗ gagal memproses', file, '-', e.message);
      continue;
    }

    hasil.push({
      id,
      kategori: kat,
      src: full,
      thumb,
      width: w,
      height: h,
      judul: ada.judul ?? '',
      keterangan: ada.keterangan ?? '',
      ...(ada.potong ? { potong: ada.potong } : {}),
      ...(ada.samarkan ? { samarkan: ada.samarkan } : {}),
      _opsi: opsi,
    });
  }
}

// Hapus file hasil untuk foto yang sudah dihapus dari folder sumber
const dipakai = new Set(hasil.flatMap((f) => [f.src, f.thumb]));
for (const kat of Object.keys(KATEGORI)) {
  for (const f of fs.readdirSync(path.join(OUT, kat))) {
    const p = `/galeri/${kat}/${f}`;
    if (!dipakai.has(p)) { fs.unlinkSync(path.join(OUT, kat, f)); console.log('  − dihapus', p); }
  }
}

fs.writeFileSync(DATA, JSON.stringify(hasil, null, 2) + '\n');
const hitung = (k) => hasil.filter((f) => f.kategori === k).length;
console.log(`\nSelesai: ${hitung('penjemputan')} foto penjemputan, ${hitung('pembelian')} foto pembelian (${baru} diproses baru).`);
console.log('Isi judul/keterangan di data/galeri.json, lalu jalankan: npm run dev');
