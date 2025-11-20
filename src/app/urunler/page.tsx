import { getAllProducts, getAllCategories, getProductCountByCategory } from '@/data/products';
import { getDolls } from '@/data/personas';
import { ProductsPageClient } from '@/components/products/ProductsPageClient';

export default async function ProductsPage() {
  const [products, categories, counts, dolls] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getProductCountByCategory(),
    Promise.resolve(getDolls().filter(d => d.isActive)),
  ]);

  return <ProductsPageClient products={products} categories={categories} categoryCounts={counts} dolls={dolls} />;
}
