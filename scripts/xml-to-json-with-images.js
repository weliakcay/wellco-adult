const fs = require('fs');
const https = require('https');
const xml2js = require('xml2js');

// XML'i fetch et
const XML_URL = 'https://www.erotikshoptoptan.com/xml.php?c=shopphp&xmlc=32587688a7';

console.log('XML verisi çekiliyor...');

https.get(XML_URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('XML verisi alındı, parse ediliyor...');

    const parser = new xml2js.Parser();
    parser.parseString(data, (err, result) => {
      if (err) {
        console.error('XML parse hatası:', err);
        return;
      }

      const products = result.urunler.urun.map((urun, index) => {
        // Görselleri topla
        const images = [];
        for (let i = 1; i <= 10; i++) {
          const imageKey = `urun_resim${i}`;
          if (urun[imageKey] && urun[imageKey][0]) {
            images.push(urun[imageKey][0]);
          }
        }

        // Kategorileri parse et
        const categories = [];
        if (urun.urun_kategori_ad && urun.urun_kategori_ad[0]) {
          categories.push(urun.urun_kategori_ad[0]);
        }

        // Fiyat hesapla (wholesale price * 1.5 kar marjı)
        const wholesalePrice = parseFloat(urun.urun_fiyat_TL[0]) || 0;
        const price = Math.round(wholesalePrice * 1.5 * 100) / 100;
        const compareAtPrice = Math.round(price * 1.3 * 100) / 100; // %30 daha yüksek görünen fiyat

        // Stok
        const stock = parseInt(urun.urun_stok[0]) || 0;

        // Tags
        const tags = ['premium', 'optimize-edilmis'];
        if (stock > 0) tags.push('stokta');

        return {
          id: `${Date.now()}-${index}`,
          sku: urun.urun_kod[0],
          title: `Wellco Adult ${urun.urun_ad[0]}`,
          description: `${urun.urun_aciklama[0]}\n\n🌟 Wellco Adult Güvencesi ile\n✅ Hızlı ve Gizli Kargo\n✅ Orijinal Ürün Garantisi\n✅ 7/24 Müşteri Desteği`,
          price,
          compareAtPrice,
          categories,
          tags,
          vendor: 'Wellco Adult',
          images, // GÖRSELLER EKLENDİ!
          stock,
          isActive: urun.urun_aktif[0] === '1',
          seoTitle: `Wellco Adult ${urun.urun_ad[0]} | Wellco Adult`,
          seoDescription: urun.urun_aciklama[0].substring(0, 160) + '...'
        };
      });

      const output = {
        products,
        lastUpdated: new Date().toISOString(),
        totalProducts: products.length
      };

      // JSON dosyasına kaydet
      const outputPath = './src/data/products.json';
      fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

      console.log(`✅ ${products.length} ürün başarıyla kaydedildi!`);
      console.log(`📁 Dosya: ${outputPath}`);
      console.log(`🖼️  Toplam ${products.reduce((sum, p) => sum + p.images.length, 0)} görsel eklendi!`);
    });
  });
}).on('error', (err) => {
  console.error('Hata:', err.message);
});
