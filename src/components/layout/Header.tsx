'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/constants';
import { useCart } from '@/contexts/CartContext';
import { UserMenu } from './UserMenu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Menu, X } from 'lucide-react';

export function Header() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-wellco-primary/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar - 18+ Badge */}
        <div className="flex h-10 items-center justify-center border-b border-wellco-primary/5 bg-gradient-to-r from-wellco-secondary/10 via-wellco-neutral to-wellco-secondary/10">
          <Badge variant="outline" className="border-wellco-primary text-wellco-primary text-xs">
            🔞 18+ İçerik - Yetişkin İçeriği
          </Badge>
        </div>

        {/* Main Header */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-48 h-16 md:w-64 md:h-20">
              <Image
                src="/logo.svg"
                alt="Wellco Adult"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-wellco-text-dark/70 hover:text-wellco-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-wellco-accent-vibrant group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* User Menu */}
            <UserMenu />

            {/* Cart */}
            <Button variant="ghost" size="icon" className="hover:bg-wellco-primary/10 relative" asChild>
              <Link href="/sepet">
                <ShoppingCart className="h-5 w-5 text-wellco-text-dark/70 hover:text-wellco-primary" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-wellco-accent-vibrant text-white text-xs flex items-center justify-center font-semibold">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
                <span className="sr-only">Sepet ({totalItems})</span>
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-wellco-primary/10"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="wellco-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-wellco-text-dark/70" />
              ) : (
                <Menu className="h-5 w-5 text-wellco-text-dark/70" />
              )}
              <span className="sr-only">Menü</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[95] bg-wellco-text-dark/35 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="wellco-mobile-menu"
            className="fixed inset-x-0 top-[104px] z-[110] mx-4 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil navigasyon"
          >
            <div
              className="overflow-hidden rounded-3xl border border-wellco-primary/10 bg-white shadow-xl"
              style={{ maxHeight: 'calc(100vh - 130px)' }}
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-wellco-primary/10">
                <div className="text-sm font-semibold text-wellco-text-dark/70 uppercase tracking-wide">
                  Menüyü Keşfet
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-wellco-primary/10 text-wellco-primary hover:bg-wellco-primary/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Menüyü kapat</span>
                </Button>
              </div>

              <div className="max-h-[calc(100vh-210px)] overflow-y-auto px-6 py-6 space-y-8">
                <div className="space-y-3">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-xl border border-transparent bg-wellco-neutral/40 px-4 py-3 text-base font-medium text-wellco-text-dark/80 transition-all hover:border-wellco-primary/20 hover:bg-wellco-accent-vibrant/5 hover:text-wellco-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="rounded-2xl bg-wellco-primary/5 px-4 py-5 border border-wellco-primary/10 space-y-3">
                  <div className="text-sm font-semibold text-wellco-primary">Hızlı erişim</div>
                  <Link
                    href="/sepet"
                    className="flex items-center justify-between text-sm text-wellco-text-dark/70 hover:text-wellco-primary transition-colors"
                  >
                    <span className="font-medium">Sepetim</span>
                    <span className="text-xs text-wellco-text-dark/50">
                      {totalItems > 0 ? `${totalItems} ürün` : 'Boş'}
                    </span>
                  </Link>
                  <Link
                    href="/hesabim"
                    className="flex items-center justify-between text-sm text-wellco-text-dark/70 hover:text-wellco-primary transition-colors"
                  >
                    <span className="font-medium">Hesabım</span>
                    <span className="text-xs text-wellco-text-dark/50">Giriş yap / Üye ol</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
