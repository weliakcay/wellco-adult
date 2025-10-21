'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { ALL_PRODUCTS } from '@/data/products';
import { filterProductsByMainCategory } from '@/data/category-mapping';
import { MAIN_CATEGORIES } from '@/constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [showFilters, setShowFilters] = useState(false);

  // Ana kategori bilgisini bul
  const currentCategory = MAIN_CATEGORIES.find(cat => cat.slug === categorySlug);

  // Ana kategoriye göre ürünleri filtrele
  const categoryProducts = useMemo(() => {
    return filterProductsByMainCategory(ALL_PRODUCTS, categorySlug);
  }, [categorySlug]);

  // Arama ve fiyat filtreleri
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const isAvailable = product.isActive && product.stock > 0;

      return matchesSearch && matchesPrice && isAvailable;
    });
  }, [categoryProducts, searchQuery, priceRange]);

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-wellco-neutral flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-serif text-wellco-text-dark mb-4">
            Kategori Bulunamadı
          </h1>
          <p className="text-wellco-text-muted mb-8">
            Aradığınız kategori mevcut değil.
          </p>
          <Button asChild>
            <Link href="/urunler">Tüm Ürünlere Dön</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wellco-neutral">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-wellco-primary/10 to-wellco-secondary/20 border-b border-wellco-primary/10">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-wellco-text-muted mb-4">
            <Link href="/" className="hover:text-wellco-primary transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/urunler" className="hover:text-wellco-primary transition-colors">
              Ürünler
            </Link>
            <span>/</span>
            <span className="text-wellco-text-dark">{currentCategory.name}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-light text-wellco-text-dark mb-4">
            {currentCategory.name}
          </h1>
          <p className="text-wellco-text-dark/70 max-w-2xl mb-2">
            {currentCategory.description}
          </p>
          <p className="text-wellco-text-dark/70">
            {filteredProducts.length} ürün bulundu
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Filters */}
          <aside className={`
            ${showFilters ? 'block' : 'hidden'}
            lg:block
            w-full lg:w-64
            space-y-6
            ${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:relative lg:inset-auto lg:p-0' : ''}
          `}>
            {/* Mobile Close Button */}
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

            {/* Search */}
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

            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg text-wellco-text-dark">Fiyat Aralığı</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="border-wellco-primary/20"
                  />
                  <span className="text-wellco-text-muted">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="border-wellco-primary/20"
                  />
                </div>
                <div className="text-sm text-wellco-text-muted">
                  ₺{priceRange[0].toLocaleString('tr-TR')} - ₺{priceRange[1].toLocaleString('tr-TR')}
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {searchQuery && (
              <div className="space-y-3 pt-4 border-t border-wellco-primary/10">
                <h3 className="font-serif text-sm text-wellco-text-dark">Aktif Filtreler</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-wellco-primary/10 text-wellco-primary cursor-pointer hover:bg-wellco-primary/20"
                    onClick={() => setSearchQuery('')}
                  >
                    &quot;{searchQuery}&quot;
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                </div>
              </div>
            )}

            {/* Other Categories */}
            <div className="space-y-3 pt-4 border-t border-wellco-primary/10">
              <h3 className="font-serif text-sm text-wellco-text-dark">Diğer Kategoriler</h3>
              <div className="space-y-2">
                {MAIN_CATEGORIES.filter(cat => cat.slug !== categorySlug).map((category) => (
                  <Link
                    key={category.id}
                    href={`/kategoriler/${category.slug}`}
                    className="block px-4 py-2 rounded-lg hover:bg-wellco-primary/10 text-wellco-text-dark transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Mobile Filter Toggle */}
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

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-serif text-wellco-text-dark mb-2">
                  Ürün bulunamadı
                </h3>
                <p className="text-wellco-text-muted mb-6">
                  Bu kategoride henüz ürün bulunmuyor veya filtrelerinizle eşleşen ürün yok.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 20000]);
                  }}
                  className="border-wellco-primary/30"
                >
                  Filtreleri Temizle
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
