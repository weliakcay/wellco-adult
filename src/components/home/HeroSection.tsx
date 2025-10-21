'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/GradientText';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  useEffect(() => {
    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroContent = document.getElementById('hero-content');
      const heroVideo = document.getElementById('hero-video');

      if (heroContent) {
        heroContent.style.transform = `translate3d(0, ${-(scrolled * 0.2)}px, 0)`;
        heroContent.style.opacity = String(1 - scrolled / 400);
      }

      if (heroVideo) {
        heroVideo.style.transform = `translate3d(0, ${-(scrolled * 0.25)}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Video Background */}
      <video
        id="hero-video"
        className="fixed top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
        poster="https://www.markhillard.com/sandbox/media/polina.jpg"
      >
        <source src="https://www.markhillard.com/sandbox/media/polina.webm" type="video/webm" />
        <source src="https://www.markhillard.com/sandbox/media/polina.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Content */}
      <div id="hero-content" className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <div className="relative w-64 h-32">
              <Image
                src="/logo-white.svg"
                alt="Wellco Adult"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-white mb-6 animate-slide-up">
            <span className="block mb-3 font-serif italic font-normal">
              <GradientText>Sağlık, Mutluluk, Güven</GradientText>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed font-light mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Cinsel sağlık ve mutluluğunuz için{' '}
            <span className="text-wellco-accent-rose font-medium">eğitici</span>,{' '}
            <span className="text-wellco-accent-rose font-medium">güven odaklı</span> ve{' '}
            <span className="text-wellco-accent-rose font-medium">modern</span> bir platform.
          </p>

          {/* Decorative Line */}
          <div className="h-px w-32 bg-gradient-to-r from-wellco-accent-vibrant via-wellco-accent-magenta to-transparent mb-8 animate-slide-up" style={{ animationDelay: '200ms' }} />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Button
              size="lg"
              className="gradient-cta text-white border-none hover:opacity-90 transition-opacity px-8 text-base font-medium group"
              asChild
            >
              <Link href="/urunler">
                Ürünleri Keşfet
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              className="bg-white/20 border-2 border-white/40 text-white hover:bg-white/30 px-8 text-base font-medium backdrop-blur-md"
              asChild
            >
              <Link href="/blog">
                Sexual Wellness 101
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-wellco-accent-rose" />
              <span>SSL Güvenli Ödeme</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-wellco-accent-rose" />
              <span>Gizli Kargo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-wellco-accent-rose" />
              <span>7/24 AI Destek</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/80 rounded-full" />
        </div>
      </div>
    </section>
  );
}
