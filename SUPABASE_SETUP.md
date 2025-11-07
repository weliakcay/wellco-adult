# Supabase Setup Guide - Wellco Adult

## 🚀 Adım 1: Supabase Hesabınızdan Bilgileri Alın

### 1.1 Supabase Dashboard'a Gidin
- https://supabase.com/dashboard
- Projenizi seçin (veya yeni bir proje oluşturun)

### 1.2 API Credentials'ları Alın
**Konum:** Settings → API

Şu 2 bilgiyi kopyalayın:
```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 1.3 .env.local Dosyasını Güncelleyin
`.env.local` dosyanızı açın ve şu satırları değiştirin:

```env
# Supabase Configuration (GERÇEK BİLGİLERİNİZİ GİRİN)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Product Configuration (MEVCUT)
PRODUCTS_XML_URL=https://www.erotikshoptoptan.com/xml.php?c=shopphp&xmlc=32587688a7
PRODUCT_PRICE_MULTIPLIER=1.5
PRODUCT_COMPARE_MULTIPLIER=1.3
PRODUCT_USD_TO_TRY=41.9
PRODUCTS_REVALIDATE_SECONDS=3600

# Email Notifications (İLERİDE EKLENECEK)
# RESEND_API_KEY=re_xxxxxxxxxxxxx
# ADMIN_EMAIL=info@wellcoadult.com

# Payment Gateway (İLERİDE EKLENECEK)
# IYZICO_API_KEY=xxxxx
# IYZICO_SECRET_KEY=xxxxx
```

---

## 🗄️ Adım 2: Database Migration'ları Çalıştırın

### 2.1 Supabase SQL Editor'e Gidin
**Konum:** SQL Editor → New query

### 2.2 İlk Migration'ı Çalıştırın
- `supabase/migrations/001_initial_schema.sql` dosyasını açın
- İçeriği kopyalayın
- SQL Editor'e yapıştırın
- **RUN** butonuna tıklayın

### 2.3 İkinci Migration'ı Çalıştırın
- `supabase/migrations/002_contact_and_notifications.sql` dosyasını açın
- İçeriği kopyalayın
- SQL Editor'e yapıştırın
- **RUN** butonuna tıklayın

### 2.4 Tabloların Oluştuğunu Kontrol Edin
**Konum:** Table Editor

Şu tabloları görmelisiniz:
- ✅ users
- ✅ orders
- ✅ products
- ✅ categories
- ✅ blog_posts
- ✅ ai_personas
- ✅ newsletter_subscribers
- ✅ contact_messages ⭐ YENİ
- ✅ analytics_events ⭐ YENİ
- ✅ product_reviews ⭐ YENİ
- ✅ admin_notifications ⭐ YENİ

---

## 🔐 Adım 3: Authentication (Email/Şifre) Ayarları

### 3.1 Auth Providers'ı Aktif Edin
**Konum:** Authentication → Providers

- ✅ **Email** - Aktif olmalı (default açık)
- ⚙️ **Confirm email** - İsterseniz açabilirsiniz (email doğrulama)
- ⚙️ **Secure email change** - Önerilir

### 3.2 Email Templates (Opsiyonel)
**Konum:** Authentication → Email Templates

Şunları özelleştirebilirsiniz:
- Confirm signup (Kayıt onayı)
- Reset password (Şifre sıfırlama)
- Magic Link

---

## 📊 Adım 4: Veri Akışı Nasıl Çalışacak?

### 4.1 Kullanıcı Kaydı
```
KULLANICI → Register Form → Supabase Auth → users tablosu
                                              ↓
                                         Email onayı (opsiyonel)
```

### 4.2 Sipariş Süreci
```
Sepete Ekle → Checkout → Form Doldur → Ödeme Sayfası → Başarılı
                                                           ↓
                                                    orders tablosu
                                                           ↓
                                                  admin_notifications
                                                           ↓
                                                    Size email/SMS
```

### 4.3 İletişim Formu
```
Form Doldur → Submit → contact_messages tablosu
                              ↓
                       admin_notifications
                              ↓
                         Size email/SMS
```

---

## 🔔 Adım 5: Bildirim Sistemi (Size Nasıl Gelecek?)

### Seçenek A: Email Bildirimleri (Basit - ÖNERİLEN)

**Resend.com** kullanacağız (Ücretsiz 3000 email/ay):

1. https://resend.com → Hesap aç
2. API Key al
3. `.env.local` dosyasına ekle:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=sizinemail@gmail.com
```

**Otomatik bildirimler:**
- ✅ Yeni sipariş geldiğinde
- ✅ Yeni mesaj geldiğinde
- ✅ Ödeme onaylandığında

### Seçenek B: WhatsApp Bildirimleri

**Twilio** veya **WhatsApp Business API**:
- Daha gelişmiş
- Aylık maliyet var
- İstenirse kurulabilir

### Seçenek C: Admin Dashboard

**Gerçek zamanlı panel:**
- Siparişleri görüntüleyin
- Mesajları okuyun
- Bildirim sayısı göster
- Supabase Realtime ile anlık güncellemeler

---

## 🛒 Adım 6: Ödeme Entegrasyonu

### Türkiye için Sanal POS Önerileri:

**1. iyzico (ÖNERİLEN)**
- Kolay entegrasyon
- 3D Secure desteği
- Taksit seçenekleri
- Komisyon: ~2.5%

**2. PayTR**
- Alternatif
- Benzer özellikler

**3. Stripe**
- Uluslararası kartlar
- Daha düşük komisyon
- Türk kartları için sınırlı

### Ödeme Akışı:
```
Checkout → Ödeme Butonu → iyzico Sayfası → Ödeme
                                                ↓
                                          Callback URL
                                                ↓
                                        orders tablosu güncelle
                                                ↓
                                          Size bildirim
```

---

## 📱 Adım 7: Admin Panel (Siparişleri Görmek İçin)

### Seçenek A: Supabase Dashboard (Hızlı Başlangıç)
- Table Editor → orders
- Manual olarak görüntüleyin
- Basit ama yeterli

### Seçenek B: Özel Admin Sayfası (Daha Profesyonel)
- `/admin` rotası
- Password protected
- Sipariş listesi
- Mesaj listesi
- Gerçek zamanlı bildirimler

---

## ✅ Kurulum Checklist

### Şimdi Yapılacaklar:
- [ ] Supabase Project URL ve Anon Key al
- [ ] `.env.local` dosyasını güncelle
- [ ] Migration'ları çalıştır (SQL Editor)
- [ ] Auth Provider'ı kontrol et (Email aktif mi?)

### Kod Tarafında Yapılacaklar (Ben Halledeceğim):
- [ ] Auth sayfaları oluştur (Login/Register)
- [ ] Auth Context ekle
- [ ] Protected routes ekle
- [ ] Checkout'u Supabase'e bağla
- [ ] İletişim formunu ekle
- [ ] Basit admin paneli

### İleride Yapılacaklar:
- [ ] Email bildirimleri (Resend)
- [ ] Ödeme entegrasyonu (iyzico)
- [ ] SMS bildirimleri (opsiyonel)
- [ ] Ürün yorumları sistemi

---

## 🆘 Sorun mu Var?

### Test Etmek İçin:
```bash
npm run dev
```

### Supabase Bağlantısını Test Et:
- Browser Console'u açın
- Network tab'ında supabase.co istekleri görmeli
- Hata varsa konsola bakın

---

## 📞 Sonraki Adım

Supabase credentials'larını aldıktan sonra bana söyleyin, kodlamaya başlayalım! 🚀
