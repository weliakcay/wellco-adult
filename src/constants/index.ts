// Site Configuration
export const SITE_CONFIG = {
  name: 'Wellco Adult',
  domain: 'wellcoadult.com',
  slogan: 'Sexual Wellness = Sağlık, Mutluluk, Güven',
  description: 'Sexual wellness alanında eğitici, güven odaklı ve modern e-ticaret platformu',
  email: 'info@wellcoadult.com',
  phone: '+90 XXX XXX XX XX',
  address: 'İstanbul, Türkiye',
} as const;

// Main Categories
export const MAIN_CATEGORIES = [
  {
    id: 'women',
    name: 'Kadınlar İçin',
    slug: 'kadinlar-icin',
    description: 'Kadın sağlığı ve mutluluğu için tasarlanmış ürünler',
    icon: 'Sparkles',
    image: '/categories/women.png',
  },
  {
    id: 'men',
    name: 'Erkekler İçin',
    slug: 'erkekler-icin',
    description: 'Erkek sağlığı ve mutluluğu için tasarlanmış ürünler',
    icon: 'Zap',
    image: '/categories/men.png',
  },
  {
    id: 'couples',
    name: 'Çiftler İçin',
    slug: 'ciftler-icin',
    description: 'İlişkinizi güçlendiren özel ürünler',
    icon: 'Heart',
    image: '/categories/couples.png',
  },
  {
    id: 'wellness',
    name: 'Wellness & Sağlık',
    slug: 'wellness-saglik',
    description: 'Genel sağlık ve hijyen ürünleri',
    icon: 'Leaf',
    image: '/categories/wellness.png',
  },
] as const;

// Trust Badges
export const TRUST_BADGES = [
  {
    id: 'secure',
    icon: '🔒',
    title: 'SSL Güvenli Ödeme',
    description: 'Verileriniz 256-bit SSL ile korunur',
  },
  {
    id: 'discreet',
    icon: '📦',
    title: 'Gizli Kargo',
    description: 'Sade paketleme, gizlilik garantisi',
  },
  {
    id: 'age',
    icon: '🔞',
    title: '18+ İçerik',
    description: 'Yetişkin içeriği, sorumlu satış',
  },
  {
    id: 'support',
    icon: '💬',
    title: '7/24 Destek',
    description: 'AI asistan ve insan destek ekibi',
  },
] as const;

// Blog Categories
export const BLOG_CATEGORIES = [
  { id: 'education', name: 'Eğitim', slug: 'egitim' },
  { id: 'health', name: 'Sağlık', slug: 'saglik' },
  { id: 'relationships', name: 'İlişkiler', slug: 'iliskiler' },
  { id: 'guides', name: 'Ürün Rehberleri', slug: 'urun-rehberleri' },
  { id: 'hygiene', name: 'Hijyen', slug: 'hijyen' },
] as const;

// AI Personas
export const AI_PERSONAS = [
  {
    id: 'dr-seren',
    name: 'Dr. Seren',
    slug: 'dr-seren',
    role: 'Cinsel Wellness Uzmanı',
    description: 'Bilgilendirici, yargısız, profesyonel',
    avatar: '/personas/dr-seren.jpg',
  },
  {
    id: 'zey',
    name: 'Zey',
    slug: 'zey',
    role: 'Komik Anlatıcı',
    description: 'Samimi, esprili, sokaktan biri gibi',
    avatar: '/personas/zey.jpg',
  },
  {
    id: 'ece-can',
    name: 'Ece & Can',
    slug: 'ece-can',
    role: 'Çift Diyaloğu',
    description: 'Gerçekçi çift sohbeti, iletişim odaklı',
    avatar: '/personas/ece-can.jpg',
  },
] as const;

// Navigation Links
export const NAV_LINKS = [
  { name: 'Ürünler', href: '/urunler' },
  { name: 'Sexual Wellness 101', href: '/blog' },
  { name: 'Personalar', href: '/personalar' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'İletişim', href: '/iletisim' },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  shop: [
    { name: 'Tüm Ürünler', href: '/urunler' },
    { name: 'Kadınlar İçin', href: '/urunler/kadinlar-icin' },
    { name: 'Erkekler İçin', href: '/urunler/erkekler-icin' },
    { name: 'Çiftler İçin', href: '/urunler/ciftler-icin' },
  ],
  info: [
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Gizli Kargo', href: '/gizli-kargo' },
    { name: 'SSS', href: '/sss' },
    { name: 'İletişim', href: '/iletisim' },
  ],
  legal: [
    { name: 'KVKK', href: '/kvkk' },
    { name: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
    { name: 'İade Koşulları', href: '/iade-kosullari' },
    { name: 'Kullanım Şartları', href: '/kullanim-sartlari' },
  ],
} as const;
