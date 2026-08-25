import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export type BlogPost = {
  slug: string
  title: string
  date: string
  /** ISO 8601 date string for machine-readable use (metadata, JSON-LD) */
  isoDate: string
  /** Unix timestamp used for reliable chronological sorting */
  timestamp: number
  author: string
  excerpt: string
  coverImage: string
  tags: string[]
  content: string
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
    const fileContents = await fs.promises.readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Ensure date exists and is properly formatted
    if (!data.date) {
      console.error(`Date is missing in ${fullPath}`)
      return null
    }

    // Parse the date string, removing any quotes and ensuring proper format
    const dateStr = data.date.toString().replace(/['"]/g, '').trim()
    const parsedDate = new Date(dateStr)
    
    if (isNaN(parsedDate.getTime())) {
      console.error(`Invalid date format in ${fullPath}: ${dateStr}`)
      return null
    }

    return {
      slug: realSlug,
      title: data.title || '',
      date: format(parsedDate, 'MMMM dd, yyyy'),
      isoDate: parsedDate.toISOString(),
      timestamp: parsedDate.getTime(),
      author: data.author || 'WL CreationX Team',
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '/images/blog/default.jpg',
      tags: data.tags || [],
      content: content || '',
    }
  } catch (error) {
    console.error(`Error processing ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug.replace(/\.mdx$/, '')))
  )
  return posts.filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => post2.timestamp - post1.timestamp)
}

export async function getRandomPosts(count: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return [...posts].sort(() => 0.5 - Math.random()).slice(0, count)
}
