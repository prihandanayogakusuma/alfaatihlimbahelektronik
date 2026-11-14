# PT Al Faatih Limbah Elektronik — Website

Website company profile PT Al Faatih Limbah Elektronik, penerima limbah elektronik dan aset IT bekas perusahaan di Jabodetabek.

Dibangun dengan **Next.js (React)** dan diekspor sebagai **website statis** (HTML lengkap, ramah SEO), sehingga bisa di-upload ke hosting biasa (cPanel/Apache).

## Menjalankan

```bash
npm install        # sekali saja, setelah clone
npm run dev        # mode edit -> http://localhost:3000
npm run build      # versi siap online -> folder out/
npm run preview    # melihat hasil build
```

## Mengubah isi

| Yang diubah | File |
|---|---|
| Nama, telepon/WA, email, alamat, Instagram, domain, jam buka | `data/site.js` (bagian `company`) |
| Layanan, kategori, alur kerja, keunggulan, FAQ, area layanan | `data/site.js` |
| Gambar slider tampilan utama | `public/hero/` + `heroSlides` di `data/site.js` |
| Foto kategori | `public/kategori/` |
| Judul & deskripsi Google (SEO) | `app/layout.js` |

## Galeri penjemputan & pembelian

1. Taruh foto asli di `foto-galeri/penjemputan/` atau `foto-galeri/pembelian/`
2. Jalankan `npm run galeri` (foto dikompres, data GPS dihapus, bisa dipotong/disamarkan)
3. Isi judul/keterangan di `data/galeri.json`

Panduan lengkap: `foto-galeri/CARA-PAKAI.txt`.
Foto **asli** tidak diunggah ke GitHub (lihat `.gitignore`) karena bisa memuat data pribadi; hanya versi web yang sudah disamarkan di `public/galeri/`.

## Online

`npm run build`, lalu upload **isi** folder `out/` ke `public_html` hosting.
Jangan lupa mengganti domain di `data/site.js` sebelum build.
