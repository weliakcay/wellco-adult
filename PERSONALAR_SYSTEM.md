# Wellco Adult - Personalar Sistemi Dokümantasyonu

## Genel Bakış

Personalar sistemi, Wellco Adult platformunun en özgün ve çekici özelliklerinden biridir. Üç ana bileşenden oluşur:

1. **Cinsel Sağlık Uzmanları** - AI destekli danışmanlık botları
2. **Silikon Bebek Karakterleri** - Adult X markası ile işbirliği
3. **AI Sohbet Altyapısı** - Gerçek zamanlı etkileşim

## Mimari Yapı

### Veri Katmanı

#### Persona Types
```typescript
export type PersonaType = 'expert' | 'doll' | 'author';

export interface Persona {
  id: string;
  slug: string;
  type: PersonaType;
  name: string;
  title: string;
  avatar: string;
  tagline: string;
  bio: string;

  // AI özellikleri
  aiEnabled: boolean;
  systemPrompt?: string;
  sampleQuestions?: string[];

  // Ölçülebilir metrikler
  consultationCount?: number;
  rating?: number;
  availability?: 'available' | 'busy' | 'offline';

  // İçerik üretimi
  createsContent: boolean;
  blogPosts?: string[];

  // Silikon bebek özellikleri
  dollFeatures?: {
    height: string;
    measurements: string;
    material: string;
    brand: string;
    price: number;
    images: string[];
    personality: string;
    story: string;
    features: string[];
    productUrl?: string;
  };
}
```

### Dosya Yapısı

```
src/
├── types/
│   └── persona.ts                 # Tip tanımlamaları
├── data/
│   ├── personas.json              # Persona verileri (7 karakter)
│   └── personas.ts                # Helper fonksiyonlar
├── components/
│   └── personas/
│       ├── ExpertCard.tsx         # Uzman kartı
│       ├── DollCard.tsx           # Bebek kartı
│       └── ChatInterface.tsx      # Sohbet arayüzü
└── app/
    └── personalar/
        ├── page.tsx               # Ana liste sayfası
        └── [slug]/
            └── page.tsx           # Detay sayfası
```

## Mevcut Personalar

### Cinsel Sağlık Uzmanları

#### 1. Dr. Seren Yılmaz
- **Uzmanlık**: Cinsel Sağlık Uzmanı
- **Deneyim**: 15+ yıl
- **AI Model**: GPT-4 (OpenAI)
- **Specialty**: sexual-health, wellness, therapy
- **Danışan Sayısı**: 2,847
- **Rating**: 4.9/5
- **İçerik**: 2 blog makalesi (Sexual Wellness Nedir, Kegel Egzersizleri)
- **Yaklaşım**: Bilimsel, empatik, yargılayıcı değil
- **Örnek Sorular**:
  - Cinsel isteksizlik sorunuyla nasıl başa çıkabilirim?
  - İlk defa vibratör kullanacağım, nelere dikkat etmeliyim?
  - Partnerimle cinsel konularda konuşmakta zorlanıyorum

#### 2. Sigmund Freud
- **Unvan**: Psikanaliz Kurucusu
- **AI Model**: Claude 3 Sonnet (Anthropic)
- **Specialty**: psychoanalysis, psychology, therapy
- **Danışan Sayısı**: 1,523
- **Rating**: 4.7/5
- **Yaklaşım**: Klasik psikanaliz, bilinçaltı analizi, rüya yorumlama
- **Temel Kavramlar**: Id, ego, süperego, bastırma, Oedipus kompleksi
- **Örnek Sorular**:
  - Rüyalarımda sürekli aynı semboller görüyorum
  - Cinsel hayatımda yaşadığım sorunlar çocuklukla ilgili olabilir mi?
  - Bilinçaltım davranışlarımı nasıl etkiliyor?

#### 3. Carl Gustav Jung
- **Unvan**: Analitik Psikolog
- **AI Model**: Claude 3 Sonnet (Anthropic)
- **Specialty**: psychoanalysis, psychology, wellness
- **Danışan Sayısı**: 1,247
- **Rating**: 4.8/5
- **Yaklaşım**: Kolektif bilinçdışı, arketipler, bireyselleşme
- **Temel Kavramlar**: Anima/animus, gölge, self, arketipler
- **Örnek Sorular**:
  - İçimdeki anima/animus dengesini nasıl kurmalıyım?
  - Gölge benliğim cinsel yaşamımı nasıl etkiliyor?
  - Rüyalarımdaki arketipik sembolleri anlamak istiyorum

