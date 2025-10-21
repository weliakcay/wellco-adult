/**
 * XML'den gelen kategorileri Wellco Adult ana kategorilerine eşler
 */

import type { Product } from '@/types';

export interface CategoryMapping {
  xmlCategory: string;
  mainCategories: string[]; // Bir ürün birden fazla ana kategoride olabilir
  priority?: number; // Ana sayfada gösterim önceliği
}

/**
 * XML Kategori → Ana Kategori Eşleştirmeleri
 *
 * mainCategories değerleri:
 * - "kadinlar-icin": Kadınlar İçin
 * - "erkekler-icin": Erkekler İçin
 * - "ciftler-icin": Çiftler İçin
 * - "wellness-saglik": Wellness & Sağlık
 */
export const CATEGORY_MAPPINGS: CategoryMapping[] = [
  // KADINLAR İÇİN
  {
    xmlCategory: "Rabbit Vibratörler",
    mainCategories: ["kadinlar-icin"],
    priority: 10
  },
  {
    xmlCategory: "Klitoris Vibratörler",
    mainCategories: ["kadinlar-icin"],
    priority: 9
  },
  {
    xmlCategory: "G Noktası Uyarıcı Vibratörler",
    mainCategories: ["kadinlar-icin"],
    priority: 9
  },
  {
    xmlCategory: "Mini Vibratörler",
    mainCategories: ["kadinlar-icin"],
    priority: 8
  },
  {
    xmlCategory: "Masaj Vibratörler",
    mainCategories: ["kadinlar-icin", "wellness-saglik"],
    priority: 7
  },
  {
    xmlCategory: "Emiş Vibratörler",
    mainCategories: ["kadinlar-icin"],
    priority: 8
  },
  {
    xmlCategory: "Giyilebilen Vibratörler",
    mainCategories: ["kadinlar-icin", "ciftler-icin"],
    priority: 7
  },
  {
    xmlCategory: "Hareketli Vibratörler",
    mainCategories: ["kadinlar-icin"],
    priority: 6
  },
  {
    xmlCategory: "Telefon Kontrollü Vibratörler",
    mainCategories: ["kadinlar-icin", "ciftler-icin"],
    priority: 9
  },
  {
    xmlCategory: "Uzaktan Kumandalı Vibratörler",
    mainCategories: ["kadinlar-icin", "ciftler-icin"],
    priority: 8
  },
  {
    xmlCategory: "Kegel Egzersiz Ürünleri",
    mainCategories: ["kadinlar-icin", "wellness-saglik"],
    priority: 6
  },
  {
    xmlCategory: "Göğüs Ürünleri & Uyarıcılar",
    mainCategories: ["kadinlar-icin", "ciftler-icin"],
    priority: 5
  },
  {
    xmlCategory: "Göğüs Klipsleri",
    mainCategories: ["kadinlar-icin", "ciftler-icin"],
    priority: 4
  },
  {
    xmlCategory: "LÜKS VİBRATÖR",
    mainCategories: ["kadinlar-icin"],
    priority: 10
  },

  // ERKEKLER İÇİN
  {
    xmlCategory: "Realistik Penisler",
    mainCategories: ["kadinlar-icin", "erkekler-icin"], // Hem kadınlar hem pasif erkekler
    priority: 9
  },
  {
    xmlCategory: "Hareketli Penisler",
    mainCategories: ["kadinlar-icin", "erkekler-icin"],
    priority: 8
  },
  {
    xmlCategory: "Titreşimli Penisler",
    mainCategories: ["kadinlar-icin", "erkekler-icin"],
    priority: 8
  },
  {
    xmlCategory: "Çift Başlı Penisler",
    mainCategories: ["kadinlar-icin", "erkekler-icin", "ciftler-icin"],
    priority: 7
  },
  {
    xmlCategory: "Jel Dokulu Penisler",
    mainCategories: ["kadinlar-icin", "erkekler-icin"],
    priority: 6
  },
  {
    xmlCategory: "Cep Tipi Mastürbatörler",
    mainCategories: ["erkekler-icin"],
    priority: 10
  },
  {
    xmlCategory: "Otomatik Mastürbatörler",
    mainCategories: ["erkekler-icin"],
    priority: 10
  },
  {
    xmlCategory: "Anal & Oral Mastürbatörler",
    mainCategories: ["erkekler-icin"],
    priority: 9
  },
  {
    xmlCategory: "Gövde Mastürbatörler",
    mainCategories: ["erkekler-icin"],
    priority: 8
  },
  {
    xmlCategory: "Kalça Mastürbatörler",
    mainCategories: ["erkekler-icin"],
    priority: 8
  },
  {
    xmlCategory: "Ayak Mastürbatörler",
    mainCategories: ["erkekler-icin"],
    priority: 6
  },
  {
    xmlCategory: "Premium Sucking Masturbator Serisi",
    mainCategories: ["erkekler-icin"],
    priority: 10
  },
  {
    xmlCategory: "Premium Torso Masturbator Serisi",
    mainCategories: ["erkekler-icin"],
    priority: 10
  },
  {
    xmlCategory: "Penis Halkaları",
    mainCategories: ["erkekler-icin", "ciftler-icin"],
    priority: 8
  },
  {
    xmlCategory: "Penis Kılıfları",
    mainCategories: ["erkekler-icin", "ciftler-icin"],
    priority: 7
  },
  {
    xmlCategory: "PENİS POMPASI",
    mainCategories: ["erkekler-icin", "wellness-saglik"],
    priority: 7
  },
  {
    xmlCategory: "Prostat Masaj Vibratörler",
    mainCategories: ["erkekler-icin", "wellness-saglik"],
    priority: 9
  },

  // ÇİFTLER İÇİN
  {
    xmlCategory: "BELDEN BAĞLAMALI",
    mainCategories: ["ciftler-icin"],
    priority: 9
  },
  {
    xmlCategory: "Seks Makineleri & Yatakları",
    mainCategories: ["ciftler-icin"],
    priority: 10
  },
  {
    xmlCategory: "Realistik Mankenler",
    mainCategories: ["erkekler-icin", "ciftler-icin"],
    priority: 7
  },
  {
    xmlCategory: "Şişme Kadın Mankenler",
    mainCategories: ["erkekler-icin"],
    priority: 6
  },
  {
    xmlCategory: "Erkek ve Trans Mankenler",
    mainCategories: ["kadinlar-icin", "erkekler-icin"],
    priority: 6
  },

  // FETİŞ & FANTAZI (Çiftler)
  {
    xmlCategory: "FETİŞ ÜRÜNLER",
    mainCategories: ["ciftler-icin"],
    priority: 7
  },
  {
    xmlCategory: "FANTEZİ GİYİM",
    mainCategories: ["ciftler-icin"],
    priority: 8
  },
  {
    xmlCategory: "Fetiş & Fantezi Setler",
    mainCategories: ["ciftler-icin"],
    priority: 7
  },
  {
    xmlCategory: "Kelepçeler",
    mainCategories: ["ciftler-icin"],
    priority: 6
  },
  {
    xmlCategory: "Kırbaçlar & Kamçılar",
    mainCategories: ["ciftler-icin"],
    priority: 5
  },
  {
    xmlCategory: "Maske & Ağız Topları",
    mainCategories: ["ciftler-icin"],
    priority: 5
  },
  {
    xmlCategory: "Penis Kilitleri & Kafesleri",
    mainCategories: ["ciftler-icin"],
    priority: 6
  },
  {
    xmlCategory: "Cross-dressing Serisi",
    mainCategories: ["ciftler-icin"],
    priority: 5
  },

  // ANAL ÜRÜNLER (Hem kadın hem erkek)
  {
    xmlCategory: "Silikon Anal Pluglar",
    mainCategories: ["kadinlar-icin", "erkekler-icin", "ciftler-icin"],
    priority: 7
  },
  {
    xmlCategory: "Metal Anal Pluglar",
    mainCategories: ["kadinlar-icin", "erkekler-icin", "ciftler-icin"],
    priority: 6
  },
  {
    xmlCategory: "Cam Anal Pluglar",
    mainCategories: ["kadinlar-icin", "erkekler-icin", "ciftler-icin"],
    priority: 6
  },
  {
    xmlCategory: "Titreşimli Anal Pluglar",
    mainCategories: ["kadinlar-icin", "erkekler-icin", "ciftler-icin"],
    priority: 8
  },
  {
    xmlCategory: "Kuyruklu Anal Pluglar",
    mainCategories: ["ciftler-icin"],
    priority: 7
  },
  {
    xmlCategory: "Anal Plug Setler",
    mainCategories: ["kadinlar-icin", "erkekler-icin"],
    priority: 6
  },

  // WELLNESS & SAĞLIK
  {
    xmlCategory: "Kayganlaştırıcı Jeller",
    mainCategories: ["wellness-saglik"],
    priority: 10
  },
  {
    xmlCategory: "Masaj Yağları",
    mainCategories: ["wellness-saglik", "ciftler-icin"],
    priority: 8
  },
  {
    xmlCategory: "Anal Temizleme",
    mainCategories: ["wellness-saglik"],
    priority: 7
  },
  {
    xmlCategory: "Afrodizyak Parfümler",
    mainCategories: ["wellness-saglik", "ciftler-icin"],
    priority: 6
  },
  {
    xmlCategory: "Damlalar",
    mainCategories: ["wellness-saglik"],
    priority: 5
  },

  // ÖZEL SERİLER
  {
    xmlCategory: "NEON ELITE Glow in the Dark Serisi",
    mainCategories: ["kadinlar-icin", "ciftler-icin"],
    priority: 8
  },
  {
    xmlCategory: "MYST COLOR Dildo Serisi",
    mainCategories: ["kadinlar-icin", "erkekler-icin"],
    priority: 7
  },
  {
    xmlCategory: "Pride Special Edition Dildo Serisi",
    mainCategories: ["kadinlar-icin", "erkekler-icin", "ciftler-icin"],
    priority: 8
  },
  {
    xmlCategory: "UNIQUE Realistic Cock Serisi",
    mainCategories: ["kadinlar-icin", "erkekler-icin"],
    priority: 7
  },
  {
    xmlCategory: "Foreskin Perfection Dildo Serisi",
    mainCategories: ["kadinlar-icin", "erkekler-icin"],
    priority: 6
  },
];

