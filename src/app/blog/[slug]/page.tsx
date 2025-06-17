import { getBlogPost, getBlogSlugs } from '@/lib/blog'
import { BlogContent } from '@/components/blog/BlogContent'
import { Navigation } from '@/components/portfolio/Navigation'
import { AIWidget } from '@/components/ai/AIWidget'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Yash Bhangale`,
    description: post.description || `Read ${post.title} - a blog post by ${post.author} about ${post.tags.join(', ')}.`,
    keywords: [
      ...post.tags,
      post.author,
      "blog post",
      "tutorial",
      "web development",
      "programming",
    ],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description || `Read ${post.title} - a blog post by ${post.author}`,
      url: `https://yashbhangale.github.io/blog/${slug}`,
      siteName: "Yash Bhangale Portfolio",
      images: [
        {
          url: "/og-blog-post.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || `Read ${post.title} - a blog post by ${post.author}`,
      images: ["/og-blog-post.png"],
      creator: "@yashbhangale",
    },
    alternates: {
      canonical: `https://yashbhangale.github.io/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": "https://yashbhangale.github.io/og-blog-post.png",
    "url": `https://yashbhangale.github.io/blog/${slug}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://yashbhangale.github.io"
    },
    "publisher": {
      "@type": "Person", 
      "name": "Yash Bhangale",
      "url": "https://yashbhangale.github.io"
    },
    "keywords": post.tags.join(", "),
    "articleSection": "Technology",
    "inLanguage": "en-US",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://yashbhangale.github.io/blog/${slug}`
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>
              
              {post.description && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <BlogContent content={post.content} />
          </div>
        </article>

        {/* Back to Blog Footer */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t">
          <Button variant="outline" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to All Posts
            </Link>
          </Button>
        </div>
      </div>
      <AIWidget />
    </div>
  )
} 