#### 4. Esther Perel
- **Unvan**: İlişki ve Cinsellik Terapisti
- **AI Model**: GPT-4 (OpenAI)
- **Specialty**: relationships, sexual-health, therapy
- **Danışan Sayısı**: 3,421
- **Rating**: 4.9/5
- **İçerik**: 1 blog makalesi (İlişkilerde İletişim)
- **Yaklaşım**: Modern ilişkiler, arzu paradoksu, kültürler arası bakış
- **Temel Kavramlar**: Yakınlık vs özerklik, uzun süreli ilişkilerde tutku
- **Örnek Sorular**:
  - Uzun süreli ilişkimizde tutku nasıl canlı tutulur?
  - Güven ve heyecan arasındaki dengeyi nasıl kurabiliriz?
  - İhanet sonrası ilişkiyi onarabilir miyiz?

### Silikon Bebek Karakterleri (Adult X İşbirliği)

#### 1. Luna Rose
- **Karakter**: Romantik Rüyacı
- **Özellikler**:
  - Boy: 165 cm
  - Ölçüler: 86-58-88
  - Materyal: Premium TPE
  - Fiyat: 24,999 ₺
- **Kişilik**: Romantik, düşünceli, sakin, şair ruhlu
- **AI Model**: Claude 3 Sonnet
- **Hikaye**: Sahil kasabasında büyümüş, yıldızlara bakan sanatkâr
- **Görüntüleme**: 856
- **Rating**: 4.8/5
- **Özellikler**: Hyperrealistik cilt, ısı fonksiyonu, 3 peruk seçeneği

#### 2. Scarlett Vogue
- **Karakter**: Ateşli Moda İkonu
- **Özellikler**:
  - Boy: 172 cm
  - Ölçüler: 95-62-92
  - Materyal: Premium Silikon
  - Fiyat: 34,999 ₺
- **Kişilik**: Özgüvenli, tutkulu, maceracı, enerjik
- **AI Model**: GPT-4
- **Hikaye**: New York moda endüstrisinde çalışan, hayat dolu karakter
- **Görüntüleme**: 1,243
- **Rating**: 4.9/5
- **Özellikler**: Ultra gerçekçi silikon, sesli moaning, lüks aksesuar seti

#### 3. Yuki Tanaka
- **Karakter**: Zarif Japon Güzeli
- **Özellikler**:
  - Boy: 158 cm
  - Ölçüler: 82-56-84
  - Materyal: Premium TPE
  - Fiyat: 27,999 ₺
- **Kişilik**: Zarif, nazik, geleneksel, sakin, felsefi
- **AI Model**: Claude 3 Sonnet
- **Hikaye**: Kyoto'da büyümüş, çay seremonisi ustası
- **Görüntüleme**: 672
- **Rating**: 4.7/5
- **Özellikler**: Asyatik yüz hatları, kimono dahil, porselen cilt dokusu

## AI Sohbet Sistemi

### Mevcut Durum

Sistem şu anda **simüle edilmiş** AI yanıtlar kullanıyor. Her persona için önceden tanımlanmış yanıt setleri var.

### Gerçek AI Entegrasyonu (Gelecek)

#### API Endpoint Yapısı

```typescript
// POST /api/chat
interface ChatRequest {
  personaId: string;
  message: string;
  conversationHistory?: Message[];
}

interface ChatResponse {
  message: string;
  timestamp: Date;
  personaId: string;
}
```

#### Önerilen Implementasyon

**1. OpenAI Entegrasyonu** (Dr. Seren, Esther, Scarlett)
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateResponse(
  persona: Persona,
  userMessage: string,
  history: Message[]
) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: persona.systemPrompt
      },
      ...history.map(m => ({
        role: m.role,
        content: m.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ],
    temperature: 0.8,
    max_tokens: 500
  });

  return completion.choices[0].message.content;
}
```

**2. Anthropic (Claude) Entegrasyonu** (Freud, Jung, Luna, Yuki)
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function generateResponse(
  persona: Persona,
  userMessage: string,
  history: Message[]
) {
  const message = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 500,
    system: persona.systemPrompt,
    messages: [
      ...history.map(m => ({
        role: m.role,
        content: m.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ]
  });

  return message.content[0].text;
}
```

