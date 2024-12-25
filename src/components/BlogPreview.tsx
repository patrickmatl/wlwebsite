'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';
import type { BlogPost } from '@/app/api/blog/route';

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog?random=true&count=3');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    }

    fetchPosts();
  }, []);

  // Only render content after component is mounted
  if (!mounted) {
    return (
      <section className="py-16 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Latest Insights</h2>
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Latest Insights</h2>
        {posts.length === 0 ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article key={post.slug} className="bg-black/30 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48">
                  <OptimizedImage
                    src={post.coverImage}
                    alt={post.title}
                    width={400}
                    height={192}
                    className="object-cover w-full h-full"
                    priority={index === 0}
                    quality={85}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{post.date}</span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-[#FFD700] hover:text-[#FFA500] transition-colors duration-300"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link 
            href="/blog"
            className="inline-block px-8 py-3 bg-[#FFD700] text-black font-semibold rounded-full hover:bg-[#FFA500] transition-colors duration-300"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
