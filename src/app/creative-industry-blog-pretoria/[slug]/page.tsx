import { getPostBySlug, getPostSlugs } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const SITE_URL = 'https://wlcreationx.co.za'

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }))
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const url = `${SITE_URL}/creative-industry-blog-pretoria/${post.slug}`

  return {
    title: `${post.title} | WL CreationX`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'WL CreationX',
      locale: 'en_ZA',
      type: 'article',
      publishedTime: post.isoDate,
      images: [post.coverImage],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    return notFound()
  }

  const url = `${SITE_URL}/creative-industry-blog-pretoria/${post.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      '@type': 'Organization',
      name: 'WL CreationX',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'WL CreationX',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/brand/logo-512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
