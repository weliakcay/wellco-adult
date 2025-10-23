import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getExperts, getDolls } from '@/data/personas';
import type { Persona } from '@/types/persona';

function PersonaPreviewCard({ persona }: { persona: Persona }) {
  return (
    <Link
      href={`/personalar/${persona.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-wellco-primary/10 bg-white/80 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-wellco-primary/10 via-wellco-accent-vibrant/10 to-transparent" />
      <div className="relative p-6 flex items-center gap-4">
        <div className="relative h-16 w-16 flex-shrink-0">
          {persona.avatar ? (
            <Image
              src={persona.avatar}
              alt={persona.name}
              fill
              className="rounded-2xl object-cover"
              sizes="64px"
            />
          ) : (
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-wellco-primary to-wellco-accent-vibrant flex items-center justify-center text-white text-2xl font-serif">
              {persona.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-semibold text-wellco-text-dark">{persona.name}</h4>
            {persona.availability === 'available' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-wellco-primary/10 px-2 py-0.5 text-xs text-wellco-primary">
                <span className="h-2 w-2 rounded-full bg-wellco-primary animate-pulse" />
                Online
              </span>
            )}
          </div>

          <p className="text-sm text-wellco-text-dark/70 line-clamp-2">{persona.tagline}</p>

          <div className="flex items-center gap-3 text-xs text-wellco-text-dark/50">
            {persona.rating && (
              <span>
                ⭐ {persona.rating.toFixed(1)}
              </span>
            )}
            {persona.consultationCount && (
              <span>{persona.consultationCount.toLocaleString('tr-TR')}+ görüşme</span>
            )}
          </div>
        </div>

        <div className="self-center text-wellco-primary transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </Link>
  );
}

export function PersonasSpotlight() {
  const experts = getExperts().filter((persona) => persona.isActive).slice(0, 3);
  const dolls = getDolls().filter((persona) => persona.isActive).slice(0, 3);

  if (experts.length === 0 && dolls.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-wellco-background to-wellco-neutral">
      <div className="container mx-auto px-4 space-y-16">
        {experts.length > 0 && (
          <div className="rounded-3xl border border-wellco-primary/10 bg-white/60 backdrop-blur shadow-lg p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-wellco-primary/10 px-4 py-2 text-sm font-medium text-wellco-primary">
                  <Sparkles className="h-4 w-4" />
                  AI Destekli Uzmanlar
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
                  Cinsel Sağlık{' '}
                  <span className="font-serif italic text-wellco-primary">Uzmanlarımız</span>
                </h2>
                <p className="text-base md:text-lg text-wellco-text-dark/70 max-w-2xl">
                  Dr. Seren Yılmaz ve diğer klinik uzmanlarımız, bilimsel temelli yanıtlarla 7/24 yanınızda.
                  Sorularınızı güvenle paylaşın, kişisel rehberlik alın.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="self-start bg-wellco-primary hover:bg-wellco-primary/90 text-white"
              >
                <Link href="/personalar?view=experts">
                  Uzmanlarla Tanış
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {experts.map((persona) => (
                <PersonaPreviewCard key={persona.id} persona={persona} />
              ))}
            </div>
          </div>
        )}

        {dolls.length > 0 && (
          <div className="rounded-3xl border border-wellco-accent-magenta/10 bg-gradient-to-br from-white via-wellco-accent-magenta/5 to-wellco-accent-vibrant/10 shadow-lg p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-wellco-accent-magenta/10 px-4 py-2 text-sm font-medium text-wellco-accent-magenta">
                  <Heart className="h-4 w-4" />
                  Premium Koleksiyon
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
                  Silikon Bebek{' '}
                  <span className="font-serif italic text-wellco-accent-magenta">Karakterleri</span>
                </h2>
                <p className="text-base md:text-lg text-wellco-text-dark/70 max-w-2xl">
                  Adult X iş birliği ile gelen ultra gerçekçi silikon bebekler. Hikayeleri, özellikleri ve
                  kişisel önerileriyle deneyiminizi zenginleştirin.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="self-start bg-wellco-accent-magenta hover:bg-wellco-accent-magenta/90 text-white"
              >
                <Link href="/personalar?view=dolls">
                  Karakterleri Keşfet
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {dolls.map((persona) => (
                <PersonaPreviewCard key={persona.id} persona={persona} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
