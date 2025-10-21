import { unstable_cache } from 'next/cache';
import type { Product } from '@/types';
import { fetchProductsFromXml } from '@/lib/xml-products';
import fallbackProductsData from './products.json';

const FALLBACK_PRODUCTS: Product[] = fallbackProductsData.products.map((product) => ({
  ...product,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const cachedFetchProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const products = await fetchProductsFromXml();
    const source = products.length > 0 ? products : FALLBACK_PRODUCTS;
    return source.filter((product) => product.isActive);
  },
  ['wellco-products-xml'],
  {
    revalidate: Number(process.env.PRODUCTS_REVALIDATE_SECONDS ?? 3600),
  }
);

export async function getAllProducts(): Promise<Product[]> {
  return cachedFetchProducts();
}

export async function getAllCategories(): Promise<string[]> {
  const products = await getAllProducts();
  const categories = new Set<string>();

  products.forEach((product) => {
    product.categories.forEach((category) => {
      if (category) {
        categories.add(category);
      }
    });
  });

  return Array.from(categories).sort((a, b) => a.localeCompare(b, 'tr'));
}

export async function getProductCountByCategory(): Promise<Record<string, number>> {
  const products = await getAllProducts();
  const counts: Record<string, number> = {};

  products.forEach((product) => {
    product.categories.forEach((category) => {
      if (!category) return;
      counts[category] = (counts[category] || 0) + 1;
    });
  });

  return counts;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.id === id);
}

export async function getProductBySku(sku: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.sku === sku);
}

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  const products = await getAllProducts();
  return products
    .filter(
      (product) =>
        product.stock > 0 && product.tags.includes('premium') && product.categories.length > 0
    )
    .slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getAllProducts();
  const normalized = query.toLowerCase();

  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(normalized) ||
      product.description.toLowerCase().includes(normalized) ||
      product.tags.some((tag) => tag.toLowerCase().includes(normalized))
    );
  });
}
