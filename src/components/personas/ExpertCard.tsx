import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Persona } from '@/types/persona';
import { MessageCircle, Star, Users, Sparkles } from 'lucide-react';

interface ExpertCardProps {
  persona: Persona;
}

export function ExpertCard({ persona }: ExpertCardProps) {
  const availabilityColors = {
    available: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-400'
  };

  const availabilityText = {
    available: 'Müsait',
    busy: 'Hazırlanıyor',
    offline: 'Çevrimdışı'
  };

  return (
    <Link href={`/personalar/${persona.slug}`} className="group block h-full">
      <Card className="h-full border-wellco-primary/10 bg-white hover:border-wellco-accent-vibrant/30 transition-all duration-300 overflow-hidden relative">
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-wellco-accent-vibrant/0 to-wellco-primary/0 group-hover:from-wellco-accent-vibrant/5 group-hover:to-wellco-primary/5 transition-all duration-300" />

        {/* Avatar Section */}
        <div className="relative h-48 bg-gradient-to-br from-wellco-primary/10 to-wellco-accent-vibrant/10 flex items-center justify-center overflow-hidden">
          {/* Avatar Image */}
          {persona.avatar ? (
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-white/50">
              <Image
                src={persona.avatar}
                alt={persona.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-wellco-primary to-wellco-accent-vibrant flex items-center justify-center text-white text-4xl font-serif shadow-lg">
              {persona.name.charAt(0)}
            </div>
          )}

          {/* Availability Badge */}
          {persona.availability && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-md">
              <div className={`w-2 h-2 rounded-full ${availabilityColors[persona.availability]} animate-pulse`} />
              <span className="text-xs font-medium text-wellco-text-dark">
                {availabilityText[persona.availability]}
              </span>
            </div>
          )}

          {/* AI Badge */}
          {persona.aiEnabled && (
            <div className="absolute top-4 left-4 bg-wellco-accent-vibrant/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI Destekli
            </div>
          )}
        </div>

        <CardHeader className="relative z-10 pb-4">
          {/* Name & Title */}
          <h3 className="text-2xl font-serif text-wellco-text-dark group-hover:text-wellco-accent-vibrant transition-colors mb-1">
            {persona.name}
          </h3>
          <p className="text-sm font-medium text-wellco-primary">
            {persona.title}
          </p>

          {/* Tagline */}
          <p className="text-sm text-wellco-text-dark/60 mt-3 line-clamp-2">
            {persona.tagline}
          </p>
        </CardHeader>

        <CardContent className="relative z-10">
          {/* Specialty Tags */}
          {persona.specialty && persona.specialty.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {persona.specialty.slice(0, 3).map((spec) => (
                <Badge
                  key={spec}
                  variant="secondary"
                  className="bg-wellco-neutral text-wellco-text-dark/70 text-xs"
                >
                  {spec}
                </Badge>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {persona.rating && (
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-wellco-accent-vibrant fill-wellco-accent-vibrant" />
                <div>
                  <div className="text-lg font-semibold text-wellco-text-dark">{persona.rating}</div>
                  <div className="text-xs text-wellco-text-dark/50">Puan</div>
                </div>
              </div>
            )}
            {persona.consultationCount && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-wellco-primary" />
                <div>
                  <div className="text-lg font-semibold text-wellco-text-dark">
                    {persona.consultationCount > 1000
                      ? `${(persona.consultationCount / 1000).toFixed(1)}k`
                      : persona.consultationCount}
                  </div>
                  <div className="text-xs text-wellco-text-dark/50">Danışan</div>
                </div>
              </div>
            )}
          </div>

          {/* Decorative Border */}
          <div className="h-px w-full bg-gradient-to-r from-wellco-primary/20 to-transparent mb-4 group-hover:from-wellco-accent-vibrant/40 transition-colors" />

          {/* Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-wellco-primary group-hover:text-wellco-accent-vibrant transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>Sohbet Et</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-wellco-primary/10 group-hover:bg-wellco-accent-vibrant/20 transition-colors">
              <svg
                className="h-4 w-4 text-wellco-primary group-hover:text-wellco-accent-vibrant group-hover:translate-x-0.5 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </CardContent>

        {/* Bottom Glow on Hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-wellco-primary via-wellco-accent-vibrant to-wellco-accent-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </Link>
  );
}
