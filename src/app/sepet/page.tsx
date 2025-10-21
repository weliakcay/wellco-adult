'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Plus, Minus, ArrowRight, ArrowLeft, Gift, X } from 'lucide-react';

export default function CartPage() {
  const { items: cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const handleUpdateQuantity = (id: string, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      updateQuantity(id, newQuantity);
    }
  };

  const applyCoupon = () => {
    // Geçici kupon sistemi - gerçek API ile değiştirilecek
    if (couponCode.toUpperCase() === 'WELLCO10') {
      setAppliedCoupon({ code: couponCode, discount: 10 });
    }
  };

  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const shipping = subtotal > 500 ? 0 : 29.90;
  const total = subtotal - discount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-wellco-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingCart className="h-24 w-24 text-wellco-text-dark/20 mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-serif text-wellco-text-dark mb-4">
            Sepetiniz Boş
          </h1>
          <p className="text-wellco-text-dark/60 mb-8 max-w-md mx-auto">
            Henüz sepetinize ürün eklemediniz. Ürünlerimize göz atmaya başlayın!
          </p>
          <Button
            size="lg"
            className="bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90 text-white"
            asChild
          >
            <Link href="/urunler">
              Ürünleri Keşfet
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-wellco-primary/10 to-wellco-secondary/20 border-b border-wellco-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark mb-2">
                Sepetim
              </h1>
              <p className="text-wellco-text-dark/70">
                {cartItems.length} ürün sepetinizde
              </p>
            </div>
            <Button variant="outline" className="border-wellco-primary/30" asChild>
              <Link href="/urunler">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Alışverişe Devam
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <Card key={item.id} className="border-wellco-primary/10 relative">
                  {/* Remove Button - Top Right Corner */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 z-10 h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md"
                    onClick={() => removeFromCart(item.id)}
                    title="Sepetten Çıkar"
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-wellco-neutral">
                        {item.images && item.images.length > 0 ? (
                          <Image
                            src={item.images[0]}
                            alt={item.title}
                            fill
                            className="object-contain p-4"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-4xl opacity-20">
                            🌸
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-4">
                            <h3 className="text-base font-medium text-wellco-text-dark line-clamp-2 break-words">
                              {item.title}
                            </h3>
                            <p className="text-sm text-wellco-text-dark/60 mt-1">
                              Stok: {item.stock} adet
                            </p>
                          </div>
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-wellco-text-dark/60">Adet:</span>
                            <div className="flex items-center gap-2 border border-wellco-primary/20 rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-wellco-primary/10"
                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium text-wellco-text-dark">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-wellco-primary/10"
                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-xs text-wellco-text-dark/60">
                              {item.price.toFixed(2)} ₺ x {item.quantity}
                            </p>
                            <p className="text-xl font-semibold text-wellco-accent-vibrant">
                              {(item.price * item.quantity).toFixed(2)} ₺
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Coupon Code */}
              <Card className="border-wellco-primary/10 bg-gradient-to-br from-wellco-accent-vibrant/5 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="h-5 w-5 text-wellco-accent-vibrant" />
                    <h3 className="font-semibold text-wellco-text-dark">İndirim Kuponu</h3>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Kupon kodunu girin"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      disabled={!!appliedCoupon}
                    />
                    <Button
                      onClick={applyCoupon}
                      disabled={!couponCode || !!appliedCoupon}
                      className="bg-wellco-primary hover:bg-wellco-primary/90 text-white"
                    >
                      Uygula
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {appliedCoupon.code} kuponu uygulandı (%{appliedCoupon.discount} indirim)
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-wellco-primary/10 sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-serif text-wellco-text-dark border-b border-wellco-primary/10 pb-4">
                    Sipariş Özeti
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between text-wellco-text-dark/70">
                      <span>Ara Toplam</span>
                      <span>{subtotal.toFixed(2)} ₺</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>İndirim</span>
                        <span>-{discount.toFixed(2)} ₺</span>
                      </div>
                    )}

                    <div className="flex justify-between text-wellco-text-dark/70">
                      <span>Kargo</span>
                      <span>{shipping === 0 ? 'Ücretsiz' : `${shipping.toFixed(2)} ₺`}</span>
                    </div>

                    {shipping > 0 && (
                      <p className="text-xs text-wellco-accent-vibrant bg-wellco-accent-vibrant/5 p-3 rounded-lg">
                        500 ₺ ve üzeri alışverişlerde kargo ücretsiz!
                      </p>
                    )}

                    <div className="border-t border-wellco-primary/10 pt-3 flex justify-between text-lg font-semibold text-wellco-text-dark">
                      <span>Toplam</span>
                      <span className="text-wellco-accent-vibrant">{total.toFixed(2)} ₺</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90 text-white"
                    asChild
                  >
                    <Link href="/odeme">
                      Ödemeye Geç
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>

                  {/* Trust Badges */}
                  <div className="space-y-2 pt-4 border-t border-wellco-primary/10">
                    <div className="flex items-center gap-2 text-sm text-wellco-text-dark/60">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Güvenli Ödeme</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-wellco-text-dark/60">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Gizli Kargo</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-wellco-text-dark/60">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>14 Gün İade Garantisi</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
