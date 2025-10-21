import { Product } from '@/types';

// Mock products - XML entegrasyonuna kadar kullanılacak
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'WC-VIB-001',
    title: 'Premium Vibratör',
    description: 'Yüksek kaliteli, sessiz çalışan premium vibratör. Su geçirmez tasarım.',
    price: 299.99,
    compareAtPrice: 399.99,
    categories: ['kadinlar-icin', 'vibratorler'],
    tags: ['premium', 'su-gecirmez', 'sessiz'],
    vendor: 'WellCo Select',
    images: ['/products/placeholder-1.jpg'],
    stock: 15,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    seoTitle: 'Premium Vibratör - WellCo Adult',
    seoDescription: 'Yüksek kaliteli premium vibratör'
  },
  {
    id: '2',
    sku: 'WC-VIB-002',
    title: 'G-Spot Uyarıcı',
    description: 'Anatomik tasarım ile G-spot uyarımı için özel tasarlanmış.',
    price: 249.99,
    categories: ['kadinlar-icin', 'g-spot'],
    tags: ['anatomik', 'premium'],
    vendor: 'WellCo Select',
    images: ['/products/placeholder-2.jpg'],
    stock: 20,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    sku: 'WC-MAS-001',
    title: 'Masaj Yağı - Lavanta',
    description: 'Doğal içerikli, rahatlatıcı lavanta masaj yağı.',
    price: 89.99,
    compareAtPrice: 119.99,
    categories: ['wellness-saglik', 'masaj-yaglari'],
    tags: ['dogal', 'lavanta', 'rahatlatici'],
    vendor: 'WellCo Wellness',
    images: ['/products/placeholder-3.jpg'],
    stock: 50,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    sku: 'WC-CPL-001',
    title: 'Çift Vibratörü',
    description: 'İki taraflı tasarım ile çiftler için özel. Şarj edilebilir.',
    price: 499.99,
    categories: ['ciftler-icin', 'cift-oyuncaklari'],
    tags: ['sarj-edilebilir', 'premium', 'ciftler'],
    vendor: 'WellCo Select',
    images: ['/products/placeholder-4.jpg'],
    stock: 10,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    sku: 'WC-VIB-003',
    title: 'Mini Vibratör',
    description: 'Taşınabilir, kompakt tasarım. Sessiz motor teknolojisi.',
    price: 149.99,
    categories: ['kadinlar-icin', 'vibratorler'],
    tags: ['mini', 'tasinabilir', 'sessiz'],
    vendor: 'WellCo Essential',
    images: ['/products/placeholder-5.jpg'],
    stock: 30,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    sku: 'WC-MEN-001',
    title: 'Erkek Mastürbatörü',
    description: 'Gerçekçi doku, temizlemesi kolay, su geçirmez.',
    price: 349.99,
    categories: ['erkekler-icin', 'masturba torler'],
    tags: ['gercekci', 'temizlik-kolay', 'su-gecirmez'],
    vendor: 'WellCo Select',
    images: ['/products/placeholder-6.jpg'],
    stock: 12,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    sku: 'WC-WEL-001',
    title: 'Temizlik Spreyi',
    description: 'Oyuncak temizliği için özel formül. Antibakteriyel.',
    price: 59.99,
    categories: ['wellness-saglik', 'temizlik'],
    tags: ['temizlik', 'antibakteriyel', 'hijyen'],
    vendor: 'WellCo Care',
    images: ['/products/placeholder-7.jpg'],
    stock: 100,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    sku: 'WC-VIB-004',
    title: 'Klitoris Uyarıcı',
    description: 'Hava basıncı teknolojisi ile klitoris uyarımı.',
    price: 399.99,
    compareAtPrice: 499.99,
    categories: ['kadinlar-icin', 'klitoris-uyaricilar'],
    tags: ['hava-basinci', 'teknoloji', 'premium'],
    vendor: 'WellCo Select',
    images: ['/products/placeholder-8.jpg'],
    stock: 8,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Kategori bazlı filtreleme
export const filterProductsByCategory = (category?: string): Product[] => {
  if (!category) return MOCK_PRODUCTS;
  return MOCK_PRODUCTS.filter(p => p.categories.includes(category));
};

// Fiyat aralığına göre filtreleme
export const filterProductsByPrice = (min: number, max: number): Product[] => {
  return MOCK_PRODUCTS.filter(p => p.price >= min && p.price <= max);
};

// Arama
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
