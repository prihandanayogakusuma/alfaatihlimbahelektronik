// ==========================================================
// DATA PERUSAHAAN — ubah semua informasi di file ini saja.
// ==========================================================
import galeri from './galeri.json';

export const company = {
  name: 'PT Al Faatih Limbah Elektronik',
  shortName: 'AL FAATIH',
  tagline: 'Limbah Elektronik',
  url: 'https://www.alfaatih.com', // domain resmi (alfaatih.com tanpa www otomatis dialihkan ke sini)
  phoneDisplay: '0812-2222-7472',
  phoneTel: '+6281222227472',
  whatsapp: '6281222227472', // format internasional, tanpa + (untuk link wa.me)
  email: 'ptalfatihlimbahelektronik@gmail.com',
  instagram: 'alfatih.limbahelektronik',
  address: {
    street: 'Jl. Kramat No.70, RT.005/RW.017, Jombang',
    district: 'Kec. Ciputat',
    city: 'Kota Tangerang Selatan',
    region: 'Banten',
    postalCode: '15414',
  },
  hours: 'Buka 24 jam, setiap hari',
};

export const fullAddress = `${company.address.street}, ${company.address.district}, ${company.address.city}, ${company.address.region} ${company.address.postalCode}`;

// Google Maps (tanpa API key). Pencarian memakai nama + alamat agar pin tepat di lokasi usaha.
const mapsQuery = encodeURIComponent(`${company.name}, ${fullAddress}`);
export const maps = {
  embed: `https://maps.google.com/maps?q=${mapsQuery}&hl=id&z=16&output=embed`,
  open: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
};

export const instagramUrl = `https://www.instagram.com/${company.instagram}/`;

export const waLink = (text) =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;

// Menu "Galeri" otomatis muncul jika sudah ada foto di data/galeri.json
export const navLinks = [
  { href: '/#tentang', label: 'Tentang Kami' },
  { href: '/#layanan', label: 'Layanan' },
  { href: '/#kategori', label: 'Yang Kami Terima' },
  { href: '/#proses', label: 'Proses' },
  ...(galeri.length ? [{ href: '/#galeri', label: 'Galeri' }] : []),
  { href: '/#faq', label: 'FAQ' },
];

// Angka asli (dikonfirmasi pemilik). Tahun pengalaman dihitung otomatis dari tahun berdiri.
export const tahunBerdiri = 2004;
export const lamaPengalaman = new Date().getFullYear() - tahunBerdiri;
export const stats = [
  { value: lamaPengalaman, suffix: '', label: `Tahun pengalaman (sejak ${tahunBerdiri})` },
  { value: 500, suffix: '+', label: 'Unit perangkat diproses' },
  { value: 50, suffix: '+', label: 'Klien korporat' },
  { value: 24, suffix: ' Jam', label: 'Siap melayani setiap hari' },
];

export const services = [
  {
    icon: 'bin',
    title: 'Penerimaan Limbah Elektronik',
    text: 'Kami menerima perangkat elektronik rusak maupun usang dari perusahaan dalam jumlah kecil hingga skala besar, untuk diproses sesuai ketentuan pengelolaan limbah.',
  },
  {
    icon: 'money',
    title: 'Pembelian Aset IT Bekas',
    text: 'Aset yang masih bernilai kami taksir secara adil berdasarkan jenis, kondisi, dan jumlah — mengubah inventaris yang menganggur menjadi nilai bagi perusahaan Anda.',
  },
  {
    icon: 'lock',
    title: 'Penghancuran Data',
    text: 'Hard disk, SSD, dan media penyimpanan dihapus secara permanen atau dihancurkan secara fisik, sehingga data perusahaan Anda tidak dapat dipulihkan.',
  },
  {
    icon: 'truck',
    title: 'Penjemputan ke Lokasi',
    text: 'Armada dan tenaga angkut kami datang ke kantor, gudang, atau pabrik Anda. Pembongkaran, pengemasan, dan pengangkutan sepenuhnya kami tangani.',
  },
  {
    icon: 'doc',
    title: 'Dokumentasi & Berita Acara',
    text: 'Berita acara serah terima, daftar inventaris, dan berita acara pemusnahan disiapkan rapi untuk kebutuhan audit, akuntansi aset, dan pelaporan internal.',
  },
  {
    icon: 'recycle',
    title: 'Daur Ulang Bertanggung Jawab',
    text: 'Material bernilai dipilah dan disalurkan untuk didaur ulang, sementara komponen berbahaya ditangani terpisah agar tidak mencemari tanah dan air.',
  },
];

