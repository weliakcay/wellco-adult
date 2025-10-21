import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export function FeaturedProducts() {
  // Get 6 featured products (premium tagged and in stock)
  const featuredProducts = getFeaturedProducts(6);

  return (
    <section className="py-20 md:py-32 bg-wellco-neutral relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-wellco-warm/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-wellco-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-wellco-text-dark">
            Öne Çıkan{' '}
            <span className="font-serif italic text-wellco-primary">Ürünler</span>
          </h2>
          <p className="mt-4 text-lg text-wellco-text-dark/70 max-w-2xl mx-auto">
            En çok tercih edilen ve özenle seçilmiş ürünlerimiz
          </p>
          {/* Decorative Line */}
          <div className="flex justify-center pt-2">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-wellco-accent-vibrant to-transparent" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-wellco-primary text-wellco-primary hover:bg-wellco-primary hover:text-white transition-all duration-300 px-8 text-base font-medium group"
            asChild
          >
            <Link href="/urunler">
              Tüm Ürünleri Gör
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-wellco-text-dark/50 italic">
            Tüm ürünlerimiz orijinal ve güvenli tedarikçilerden sağlanmaktadır
          </p>
        </div>
      </div>
    </section>
  );
}
