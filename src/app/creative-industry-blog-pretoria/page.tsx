import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import Image from 'next/image'

// The history article lives at its own static route rather than as an MDX
// file, so it is listed here alongside the MDX posts.
const staticPosts = [
  {
    slug: 'the-history-of-graphic-design-in-south-africa',
    title: 'The History of Graphic Design in South Africa',
    date: 'December 25, 2024',
    timestamp: new Date('2024-12-25').getTime(),
    author: 'WL CreationX Team',
    excerpt:
      'From San rock art to protest posters and today\'s digital studios — how South African graphic design evolved into the industry we work in now.',
    coverImage: '/images/blog/default.jpg',
    tags: ['Design History', 'South Africa'],
  },
]

export default async function BlogPage() {
  const mdxPosts = await getAllPosts()
  const posts = [
    ...mdxPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      timestamp: post.timestamp,
      author: post.author,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      tags: post.tags,
    })),
    ...staticPosts,
  ].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-syne font-bold text-white mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Insights, tutorials, and updates from the world of design
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/creative-industry-blog-pretoria/${post.slug}`}
              className="group"
            >
              <article className="bg-neutral-900 rounded-lg overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <div className="relative h-48 w-full">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gold-500 bg-gold-500/10 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-syne font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-400 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-sm text-neutral-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
