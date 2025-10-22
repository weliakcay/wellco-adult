'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/constants';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

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
            {/* User Icon */}
            <Button variant="ghost" size="icon" className="hover:bg-wellco-primary/10" asChild>
              <Link href="/hesabim">
                <User className="h-5 w-5 text-wellco-text-dark/70 hover:text-wellco-primary" />
                <span className="sr-only">Hesabım</span>
              </Link>
            </Button>

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
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-wellco-text-dark/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="wellco-mobile-menu"
            className="absolute top-0 right-0 h-full w-5/6 max-w-sm bg-white border-l border-wellco-primary/10 shadow-2xl flex flex-col z-[70]"
          >
            <div className="px-6 pt-24 pb-8 space-y-6 overflow-y-auto">
              <div className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-lg font-medium text-wellco-text-dark/80 hover:text-wellco-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-wellco-primary/10 pt-6 space-y-3">
                <Link
                  href="/sepet"
                  className="flex items-center justify-between text-wellco-text-dark hover:text-wellco-primary transition-colors"
                >
                  <span className="font-medium">Sepetim</span>
                  <span className="text-xs text-wellco-text-dark/50">
                    {totalItems > 0 ? `${totalItems} ürün` : 'Boş'}
                  </span>
                </Link>
                <Link
                  href="/hesabim"
                  className="flex items-center justify-between text-wellco-text-dark hover:text-wellco-primary transition-colors"
                >
                  <span className="font-medium">Hesabım</span>
                  <span className="text-xs text-wellco-text-dark/50">Giriş yap / Üye ol</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
