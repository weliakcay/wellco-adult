import { HeroSection, CategoryCards, TrustBadges, Marketplaces, BlogPreview } from '@/components/home';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryCards />
      <FeaturedProducts />
      <TrustBadges />
      <Marketplaces />
      {/* TransitionBand geçici olarak kaldırıldı - daha iyi bir örnek bulunacak */}
      <BlogPreview />
    </>
  );
}
