import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getRelatedPosts } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { Calendar, Clock, Eye, User, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);

  // Simple markdown to HTML conversion (for basic formatting)
  const renderMarkdown = (content: string) => {
    return content
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-serif text-wellco-text-dark mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-serif text-wellco-text-dark mt-10 mb-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-serif text-wellco-text-dark mt-12 mb-8">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-wellco-primary">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li class="ml-6 mb-2">$1</li>')
      // Paragraphs (lines that don't start with special chars)
      .split('\n\n')
      .map(para => {
        if (para.startsWith('<h') || para.startsWith('<li') || para.startsWith('<ul') || para.startsWith('<ol')) {
          return para;
        }
        if (para.includes('<li')) {
          return `<ul class="my-4 space-y-2">${para}</ul>`;
        }
        return `<p class="text-wellco-text-dark/80 leading-relaxed mb-6">${para}</p>`;
      })
      .join('\n');
  };

  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-wellco-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-wellco-text-dark/60">
            <Link href="/" className="hover:text-wellco-accent-vibrant transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-wellco-accent-vibrant transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-wellco-text-dark">{post.category}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-wellco-primary hover:text-wellco-accent-vibrant transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Bloga Dön
            </Link>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block bg-wellco-primary/10 text-wellco-primary px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
              {post.aiGenerated && (
                <span className="inline-block ml-2 bg-wellco-accent-vibrant/10 text-wellco-accent-vibrant px-4 py-2 rounded-full text-sm font-medium">
                  ✨ AI Destekli
                </span>
              )}
              {post.isFeatured && (
                <span className="inline-block ml-2 bg-wellco-accent-magenta/10 text-wellco-accent-magenta px-4 py-2 rounded-full text-sm font-medium">
                  ⭐ Öne Çıkan
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-light text-wellco-text-dark mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-wellco-text-dark/70 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-wellco-primary/10 mb-12">
              <div className="flex items-center gap-2 text-wellco-text-dark/60">
                <User className="h-5 w-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 text-wellco-text-dark/60">
                <Calendar className="h-5 w-5" />
                <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2 text-wellco-text-dark/60">
                <Clock className="h-5 w-5" />
                <span>{post.readingTime} dakika okuma</span>
              </div>
              <div className="flex items-center gap-2 text-wellco-text-dark/60">
                <Eye className="h-5 w-5" />
                <span>{post.viewCount.toLocaleString('tr-TR')} görüntülenme</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-wellco-primary hover:text-wellco-accent-vibrant hover:bg-wellco-primary/5"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Paylaş
              </Button>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="pt-8 border-t border-wellco-primary/10">
                <h3 className="text-sm font-medium text-wellco-text-dark/60 mb-4">Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-wellco-neutral text-wellco-text-dark px-3 py-1 rounded-full text-sm hover:bg-wellco-primary/10 hover:text-wellco-primary transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-wellco-neutral">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark mb-12 text-center">
                İlgili{' '}
                <span className="font-serif italic text-wellco-accent-vibrant">Yazılar</span>
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-wellco-primary/5 via-wellco-background to-wellco-accent-vibrant/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-serif text-wellco-text-dark mb-4">
              Ürünlerimizi keşfetmek ister misiniz?
            </h3>
            <p className="text-wellco-text-dark/70 mb-8">
              Wellness yolculuğunuza uygun ürünleri inceleyin
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kategoriler/kadinlar-icin">
                <Button className="bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90 text-white px-6 py-6">
                  Kadınlar İçin
                </Button>
              </Link>
              <Link href="/kategoriler/erkekler-icin">
                <Button className="bg-wellco-primary hover:bg-wellco-primary/90 text-white px-6 py-6">
                  Erkekler İçin
                </Button>
              </Link>
              <Link href="/kategoriler/ciftler-icin">
                <Button className="bg-wellco-accent-magenta hover:bg-wellco-accent-magenta/90 text-white px-6 py-6">
                  Çiftler İçin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
