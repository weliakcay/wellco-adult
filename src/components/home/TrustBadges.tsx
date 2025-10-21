import { TRUST_BADGES } from '@/constants';

export function TrustBadges() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-wellco-neutral-light via-wellco-neutral to-wellco-secondary/10 relative overflow-hidden">
      {/* Video Background - 50% Transparent */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://www.markhillard.com/sandbox/media/polina.webm" type="video/webm" />
          <source src="https://www.markhillard.com/sandbox/media/polina.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Pastel Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-wellco-neutral-light/80 via-wellco-neutral/70 to-wellco-secondary/30" />

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-wellco-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-wellco-warm/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
            Güvenle{' '}
            <span className="font-serif italic text-wellco-primary">Alışveriş Yapın</span>
          </h2>
          <p className="mt-4 text-wellco-text-dark/60 max-w-xl mx-auto">
            Gizlilik, güvenlik ve müşteri memnuniyeti önceliğimiz
          </p>
        </div>

        {/* Trust Badges Grid - Minimal & Artistic */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {TRUST_BADGES.map((badge, index) => (
            <div
              key={badge.id}
              className="group flex flex-col items-center text-center space-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon Circle with Gradient Border */}
              <div className="relative">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-wellco-accent-vibrant/20 to-wellco-accent-magenta/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />

                {/* Icon Container */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-wellco-primary/10 to-wellco-warm/10 flex items-center justify-center border-2 border-wellco-primary/20 group-hover:border-wellco-accent-vibrant/40 transition-all duration-300">
                  <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform">
                    {badge.icon}
                  </span>
                </div>

                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-wellco-accent-vibrant/0 group-hover:border-wellco-accent-vibrant/30 group-hover:scale-110 transition-all duration-300" />
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <h3 className="font-serif text-lg md:text-xl text-wellco-text-dark group-hover:text-wellco-primary transition-colors">
                  {badge.title}
                </h3>
                <p className="text-xs md:text-sm text-wellco-text-dark/60 leading-relaxed px-2">
                  {badge.description}
                </p>
              </div>

              {/* Bottom Dot Indicator */}
              <div className="w-2 h-2 rounded-full bg-wellco-primary/30 group-hover:bg-wellco-accent-vibrant group-hover:scale-150 transition-all" />
            </div>
          ))}
        </div>

        {/* Bottom Section - Stats or Extra Info */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-serif font-light text-wellco-primary mb-2">
              1100<span className="text-wellco-accent-rose">+</span>
            </div>
            <div className="text-sm text-wellco-text-dark/60">Ürün Çeşidi</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-serif font-light text-wellco-primary mb-2">
              7<span className="text-wellco-accent-rose">/</span>24
            </div>
            <div className="text-sm text-wellco-text-dark/60">AI Destek</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-serif font-light text-wellco-primary mb-2">
              100<span className="text-wellco-accent-rose">%</span>
            </div>
            <div className="text-sm text-wellco-text-dark/60">Gizli Kargo</div>
          </div>
        </div>
      </div>
    </section>
  );
}
