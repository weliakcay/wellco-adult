import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPersonaBySlug, getRelatedPersonas } from '@/data/personas';
import { getPostBySlug } from '@/data/blog';
import { ChatInterface } from '@/components/personas/ChatInterface';
import { ExpertCard } from '@/components/personas/ExpertCard';
import { DollCard } from '@/components/personas/DollCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/types';
import {
  ArrowLeft,
  Star,
  Users,
  MessageCircle,
  BookOpen,
  Sparkles,
  ExternalLink,
  Heart,
  Check
} from 'lucide-react';

export default async function PersonaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const persona = getPersonaBySlug(slug);

  if (!persona) {
    notFound();
  }

  const relatedPersonas = getRelatedPersonas(persona, 3);
  const personaBlogPosts: BlogPost[] = persona.blogPosts
    ? persona.blogPosts
        .map(postId => getPostBySlug(postId))
        .filter((post): post is BlogPost => Boolean(post))
    : [];

  const availabilityColors = {
    available: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-400'
  };

  const availabilityText = {
    available: 'Çevrimiçi ve Müsait',
    busy: 'Hazırlanıyor',
    offline: 'Çevrimdışı'
  };

  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-wellco-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-wellco-text-dark/60">
            <Link href="/" className="hover:text-wellco-accent-vibrant transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/personalar" className="hover:text-wellco-accent-vibrant transition-colors">
              Personalar
            </Link>
            <span>/</span>
            <span className="text-wellco-text-dark">{persona.name}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/personalar"
          className="inline-flex items-center gap-2 text-wellco-primary hover:text-wellco-accent-vibrant transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Personalar&apos;a Dön
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-wellco-primary/10 via-wellco-background to-wellco-accent-vibrant/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Avatar & Info */}
              <div className="text-center md:text-left">
                {/* Avatar */}
                <div className="inline-block relative mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-wellco-primary to-wellco-accent-vibrant shadow-2xl">
                    {persona.avatar ? (
                      <Image
                        src={persona.avatar}
                        alt={persona.name}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-6xl font-serif">
                        {persona.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  {persona.availability && (
                    <div
                      className={`absolute bottom-2 right-2 w-6 h-6 ${availabilityColors[persona.availability]} rounded-full border-4 border-white shadow-lg`}
                    />
                  )}
                </div>

                {/* Name & Title */}
                <h1 className="text-4xl md:text-5xl font-serif font-light text-wellco-text-dark mb-3">
                  {persona.name}
                </h1>
                <p className="text-xl text-wellco-primary font-medium mb-4">{persona.title}</p>

                {/* Tagline */}
                <p className="text-lg text-wellco-text-dark/70 italic mb-6">
                  &ldquo;{persona.tagline}&rdquo;
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                  {persona.aiEnabled && (
                    <Badge className="bg-wellco-accent-vibrant text-white px-3 py-1.5">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI Destekli
                    </Badge>
                  )}
                  {persona.availability && (
                    <Badge variant="outline" className="border-green-500 text-green-700 px-3 py-1.5">
                      <div className={`w-2 h-2 ${availabilityColors[persona.availability]} rounded-full mr-2`} />
                      {availabilityText[persona.availability]}
                    </Badge>
                  )}
                  {persona.type === 'doll' && (
                    <Badge className="bg-black text-white px-3 py-1.5">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      ADULT X
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex gap-8 justify-center md:justify-start">
                  {persona.rating && (
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-wellco-accent-vibrant mb-1">
                        <Star className="h-5 w-5 fill-wellco-accent-vibrant" />
                        <span className="text-2xl font-bold">{persona.rating}</span>
                      </div>
                      <div className="text-xs text-wellco-text-dark/50">Puan</div>
                    </div>
                  )}
                  {persona.consultationCount && (
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-wellco-primary mb-1">
                        <Users className="h-5 w-5" />
                        <span className="text-2xl font-bold">
                          {persona.consultationCount > 1000
                            ? `${(persona.consultationCount / 1000).toFixed(1)}k`
                            : persona.consultationCount}
                        </span>
                      </div>
                      <div className="text-xs text-wellco-text-dark/50">
                        {persona.type === 'doll' ? 'Görüntüleme' : 'Danışan'}
                      </div>
                    </div>
                  )}
                  {persona.articles && (
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-wellco-accent-magenta mb-1">
                        <BookOpen className="h-5 w-5" />
                        <span className="text-2xl font-bold">{persona.articles}</span>
                      </div>
                      <div className="text-xs text-wellco-text-dark/50">Makale</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Quick Chat Preview */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-wellco-primary to-wellco-accent-vibrant p-6 text-white text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Sohbete Başla</h3>
                  <p className="text-sm opacity-90">
                    {persona.type === 'expert'
                      ? 'AI destekli danışmanlık hizmeti'
                      : 'Kişisel AI sohbet deneyimi'}
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  {persona.sampleQuestions && persona.sampleQuestions.length > 0 && (
                    <>
                      <div className="text-sm font-medium text-wellco-text-dark mb-2">
                        Örnek Sorular:
                      </div>
                      <div className="space-y-2">
                        {persona.sampleQuestions.slice(0, 3).map((question, index) => (
                          <div
                            key={index}
                            className="text-sm text-wellco-text-dark/70 bg-wellco-neutral p-3 rounded-lg"
                          >
                            &ldquo;{question}&rdquo;
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
            {/* Left Column: Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <div>
                <h2 className="text-2xl font-serif text-wellco-text-dark mb-4">Hakkında</h2>
                <div className="prose max-w-none text-wellco-text-dark/80 leading-relaxed whitespace-pre-line">
                  {persona.bio}
                </div>
              </div>

              {/* Specialty Tags */}
              {persona.specialty && persona.specialty.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif text-wellco-text-dark mb-4">Uzmanlık Alanları</h3>
                  <div className="flex flex-wrap gap-3">
                    {persona.specialty.map((spec) => (
                      <Badge
                        key={spec}
                        variant="outline"
                        className="border-wellco-primary/30 text-wellco-primary px-4 py-2 text-sm"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Doll Features */}
              {persona.type === 'doll' && persona.dollFeatures && (
                <div className="bg-gradient-to-br from-wellco-accent-magenta/5 to-wellco-accent-vibrant/5 p-8 rounded-2xl border border-wellco-accent-magenta/20">
                  <h3 className="text-2xl font-serif text-wellco-text-dark mb-6 flex items-center gap-2">
                    <Heart className="h-6 w-6 text-wellco-accent-magenta" />
                    Ürün Özellikleri
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-wellco-text-dark/60 mb-1">Boy</div>
                      <div className="text-lg font-semibold text-wellco-text-dark">
                        {persona.dollFeatures.height}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-wellco-text-dark/60 mb-1">Ölçüler</div>
                      <div className="text-lg font-semibold text-wellco-text-dark">
                        {persona.dollFeatures.measurements}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-wellco-text-dark/60 mb-1">Materyal</div>
                      <div className="text-lg font-semibold text-wellco-text-dark">
                        {persona.dollFeatures.material}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-wellco-text-dark/60 mb-1">Marka</div>
                      <div className="text-lg font-semibold text-wellco-text-dark">
                        {persona.dollFeatures.brand}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-wellco-text-dark/60 mb-2">Kişilik</div>
                    <div className="text-wellco-text-dark">{persona.dollFeatures.personality}</div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-wellco-text-dark/60 mb-2">Hikayesi</div>
                    <div className="text-wellco-text-dark/80 leading-relaxed">
                      {persona.dollFeatures.story}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-wellco-text-dark/60 mb-3">Özellikler</div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {persona.dollFeatures.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-wellco-accent-vibrant mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-wellco-text-dark">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-wellco-accent-magenta/20">
                    <div>
                      <div className="text-sm text-wellco-text-dark/60">Fiyat</div>
                      <div className="text-3xl font-bold text-wellco-text-dark">
                        {persona.dollFeatures.price.toLocaleString('tr-TR')} ₺
                      </div>
                    </div>
                    {persona.dollFeatures.productUrl && (
                      <a
                        href={persona.dollFeatures.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="lg"
                          className="bg-black hover:bg-black/90 text-white"
                        >
                          <ExternalLink className="h-5 w-5 mr-2" />
                          Adult X&apos;te Satın Al
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Blog Posts */}
              {personaBlogPosts.length > 0 && (
                <div>
                  <h3 className="text-2xl font-serif text-wellco-text-dark mb-6 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-wellco-primary" />
                    Yazdığı Makaleler
                  </h3>
                  <div className="space-y-4">
                    {personaBlogPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="block bg-white border border-wellco-primary/10 p-6 rounded-xl hover:border-wellco-accent-vibrant/30 hover:shadow-lg transition-all"
                      >
                        <h4 className="text-lg font-semibold text-wellco-text-dark mb-2 hover:text-wellco-accent-vibrant transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-sm text-wellco-text-dark/60 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-wellco-text-dark/50">
                          <span>{post.readingTime} dk okuma</span>
                          <span>•</span>
                          <span>{post.viewCount.toLocaleString('tr-TR')} görüntülenme</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Chat Interface */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {persona.aiEnabled ? (
                  <ChatInterface persona={persona} />
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center border border-wellco-primary/10">
                    <MessageCircle className="h-12 w-12 text-wellco-text-dark/30 mx-auto mb-4" />
                    <p className="text-wellco-text-dark/60">
                      Bu persona için henüz chat özelliği aktif değil.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Personas */}
      {relatedPersonas.length > 0 && (
        <section className="py-16 bg-wellco-neutral">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-wellco-text-dark mb-12 text-center">
              Benzer{' '}
              <span className="font-serif italic text-wellco-accent-vibrant">Personalar</span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {relatedPersonas.map((relatedPersona) =>
                relatedPersona.type === 'expert' ? (
                  <ExpertCard key={relatedPersona.id} persona={relatedPersona} />
                ) : (
                  <DollCard key={relatedPersona.id} persona={relatedPersona} />
                )
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
