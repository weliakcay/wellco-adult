import { getAllProducts } from '@/data/products';
import { CategoryPageClient } from '@/components/products/CategoryPageClient';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await getAllProducts();

  return <CategoryPageClient products={products} categorySlug={params.category} />;
}
