'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Share2, Check, X } from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  const handleShare = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description.substring(0, 100),
          url: currentUrl,
        });
      } catch (error) {
        console.log('Paylaşım iptal edildi', error);
      }
    } else if (currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      alert('Link kopyalandı!');
    }
  };

  const cleanDescription = product.description
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

  const shortDescription =
    cleanDescription.substring(0, 500) + (cleanDescription.length > 500 ? '...' : '');

  const hasDiscount =
    product.compareAtPrice !== undefined && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-wellco-neutral">
      <div className="bg-white border-b border-wellco-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-wellco-text-muted">
            <Link href="/" className="hover:text-wellco-primary transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/urunler" className="hover:text-wellco-primary transition-colors">
              Ürünler
            </Link>
            <span>/</span>
            <span className="text-wellco-text-dark">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-wellco-primary/10">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={product.title}
                  fill
                  className="object-contain p-8"
                  key={selectedImageIndex}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-wellco-text-muted">Ürün Görseli Yükleniyor</p>
                  </div>
                </div>
              )}
              {hasDiscount && (
                <Badge className="absolute top-4 right-4 bg-wellco-accent-vibrant text-white">
                  %{discountPercentage} İndirim
                </Badge>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 cursor-pointer hover:border-wellco-primary transition-colors ${
                      selectedImageIndex === index
                        ? 'border-wellco-primary ring-2 ring-wellco-primary/20'
                        : 'border-wellco-primary/10'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  SKU: {product.sku}
                </Badge>
                {product.stock > 0 ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <Check className="w-3 h-3 mr-1" />
                    Stokta
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                    <X className="w-3 h-3 mr-1" />
                    Tükendi
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-wellco-text-dark">
                {product.title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="bg-wellco-primary/10 text-wellco-primary"
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className="flex items-baseline gap-4 py-4 border-y border-wellco-primary/10">
              <div className="text-4xl font-bold text-wellco-primary">
                ₺{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </div>
              {hasDiscount && product.compareAtPrice && (
                <div className="text-2xl text-wellco-text-muted line-through">
                  ₺{product.compareAtPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-wellco-text-dark">Ürün Açıklaması</h2>
              <p className="text-wellco-text-dark/80 leading-relaxed whitespace-pre-line">
                {shortDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="flex-1 gradient-cta text-white hover:opacity-90 transition-opacity"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {addedToCart ? 'Sepete Eklendi' : 'Sepete Ekle'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`border-wellco-primary/30 hover:bg-wellco-primary/10 hover:border-wellco-primary ${
                  isFavorite(product.id) ? 'bg-wellco-accent-vibrant/10 border-wellco-accent-vibrant' : ''
                }`}
                onClick={handleToggleFavorite}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite(product.id)
                      ? 'fill-wellco-accent-vibrant text-wellco-accent-vibrant'
                      : ''
                  }`}
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-wellco-primary/30 hover:bg-wellco-primary/10 hover:border-wellco-primary"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Paylaş
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-wellco-primary/10">
              <div className="bg-white rounded-xl border border-wellco-primary/10 p-4 text-center">
                <h3 className="text-sm font-semibold text-wellco-text-dark mb-2">
                  Gizli Kargo
                </h3>
                <p className="text-xs text-wellco-text-muted">
                  Tüm siparişlerde gizlilik prensipleriyle paketleme yapılır.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-wellco-primary/10 p-4 text-center">
                <h3 className="text-sm font-semibold text-wellco-text-dark mb-2">
                  Orijinal Ürün Garantisi
                </h3>
                <p className="text-xs text-wellco-text-muted">
                  Tedarikçilerimizden orijinal sertifikalı ürünler sağlıyoruz.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-wellco-primary/10 p-4 text-center">
                <h3 className="text-sm font-semibold text-wellco-text-dark mb-2">
                  7/24 Destek
                </h3>
                <p className="text-xs text-wellco-text-muted">
                  Danışmanlarımız ve AI asistanlarımız her zaman yanınızda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