#### Güvenlik ve Moderasyon

```typescript
// Content moderation before sending to AI
import { moderateContent } from '@/lib/moderation';

export async function handleChatMessage(
  personaId: string,
  message: string
) {
  // 1. Moderate user input
  const moderation = await moderateContent(message);
  if (moderation.flagged) {
    return {
      error: 'Mesajınız uygunsuz içerik barındırıyor.'
    };
  }

  // 2. Get persona
  const persona = getPersonaById(personaId);

  // 3. Generate response
  const response = await generateResponse(persona, message, history);

  // 4. Log conversation (optional)
  await logConversation(personaId, message, response);

  return { message: response };
}
```

## Adult X İşbirliği

### Entegrasyon Detayları

**1. Ürün Bağlantıları**
- Her silikon bebek karakteri Adult X'teki gerçek ürünlere bağlı
- `dollFeatures.productUrl` Adult X mağazasına yönlendiriyor
- Affiliate tracking eklenebilir (gelecek)

**2. Branding**
```typescript
metadata: {
  adultXPartnership: {
    active: true,
    website: "https://adultx.com",
    commission: "affiliate"
  }
}
```

**3. Görselleştirme**
- Placeholder avatarlar kullanılıyor (şu anda)
- Gerçek ürün fotoğrafları `/public/personas/dolls/` altına eklenebilir
- Her bebek için 4+ profesyonel fotoğraf öneriliyor

## Kullanıcı Akışı

### 1. Keşif Aşaması
```
Ana Sayfa → Personalar → Kategori Seçimi (Uzmanlar/Karakterler)
```

### 2. Persona Detay
```
Persona Kartı → Detay Sayfası → Bio Okuma → Örnek Sorular → Chat Başlat
```

### 3. Sohbet Deneyimi
```
Chat Arayüzü → Soru Sor → AI Yanıtı Al → Devam Et / Kapat
```

### 4. Adult X Satın Alma (Bebekler için)
```
Bebek Profili → Özellikler İncele → "Adult X'te Satın Al" → Harici Siteye Yönlendir
```

## Ölçülebilir Metrikler

### Toplanan Veriler

1. **Persona Metrikleri**
   - `consultationCount`: Toplam sohbet sayısı
   - `rating`: Kullanıcı memnuniyeti (5 üzerinden)
   - `viewCount`: Profil görüntülenme
   - `availability`: Gerçek zamanlı durum

2. **Sohbet Metrikleri**
   - Ortalama sohbet süresi
   - Mesaj sayısı per sohbet
   - En sık sorulan sorular
   - Kullanıcı geri bildirimleri

3. **Conversion Metrikleri** (Adult X bebekler)
   - Profil → Adult X tıklama oranı
   - Hangi karakterler daha çok ilgi görüyor
   - Sohbet sonrası satın alma oranı

## Genişletme Planları

### Kısa Vadeli (1-3 ay)

1. **Gerçek AI Entegrasyonu**
   - OpenAI ve Anthropic API bağlantıları
   - Conversation history yönetimi
   - Rate limiting ve cost optimization

2. **Görsel İyileştirmeler**
   - Profesyonel avatar fotoğrafları
   - Bebek galerisi (multiple images)
   - Animasyonlar ve transitions

3. **Analytics Dashboard**
   - Admin paneli
   - Persona performans raporları
   - Kullanıcı etkileşim ısı haritaları

### Orta Vadeli (3-6 ay)

1. **Yeni Personalar**
   - **Uzmanlar**: Emily Nagoski (cinsel wellness), Ruth Westheimer
   - **Karakterler**: Erkek silikon bebekler, çift setleri
   - **Yazarlar**: Kendi makalelerini yazabilecek AI karakterler

2. **Gelişmiş AI Özellikleri**
   - Ses sentezi (text-to-speech)
   - Multi-modal (görsel analiz)
   - Kişiselleştirilmiş öneriler

