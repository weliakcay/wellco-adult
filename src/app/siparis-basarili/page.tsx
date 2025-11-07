'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, Home, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    // Sipariş detaylarını al
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (error) throw error;

        setOrderDetails(data);
      } catch (error) {
        console.error('Sipariş detayları alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-wellco-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wellco-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wellco-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark mb-2">
              Siparişiniz Alındı!
            </h1>
            <p className="text-wellco-text-dark/70">
              Teşekkür ederiz. Siparişiniz başarıyla oluşturuldu.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="border-wellco-primary/10 mb-6">
            <CardContent className="p-6 space-y-6">
              {/* Order Number */}
              <div className="text-center pb-6 border-b border-wellco-primary/10">
                <p className="text-sm text-wellco-text-dark/60 mb-1">Sipariş Numarası</p>
                <p className="text-2xl font-mono font-semibold text-wellco-primary">
                  #{orderId?.slice(0, 8).toUpperCase()}
                </p>
              </div>

              {/* Order Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-wellco-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-wellco-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-wellco-text-dark mb-1">Sipariş Durumu</h3>
                    <p className="text-sm text-wellco-text-dark/70">
                      Siparişiniz hazırlanıyor. Kargoya verildiğinde e-posta ile bilgilendirileceksiniz.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-wellco-accent-vibrant/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-wellco-accent-vibrant" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-wellco-text-dark mb-1">E-posta Onayı</h3>
                    <p className="text-sm text-wellco-text-dark/70">
                      Sipariş detaylarınız <strong>{orderDetails?.shipping_address?.email}</strong> adresine gönderildi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              {orderDetails && (
                <div className="pt-6 border-t border-wellco-primary/10">
                  <h3 className="font-semibold text-wellco-text-dark mb-4">Sipariş Özeti</h3>
                  <div className="space-y-2 mb-4">
                    {orderDetails.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-wellco-text-dark/70">
                          {item.quantity}x {item.title}
                        </span>
                        <span className="font-medium text-wellco-text-dark">
                          {(item.price * item.quantity).toFixed(2)} ₺
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-wellco-primary/10 flex justify-between font-semibold text-wellco-text-dark">
                    <span>Toplam</span>
                    <span className="text-wellco-accent-vibrant">{orderDetails.total.toFixed(2)} ₺</span>
                  </div>
                </div>
              )}

              {/* Shipping Address */}
              {orderDetails?.shipping_address && (
                <div className="pt-6 border-t border-wellco-primary/10">
                  <h3 className="font-semibold text-wellco-text-dark mb-2">Teslimat Adresi</h3>
                  <p className="text-sm text-wellco-text-dark/70">
                    {orderDetails.shipping_address.firstName} {orderDetails.shipping_address.lastName}
                    <br />
                    {orderDetails.shipping_address.address}
                    <br />
                    {orderDetails.shipping_address.district}, {orderDetails.shipping_address.city}
                    {orderDetails.shipping_address.postalCode && ` ${orderDetails.shipping_address.postalCode}`}
                    <br />
                    {orderDetails.shipping_address.phone}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Ne Zaman Kargoya Verilecek?</h4>
            <p className="text-sm text-blue-800">
              Siparişiniz 1-2 iş günü içinde kargoya verilecektir. Kargo takip numaranız e-posta ile tarafınıza iletilecektir.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1 bg-wellco-primary hover:bg-wellco-primary/90 text-white"
              asChild
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Ana Sayfaya Dön
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-wellco-primary/30"
              asChild
            >
              <Link href="/siparislerim">
                <Package className="w-5 h-5 mr-2" />
                Siparişlerim
              </Link>
            </Button>
          </div>

          {/* Contact */}
          <div className="mt-8 text-center text-sm text-wellco-text-dark/60">
            <p>
              Sorularınız için{' '}
              <Link href="/iletisim" className="text-wellco-primary hover:underline">
                bizimle iletişime geçebilirsiniz
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-wellco-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wellco-primary" />
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
