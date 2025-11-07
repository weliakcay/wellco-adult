'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CreditCard, Lock, Package, MapPin, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    // Kişisel Bilgiler
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',

    // Teslimat Adresi
    address: '',
    city: '',
    district: '',
    postalCode: '',

    // Ödeme
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',

    // Notlar
    orderNotes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Sepet boşsa yönlendir
  useEffect(() => {
    if (items.length === 0) {
      router.push('/sepet');
    }
  }, [items, router]);

  // Kullanıcı bilgilerini doldur
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.user_metadata?.name?.split(' ')[0] || '',
        lastName: user.user_metadata?.name?.split(' ').slice(1).join(' ') || '',
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      // Sipariş bilgilerini hazırla
      const orderData = {
        user_id: user?.id || null,
        items: items.map(item => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.images[0] || '',
        })),
        total: subtotal,
        status: 'pending',
        payment_status: 'pending',
        shipping_address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          postalCode: formData.postalCode,
        },
        billing_address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          postalCode: formData.postalCode,
        },
        payment_method: 'credit_card',
        notes: formData.orderNotes || null,
      };

      // Supabase'e sipariş kaydet
      console.log('Sipariş verisi gönderiliyor:', orderData);
      const { data, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Analytics event kaydet
      await supabase.from('analytics_events').insert([
        {
          event_type: 'purchase',
          user_id: user?.id || null,
          metadata: {
            order_id: data.id,
            total: subtotal,
            items_count: items.length,
          },
        },
      ]);

      // Sepeti temizle
      clearCart();

      // Başarı sayfasına yönlendir
      router.push(`/siparis-basarili?order=${data.id}`);
    } catch (err: any) {
      console.error('Sipariş hatası:', err);
      console.error('Hata detayları:', {
        message: err?.message,
        details: err?.details,
        hint: err?.hint,
        code: err?.code,
      });
      setError(
        `Sipariş oluşturulurken bir hata oluştu: ${err?.message || 'Bilinmeyen hata'}. Lütfen tekrar deneyin.`
      );
      setIsProcessing(false);
    }
  };

  const cartSummary = {
    subtotal: subtotal,
    shipping: 0,
    total: subtotal
  };

  if (items.length === 0) {
    return null; // Sepet boşsa yönlendirme yapılacak
  }

  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-wellco-primary/10 to-wellco-secondary/20 border-b border-wellco-primary/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
              Ödeme
            </h1>
            <Button variant="outline" className="border-wellco-primary/30" asChild>
              <Link href="/sepet">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Sepete Dön
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-12">
          {error && (
            <div className="max-w-7xl mx-auto mb-6">
              <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
                {error}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* İletişim Bilgileri */}
              <Card className="border-wellco-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-wellco-text-dark">
                    <User className="h-5 w-5 text-wellco-primary" />
                    İletişim Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                        Ad *
                      </label>
                      <Input
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                        Soyad *
                      </label>
                      <Input
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                      E-posta *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                      Telefon *
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Teslimat Adresi */}
              <Card className="border-wellco-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-wellco-text-dark">
                    <MapPin className="h-5 w-5 text-wellco-accent-vibrant" />
                    Teslimat Adresi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                      Adres *
                    </label>
                    <Textarea
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      placeholder="Mahalle, sokak, bina no, daire no"
                      rows={3}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                        İl *
                      </label>
                      <Input
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                        İlçe *
                      </label>
                      <Input
                        name="district"
                        required
                        value={formData.district}
                        onChange={handleChange}
                        className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                        Posta Kodu
                      </label>
                      <Input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                      Sipariş Notu (Opsiyonel)
                    </label>
                    <Textarea
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleChange}
                      className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      placeholder="Teslimat hakkında özel notlarınız..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Ödeme Bilgileri */}
              <Card className="border-wellco-primary/10 bg-gradient-to-br from-wellco-accent-vibrant/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-wellco-text-dark">
                    <CreditCard className="h-5 w-5 text-wellco-accent-magenta" />
                    Ödeme Bilgileri
                  </CardTitle>
                  <p className="text-sm text-wellco-text-dark/60 mt-2 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    Tüm ödeme bilgileriniz SSL ile şifrelenir
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                      Kart Üzerindeki İsim *
                    </label>
                    <Input
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleChange}
                      className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      placeholder="AD SOYAD"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                      Kart Numarası *
                    </label>
                    <Input
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                        Son Kullanma Tarihi *
                      </label>
                      <Input
                        name="expiryDate"
                        required
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                        placeholder="AA/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wellco-text-dark mb-2">
                        CVV *
                      </label>
                      <Input
                        name="cvv"
                        required
                        value={formData.cvv}
                        onChange={handleChange}
                        className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                        placeholder="***"
                        maxLength={3}
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                    <p className="font-medium mb-1">⚠️ Demo Modu</p>
                    <p>Sipariş kaydedilecek ancak ödeme alınmayacaktır. Gerçek kart bilgisi girmeyin.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-wellco-primary/10 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-wellco-text-dark">
                    <Package className="h-5 w-5 text-wellco-primary" />
                    Sipariş Özeti
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Ürün Listesi */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 text-sm">
                        <div className="flex-1">
                          <p className="font-medium text-wellco-text-dark line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-wellco-text-dark/60">
                            {item.quantity} x {item.price.toFixed(2)} ₺
                          </p>
                        </div>
                        <p className="font-medium text-wellco-text-dark">
                          {(item.price * item.quantity).toFixed(2)} ₺
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-wellco-primary/10 pt-4 space-y-3">
                    <div className="flex justify-between text-wellco-text-dark/70">
                      <span>Ara Toplam</span>
                      <span>{cartSummary.subtotal.toFixed(2)} ₺</span>
                    </div>
                    <div className="flex justify-between text-wellco-text-dark/70">
                      <span>Kargo</span>
                      <span className="text-green-600">Ücretsiz</span>
                    </div>
                    <div className="border-t border-wellco-primary/10 pt-3 flex justify-between text-lg font-semibold text-wellco-text-dark">
                      <span>Toplam</span>
                      <span className="text-wellco-accent-vibrant">{cartSummary.total.toFixed(2)} ₺</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90 text-white"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        İşleniyor...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Siparişi Tamamla
                      </>
                    )}
                  </Button>

                  {/* Security Info */}
                  <div className="space-y-2 pt-4 border-t border-wellco-primary/10">
                    <div className="flex items-center gap-2 text-xs text-wellco-text-dark/60">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>256-bit SSL Güvenliği</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-wellco-text-dark/60">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Gizli Paketleme</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-wellco-text-dark/60">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>14 Gün İade Hakkı</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="pt-4 border-t border-wellco-primary/10">
                    <p className="text-xs text-wellco-text-dark/50 mb-2">Kabul Edilen Kartlar:</p>
                    <div className="flex gap-2 flex-wrap">
                      {['Visa', 'MasterCard', 'Troy'].map(card => (
                        <div
                          key={card}
                          className="px-3 py-1 bg-wellco-neutral rounded text-xs font-medium text-wellco-text-dark/70"
                        >
                          {card}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
