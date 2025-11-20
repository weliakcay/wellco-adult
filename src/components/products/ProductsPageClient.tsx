'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/types';
import type { Persona } from '@/types/persona';
import { ProductCard } from '@/components/products/ProductCard';
import { DollCard } from '@/components/personas/DollCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, X, Heart } from 'lucide-react';

interface ProductsPageClientProps {
  products: Product[];
  categories: string[];
  categoryCounts: Record<string, number>;
  dolls: Persona[];
}

export function ProductsPageClient({
  products,
  categories,
  categoryCounts,
  dolls,
}: ProductsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      const matchesCategory =
        !selectedCategory || product.categories.includes(selectedCategory);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const isAvailable = product.isActive && product.stock > 0;

      return matchesSearch && matchesCategory && matchesPrice && isAvailable;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  return (
    <div className="min-h-screen bg-wellco-neutral">
      {/* Premium Dolls Hero Section */}
      {dolls.length > 0 && (
        <div id="dolls" className="bg-gradient-to-br from-wellco-accent-magenta/10 via-wellco-accent-vibrant/5 to-wellco-neutral border-b border-wellco-accent-magenta/10">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-wellco-accent-magenta/10 px-4 py-2 text-sm font-medium text-wellco-accent-magenta mb-4">
                <Heart className="h-4 w-4" />
                Premium Koleksiyon
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-wellco-text-dark mb-4">
                Silikon Bebek{' '}
                <span className="font-serif italic text-wellco-accent-magenta">Karakterleri</span>
              </h2>
              <p className="text-base md:text-lg text-wellco-text-dark/70 max-w-2xl mx-auto">
                Adult X iş birliği ile gelen ultra gerçekçi silikon bebekler. Hikayeleri, özellikleri ve
                kişisel önerileriyle deneyiminizi zenginleştirin.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {dolls.map((doll) => (
                <DollCard key={doll.id} persona={doll} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regular Products Header */}
      <div className="bg-gradient-to-br from-wellco-primary/10 to-wellco-secondary/20 border-b border-wellco-primary/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-serif font-light text-wellco-text-dark mb-4">
                Ürünler
              </h1>
              <p className="text-wellco-text-dark/70 max-w-2xl">
                {filteredProducts.length} ürün bulundu
              </p>
            </div>
            <div className="relative w-40 h-20 opacity-30 hover:opacity-100 transition-opacity">
              <Image src="/logo.svg" alt="Wellco Adult" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside
            className={`
            ${showFilters ? 'block' : 'hidden'}
            lg:block
            w-full lg:w-64
            space-y-6
            ${
              showFilters
                ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:relative lg:inset-auto lg:p-0'
                : ''
            }
          `}
          >
            {showFilters && (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden absolute top-4 right-4"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}

            <div className="space-y-3">
              <h3 className="font-serif text-lg text-wellco-text-dark">Ara</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-wellco-text-muted" />
                <Input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-wellco-primary/20 focus:border-wellco-primary"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg text-wellco-text-dark">Kategoriler</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex justify-between items-center ${
                    selectedCategory === ''
                      ? 'bg-wellco-primary text-white'
                      : 'hover:bg-wellco-primary/10 text-wellco-text-dark'
                  }`}
                >
                  <span>Tümü</span>
                  <span className="text-xs opacity-70">{products.length}</span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex justify-between items-center ${
                      selectedCategory === category
                        ? 'bg-wellco-primary text-white'
                        : 'hover:bg-wellco-primary/10 text-wellco-text-dark'
                    }`}
                  >
                    <span className="text-sm">{category}</span>
                    <span className="text-xs opacity-70">{categoryCounts[category] ?? 0}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg text-wellco-text-dark">Fiyat Aralığı</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value || 0), priceRange[1]])
                    }
                    className="border-wellco-primary/20"
                  />
                  <span className="text-wellco-text-muted">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value || 0)])
                    }
                    className="border-wellco-primary/20"
                  />
                </div>
                <div className="text-sm text-wellco-text-muted">
                  ₺{priceRange[0].toLocaleString('tr-TR')} - ₺{priceRange[1].toLocaleString('tr-TR')}
                </div>
              </div>
            </div>

            {(selectedCategory || searchQuery) && (
              <div className="space-y-3 pt-4 border-t border-wellco-primary/10">
                <h3 className="font-serif text-sm text-wellco-text-dark">Aktif Filtreler</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <Badge
                      variant="secondary"
                      className="bg-wellco-primary/10 text-wellco-primary cursor-pointer hover:bg-wellco-primary/20"
                      onClick={() => setSelectedCategory('')}
                    >
                      {selectedCategory}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      className="bg-wellco-primary/10 text-wellco-primary cursor-pointer hover:bg-wellco-primary/20"
                      onClick={() => setSearchQuery('')}
                    >
                      &quot;{searchQuery}&quot;
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </aside>

          <main className="flex-1 space-y-6">
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
                className="w-full border-wellco-primary/30"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtrele
              </Button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-wellco-primary/10 rounded-2xl p-12 text-center space-y-4">
                <div className="text-5xl">🛍️</div>
                <h2 className="text-2xl font-serif text-wellco-text-dark">
                  Sonuç bulunamadı
                </h2>
                <p className="text-wellco-text-muted max-w-md mx-auto">
                  Farklı bir arama deneyin veya filtreleri sıfırlayın.
                </p>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                      setPriceRange([0, 20000]);
                    }}
                  >
                    Filtreleri Sıfırla
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
