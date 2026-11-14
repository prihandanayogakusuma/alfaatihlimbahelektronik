import { company } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap() {
  return [
    { url: `${company.url}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
  ];
}
