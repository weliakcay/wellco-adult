import { Parser } from 'xml2js';
import type { Product } from '@/types';

const DEFAULT_XML_URL =
  process.env.PRODUCTS_XML_URL ??
  'https://www.erotikshoptoptan.com/xml.php?c=shopphp&xmlc=32587688a7';

const PRICE_MULTIPLIER = Number(process.env.PRODUCT_PRICE_MULTIPLIER ?? 1.5);
const COMPARE_PRICE_MULTIPLIER = Number(process.env.PRODUCT_COMPARE_MULTIPLIER ?? 1.3);
const USD_TO_TRY_RATE = Number(process.env.PRODUCT_USD_TO_TRY ?? 41.9);

type RawXmlProduct = Record<string, unknown>;

const imageKeys = Array.from({ length: 10 }, (_, index) => `urun_resim${index + 1}`);

function getFirstValue(value: unknown, fallback = ''): string {
  if (Array.isArray(value) && value.length > 0) {
    const entry = value[0];
    if (typeof entry === 'string') return entry;
    if (entry != null) return String(entry);
  }
  if (typeof value === 'string') return value;
  if (value != null) return String(value);
  return fallback;
}

function sanitizeXml(input: string): string {
  return input.replace(/&(?![#a-zA-Z0-9]+;)/g, '&amp;');
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function collectImages(raw: RawXmlProduct): string[] {
  return imageKeys
    .map((key) => getFirstValue(raw[key], ''))
    .filter((src) => src && src.trim().length > 0);
}

function parsePrice(raw: RawXmlProduct): number {
  const tlPrice = Number(getFirstValue(raw.urun_fiyat_TL, '0'));
  if (tlPrice > 0) {
    return tlPrice * PRICE_MULTIPLIER;
  }

  const usdPrice = Number(getFirstValue(raw.urun_fiyat, '0'));
  if (usdPrice > 0) {
    return usdPrice * USD_TO_TRY_RATE * PRICE_MULTIPLIER;
  }

  return 0;
}

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function toProduct(raw: RawXmlProduct, index: number): Product {
  const now = new Date();
  const rawId = getFirstValue(raw.urun_id, '').trim();
  const sku = getFirstValue(raw.urun_kod, '').trim();
  const baseTitle = getFirstValue(raw.urun_ad, '').trim();
  const descriptionRaw = getFirstValue(raw.urun_aciklama, '').trim();
  const category = getFirstValue(raw.urun_kategori_ad, '').trim();
  const price = parsePrice(raw);
  const compareAtPrice = price > 0 ? price * COMPARE_PRICE_MULTIPLIER : undefined;
  const stock = Number(getFirstValue(raw.urun_stok, '0')) || 0;
  const isActive = getFirstValue(raw.urun_aktif, '1') === '1';

  const images = collectImages(raw);

  const tags = ['premium', 'optimize-edilmis'];
  if (stock > 0) tags.push('stokta');
  if (images.length > 0) tags.push('resimli');

  const title = baseTitle ? `Wellco Adult ${baseTitle}` : 'Wellco Adult Ürün';
  const identifierBase = rawId || sku || baseTitle || `urun-${index}`;
  const id = slugify(identifierBase) || `urun-${index}`;
  const normalizedSku = sku || `SKU-${id}`;

  return {
    id,
    sku: normalizedSku,
    title,
    description:
      descriptionRaw +
      '\n\n🌟 Wellco Adult Güvencesi ile\n✅ Hızlı ve Gizli Kargo\n✅ Orijinal Ürün Garantisi\n✅ 7/24 Müşteri Desteği',
    price: Number(price.toFixed(2)),
    compareAtPrice: compareAtPrice ? Number(compareAtPrice.toFixed(2)) : undefined,
    categories: category ? [category] : [],
    tags,
    vendor: 'Wellco Adult',
    images,
    stock,
    isActive,
    createdAt: now,
    updatedAt: now,
    seoTitle: `${title} | Wellco Adult`,
    seoDescription: `${stripHtml(descriptionRaw).substring(0, 160)}...`,
  };
}

export async function fetchProductsFromXml(): Promise<Product[]> {
  const response = await fetch(DEFAULT_XML_URL, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`XML product feed request failed with status ${response.status}`);
  }

  const xmlData = await response.text();
  const sanitizedXml = sanitizeXml(xmlData);
  const parser = new Parser({ explicitArray: true, strict: false });
  const parsed = await parser.parseStringPromise(sanitizedXml);

  const rawProducts = parsed?.urunler?.urun;
  if (!Array.isArray(rawProducts)) {
    return [];
  }

  return rawProducts.map((urun, index) => toProduct(urun as RawXmlProduct, index));
}
