import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { FaInstagram, FaTiktok, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';

const marketplaces = [
  {
    name: 'Trendyol',
    logo: '/marketplaces/trendyol.png',
    url: 'https://www.trendyol.com/magaza/wellcoadult-m-1182111?sst=0&channelId=1&event=0',
  },
  {
    name: 'Hepsiburada',
    logo: '/marketplaces/hepsiburada.png',
    url: 'https://www.hepsiburada.com/magaza/wellcoadult',
  },
];

const socialMedia = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://www.instagram.com/wellco.adult/',
  },
  {
    name: 'TikTok',
    icon: FaTiktok,
    url: 'https://www.tiktok.com/@wellcoadult?lang=tr-TR',
  },
  {
    name: 'X (Twitter)',
    icon: FaXTwitter,
    url: 'https://x.com/WellcoAdult',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedinIn,
    url: 'https://www.linkedin.com/company/wellco-adult/?viewAsMember=true',
  },
];

export function Marketplaces() {
  return (
    <section className="py-16 bg-gradient-to-br from-wellco-neutral to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
            Diğer Pazaryerlerinde de{' '}
            <span className="font-serif italic text-wellco-primary">Bizi Bulabilirsiniz</span>
          </h2>
          <p className="text-lg text-wellco-text-dark/70 max-w-2xl mx-auto">
            Tercih ettiğiniz platformdan güvenle alışveriş yapabilirsiniz
          </p>
          {/* Decorative line */}
          <div className="flex justify-center pt-2">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-wellco-accent-vibrant to-transparent" />
          </div>
        </div>

        {/* Marketplace Logos */}
        <div className="grid gap-12 sm:grid-cols-2 justify-items-center items-center max-w-4xl mx-auto">
          {marketplaces.map((marketplace) => (
            <Link
              key={marketplace.name}
              href={marketplace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="relative bg-transparent border-none shadow-none p-0 hover:scale-[1.03] transition-transform duration-300">
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="relative w-[28rem] max-w-[90vw] h-48 sm:h-56">
                    <Image
                      src={marketplace.logo}
                      alt={marketplace.name}
                      fill
                      sizes="(max-width: 768px) 90vw, 28rem"
                      className="object-contain"
                      priority
                    />
                  </div>
                  {/* Only logo displayed */}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Social Media */}
        <div className="mt-20 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-wellco-text-dark">
            Sosyal Medyada{' '}
            <span className="font-serif italic text-wellco-primary">Bizi Takip Edin</span>
          </h3>
          <p className="text-base text-wellco-text-dark/70 max-w-lg mx-auto">
            Güncel kampanyalar ve wellness içerikleri için sosyal medya profillerimize göz atın
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {socialMedia.map(({ name, icon: Icon, url }) => (
              <Link
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="group"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-wellco-primary/20 bg-white shadow-sm transition-all duration-300 hover:border-wellco-accent-vibrant/40 hover:shadow-lg hover:-translate-y-1">
                  <Icon className="h-8 w-8 text-wellco-primary transition-colors duration-300 group-hover:text-wellco-accent-vibrant" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-wellco-text-dark/50 italic">
            Tüm platformlarda aynı kaliteli ürünler ve güvenilir hizmet
          </p>
        </div>
      </div>
    </section>
  );
}
