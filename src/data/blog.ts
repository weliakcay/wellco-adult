import { BlogPost } from '@/types';
import blogData from './blog-posts.json';

// JSON'dan gelen blog yazılarını BlogPost tipine dönüştür
export const ALL_BLOG_POSTS: BlogPost[] = blogData.posts.map(p => ({
  ...p,
  publishedAt: new Date(p.publishedAt),
  updatedAt: new Date(p.updatedAt)
}));

/**
 * Öne çıkan yazıları getir
 */
export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return ALL_BLOG_POSTS
    .filter(p => p.isPublished && p.isFeatured)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
}

/**
 * En çok okunan yazıları getir
 */
export function getMostReadPosts(limit: number = 6): BlogPost[] {
  return ALL_BLOG_POSTS
    .filter(p => p.isPublished)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
}

/**
 * En son eklenen yazıları getir
 */
export function getRecentPosts(limit: number = 6): BlogPost[] {
  return ALL_BLOG_POSTS
    .filter(p => p.isPublished)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
}

/**
 * Kategoriye göre yazıları getir
 */
export function getPostsByCategory(category: string, limit?: number): BlogPost[] {
  const posts = ALL_BLOG_POSTS
    .filter(p => p.isPublished && p.category === category)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  return limit ? posts.slice(0, limit) : posts;
}

/**
 * Slug'a göre yazı getir
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_BLOG_POSTS.find(p => p.slug === slug && p.isPublished);
}

/**
 * ID'ye göre yazı getir
 */
export function getPostById(id: string): BlogPost | undefined {
  return ALL_BLOG_POSTS.find(p => p.id === id && p.isPublished);
}

/**
 * Arama yap
 */
export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return ALL_BLOG_POSTS.filter(p =>
    p.isPublished && (
      p.title.toLowerCase().includes(lowerQuery) ||
      p.excerpt.toLowerCase().includes(lowerQuery) ||
      p.content.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  );
}

/**
 * İlgili yazıları getir (aynı kategori veya etiketler)
 */
export function getRelatedPosts(post: BlogPost, limit: number = 3): BlogPost[] {
  return ALL_BLOG_POSTS
    .filter(p =>
      p.isPublished &&
      p.id !== post.id &&
      (p.category === post.category ||
        p.tags.some(tag => post.tags.includes(tag)))
    )
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
}

/**
 * AI tarafından oluşturulan yazıları getir
 */
export function getAIGeneratedPosts(): BlogPost[] {
  return ALL_BLOG_POSTS.filter(p => p.isPublished && p.aiGenerated);
}

/**
 * İnsan yazarı yazıları getir
 */
export function getHumanWrittenPosts(): BlogPost[] {
  return ALL_BLOG_POSTS.filter(p => p.isPublished && !p.aiGenerated);
}

/**
 * Yazara göre yazıları getir
 */
export function getPostsByAuthor(author: string): BlogPost[] {
  return ALL_BLOG_POSTS
    .filter(p => p.isPublished && p.author === author)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

/**
 * Tüm kategorileri getir (tekil)
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  ALL_BLOG_POSTS
    .filter(p => p.isPublished)
    .forEach(p => categories.add(p.category));
  return Array.from(categories);
}

/**
 * Kategori başına yazı sayısı
 */
export function getCategoryPostCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  ALL_BLOG_POSTS
    .filter(p => p.isPublished)
    .forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
  return counts;
}

/**
 * Tüm etiketleri getir
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  ALL_BLOG_POSTS
    .filter(p => p.isPublished)
    .forEach(p => p.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

/**
 * Etikete göre yazıları getir
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return ALL_BLOG_POSTS
    .filter(p => p.isPublished && p.tags.includes(tag))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

/**
 * Okuma süresi hesapla (markdown olmayan metin için)
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Blog istatistikleri
 */
export function getBlogStats() {
  const published = ALL_BLOG_POSTS.filter(p => p.isPublished);
  const totalViews = published.reduce((sum, p) => sum + p.viewCount, 0);
  const avgReadingTime = Math.round(
    published.reduce((sum, p) => sum + p.readingTime, 0) / published.length
  );

  return {
    totalPosts: published.length,
    totalViews,
    avgReadingTime,
    categories: getAllCategories().length,
    tags: getAllTags().length,
    aiGenerated: getAIGeneratedPosts().length,
    humanWritten: getHumanWrittenPosts().length
  };
}
