const https = require('https');
const fs = require('fs');
const path = require('path');
const { parseStringPromise } = require('xml2js');

// XML URL
const XML_URL = 'https://www.erotikshoptoptan.com/xml.php?c=shopphp&xmlc=32587688a7';

// Fiyat çarpanları (kar marjı için)
const PRICE_MULTIPLIER = 1.5; // %50 kar marjı
const COMPARE_PRICE_MULTIPLIER = 1.3; // İndirimli fiyat görünümü için

/**
 * XML'i indir
 */
function downloadXML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * HTML etiketlerini temizle
 */
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Ürün görsellerini topla
 */
function collectImages(urun) {
  const images = [];
  for (let i = 1; i <= 10; i++) {
    const imageKey = `urun_resim${i}`;
    if (urun[imageKey] && urun[imageKey][0] && urun[imageKey][0].trim()) {
      images.push(urun[imageKey][0].trim());
    }
  }
  return images;
}

/**
 * Fiyat hesapla (USD -> TRY)
 */
function calculatePrice(usdPrice) {
  // XML'deki TL fiyatını kullan veya USD'den çevir
  const usdValue = parseFloat(usdPrice) || 0;
  // Döviz kuru yaklaşık 41.9 (XML'de TL fiyatı da var)
  return usdValue * 41.9 * PRICE_MULTIPLIER;
}

/**
 * Ürünü JSON formatına dönüştür
 */
function convertProduct(urun, index) {
  const urunAd = urun.urun_ad ? urun.urun_ad[0] : '';
  const urunAciklama = urun.urun_aciklama ? urun.urun_aciklama[0] : '';
  const urunKategori = urun.urun_kategori_ad ? urun.urun_kategori_ad[0] : '';
  const urunKod = urun.urun_kod ? urun.urun_kod[0] : '';
  const urunFiyat = urun.urun_fiyat ? parseFloat(urun.urun_fiyat[0]) : 0;
  const urunStok = urun.urun_stok ? parseInt(urun.urun_stok[0]) : 0;
  const urunMarka = urun.urun_marka_ad ? urun.urun_marka_ad[0] : 'Unknown';

  // Fiyat hesaplama
  const price = calculatePrice(urunFiyat);
  const compareAtPrice = price * COMPARE_PRICE_MULTIPLIER;

  // Görselleri topla
  const images = collectImages(urun);

  // Tags oluştur
  const tags = ['premium', 'optimize-edilmis'];
  if (urunStok > 0) tags.push('stokta');
  if (images.length > 0) tags.push('resimli');

  return {
    id: `${Date.now()}-${index}`,
    sku: urunKod,
    title: `Wellco Adult ${urunAd}`,
    description: urunAciklama + '\n\n🌟 Wellco Adult Güvencesi ile\n✅ Hızlı ve Gizli Kargo\n✅ Orijinal Ürün Garantisi\n✅ 7/24 Müşteri Desteği',
    price: parseFloat(price.toFixed(2)),
    compareAtPrice: parseFloat(compareAtPrice.toFixed(2)),
    categories: [urunKategori],
    tags: tags,
    vendor: 'Wellco Adult',
    images: images,
    stock: urunStok,
    isActive: true,
    seoTitle: `Wellco Adult ${urunAd} | Wellco Adult`,
    seoDescription: stripHtml(urunAciklama).substring(0, 160) + '...'
  };
}

/**
 * Ana fonksiyon
 */
async function main() {
  try {
    console.log('📥 XML indiriliyor...');
    const xmlData = await downloadXML(XML_URL);

    console.log('🔄 XML parse ediliyor...');
    const result = await parseStringPromise(xmlData);

    const urunler = result.urunler.urun;
    console.log(`✅ ${urunler.length} ürün bulundu`);

    console.log('🔧 Ürünler dönüştürülüyor...');
    const products = urunler.map((urun, index) => convertProduct(urun, index));

    // JSON oluştur
    const output = {
      products: products,
      metadata: {
        generatedAt: new Date().toISOString(),
        totalProducts: products.length,
        xmlSource: XML_URL
      }
    };

    // Dosyaya yaz
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');

    console.log(`✅ JSON başarıyla oluşturuldu: ${outputPath}`);
    console.log(`📊 İstatistikler:`);
    console.log(`   - Toplam ürün: ${products.length}`);
    console.log(`   - Görselli ürün: ${products.filter(p => p.images.length > 0).length}`);
    console.log(`   - Stokta ürün: ${products.filter(p => p.stock > 0).length}`);

    // Örnek bir ürün göster
    console.log('\n📦 Örnek ürün:');
    console.log(JSON.stringify(products[0], null, 2));

  } catch (error) {
    console.error('❌ Hata oluştu:', error);
    process.exit(1);
  }
}

// Scripti çalıştır
main();
