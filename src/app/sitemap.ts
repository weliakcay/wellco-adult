import { MetadataRoute } from 'next';
import { getAllProducts } from '@/data/products';
import { ALL_PERSONAS } from '@/data/personas';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wellcoadult.com';
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/urunler`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/personalar`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Product pages
  const products = await getAllProducts();
  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => product.isActive)
    .map((product) => ({
      url: `${baseUrl}/urunler/${product.id}`,
      lastModified: product.updatedAt || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  // Persona pages
  const personaPages: MetadataRoute.Sitemap = ALL_PERSONAS.map((persona) => ({
    url: `${baseUrl}/personalar/${persona.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...personaPages];
}
