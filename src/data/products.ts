import { Product } from '@/types';
import productsData from './products.json';

// JSON'dan gelen ürünleri Product tipine dönüştür
export const ALL_PRODUCTS: Product[] = productsData.products.map(p => ({
  ...p,
  createdAt: new Date(),
  updatedAt: new Date()
}));

// Tüm kategorileri al
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  ALL_PRODUCTS.forEach(product => {
    product.categories.forEach(cat => categories.add(cat));
  });
  return Array.from(categories).sort();
};

// Kategori bazlı filtreleme
export const filterProductsByCategory = (category?: string): Product[] => {
  if (!category) return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter(p => p.categories.includes(category));
};

// Fiyat aralığına göre filtreleme
export const filterProductsByPrice = (min: number, max: number): Product[] => {
  return ALL_PRODUCTS.filter(p => p.price >= min && p.price <= max);
};

// Arama
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return ALL_PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// SKU ile ürün bul
export const getProductBySku = (sku: string): Product | undefined => {
  return ALL_PRODUCTS.find(p => p.sku === sku);
};

// ID ile ürün bul
export const getProductById = (id: string): Product | undefined => {
  return ALL_PRODUCTS.find(p => p.id === id);
};

// Aktif ürünleri getir
export const getActiveProducts = (): Product[] => {
  return ALL_PRODUCTS.filter(p => p.isActive && p.stock > 0);
};

// Kategoriye göre ürün sayısı
export const getProductCountByCategory = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  ALL_PRODUCTS.forEach(product => {
    product.categories.forEach(cat => {
      counts[cat] = (counts[cat] || 0) + 1;
    });
  });
  return counts;
};

// Öne çıkan ürünler (Hareketli Vibratörler kategorisinden)
export const getFeaturedProducts = (limit: number = 8): Product[] => {
  return ALL_PRODUCTS
    .filter(p =>
      p.isActive &&
      p.stock > 0 &&
      p.categories.includes('Hareketli Vibratörler')
    )
    .slice(0, limit);
};

// İndirimli ürünler
export const getDiscountedProducts = (): Product[] => {
  return ALL_PRODUCTS.filter(p =>
    p.isActive &&
    p.stock > 0 &&
    p.compareAtPrice &&
    p.compareAtPrice > p.price
  );
};
