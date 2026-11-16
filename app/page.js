import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Services from '@/components/Services';
import Categories from '@/components/Categories';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import SeoLinks from '@/components/SeoLinks';
import WhyUs from '@/components/WhyUs';
import Industries from '@/components/Industries';
import Faq from '@/components/Faq';
import Cta from '@/components/Cta';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reveal from '@/components/Reveal';
import { company, faqs } from '@/data/site';

const faqJsonLd = [
  // Nama situs yang ditampilkan Google di hasil pencarian (menggantikan "Alfaatih.com")
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${company.url}/#website`,
    name: 'Al Faatih Limbah Elektronik',
    alternateName: ['Alfaatih', 'PT Al Faatih Limbah Elektronik', 'Alfaatih Limbah Elektronik'],
    url: `${company.url}/`,
    inLanguage: 'id-ID',
    publisher: { '@id': `${company.url}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <a className="skip-link" href="#main">Langsung ke konten</a>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Services />
        <Categories />
        <Process />
        <Gallery />
        <SeoLinks />
        <WhyUs />
        <Industries />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Reveal />
    </>
  );
}
