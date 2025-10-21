import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogPost } from '@/types';
import { Calendar, Clock, Eye, User } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  showExcerpt?: boolean;
}

export function BlogCard({ post, showExcerpt = true }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full border-wellco-primary/10 bg-white hover:border-wellco-accent-vibrant/30 transition-all duration-300 overflow-hidden relative">
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-wellco-accent-vibrant/0 to-wellco-accent-magenta/0 group-hover:from-wellco-accent-vibrant/5 group-hover:to-wellco-accent-magenta/5 transition-all duration-300" />

        {/* Featured Badge */}
        {post.isFeatured && (
          <div className="absolute top-4 right-4 z-10 bg-wellco-accent-vibrant/90 text-white px-3 py-1 rounded-full text-xs font-medium">
            Öne Çıkan
          </div>
        )}

        {/* AI Generated Badge */}
        {post.aiGenerated && (
          <div className="absolute top-4 left-4 z-10 bg-wellco-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <span>✨</span> AI
          </div>
        )}

        <CardHeader className="relative z-10 pb-4">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block bg-wellco-primary/10 text-wellco-primary group-hover:bg-wellco-accent-vibrant/20 group-hover:text-wellco-accent-vibrant transition-colors px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>

          <CardTitle className="text-xl font-serif text-wellco-text-dark group-hover:text-wellco-accent-vibrant transition-colors duration-300 line-clamp-2">
            {post.title}
          </CardTitle>

          {showExcerpt && (
            <CardDescription className="text-sm text-wellco-text-dark/60 leading-relaxed line-clamp-3 mt-2">
              {post.excerpt}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="relative z-10">
          {/* Decorative Border */}
          <div className="h-px w-full bg-gradient-to-r from-wellco-primary/20 to-transparent mb-4 group-hover:from-wellco-accent-vibrant/40 transition-colors" />

          {/* Post Meta */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-4 text-xs text-wellco-text-dark/50">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-wellco-text-dark/50">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readingTime} dk okuma</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{post.viewCount.toLocaleString('tr-TR')} görüntülenme</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-wellco-neutral text-wellco-text-dark/60 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Read More */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-wellco-primary group-hover:text-wellco-accent-vibrant transition-colors">
              Devamını Oku
            </span>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-wellco-primary/10 group-hover:bg-wellco-accent-vibrant/20 transition-colors">
              <svg
                className="h-4 w-4 text-wellco-primary group-hover:text-wellco-accent-vibrant group-hover:translate-x-0.5 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </CardContent>

        {/* Bottom Glow on Hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-wellco-accent-vibrant via-wellco-accent-magenta to-wellco-accent-vibrant opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </Link>
  );
}
