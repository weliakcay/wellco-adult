'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-wellco-background flex items-center justify-center px-4">
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
            Bir Hata Oluştu
          </h1>

          <p className="text-lg text-wellco-text-dark/70 max-w-md mx-auto">
            Üzgünüz, beklenmeyen bir hata meydana geldi. Lütfen sayfayı yenilemeyi deneyin.
          </p>

          {/* Error Details (dev mode) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-sm font-mono text-red-800 break-all">
                {error.message}
              </p>
            </div>
          )}

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

          {/* Help Text */}
          <div className="pt-12">
            <p className="text-sm text-wellco-text-dark/50">
              Sorun devam ederse,{' '}
              <Link
                href="/iletisim"
                className="text-wellco-primary hover:text-wellco-accent-vibrant transition-colors"
              >
                bizimle iletişime geçin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
