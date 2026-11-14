import { company } from '@/data/site';
import { halaman } from '@/data/halaman';

export const dynamic = 'force-static';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${company.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...halaman.map((h) => ({
      url: `${company.url}/${h.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: h.jenis === 'Artikel' ? 0.6 : 0.8,
    })),
  ];
}
