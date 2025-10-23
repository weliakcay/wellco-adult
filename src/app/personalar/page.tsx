'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ExpertCard } from '@/components/personas/ExpertCard';
import { DollCard } from '@/components/personas/DollCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getExperts,
  getDolls,
  getPersonaStats,
  searchPersonas
} from '@/data/personas';
import { Search, Users, MessageCircle, Heart, Sparkles } from 'lucide-react';

export default function PersonalarPage() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get('view');
  const initialTab: 'all' | 'experts' | 'dolls' =
    initialView === 'experts' || initialView === 'dolls' ? initialView : 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'experts' | 'dolls'>(initialTab);

  const experts = getExperts();
  const dolls = getDolls();
  const stats = getPersonaStats();

  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'experts' || view === 'dolls') {
      setActiveTab(view);
    }
  }, [searchParams]);

  const filteredExperts = searchQuery
    ? searchPersonas(searchQuery).filter(p => p.type === 'expert')
    : experts;

  const filteredDolls = searchQuery
    ? searchPersonas(searchQuery).filter(p => p.type === 'doll')
    : dolls;

  const showExperts = activeTab === 'all' || activeTab === 'experts';
  const showDolls = activeTab === 'all' || activeTab === 'dolls';

  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-wellco-primary/10 via-wellco-background to-wellco-accent-vibrant/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-lg">
                <Sparkles className="h-5 w-5 text-wellco-accent-vibrant" />
                <span className="text-sm font-medium text-wellco-text-dark">
                  AI Destekli Danışmanlık & Etkileşim
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-light text-wellco-text-dark">
              Wellco{' '}
              <span className="font-serif italic text-wellco-accent-vibrant">Personalar</span>
            </h1>

            <p className="text-lg md:text-xl text-wellco-text-dark/70 max-w-3xl mx-auto">
              Cinsel sağlık uzmanlarıyla sohbet edin, silikon bebek karakterlerimizi keşfedin.
              Yapay zeka destekli kişiselleştirilmiş deneyimler sizi bekliyor.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 pt-6 text-sm">
              <div className="text-center">
                <div className="text-3xl font-serif text-wellco-accent-vibrant">{stats.totalExperts}</div>
                <div className="text-wellco-text-dark/60">Uzman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-wellco-accent-magenta">{stats.totalDolls}</div>
                <div className="text-wellco-text-dark/60">Karakter</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-wellco-primary">{stats.activeNow}</div>
                <div className="text-wellco-text-dark/60">Aktif</div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="flex justify-center pt-4">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-wellco-accent-vibrant to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-wellco-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Logo - Subtle Watermark */}
            <div className="flex justify-end mb-4">
              <div className="relative w-32 h-16 opacity-20 hover:opacity-60 transition-opacity">
                <Image
                  src="/logo.svg"
                  alt="Wellco Adult"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-wellco-text-dark/40" />
              <Input
                type="text"
                placeholder="Persona ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-lg border-wellco-primary/20 focus:border-wellco-accent-vibrant"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeTab === 'all' ? "default" : "outline"}
                onClick={() => setActiveTab('all')}
                className={activeTab === 'all'
                  ? "bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90"
                  : "border-wellco-primary/20 hover:border-wellco-accent-vibrant/40"
                }
              >
                <Users className="h-4 w-4 mr-2" />
                Tümü
              </Button>
              <Button
                variant={activeTab === 'experts' ? "default" : "outline"}
                onClick={() => setActiveTab('experts')}
                className={activeTab === 'experts'
                  ? "bg-wellco-primary hover:bg-wellco-primary/90"
                  : "border-wellco-primary/20 hover:border-wellco-primary/40"
                }
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Uzmanlar ({stats.totalExperts})
              </Button>
              <Button
                variant={activeTab === 'dolls' ? "default" : "outline"}
                onClick={() => setActiveTab('dolls')}
                className={activeTab === 'dolls'
                  ? "bg-wellco-accent-magenta hover:bg-wellco-accent-magenta/90"
                  : "border-wellco-accent-magenta/20 hover:border-wellco-accent-magenta/40"
                }
              >
                <Heart className="h-4 w-4 mr-2" />
                Karakterler ({stats.totalDolls})
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Experts Section */}
      {showExperts && filteredExperts.length > 0 && (
        <section className="py-16 bg-white" id="personas-experts">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
                Cinsel Sağlık{' '}
                <span className="font-serif italic text-wellco-primary">Uzmanları</span>
              </h2>
              <div className="h-px flex-grow ml-8 bg-gradient-to-r from-wellco-primary/40 to-transparent max-w-xs" />
            </div>
            <p className="text-wellco-text-dark/70 mb-8 max-w-3xl">
              Yapay zeka destekli uzmanlarımızla konuşun. Dr. Seren Yılmaz, Sigmund Freud, Carl Jung
              ve Esther Perel&apos;in teorilerini temel alan AI botlarımız size 7/24 destek sunuyor.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredExperts.map((expert) => (
                <ExpertCard key={expert.id} persona={expert} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dolls Section - Adult X Collaboration */}
      {showDolls && filteredDolls.length > 0 && (
        <section
          className="py-16 bg-gradient-to-br from-wellco-accent-magenta/5 via-wellco-background to-wellco-accent-vibrant/5 relative overflow-hidden"
          id="personas-dolls"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-64 h-64 bg-wellco-accent-magenta rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-wellco-accent-vibrant rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="mb-12 text-center space-y-6">
              <div className="inline-flex items-center gap-4 bg-wellco-accent-magenta/10 border-2 border-wellco-accent-magenta/30 px-8 py-4 rounded-2xl shadow-lg">
                <Heart className="h-6 w-6 text-wellco-accent-magenta" />
                <div className="text-left">
                  <div className="text-sm text-wellco-text-dark/60">Özel Koleksiyon</div>
                  <div className="text-2xl font-bold text-wellco-accent-magenta">Silikon Bebekler</div>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
                Premium Silikon Bebek{' '}
                <span className="font-serif italic text-wellco-accent-magenta">Koleksiyonu</span>
              </h2>

              <p className="text-wellco-text-dark/70 max-w-3xl mx-auto">
                Özenle seçilmiş premium silikon bebeklerimiz için özel olarak tasarlanmış AI karakterler.
                Her birinin kendine özgü kişiliği, hikayesi ve özel özellikleri var.
              </p>

              <div className="flex justify-center">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-wellco-accent-magenta to-transparent" />
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredDolls.map((doll) => (
                <DollCard key={doll.id} persona={doll} />
              ))}
            </div>

            {/* Collection CTA */}
            <div className="mt-12 text-center">
              <Button
                size="lg"
                className="bg-wellco-accent-magenta/20 hover:bg-wellco-accent-magenta/30 text-wellco-accent-magenta border-2 border-wellco-accent-magenta/40 px-8 py-6 text-lg group shadow-lg cursor-not-allowed"
                disabled
              >
                <Heart className="h-5 w-5 mr-2" />
                Silikon Bebek Koleksiyonu - Yakında
              </Button>
              <p className="text-xs text-wellco-text-dark/50 mt-4">
                Premium silikon bebek koleksiyonumuz çok yakında sizlerle olacak
              </p>
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {searchQuery && filteredExperts.length === 0 && filteredDolls.length === 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="text-wellco-text-dark/50 text-lg">
              &ldquo;{searchQuery}&rdquo; için sonuç bulunamadı.
            </div>
            <Button
              variant="outline"
              onClick={() => setSearchQuery('')}
              className="mt-4"
            >
              Aramayı Temizle
            </Button>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-16 bg-white border-t border-wellco-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-serif text-wellco-text-dark mb-4">
                Personalar Nasıl Çalışır?
              </h3>
              <div className="h-px w-16 bg-wellco-accent-vibrant mx-auto mb-8" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-wellco-neutral p-6 rounded-2xl">
                <MessageCircle className="h-8 w-8 text-wellco-primary mb-4" />
                <h4 className="text-lg font-semibold text-wellco-text-dark mb-2">
                  Uzmanlarla Sohbet
                </h4>
                <p className="text-wellco-text-dark/70 text-sm">
                  AI destekli uzmanlarımız, gerçek teorileri ve yaklaşımları temel alarak
                  size rehberlik eder. 7/24 erişilebilir, gizli ve yargılayıcı değil.
                </p>
              </div>

              <div className="bg-wellco-neutral p-6 rounded-2xl">
                <Heart className="h-8 w-8 text-wellco-accent-magenta mb-4" />
                <h4 className="text-lg font-semibold text-wellco-text-dark mb-2">
                  Karakterleri Keşfet
                </h4>
                <p className="text-wellco-text-dark/70 text-sm">
                  Silikon bebek karakterlerimiz, Adult X markasının premium ürünlerini
                  tanıtırken size etkileşimli bir deneyim sunar.
                </p>
              </div>
            </div>

            <div className="bg-wellco-primary/5 border border-wellco-primary/20 p-6 rounded-2xl">
              <p className="text-sm text-wellco-text-dark/70 text-center">
                <strong className="text-wellco-primary">Önemli Not:</strong> Bu platform eğitim ve eğlence amaçlıdır.
                Ciddi sağlık sorunlarınız varsa lütfen profesyonel bir uzmana danışın.
                AI botlar gerçek terapistlerin yerini tutmaz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
