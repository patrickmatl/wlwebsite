import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gold-500 bg-gold-500/10 px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-syne font-bold text-white mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-between text-neutral-400">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-[400px] w-full mb-12 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-gold max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  )
}