/**
 * XML kategorisine göre ana kategorileri döndürür
 */
export function getMainCategoriesForXmlCategory(xmlCategory: string): string[] {
  const mapping = CATEGORY_MAPPINGS.find(m => m.xmlCategory === xmlCategory);
  return mapping?.mainCategories || [];
}

/**
 * Ürünün hangi ana kategorilerde gösterileceğini belirler
 */
export function getMainCategoriesForProduct(productCategories: string[]): string[] {
  const mainCategories = new Set<string>();

  productCategories.forEach(xmlCategory => {
    const categories = getMainCategoriesForXmlCategory(xmlCategory);
    categories.forEach(cat => mainCategories.add(cat));
  });

  return Array.from(mainCategories);
}

/**
 * Ana kategoriye göre öncelik sırasıyla ürünleri filtrele
 */
export function filterProductsByMainCategory(
  products: Product[],
  mainCategory: string
): Product[] {
  return products
    .filter(product => {
      const mainCats = getMainCategoriesForProduct(product.categories);
      return mainCats.includes(mainCategory);
    })
    .sort((a, b) => {
      // Priority'ye göre sırala
      const aPriority = CATEGORY_MAPPINGS.find(m =>
        a.categories.includes(m.xmlCategory)
      )?.priority || 0;
      const bPriority = CATEGORY_MAPPINGS.find(m =>
        b.categories.includes(m.xmlCategory)
      )?.priority || 0;
      return bPriority - aPriority;
    });
}
