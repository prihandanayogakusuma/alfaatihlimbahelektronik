import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Services from '@/components/Services';
import Categories from '@/components/Categories';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import WhyUs from '@/components/WhyUs';
import Industries from '@/components/Industries';
import Faq from '@/components/Faq';
import Cta from '@/components/Cta';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reveal from '@/components/Reveal';

export default function Home() {
  return (
    <>
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
