'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Share2, Check, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!product) {
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description.substring(0, 100),
          url: window.location.href,
        });
      } catch (error) {
        console.log('Paylaşım iptal edildi', error);
      }
    } else {
      // Fallback: Kopyala
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-wellco-neutral flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-serif text-wellco-text-dark mb-4">
            Ürün Bulunamadı
          </h1>
          <p className="text-wellco-text-muted mb-8">
            Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
          </p>
          <Button asChild>
            <Link href="/urunler">Ürünlere Dön</Link>
          </Button>
        </div>
      </div>
    );
  }

  // HTML etiketlerini temizle
  const cleanDescription = product.description
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

  // İlk 500 karakteri al
  const shortDescription = cleanDescription.substring(0, 500) + (cleanDescription.length > 500 ? '...' : '');

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-wellco-neutral">
      {/* Breadcrumb */}
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
          {/* Product Images */}
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

            {/* Thumbnail Images */}
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

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & SKU */}
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

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <Badge key={category} variant="secondary" className="bg-wellco-primary/10 text-wellco-primary">
                  {category}
                </Badge>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 py-4 border-y border-wellco-primary/10">
              <div className="text-4xl font-bold text-wellco-primary">
                ₺{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </div>
              {hasDiscount && (
                <div className="text-2xl text-wellco-text-muted line-through">
                  ₺{product.compareAtPrice!.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </div>
              )}
            </div>

            {/* Short Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-wellco-text-dark/70 leading-relaxed">
                {shortDescription}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-wellco-primary hover:bg-wellco-primary/90 text-white"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Sepete Eklendi!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Sepete Ekle
                  </>
                )}
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className={`border-wellco-primary/30 ${isFavorite(productId) ? 'bg-wellco-accent-vibrant/10 border-wellco-accent-vibrant' : ''}`}
                  onClick={() => toggleFavorite(productId)}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorite(productId) ? 'fill-wellco-accent-vibrant text-wellco-accent-vibrant' : ''}`} />
                  {isFavorite(productId) ? 'Favorilerde' : 'Favorilere Ekle'}
                </Button>
                <Button variant="outline" size="lg" className="border-wellco-primary/30" onClick={handleShare}>
                  <Share2 className="w-5 h-5 mr-2" />
                  Paylaş
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-wellco-primary/10">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔒</div>
                <div>
                  <div className="font-medium text-wellco-text-dark">Güvenli Ödeme</div>
                  <div className="text-xs text-wellco-text-muted">SSL Sertifikalı</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">📦</div>
                <div>
                  <div className="font-medium text-wellco-text-dark">Gizli Kargo</div>
                  <div className="text-xs text-wellco-text-muted">Sade Paket</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <div className="font-medium text-wellco-text-dark">Orijinal Ürün</div>
                  <div className="text-xs text-wellco-text-muted">Garanti Belgeli</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">🚚</div>
                <div>
                  <div className="font-medium text-wellco-text-dark">Hızlı Teslimat</div>
                  <div className="text-xs text-wellco-text-muted">2-3 Gün İçinde</div>
                </div>
              </div>
            </div>

            {/* Vendor */}
            <div className="text-sm text-wellco-text-muted pt-4 border-t border-wellco-primary/10">
              <span className="font-medium">Tedarikçi:</span> {product.vendor}
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="mt-16 max-w-4xl">
          <h2 className="text-2xl font-serif text-wellco-text-dark mb-6">
            Ürün Detayları
          </h2>
          <div className="bg-white rounded-2xl p-8 border border-wellco-primary/10">
            <div className="prose prose-sm max-w-none text-wellco-text-dark/70 leading-relaxed whitespace-pre-line">
              {cleanDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
