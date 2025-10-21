import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_LINKS, SITE_CONFIG, TRUST_BADGES } from '@/constants';

export function Footer() {
  return (
    <footer className="border-t border-wellco-dark-primary/20 bg-gradient-to-br from-wellco-dark-primary via-wellco-dark-secondary to-wellco-dark-accent text-white">
      {/* Trust Badges Section - Artık ayrı section olarak değil, sadece link groupları */}
      <div className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center text-center">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{badge.title}</h3>
                <p className="text-xs text-white/70">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <div className="relative w-56 h-24">
                <Image
                  src="/logo-white.svg"
                  alt="Wellco Adult"
                  fill
                  className="object-contain group-hover:opacity-80 transition-opacity"
                />
              </div>
            </Link>
            <p className="text-sm text-white/70 mb-4">
              {SITE_CONFIG.slogan}
            </p>
            <p className="text-xs text-white/50">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Alışveriş
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Bilgi
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Yasal
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-4">
              {/* Social Media Icons - placeholder for now */}
              <p className="text-xs text-white/50">
                Sosyal medya: Instagram | TikTok | YouTube
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
