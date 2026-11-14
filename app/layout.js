import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import { company, services, faqs, maps, serviceAreas, instagramUrl } from '@/data/site';
import './globals.css';

const serif = Fraunces({ subsets: ['latin'], weight: ['500', '600'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });

const title = 'Jasa Limbah Elektronik Perusahaan Jabodetabek | Al Faatih';
const description =
  'Terima limbah elektronik & aset IT bekas perusahaan se-Jabodetabek: komputer, laptop, server, UPS, printer. Dijemput ke lokasi, dinilai adil, ada berita acara.';

// ========== SEO: meta tag, Open Graph, Twitter ==========
export const metadata = {
  metadataBase: new URL(company.url),
  title,
  description,
  keywords: [
    'limbah elektronik', 'e-waste', 'jasa pengelolaan limbah elektronik', 'terima limbah elektronik perusahaan',
    'pembelian aset IT bekas', 'jual komputer bekas kantor', 'jual server bekas', 'daur ulang elektronik',
    'penghancuran data', 'pemusnahan hard disk', 'limbah B3 elektronik', company.name,
  ],
  authors: [{ name: company.name }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: company.name,
    url: '/',
    title: `${company.name} — Mitra Pengelolaan E-Waste Perusahaan`,
    description:
      'Kami menerima limbah elektronik dan aset IT perusahaan Anda secara aman, transparan, dan bertanggung jawab. Penjemputan ke lokasi dan dokumentasi lengkap.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: company.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.name} — Mitra Pengelolaan E-Waste Perusahaan`,
    description: 'Penerimaan limbah elektronik & aset IT perusahaan: aman, transparan, terdokumentasi.',
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // iPhone berponi: konten memakai seluruh layar, area aman diatur di CSS
  themeColor: '#1f3d2c',
};

// ========== SEO: data terstruktur schema.org ==========
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${company.url}/#organization`,
    name: company.name,
    alternateName: 'Al Faatih E-Waste',
    description: 'Perusahaan penerima dan pengelola limbah elektronik serta aset IT bekas dari perusahaan, dengan layanan penjemputan, penghancuran data, dan dokumentasi resmi.',
    url: `${company.url}/`,
    logo: `${company.url}/logo.png`,
    image: `${company.url}/og-image.png`,
    telephone: company.phoneTel,
    email: company.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address.street}, ${company.address.district}`,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: 'ID',
    },
    areaServed: serviceAreas.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    }],
    hasMap: maps.open,
    sameAs: [instagramUrl, maps.open],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Pengelolaan Limbah Elektronik',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title } })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