3. **Sosyal Özellikler**
   - Kullanıcı yorumları ve puanlamaları
   - Favori personalar
   - Sohbet geçmişi kaydetme

### Uzun Vadeli (6+ ay)

1. **Premium Abonelik**
   - Sınırsız chat
   - Özel personalar
   - Öncelikli yanıt süreleri

2. **Mobil Uygulama**
   - Native iOS/Android apps
   - Push notifications
   - Offline mode

3. **API Marketplace**
   - Geliştiricilerin kendi AI karakterlerini eklemesi
   - Community-created personas
   - Revenue sharing

## Yasal ve Etik Hususlar

### Sorumluluk Reddi

Her sayfada şu uyarılar mevcut:

1. **AI Uyarısı**
   > "Bu bir AI botudur. Gerçek bir terapist/kişi değildir."

2. **Medikal Sorumluluk**
   > "Ciddi sağlık sorunlarınız varsa lütfen profesyonel bir uzmana danışın. AI botlar gerçek terapistlerin yerini tutmaz."

3. **18+ İçerik**
   > Tüm platform 18 yaş ve üzeri kullanıcılar içindir.

### Veri Gizliliği

- Sohbet geçmişi yerel storage'da (şu an)
- Gerçek AI entegrasyonunda GDPR/KVKK uyumlu olmalı
- Kullanıcı verilerinin anonim olarak saklanması
- İstenirse sohbet geçmişi silinebilmeli

### İçerik Moderasyonu

```typescript
// Örnek moderasyon kuralları
const BLOCKED_KEYWORDS = [
  'illegal',
  'child',
  'violence',
  // ... daha fazla
];

const FLAGGED_TOPICS = [
  'self-harm',
  'suicide',
  'abuse'
];

// Bu konularda profesyonel yardım öner
```

## Teknik Gereksinimler

### Frontend
- Next.js 15+ (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components

### Backend (Gelecek)
- Next.js API Routes veya
- Separate backend (Node.js, Python FastAPI)
- Supabase/PostgreSQL (sohbet geçmişi)
- Redis (caching, rate limiting)

### AI/ML
- OpenAI API (GPT-4)
- Anthropic API (Claude 3)
- Moderasyon servisi
- Cost tracking ve optimization

### Deployment
- Vercel (Frontend)
- Supabase (Database)
- Cloudflare (CDN, images)

## Maliyet Optimizasyonu

### AI API Maliyetleri

**OpenAI GPT-4**
- Input: $30 / 1M tokens
- Output: $60 / 1M tokens
- Ortalama sohbet: ~500 tokens
- 1000 sohbet ≈ $45

**Anthropic Claude 3 Sonnet**
- Input: $3 / 1M tokens
- Output: $15 / 1M tokens
- Ortalama sohbet: ~500 tokens
- 1000 sohbet ≈ $9

**Optimizasyon Stratejileri**:
1. Conversation history sınırla (son 10 mesaj)
2. Caching ile tekrar eden soruları önbelle
3. Basit sorular için pattern matching kullan
4. Rate limiting (kullanıcı başına günlük limit)

## Test Senaryoları

### Kullanıcı Testleri

1. **Uzman Sohbeti**
   - Dr. Seren'e cinsel sağlık sorusu sor
   - Freud'a rüya analizi yaptır
   - Jung'a arketip sorusu sor
   - Esther'a ilişki danışmanlığı al

2. **Bebek Keşfi**
   - Luna ile romantik sohbet
   - Scarlett ile enerjik konuşma
   - Yuki ile zen tartışması
   - Adult X linkine tıklama

3. **Cross-feature Test**
   - Dr. Seren'in makalelerini oku
   - Blog'dan persona profiline geç
   - İlgili personaları keşfet

## Performans Benchmarkları

- **İlk sayfa yüklenme**: < 2 saniye
- **Chat yanıt süresi**: < 3 saniye (AI ile)
- **Persona grid render**: < 500ms
- **Search/filter**: < 200ms

---

**Son Güncelleme**: 2025-01-19
**Sistem Durumu**: ✅ Production Ready (simülasyon modunda)
**AI Entegrasyonu**: 🟡 Hazır (aktif değil)
**Adult X İşbirliği**: ✅ Aktif
