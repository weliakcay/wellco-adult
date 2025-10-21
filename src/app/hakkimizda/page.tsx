import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Shield,
  Truck,
  Lock,
  Users,
  Sparkles,
  MessageCircle,
  Award,
  Clock,
  Star
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-wellco-primary/10 via-wellco-background to-wellco-accent-vibrant/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-wellco-accent-vibrant text-white mb-6 px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              Wellco Adult Ailesine Hoş Geldiniz
            </Badge>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-wellco-text-dark mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-wellco-text-dark/70 leading-relaxed">
              Modern cinsellik anlayışını, AI destekli danışmanlık hizmetleri ve premium ürün seçenekleriyle
              birleştirerek, sağlıklı ve mutlu bir cinsel yaşam için yanınızdayız.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-serif text-wellco-text-dark mb-6">
                  Misyonumuz
                </h2>
                <p className="text-lg text-wellco-text-dark/80 leading-relaxed mb-6">
                  Wellco Adult olarak, cinsel sağlık ve mutluluğun herkes için ulaşılabilir olması gerektiğine inanıyoruz.
                  Modern teknoloji ile geleneksel danışmanlığı birleştirerek, hem bilgilendirici hem de destekleyici
                  bir platform oluşturduk.
                </p>
                <p className="text-lg text-wellco-text-dark/80 leading-relaxed">
                  AI destekli uzman danışmanlarımız ve dünya çapında tanınmış seksolog personalarımızla,
                  gizliliğinizi korurken size özel çözümler sunuyoruz.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-wellco-primary/10 hover:border-wellco-accent-vibrant/30 transition-colors">
                  <Sparkles className="h-12 w-12 text-wellco-accent-vibrant mb-4" />
                  <h3 className="text-2xl font-bold text-wellco-text-dark mb-2">AI Destekli</h3>
                  <p className="text-sm text-wellco-text-dark/60">Yapay zeka ile geliştirilmiş kişisel danışmanlık</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-wellco-primary/10 hover:border-wellco-accent-vibrant/30 transition-colors">
                  <Shield className="h-12 w-12 text-wellco-primary mb-4" />
                  <h3 className="text-2xl font-bold text-wellco-text-dark mb-2">%100 Gizli</h3>
                  <p className="text-sm text-wellco-text-dark/60">Verileriniz şifrelenmiş ve güvende</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-wellco-primary/10 hover:border-wellco-accent-vibrant/30 transition-colors">
                  <Clock className="h-12 w-12 text-wellco-accent-magenta mb-4" />
                  <h3 className="text-2xl font-bold text-wellco-text-dark mb-2">7/24 Destek</h3>
                  <p className="text-sm text-wellco-text-dark/60">Her zaman yanınızdayız</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-wellco-primary/10 hover:border-wellco-accent-vibrant/30 transition-colors">
                  <Award className="h-12 w-12 text-wellco-accent-vibrant mb-4" />
                  <h3 className="text-2xl font-bold text-wellco-text-dark mb-2">Uzman Ekip</h3>
                  <p className="text-sm text-wellco-text-dark/60">Sertifikalı seksologlar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-wellco-neutral">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif text-wellco-text-dark text-center mb-12">
              Neden <span className="italic text-wellco-accent-vibrant">Wellco Adult</span>?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-wellco-primary/10">
                <div className="bg-wellco-accent-vibrant/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="h-8 w-8 text-wellco-accent-vibrant" />
                </div>
                <h3 className="text-2xl font-semibold text-wellco-text-dark mb-4">
                  AI Destekli Sohbet
                </h3>
                <p className="text-wellco-text-dark/70 leading-relaxed">
                  Sigmund Freud, Carl Jung, Esther Perel gibi dünyaca ünlü seksologlarla AI destekli
                  sohbetler yaparak sorularınıza anında yanıt alın.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-wellco-primary/10">
                <div className="bg-wellco-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-wellco-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-wellco-text-dark mb-4">
                  Tam Gizlilik
                </h3>
                <p className="text-wellco-text-dark/70 leading-relaxed">
                  Tüm görüşmeleriniz ve kişisel bilgileriniz end-to-end şifreleme ile korunur.
                  Hiçbir veri üçüncü şahıslarla paylaşılmaz.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-wellco-primary/10">
                <div className="bg-wellco-accent-magenta/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Truck className="h-8 w-8 text-wellco-accent-magenta" />
                </div>
                <h3 className="text-2xl font-semibold text-wellco-text-dark mb-4">
                  Hızlı & Gizli Kargo
                </h3>
                <p className="text-wellco-text-dark/70 leading-relaxed">
                  Premium ürünlerimiz özel paketleme ile 24-48 saat içinde adresinize teslim edilir.
                  Paket üzerinde ürün bilgisi bulunmaz.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-wellco-primary/10">
                <div className="bg-wellco-accent-vibrant/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Lock className="h-8 w-8 text-wellco-accent-vibrant" />
                </div>
                <h3 className="text-2xl font-semibold text-wellco-text-dark mb-4">
                  Güvenli Ödeme
                </h3>
                <p className="text-wellco-text-dark/70 leading-relaxed">
                  3D Secure altyapısı ile SSL sertifikalı güvenli ödeme sistemi.
                  Tüm ödeme bilgileriniz bankalar tarafından korunur.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-wellco-primary/10">
                <div className="bg-wellco-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-wellco-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-wellco-text-dark mb-4">
                  Uzman Personalar
                </h3>
                <p className="text-wellco-text-dark/70 leading-relaxed">
                  Alanında uzman seksologlardan oluşan AI destekli personalarımızla
                  bilimsel ve empatik danışmanlık alın.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-wellco-primary/10">
                <div className="bg-wellco-accent-magenta/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Star className="h-8 w-8 text-wellco-accent-magenta" />
                </div>
                <h3 className="text-2xl font-semibold text-wellco-text-dark mb-4">
                  Premium Ürünler
                </h3>
                <p className="text-wellco-text-dark/70 leading-relaxed">
                  Dünya çapında güvenilir markalardan seçilmiş, kalite kontrollü,
                  orijinal garantili ürünler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-wellco-accent-vibrant mb-2">15K+</div>
                <div className="text-wellco-text-dark/60">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-wellco-primary mb-2">1000+</div>
                <div className="text-wellco-text-dark/60">Premium Ürün</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-wellco-accent-magenta mb-2">50K+</div>
                <div className="text-wellco-text-dark/60">AI Danışmanlık</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-wellco-accent-vibrant mb-2">4.9</div>
                <div className="text-wellco-text-dark/60">Müşteri Puanı</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-wellco-primary/5 to-wellco-accent-vibrant/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif text-wellco-text-dark mb-6">
              Değerlerimiz
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-6xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-wellco-text-dark mb-3">Güven</h3>
                <p className="text-wellco-text-dark/70">
                  Müşterilerimizin güvenini en üst düzeyde tutmak için şeffaf ve dürüst hizmet sunuyoruz.
                </p>
              </div>
              <div>
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-wellco-text-dark mb-3">Mahremiyet</h3>
                <p className="text-wellco-text-dark/70">
                  Kişisel bilgileriniz ve tercihleriniz bizim için kutsaldır ve tam gizlilik garantisi veriyoruz.
                </p>
              </div>
              <div>
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-xl font-semibold text-wellco-text-dark mb-3">İnovasyon</h3>
                <p className="text-wellco-text-dark/70">
                  AI teknolojisi ile cinsel sağlık alanında yenilikçi çözümler sunuyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-wellco-primary to-wellco-accent-vibrant">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
              Hemen Keşfetmeye Başlayın
            </h2>
            <p className="text-xl mb-8 opacity-90">
              AI destekli danışmanlarımızla tanışın veya premium ürünlerimize göz atın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/personalar">
                <Button size="lg" className="bg-white text-wellco-primary hover:bg-white/90">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Personalarla Tanış
                </Button>
              </Link>
              <Link href="/urunler">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Premium Ürünler
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
