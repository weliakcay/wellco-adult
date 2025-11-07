'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut, Package, Settings } from 'lucide-react';

export function UserMenu() {
  const { user, signOut, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" className="hover:bg-wellco-primary/10">
        <User className="h-5 w-5 text-wellco-text-dark/70 animate-pulse" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-wellco-primary/10"
        asChild
      >
        <Link href="/auth/login">
          <User className="h-5 w-5 text-wellco-text-dark/70 hover:text-wellco-primary" />
          <span className="sr-only">Giriş Yap</span>
        </Link>
      </Button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-wellco-primary/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-5 w-5 text-wellco-primary" />
        <span className="sr-only">Hesabım</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-white shadow-lg">
          <div className="border-b px-4 py-3">
            <p className="text-sm font-medium">
              {user.user_metadata?.name || 'Hoş geldiniz'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>

          <div className="py-2">
            <Link
              href="/hesabim"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" />
              Hesabım
            </Link>

            <Link
              href="/siparislerim"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <Package className="h-4 w-4" />
              Siparişlerim
            </Link>
          </div>

          <div className="border-t py-2">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
