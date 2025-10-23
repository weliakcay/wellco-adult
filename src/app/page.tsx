import { HeroSection, CategoryCards, TrustBadges, Marketplaces, PersonasSpotlight } from '@/components/home';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryCards />
      <FeaturedProducts />
      <TrustBadges />
      <PersonasSpotlight />
      <Marketplaces />
    </>
  );
}
