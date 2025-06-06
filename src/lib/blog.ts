import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  content: string
  readTime: number
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog')

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(blogDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return getBlogPost(slug)
    })
    .filter(Boolean) as BlogPost[]

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Calculate read time (average 200 words per minute)
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / wordsPerMinute)

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date ? format(new Date(data.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      author: data.author || 'Yash',
      tags: data.tags || [],
      content,
      readTime
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(blogDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
} 