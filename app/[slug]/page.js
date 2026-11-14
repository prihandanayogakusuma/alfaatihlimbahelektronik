import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cta from '@/components/Cta';
import Contact from '@/components/Contact';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reveal from '@/components/Reveal';
import { company, waLink } from '@/data/site';
import { halaman, cariHalaman } from '@/data/halaman';

export const dynamicParams = false;

export function generateStaticParams() {
  return halaman.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const h = cariHalaman(slug);
  if (!h) return {};
  const url = `/${h.slug}/`;
  return {
    title: h.title,
    description: h.description,
    alternates: { canonical: url },
    openGraph: {
      type: h.jenis === 'Artikel' ? 'article' : 'website',
      url,
      title: h.title,
      description: h.description,
      images: [{ url: h.gambar }],
    },
    twitter: { card: 'summary_large_image', title: h.title, description: h.description, images: [h.gambar] },
  };
}

export default async function HalamanSeo({ params }) {
  const { slug } = await params;
  const h = cariHalaman(slug);
  if (!h) notFound();

  const pageUrl = `${company.url}/${h.slug}/`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${company.url}/` },
        { '@type': 'ListItem', position: 2, name: h.h1, item: pageUrl },
      ],
    },
    h.jenis === 'Artikel'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: h.h1,
          description: h.description,
          image: `${company.url}${h.gambar}`,
          mainEntityOfPage: pageUrl,
          inLanguage: 'id-ID',
          author: { '@type': 'Organization', name: company.name, url: `${company.url}/` },
          publisher: { '@type': 'Organization', name: company.name, logo: { '@type': 'ImageObject', url: `${company.url}/logo.png` } },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: h.h1,
          description: h.description,
          url: pageUrl,
          image: `${company.url}${h.gambar}`,
          provider: { '@id': `${company.url}/#organization` },
          areaServed: h.slug.includes('jabodetabek')
            ? ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Tangerang Selatan', 'Bekasi'].map((name) => ({ '@type': 'City', name }))
            : { '@type': 'Country', name: 'Indonesia' },
        },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: h.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  const lainnya = halaman.filter((x) => x.slug !== h.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className="skip-link" href="#main">Langsung ke konten</a>
      <Header />
      <main id="main">
        <section className="page-hero">
          <div className="page-hero__bg" style={{ backgroundImage: `url(${h.gambar})` }} aria-hidden="true" />
          <div className="container page-hero__inner">
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Beranda</a> <span aria-hidden="true">/</span> <span>{h.h1}</span>
            </nav>
            <p className="eyebrow eyebrow--light">{h.jenis}</p>
            <h1>{h.h1}</h1>
            <p className="page-hero__lead">{h.lead}</p>
            <div className="hero__actions">
              <a href={waLink(`Halo ${company.name}, saya tertarik dengan: ${h.h1}.`)} target="_blank" rel="noopener" className="btn btn--gold">Konsultasi via WhatsApp</a>
              <a href="#kontak" className="btn btn--ghost">Minta Penawaran</a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container article">
            <article className="prose">
              {h.sections.map((s) => (
                <section key={s.h2}>
                  <h2>{s.h2}</h2>
                  {s.p?.map((t, i) => <p key={i}>{t}</p>)}
                  {s.list && <ul>{s.list.map((t) => <li key={t}>{t}</li>)}</ul>}
                  {s.ol && <ol>{s.ol.map((t) => <li key={t}>{t}</li>)}</ol>}
                </section>
              ))}

              <section>
                <h2>Pertanyaan Umum</h2>
                <div className="faq__list">
                  {h.faqs.map((f, i) => (
                    <details key={f.q} open={i === 0}>
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </article>

            <aside className="article__aside">
              <div className="aside-card">
                <h3>Butuh penawaran cepat?</h3>
                <p>Kirim daftar atau foto aset Anda. Kami melayani perusahaan di Jabodetabek dan seluruh Indonesia, 24 jam setiap hari.</p>
                <a href={waLink(`Halo ${company.name}, saya ingin minta penawaran (${h.h1}).`)} target="_blank" rel="noopener" className="btn btn--primary btn--block">Chat WhatsApp</a>
                <a href={`tel:${company.phoneTel}`} className="aside-card__tel">{company.phoneDisplay}</a>
              </div>
              <nav className="aside-links" aria-label="Halaman terkait">
                <h3>Layanan &amp; Info Lainnya</h3>
                {lainnya.map((x) => <a key={x.slug} href={`/${x.slug}/`}>{x.h1}</a>)}
                <a href="/">Beranda PT Al Faatih Limbah Elektronik</a>
              </nav>
            </aside>
          </div>
        </section>

        <Cta />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Reveal />
    </>
  );
}
