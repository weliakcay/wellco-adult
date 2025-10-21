# Wellco Adult - Sexual Wellness E-Ticaret Platformu

> **Sexual Wellness = Sağlık, Mutluluk, Güven**

Wellco Adult, cinsel sağlık ve mutluluk alanında eğitici, güven odaklı ve modern bir e-ticaret platformudur. Yaygın "agresif satış" ve "gizli/utanç" yaklaşımından farklı olarak, **sağlık ve mutluluk merkezli** bir marka kimliği yaratıyoruz.

## 🎯 Proje Vizyonu

- **Eğitim Odaklı**: Sexual Wellness 101 blog içerikleri ile kullanıcıları bilgilendiriyoruz
- **Güven Merkezli**: Gizli kargo, SSL güvenlik, 18+ yaş doğrulama ile güven veriyoruz
- **Modern & Minimal**: SFW (Safe For Work) tasarım yaklaşımı ile profesyonel görünüm
- **İnsan Odaklı**: AI personalar ile samimi ve eğitici içerik üretimi

## 🚀 Teknoloji Stack

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (Component Library)
- **Lucide React** (Icons)

### Backend & Database
- **Supabase** (PostgreSQL, Authentication, Storage)
- **Next.js API Routes**

### Payment & Integrations
- **İyzico** (Ödeme Gateway - Türkiye)
- **n8n** (Workflow Automation)
- **WhatsApp Business API** (Müşteri Desteği)

### Hosting & Deployment
- **Vercel** (Recommended for Next.js)
- **Cloudflare** (CDN & Security)

## 📦 Kurulum

### 1. Gereksinimler
- Node.js 18+
- npm veya yarn
- Supabase hesabı

### 2. Projeyi Klonlama ve Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Environment variables'ı kopyala
cp .env.example .env.local
```

### 3. Environment Variables Ayarları

`.env.local` dosyasını düzenleyin ve gerekli değerleri girin:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payment (İyzico)
IYZICO_API_KEY=your_api_key
IYZICO_SECRET_KEY=your_secret_key
```

### 4. Supabase Database Setup

Supabase dashboard'unuzda SQL Editor'ü açın ve şu dosyayı çalıştırın:

```
supabase/migrations/001_initial_schema.sql
```

Bu migration şunları oluşturur:
- Products, Categories, Users, Orders tabloları
- Blog Posts ve AI Personas tabloları
- Row Level Security (RLS) politikaları
- Otomatik updated_at tetikleyicileri

### 5. Development Server

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🗂️ Proje Yapısı

```
wellco-adult-17.10/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Ana sayfa
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── home/               # Ana sayfa component'leri
│   │   ├── layout/             # Layout component'leri
│   │   ├── ui/                 # shadcn/ui components
│   │   └── AgeVerification.tsx
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts            # Type definitions
│   ├── constants/
│   │   └── index.ts            # Site constants
│   └── hooks/                  # Custom React hooks
├── supabase/
│   └── migrations/             # Database migrations
├── public/                     # Static assets
└── .env.example
```

## 🎨 Marka Renk Paleti

```css
--wellco-primary: #5B9AA9        /* Sakin Turkuaz */
--wellco-secondary: #E8B4B8      /* Soft Blush */
--wellco-accent: #2D5F6F         /* Derin Deniz */
--wellco-neutral: #F7F5F2        /* Kırık Beyaz */
--wellco-warm: #D4A574           /* Warm Sand */
```

## 🔐 Güvenlik Özellikleri

### 18+ Yaş Doğrulama
- İlk ziyarette otomatik modal
- 30 gün localStorage cache
- Reddetme durumunda yönlendirme

### Gizli Kargo
- Sade paketleme
- Markalı olmayan etiketleme
- İçerik gizliliği

### KVKK Uyumluluğu
- Açık rıza metinleri
- Veri dışa aktarma
- Veri silme hakları

## 📱 Özellikler

### ✅ Tamamlanan
- [x] Ana Sayfa
- [x] Layout (Header, Footer)
- [x] 18+ Yaş Doğrulama
- [x] Renk Paleti
- [x] Database Schema
- [x] Supabase Setup

### 🚧 Devam Eden
- [ ] Ürün Sayfaları
- [ ] Sepet & Checkout
- [ ] Authentication
- [ ] Blog Sistemi

### 📋 Planlanan
- [ ] AI Persona Sayfaları
- [ ] İyzico Entegrasyonu
- [ ] n8n Automation
- [ ] WhatsApp Chat
- [ ] SEO Optimizasyonu

## 🛠️ Komutlar

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production preview
npm run lint     # Linting
```

## 📄 Lisans

Ticari proje. Tüm hakları saklıdır.

---

**Wellco Adult** - Sağlık, Mutluluk, Güven 🌱
