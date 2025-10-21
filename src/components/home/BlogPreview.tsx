import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/blog/BlogCard';
import { getFeaturedPosts } from '@/data/blog';
import { ArrowRight } from 'lucide-react';

export function BlogPreview() {
  const featuredPosts = getFeaturedPosts(3);

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-wellco-neutral">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-wellco-text-dark">
            Sexual Wellness{' '}
            <span className="font-serif italic text-wellco-accent-vibrant">101</span>
          </h2>
          <p className="mt-4 text-lg text-wellco-text-dark/70 max-w-2xl mx-auto">
            Cinsel sağlık ve wellness hakkında bilmeniz gereken her şey
          </p>
          {/* Decorative line */}
          <div className="flex justify-center pt-2">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-wellco-accent-vibrant to-transparent" />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} showExcerpt={true} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button
              size="lg"
              className="bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90 text-white px-8 py-6 text-lg group"
            >
              Tüm Makaleleri Gör
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
