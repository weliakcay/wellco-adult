'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [addedToCart, setAddedToCart] = useState(false);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <Card className="group relative overflow-hidden border-wellco-primary/10 hover:border-wellco-accent-vibrant/30 transition-all duration-300 h-full flex flex-col">
      {/* Discount Badge */}
      {hasDiscount && (
        <Badge className="absolute top-4 right-4 z-10 bg-wellco-accent-vibrant text-white border-none">
          -{discountPercent}%
        </Badge>
      )}

      {/* Product Image - SFW with Duotone Effect */}
      <Link href={`/urunler/${product.id}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-wellco-secondary/20 to-wellco-warm/10">
        {product.images && product.images.length > 0 ? (
          <>
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Duotone overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-wellco-accent-vibrant/5 to-wellco-accent-magenta/5 group-hover:from-wellco-accent-vibrant/10 group-hover:to-wellco-accent-magenta/10 transition-all mix-blend-overlay" />
          </>
        ) : (
          <>
            {/* Placeholder duotone effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-wellco-accent-vibrant/10 to-wellco-accent-magenta/10 group-hover:from-wellco-accent-vibrant/20 group-hover:to-wellco-accent-magenta/20 transition-all" />

            {/* Placeholder icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                🌸
              </div>
            </div>
          </>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-wellco-dark-primary/0 group-hover:bg-wellco-dark-primary/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white text-sm font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm">
            Detayları Gör
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <CardContent className="flex-1 flex flex-col p-4 space-y-3">
        {/* Vendor */}
        <div className="text-xs text-wellco-text-muted font-medium uppercase tracking-wide">
          {product.vendor}
        </div>

        {/* Title */}
        <Link href={`/urunler/${product.id}`}>
          <h3 className="text-base font-serif text-wellco-text-dark group-hover:text-wellco-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-wellco-primary/10 text-wellco-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-serif font-light text-wellco-primary">
            ₺{product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-wellco-text-muted line-through">
              ₺{product.compareAtPrice!.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            className="flex-1 gradient-cta text-white hover:opacity-90 transition-opacity"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {addedToCart ? 'Eklendi!' : 'Sepete Ekle'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`border-wellco-primary/30 hover:bg-wellco-primary/10 hover:border-wellco-primary ${
              isFavorite(product.id) ? 'bg-wellco-accent-vibrant/10 border-wellco-accent-vibrant' : ''
            }`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-wellco-accent-vibrant text-wellco-accent-vibrant' : ''}`} />
          </Button>
        </div>

        {/* Stock Info */}
        {product.stock < 5 && (
          <div className="text-xs text-wellco-accent-vibrant font-medium">
            Sadece {product.stock} adet kaldı!
          </div>
        )}
      </CardContent>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-wellco-accent-vibrant via-wellco-accent-magenta to-wellco-accent-vibrant opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
}
