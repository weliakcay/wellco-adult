'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Loader2, ShoppingBag, MapPin, Calendar } from 'lucide-react';

interface Order {
  id: string;
  items: any[];
  total: number;
  status: string;
  payment_status: string;
  shipping_address: any;
  created_at: string;
  tracking_number?: string;
  notes?: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any }> = {
      pending: { label: 'Hazırlanıyor', variant: 'default' },
      processing: { label: 'İşleniyor', variant: 'default' },
      shipped: { label: 'Kargoda', variant: 'default' },
      delivered: { label: 'Teslim Edildi', variant: 'default' },
      cancelled: { label: 'İptal Edildi', variant: 'destructive' },
    };

    const config = statusConfig[status] || { label: status, variant: 'default' };

    return (
      <Badge variant={config.variant} className="capitalize">
        {config.label}
      </Badge>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-wellco-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-wellco-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-wellco-primary/10 to-wellco-secondary/20 border-b border-wellco-primary/10 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
            Siparişlerim
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {orders.length === 0 ? (
          <Card className="border-wellco-primary/10">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ShoppingBag className="h-16 w-16 text-wellco-text-dark/30 mb-4" />
              <h3 className="text-xl font-semibold text-wellco-text-dark mb-2">
                Henüz Siparişiniz Yok
              </h3>
              <p className="text-muted-foreground mb-6 text-center">
                Alışverişe başlamak için ürünlerimize göz atın
              </p>
              <Link
                href="/urunler"
                className="px-6 py-3 bg-wellco-primary text-white rounded-md hover:bg-wellco-primary/90 transition"
              >
                Ürünleri İncele
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="border-wellco-primary/10">
                <CardHeader className="border-b border-wellco-primary/10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-wellco-primary" />
                      <div>
                        <CardTitle className="text-lg">
                          Sipariş #{order.id.slice(0, 8).toUpperCase()}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(order.created_at).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      {getStatusBadge(order.status)}
                      <p className="text-lg font-semibold text-wellco-accent-vibrant">
                        {order.total.toFixed(2)} ₺
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Ürünler */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-wellco-text-dark">
                        Ürünler ({order.items.length} adet)
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm py-2 border-b border-wellco-primary/5 last:border-0"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-wellco-text-dark line-clamp-1">
                                {item.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Adet: {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium text-wellco-text-dark ml-4">
                              {(item.price * item.quantity).toFixed(2)} ₺
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Teslimat Adresi */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-wellco-text-dark flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Teslimat Adresi
                      </h4>
                      <div className="text-sm text-muted-foreground space-y-1 bg-wellco-neutral/30 p-4 rounded-lg">
                        <p className="font-medium text-wellco-text-dark">
                          {order.shipping_address?.firstName}{' '}
                          {order.shipping_address?.lastName}
                        </p>
                        <p>{order.shipping_address?.address}</p>
                        <p>
                          {order.shipping_address?.district},{' '}
                          {order.shipping_address?.city}
                        </p>
                        {order.shipping_address?.postalCode && (
                          <p>{order.shipping_address.postalCode}</p>
                        )}
                        <p className="pt-2 border-t border-wellco-primary/10">
                          {order.shipping_address?.phone}
                        </p>
                      </div>

                      {order.tracking_number && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-800 mb-1">
                            Kargo Takip Numarası
                          </p>
                          <p className="font-mono text-sm font-semibold text-blue-900">
                            {order.tracking_number}
                          </p>
                        </div>
                      )}

                      {order.notes && (
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                          <p className="text-xs text-yellow-800 mb-1">
                            Sipariş Notu
                          </p>
                          <p className="text-sm text-yellow-900">{order.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