// Foto kategori ada di public/kategori/<img>.webp (ukuran 720x450)
export const categories = [
  { img: 'komputer-laptop', title: 'Komputer & Laptop', text: 'Komputer bekas kantor: PC desktop, laptop, all-in-one, thin client, dan workstation.' },
  { img: 'server-storage', title: 'Server & Storage', text: 'Server rack, blade, NAS, SAN, tape library, dan perangkat data center.' },
  { img: 'perangkat-jaringan', title: 'Perangkat Jaringan', text: 'Switch, router, firewall, access point, modem, dan panel patch.' },
  { img: 'ups-baterai', title: 'UPS & Baterai', text: 'UPS, baterai aki, baterai lithium, inverter, dan power supply.' },
  { img: 'printer-mesin-kantor', title: 'Printer & Mesin Kantor', text: 'Printer, scanner, mesin fotokopi, mesin faks, dan mesin absensi.' },
  { img: 'monitor-display', title: 'Monitor & Display', text: 'Monitor LCD/LED, CRT, proyektor, TV, dan videotron.' },
  { img: 'komponen-pcb', title: 'Komponen & PCB', text: 'Motherboard, RAM, prosesor, hard disk, SSD, dan papan sirkuit.' },
  { img: 'kabel-industri', title: 'Kabel & Elektronik Industri', text: 'Kabel tembaga, panel listrik, perangkat telekomunikasi, dan mesin industri.' },
];

export const steps = [
  { title: 'Konsultasi', text: 'Hubungi kami dan kirimkan daftar atau foto aset. Tim kami merespons dengan cepat dan tanpa biaya.' },
  { title: 'Survei & Penilaian', text: 'Kami melakukan survei ke lokasi bila diperlukan, lalu menilai aset secara jujur dan terbuka.' },
  { title: 'Penawaran & Kesepakatan', text: 'Anda menerima penawaran tertulis yang jelas. Tidak ada biaya tersembunyi di kemudian hari.' },
  { title: 'Penjemputan', text: 'Tim kami menjemput, mengemas, dan mengangkut seluruh aset sesuai jadwal yang Anda tentukan.' },
  { title: 'Pengolahan & Laporan', text: 'Data dimusnahkan, material diolah, dan seluruh dokumen resmi diserahkan kepada perusahaan Anda.' },
];

export const heroSteps = [
  'Konsultasi & inventarisasi aset',
  'Survei dan penilaian transparan',
  'Penjemputan oleh tim kami',
  'Pemusnahan data & pengolahan',
  'Dokumentasi lengkap untuk audit',
];

export const reasons = [
  { title: 'Transparan', text: 'Penilaian dan penawaran disampaikan secara terbuka, tertulis, dan mudah dipahami.' },
  { title: 'Keamanan Data', text: 'Kerahasiaan informasi perusahaan Anda adalah prioritas kami, bukan sekadar janji.' },
  { title: 'Respons Cepat', text: 'Pertanyaan Anda dijawab pada hari yang sama; penjemputan dijadwalkan secepatnya.' },
  { title: 'Jangkauan Nasional', text: 'Berkantor pusat di Tangerang Selatan, kami melayani perusahaan di seluruh Indonesia.' },
  { title: 'Pembayaran Tepat Waktu', text: 'Untuk aset bernilai, pembayaran dilakukan segera setelah kesepakatan tercapai.' },
  { title: 'Siap Audit', text: 'Dokumentasi lengkap mendukung kepatuhan, akuntansi aset, dan laporan keberlanjutan.' },
  { title: 'Ramah Lingkungan', text: 'Material didaur ulang secara maksimal, limbah berbahaya ditangani secara terpisah.' },
  { title: 'Tim Profesional', text: 'Petugas berpengalaman, bekerja tertib, rapi, dan menghormati aturan lokasi Anda.' },
];

