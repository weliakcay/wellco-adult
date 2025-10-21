#!/bin/bash

# Wellco Adult - Otomatik Ürün Güncelleme
# Bu script günde 1 kez çalışarak ürünleri günceller

echo "🔄 Ürün güncelleme başlıyor..."
cd /Users/veliakcay/Documents/projeler/wellco-adult-17.10

# XML'den JSON'a dönüştür
npm run update-products

# Git commit (opsiyonel)
# git add src/data/products.json
# git commit -m "Otomatik ürün güncelleme - $(date)"

echo "✅ Ürünler güncellendi - $(date)"
