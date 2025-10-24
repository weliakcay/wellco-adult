import { getAllProducts } from '@/data/products';
import { CategoryPageClient } from '@/components/products/CategoryPageClient';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const products = await getAllProducts();

  return <CategoryPageClient products={products} categorySlug={category} />;
}
