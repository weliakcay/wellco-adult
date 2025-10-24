'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCcw, ShoppingBag } from 'lucide-react';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Products page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-wellco-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 text-red-600">
              <AlertCircle className="w-12 h-12" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
              Ürünler Yüklenemedi
            </h1>

            <p className="text-lg text-wellco-text-dark/70 max-w-md mx-auto">
              Ürünleri yüklerken bir sorun oluştu. Lütfen sayfayı yenilemeyi deneyin veya daha sonra tekrar kontrol edin.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                onClick={reset}
                size="lg"
                className="bg-wellco-primary hover:bg-wellco-primary/90 text-white min-w-[200px]"
              >
                <RefreshCcw className="h-5 w-5 mr-2" />
                Tekrar Dene
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-wellco-primary text-wellco-primary hover:bg-wellco-primary/5 min-w-[200px]"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Ana Sayfaya Dön
                </Link>
              </Button>
            </div>

            {/* Alternative Actions */}
            <div className="pt-12 space-y-4">
              <p className="text-sm text-wellco-text-dark/50">Alternatif olarak:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/personalar"
                  className="text-sm text-wellco-primary hover:text-wellco-accent-vibrant transition-colors flex items-center gap-1"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Personalar
                </Link>
                <span className="text-wellco-text-dark/30">•</span>
                <Link
                  href="/hakkimizda"
                  className="text-sm text-wellco-primary hover:text-wellco-accent-vibrant transition-colors"
                >
                  Hakkımızda
                </Link>
                <span className="text-wellco-text-dark/30">•</span>
                <Link
                  href="/iletisim"
                  className="text-sm text-wellco-primary hover:text-wellco-accent-vibrant transition-colors"
                >
                  İletişim
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
