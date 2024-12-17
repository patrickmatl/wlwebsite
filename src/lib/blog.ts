import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export type BlogPost = {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  coverImage: string
  tags: string[]
  content: string
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
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
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export async function getRandomPosts(count: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return [...posts].sort(() => 0.5 - Math.random()).slice(0, count)
}
