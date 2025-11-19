import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Persona } from '@/types/persona';
import { MessageCircle, Heart, ExternalLink, Sparkles, Star } from 'lucide-react';

interface DollCardProps {
  persona: Persona;
}

export function DollCard({ persona }: DollCardProps) {
  if (!persona.dollFeatures) return null;

  return (
    <Card className="group h-full border-wellco-accent-magenta/20 bg-white hover:border-wellco-accent-magenta/50 transition-all duration-300 overflow-hidden relative">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-wellco-accent-magenta/0 to-wellco-accent-vibrant/0 group-hover:from-wellco-accent-magenta/10 group-hover:to-wellco-accent-vibrant/5 transition-all duration-300" />

      {/* Adult X Badge */}
      <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
        <ExternalLink className="h-3 w-3" />
        ADULT X
      </div>

      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-wellco-accent-magenta/10 to-wellco-accent-vibrant/10 flex items-center justify-center overflow-hidden">
        {/* Doll Image */}
        {persona.avatar ? (
          <Image
            src={persona.avatar}
            alt={persona.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-wellco-accent-magenta/20 to-wellco-accent-vibrant/20 flex items-center justify-center">
            <div className="text-6xl opacity-30">💃</div>
          </div>
        )}

        {/* Featured Badge */}
        {persona.isFeatured && (
          <div className="absolute top-4 left-4 bg-wellco-accent-vibrant/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="h-3 w-3 fill-white" />
            Öne Çıkan
          </div>
        )}

        {/* AI Chat Available */}
        {persona.aiEnabled && (
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur text-wellco-primary px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md">
            <Sparkles className="h-3 w-3" />
            AI Sohbet Mevcut
          </div>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="text-xs opacity-80">Fiyat</div>
          <div className="text-lg font-bold">
            {persona.dollFeatures.price.toLocaleString('tr-TR')} ₺
          </div>
        </div>
      </div>

      <CardHeader className="relative z-10 pb-3">
        {/* Name & Title */}
        <h3 className="text-2xl font-serif text-wellco-text-dark group-hover:text-wellco-accent-magenta transition-colors mb-1">
          {persona.name}
        </h3>
        <p className="text-sm font-medium text-wellco-accent-magenta">
          {persona.title}
        </p>

        {/* Tagline */}
        <p className="text-sm text-wellco-text-dark/60 mt-3 line-clamp-2 italic">
          &ldquo;{persona.tagline}&rdquo;
        </p>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-wellco-text-dark/50">Boy:</span>
            <span className="ml-2 font-medium text-wellco-text-dark">{persona.dollFeatures.height}</span>
          </div>
          <div>
            <span className="text-wellco-text-dark/50">Materyal:</span>
            <span className="ml-2 font-medium text-wellco-text-dark">{persona.dollFeatures.material}</span>
          </div>
          <div className="col-span-2">
            <span className="text-wellco-text-dark/50">Ölçüler:</span>
            <span className="ml-2 font-medium text-wellco-text-dark">{persona.dollFeatures.measurements}</span>
          </div>
        </div>

        {/* Personality Badge */}
        <div>
          <Badge
            variant="outline"
            className="border-wellco-accent-magenta/30 text-wellco-accent-magenta text-xs w-full justify-center py-1.5"
          >
            <Heart className="h-3 w-3 mr-1" />
            {persona.dollFeatures.personality.split(',')[0].trim()}
          </Badge>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-wellco-text-dark/50">
          {persona.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-wellco-accent-vibrant fill-wellco-accent-vibrant" />
              <span className="font-medium text-wellco-text-dark">{persona.rating}</span>
              <span>Puan</span>
            </div>
          )}
          {persona.consultationCount && (
            <div>
              <span className="font-medium text-wellco-text-dark">{persona.consultationCount}</span>
              <span className="ml-1">görüntüleme</span>
            </div>
          )}
        </div>

        {/* Decorative Border */}
        <div className="h-px w-full bg-gradient-to-r from-wellco-accent-magenta/30 to-transparent group-hover:from-wellco-accent-magenta/60 transition-colors" />

        {/* Actions */}
        <div className="space-y-2">
          <Link href={`/personalar/${persona.slug}`} className="block">
            <Button
              className="w-full bg-wellco-accent-magenta hover:bg-wellco-accent-magenta/90 text-white"
              size="sm"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Tanış & Sohbet Et
            </Button>
          </Link>

          <a
            href="https://adultx.shop/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="w-full border-wellco-accent-magenta/30 text-wellco-accent-magenta hover:bg-wellco-accent-magenta/5"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Adult X&apos;te Görüntüle
            </Button>
          </a>
        </div>
      </CardContent>

      {/* Bottom Glow on Hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-wellco-accent-magenta via-wellco-accent-vibrant to-wellco-accent-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
}
