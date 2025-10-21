import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-wellco-primary/5 to-wellco-neutral">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="relative w-56 h-28 mx-auto">
            <Image
              src="/logo.svg"
              alt="Wellco Adult"
              fill
              className="object-contain"
            />
          </div>

          {/* 404 Text */}
          <div className="space-y-4">
            <h1 className="text-8xl font-serif font-bold text-wellco-primary">
              404
            </h1>
            <h2 className="text-3xl font-serif text-wellco-text-dark">
              Sayfa Bulunamadı
            </h2>
            <p className="text-lg text-wellco-text-dark/60">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
          </div>

          {/* Decorative Line */}
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-wellco-primary to-transparent" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-wellco-primary hover:bg-wellco-primary/90 text-white"
              asChild
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Ana Sayfaya Dön
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-wellco-primary text-wellco-primary hover:bg-wellco-primary/10"
              asChild
            >
              <Link href="/urunler">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Ürünlere Göz At
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="pt-8">
            <p className="text-sm text-wellco-text-dark/50">
              Yardıma mı ihtiyacınız var?{' '}
              <Link href="/iletisim" className="text-wellco-primary hover:text-wellco-accent-vibrant transition-colors">
                Bizimle iletişime geçin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