export const industries = [
  'Perbankan & Keuangan',
  'Manufaktur',
  'Telekomunikasi',
  'Rumah Sakit & Kesehatan',
  'Pendidikan',
  'Instansi Pemerintah',
  'Ritel & Logistik',
  'Teknologi & Data Center',
  'Minyak, Gas & Pertambangan',
];

export const faqs = [
  {
    q: 'Jenis limbah elektronik apa saja yang diterima?',
    a: 'Kami menerima komputer, laptop, server, storage, perangkat jaringan, UPS dan baterai, printer, mesin fotokopi, monitor, proyektor, PCB, kabel, serta peralatan elektronik industri — baik dalam kondisi berfungsi maupun rusak.',
  },
  {
    q: 'Apakah limbah elektronik dijemput ke lokasi perusahaan?',
    a: 'Ya. Tim kami melakukan penjemputan langsung ke lokasi Anda, lengkap dengan armada dan tenaga angkut, sehingga perusahaan tidak perlu repot mengatur logistik.',
  },
  {
    q: 'Wilayah mana saja yang dilayani?',
    a: 'Kami melayani perusahaan di seluruh Indonesia — mulai dari Jabodetabek, Jawa, dan Bali hingga Sumatera, Kalimantan, Sulawesi, serta Indonesia Timur. Kantor pusat dan gudang kami berada di Ciputat, Tangerang Selatan; jadwal penjemputan disesuaikan dengan lokasi Anda.',
  },
  {
    q: 'Bagaimana keamanan data pada hard disk dan perangkat penyimpanan?',
    a: 'Seluruh media penyimpanan diproses melalui penghapusan data permanen atau penghancuran fisik, sehingga data tidak dapat dipulihkan. Kami menerbitkan berita acara sebagai bukti.',
  },
  {
    q: 'Apakah aset IT bekas kami bisa dihargai?',
    a: 'Bisa. Aset yang masih memiliki nilai akan kami taksir secara transparan berdasarkan jenis, jumlah, dan kondisi, lalu dibayarkan sesuai kesepakatan.',
  },
  {
    q: 'Dokumen apa yang diterima perusahaan setelah proses selesai?',
    a: 'Perusahaan menerima berita acara serah terima, daftar inventaris aset, dan berita acara pemusnahan data yang dapat digunakan untuk keperluan audit dan pelaporan internal.',
  },
];

// Wilayah layanan (sesuai konfirmasi: seluruh Indonesia; kantor pusat di Tangerang Selatan)
export const serviceRegion = 'Seluruh Indonesia';
export const serviceAreas = [
  'Jabodetabek',
  'Banten',
  'Jawa Barat',
  'Jawa Tengah & DI Yogyakarta',
  'Jawa Timur',
  'Bali & Nusa Tenggara',
  'Sumatera',
  'Kalimantan',
  'Sulawesi',
  'Maluku & Papua',
];

// Gambar slider di tampilan utama (file ada di public/hero/<src>-1920.webp & -960.webp).
// Untuk mengganti: simpan foto baru dengan nama yang sama, atau tambah item baru di sini.
export const heroSlides = [
  { src: 'komponen-pcb', caption: 'Komponen & PCB bekas' },
  { src: 'pemilahan-ewaste', caption: 'Pemilahan limbah elektronik' },
  { src: 'penghancuran-data', caption: 'Penghancuran data terjamin' },
  { src: 'server-data-center', caption: 'Server & data center' },
  { src: 'daur-ulang-komponen', caption: 'Daur ulang bertanggung jawab' },
  { src: 'komputer-kantor', caption: 'Komputer & perangkat kantor' },
];
