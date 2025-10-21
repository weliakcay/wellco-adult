import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const marketplaces = [
  {
    name: 'Trendyol',
    logo: '/marketplaces/trendyol.png',
    url: 'https://www.trendyol.com/magaza/wellcoadult-m-1182111?sst=0&channelId=1&event=0',
    description: 'Trendyol\'da alışveriş yapın',
  },
  {
    name: 'Hepsiburada',
    logo: '/marketplaces/hepsiburada.png',
    url: 'https://www.hepsiburada.com/magaza/wellcoadult',
    description: 'Hepsiburada\'da alışveriş yapın',
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
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {marketplaces.map((marketplace) => (
            <Link
              key={marketplace.name}
              href={marketplace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="relative overflow-hidden border-wellco-primary/10 bg-white hover:border-wellco-accent-vibrant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-wellco-accent-vibrant/0 to-wellco-accent-magenta/0 group-hover:from-wellco-accent-vibrant/5 group-hover:to-wellco-accent-magenta/5 transition-all duration-300" />

                {/* Content */}
                <div className="relative p-8 flex flex-col items-center justify-center space-y-4">
                  {/* Logo Container */}
                  <div className="relative w-full h-24 flex items-center justify-center">
                    <Image
                      src={marketplace.logo}
                      alt={marketplace.name}
                      width={300}
                      height={80}
                      className="object-contain max-h-20 group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>

                  {/* Description & Icon */}
                  <div className="flex items-center gap-2 text-wellco-primary group-hover:text-wellco-accent-vibrant transition-colors">
                    <span className="text-sm font-medium">{marketplace.description}</span>
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>

                {/* Bottom Glow on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-wellco-accent-vibrant via-wellco-accent-magenta to-wellco-accent-vibrant opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </Link>
          ))}
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
