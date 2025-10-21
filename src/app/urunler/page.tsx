import { getAllProducts, getAllCategories, getProductCountByCategory } from '@/data/products';
import { ProductsPageClient } from '@/components/products/ProductsPageClient';

export default async function ProductsPage() {
  const [products, categories, counts] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getProductCountByCategory(),
  ]);

  return <ProductsPageClient products={products} categories={categories} categoryCounts={counts} />;
}
