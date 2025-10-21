import { notFound } from 'next/navigation';
import { getProductById } from '@/data/products';
import { ProductDetailClient } from '@/components/products/ProductDetailClient';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
