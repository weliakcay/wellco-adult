import type { Product } from '@/types';
import { fetchProductsFromXml } from '@/lib/xml-products';

// In-memory cache with timestamp
let cachedProducts: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = Number(process.env.PRODUCTS_REVALIDATE_SECONDS ?? 3600) * 1000; // Convert to milliseconds

export async function getAllProducts(): Promise<Product[]> {
  const now = Date.now();

  // Return cached products if still valid
  if (cachedProducts && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedProducts;
  }

  // Fetch fresh products from XML
  try {
    const products = await fetchProductsFromXml();
    if (products.length > 0) {
      cachedProducts = products.filter((product) => product.isActive);
      cacheTimestamp = now;
      return cachedProducts;
    }

    // If no products from XML, return empty array or cached products
    console.warn('No products fetched from XML');
    return cachedProducts || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return cached products if available, otherwise empty array
    return cachedProducts || [];
  }
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
  const filtered = products.filter(
    (product) =>
      product.stock > 0 &&
      product.categories.includes('Klitoris Vibratörler') &&
      product.isActive
  );

  return filtered.slice(0, limit);
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
