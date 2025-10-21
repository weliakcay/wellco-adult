'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { BlogCard } from '@/components/blog/BlogCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  getFeaturedPosts,
  getMostReadPosts,
  getRecentPosts,
  getPostsByCategory,
  searchPosts,
  getAllCategories,
  getBlogStats
} from '@/data/blog';
import { Search } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featuredPosts = getFeaturedPosts(3);
  const mostReadPosts = getMostReadPosts(6);
  const recentPosts = getRecentPosts(6);
  const allCategories = getAllCategories();
  const stats = getBlogStats();

  // Filter posts by search and category
  const filteredPosts = useMemo(() => {
    let posts = searchQuery ? searchPosts(searchQuery) : [];

    if (selectedCategory) {
      posts = posts.length > 0
        ? posts.filter(p => p.category === selectedCategory)
        : getPostsByCategory(selectedCategory);
    }

    return posts;
  }, [searchQuery, selectedCategory]);

  const showFilteredResults = searchQuery || selectedCategory;

  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-wellco-primary/5 via-wellco-background to-wellco-accent-vibrant/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif font-light text-wellco-text-dark">
              Sexual Wellness{' '}
              <span className="font-serif italic text-wellco-accent-vibrant">101</span>
            </h1>
            <p className="text-lg md:text-xl text-wellco-text-dark/70 max-w-2xl mx-auto">
              Cinsel sağlık ve wellness hakkında bilmeniz gereken her şey.
              Uzman içerikleri ve rehberlerle kendinizi keşfedin.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 pt-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-serif text-wellco-accent-vibrant">{stats.totalPosts}</div>
                <div className="text-wellco-text-dark/60">Makale</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-serif text-wellco-accent-vibrant">{stats.categories}</div>
                <div className="text-wellco-text-dark/60">Kategori</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-serif text-wellco-accent-vibrant">
                  {Math.round(stats.totalViews / 1000)}k+
                </div>
                <div className="text-wellco-text-dark/60">Okuyucu</div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="flex justify-center pt-4">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-wellco-accent-vibrant to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-wellco-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Logo - Subtle Watermark */}
            <div className="flex justify-end mb-4">
              <div className="relative w-32 h-16 opacity-20 hover:opacity-60 transition-opacity">
                <Image
                  src="/logo.svg"
                  alt="Wellco Adult"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-wellco-text-dark/40" />
              <Input
                type="text"
                placeholder="Makalelerde ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-lg border-wellco-primary/20 focus:border-wellco-accent-vibrant"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null
                  ? "bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90"
                  : "border-wellco-primary/20 hover:border-wellco-accent-vibrant/40"
                }
              >
                Tümü
              </Button>
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category
                    ? "bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90"
                    : "border-wellco-primary/20 hover:border-wellco-accent-vibrant/40"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filtered Results */}
      {showFilteredResults && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif mb-8 text-wellco-text-dark">
              {searchQuery && `"${searchQuery}" için sonuçlar`}
              {selectedCategory && !searchQuery && `${selectedCategory} kategorisi`}
              <span className="text-wellco-text-dark/50 text-xl ml-3">
                ({filteredPosts.length} makale)
              </span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-wellco-text-dark/50">
                Sonuç bulunamadı. Lütfen farklı bir arama terimi deneyin.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Default View - When no filter/search */}
      {!showFilteredResults && (
        <>
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="py-16 bg-wellco-background">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
                    Öne Çıkan{' '}
                    <span className="font-serif italic text-wellco-accent-vibrant">Yazılar</span>
                  </h2>
                  <div className="flex justify-center">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-wellco-accent-vibrant to-transparent" />
                  </div>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {featuredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Most Read Posts */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="mb-12 flex items-center justify-between">
                <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
                  En Çok{' '}
                  <span className="font-serif italic text-wellco-accent-vibrant">Okunanlar</span>
                </h2>
                <div className="h-px flex-grow ml-8 bg-gradient-to-r from-wellco-accent-vibrant/40 to-transparent max-w-xs" />
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {mostReadPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>

          {/* Recent Posts */}
          <section className="py-16 bg-wellco-neutral">
            <div className="container mx-auto px-4">
              <div className="mb-12 flex items-center justify-between">
                <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
                  Son{' '}
                  <span className="font-serif italic text-wellco-accent-vibrant">Eklenenler</span>
                </h2>
                <div className="h-px flex-grow ml-8 bg-gradient-to-r from-wellco-accent-vibrant/40 to-transparent max-w-xs" />
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>

          {/* Category Sections */}
          {allCategories.map((category, index) => {
            const categoryPosts = getPostsByCategory(category, 3);
            if (categoryPosts.length === 0) return null;

            return (
              <section
                key={category}
                className={`py-16 ${index % 2 === 0 ? 'bg-wellco-background' : 'bg-white'}`}
              >
                <div className="container mx-auto px-4">
                  <div className="mb-12 flex items-center justify-between">
                    <h2 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
                      {category}{' '}
                      <span className="font-serif italic text-wellco-accent-vibrant">Yazıları</span>
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedCategory(category)}
                      className="text-wellco-primary hover:text-wellco-accent-vibrant hover:bg-transparent"
                    >
                      Tümünü Gör →
                    </Button>
                  </div>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {categoryPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-wellco-primary/5 via-wellco-background to-wellco-accent-magenta/5">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-serif text-wellco-text-dark mb-4">
            Daha fazla bilgi mi arıyorsunuz?
          </h3>
          <p className="text-wellco-text-dark/70 mb-8 max-w-2xl mx-auto">
            Ürünlerimiz ve wellness konularında uzman desteği için bizimle iletişime geçebilirsiniz.
          </p>
          <Button className="bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90 text-white px-8 py-6 text-lg">
            İletişime Geç
          </Button>
        </div>
      </section>
    </div>
  );
}
