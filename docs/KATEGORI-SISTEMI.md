# 📚 Wellco Adult - Kategori Sistemi Dokümantasyonu

## 🎯 Sistem Yapısı

```
XML (Depo Kategorileri)
    ↓
Category Mapping (Eşleştirme)
    ↓
Ana Kategoriler (Kadınlar, Erkekler, Çiftler, Wellness)
```

---

## 📊 Veri Akışı

### 1. XML'den Veriler (Otomatik DEĞİL - Manuel Güncelleme)

```bash
# Ürünleri güncelle
npm run update-products
```

Bu komut:
- ✅ XML'i indirir
- ✅ Görselleri toplar
- ✅ Fiyatları hesaplar
- ✅ JSON'a kaydeder
- ❌ Otomatik ÇALIŞMAZ (manuel)

### 2. Otomatik Güncelleme (Opsiyonel)

Günde 1 kez otomatik güncelleme için:

**macOS/Linux:**
```bash
# Crontab'ı aç
crontab -e

# Bu satırı ekle (Her gün saat 03:00'te çalışır)
0 3 * * * cd /Users/veliakcay/Documents/projeler/wellco-adult-17.10 && npm run update-products
```

**Windows:**
- Task Scheduler kullanın
- Script: `scripts/auto-update-products.sh`

---

## 🏷️ Kategori Sistemi

### Ana Kategoriler

1. **Kadınlar İçin** (`kadinlar-icin`)
   - Vibratörler (Rabbit, Klitoris, G-Noktası, Mini)
   - Kegel Ürünleri
   - Göğüs Ürünleri

2. **Erkekler İçin** (`erkekler-icin`)
   - Mastürbatörler (Cep, Otomatik, Gövde, Kalça)
   - Penis Halkaları & Kılıfları
   - Penis Pompası
   - Prostat Masaj

3. **Çiftler İçin** (`ciftler-icin`)
   - Belden Bağlamalı
   - Seks Makineleri
   - Fetiş & Fantezi
   - Uzaktan Kumandalı Ürünler

4. **Wellness & Sağlık** (`wellness-saglik`)
   - Kayganlaştırıcılar
   - Masaj Yağları
   - Temizlik Ürünleri
   - Afrodizyak Parfümler

### XML Kategorisi → Ana Kategori Eşleştirmesi

Dosya: `src/data/category-mapping.ts`

**Örnek:**
```typescript
{
  xmlCategory: "Rabbit Vibratörler",
  mainCategories: ["kadinlar-icin"],
  priority: 10
}
```

**Birden Fazla Ana Kategori:**
```typescript
{
  xmlCategory: "Telefon Kontrollü Vibratörler",
  mainCategories: ["kadinlar-icin", "ciftler-icin"],
  priority: 9
}
```

---

## 🔧 Kategori Ekleme/Düzenleme

### Yeni XML Kategorisi Eklemek

1. `src/data/category-mapping.ts` dosyasını açın
2. `CATEGORY_MAPPINGS` dizisine yeni eşleştirme ekleyin:

```typescript
{
  xmlCategory: "Yeni Kategori Adı", // XML'den gelen tam isim
  mainCategories: ["kadinlar-icin"], // Hangi ana kategoride?
  priority: 8 // Öncelik (10=en yüksek, 1=en düşük)
}
```

### Öncelik Sistemi

- **10**: Premium/Ana ürünler (Lüks Vibratörler, Otomatik Mastürbatörler)
- **9**: Popüler ürünler (Rabbit, Klitoris, Cep Tipi)
- **8**: Standart ürünler (Mini Vibratörler, Penis Halkaları)
- **7-5**: Niş ürünler
- **1-4**: Aksesuar ürünler

---

## 📈 Stok Yönetimi

### Şu Anki Durum

- ❌ **Stoklar otomatik güncellenmiyor**
- ✅ XML'de stok bilgisi var
- ✅ `npm run update-products` ile manuel güncelleme

### Otomatik Stok Takibi İçin

**Seçenek 1: Cron Job (Önerilen)**
```bash
# Her gün saat 03:00
0 3 * * * cd /path/to/project && npm run update-products
```

**Seçenek 2: API Entegrasyonu (Gelecek)**
- XML'i direkt okuma
- Real-time stok güncellemesi
- Webhook desteği

---

## 🎨 Kullanım Örnekleri

### Ana Kategoriye Göre Ürün Filtreleme

```typescript
import { filterProductsByMainCategory } from '@/data/category-mapping';
import { ALL_PRODUCTS } from '@/data/products';

// Kadınlar için ürünleri getir
const womenProducts = filterProductsByMainCategory(
  ALL_PRODUCTS,
  'kadinlar-icin'
);

// Çiftler için ürünleri getir
const coupleProducts = filterProductsByMainCategory(
  ALL_PRODUCTS,
  'ciftler-icin'
);
```

### Ürünün Ana Kategorilerini Bulma

```typescript
import { getMainCategoriesForProduct } from '@/data/category-mapping';

const product = {
  categories: ["Telefon Kontrollü Vibratörler"]
};

const mainCats = getMainCategoriesForProduct(product.categories);
// Sonuç: ["kadinlar-icin", "ciftler-icin"]
```

---

## 🚀 Performans

### JSON Dosya Boyutu
- **1,130 ürün** ≈ 3MB
- Görseller remote (erotikshoptoptan.com)
- Hızlı yükleme için memoization kullanılıyor

### Optimizasyon Önerileri
1. ✅ `useMemo` kullanımı (products.ts)
2. ✅ Category mapping cache
3. 🔄 **Gelecek**: Server-side caching
4. 🔄 **Gelecek**: CDN entegrasyonu

---

## 📝 Notlar

### Kategori İsimlendirme
- XML kategorileri **AYNEN** kullanılmalı (büyük/küçük harf önemli!)
- Ana kategori slug'ları: kebab-case (`kadinlar-icin`)
- Görünen isimler: Title Case (`Kadınlar İçin`)

### Güncelleme Sıklığı
- **Önerilen**: Günde 1 kez (gece 03:00)
- **Minimum**: Haftada 2 kez
- **Acil**: Manuel `npm run update-products`

### Görsel Optimizasyonu
- Next.js Image kullanılıyor
- Otomatik WebP dönüşümü
- Lazy loading aktif
- Remote pattern: `www.erotikshoptoptan.com/images/urunler/**`

---

## ❓ SSS

**S: Yeni bir XML kategorisi gelirse ne olur?**
C: `category-mapping.ts` dosyasına eklenmeli. Yoksa ürün hiçbir ana kategoride görünmez.

**S: Stoklar ne sıklıkla güncellenmeli?**
C: Günde 1 kez yeterli. Cron job kurabilirsiniz.

**S: Bir ürün birden fazla ana kategoride olabilir mi?**
C: Evet! `mainCategories` array'ine birden fazla kategori ekleyin.

**S: Görseller nerede barındırılıyor?**
C: `erotikshoptoptan.com` üzerinde. Next.js Image ile optimize ediliyor.

**S: Fiyatlar nasıl hesaplanıyor?**
C: XML USD fiyatı × Döviz kuru (41.9) × Kar marjı (1.5)

---

## 📞 Destek

Sorunlar için:
- `scripts/xml-to-json.js` - XML dönüşüm kodu
- `src/data/category-mapping.ts` - Kategori eşleştirmesi
- `src/data/products.ts` - Ürün fonksiyonları
