import { getAllBlogPosts } from '@/lib/blog'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { Navigation } from '@/components/portfolio/Navigation'
import { AIWidget } from '@/components/ai/AIWidget'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpenIcon, PenIcon } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Blog | Yash Bhangale",
  description: "Thoughts, tutorials, and insights about web development, backend engineering, cloud computing, and modern technologies by Yash Bhangale.",
  keywords: [
    "blog",
    "web development",
    "backend development", 
    "cloud computing",
    "programming tutorials",
    "software engineering",
    "tech insights",
    "Node.js",
    "Python",
    "React",
    "AWS",
    "DevOps"
  ],
  openGraph: {
    title: "Blog | Yash Bhangale",
    description: "Thoughts, tutorials, and insights about web development, backend engineering, cloud computing, and modern technologies.",
    url: "https://yashbhangale.github.io/blog",
    siteName: "Yash Bhangale Portfolio",
    images: [
      {
        url: "/og-blog.png",
        width: 1200,
        height: 630,
        alt: "Yash Bhangale Blog - Web Development & Tech Insights",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Yash Bhangale",
    description: "Thoughts, tutorials, and insights about web development, backend engineering, and cloud computing.",
    images: ["/og-blog.png"],
  },
  alternates: {
    canonical: "https://yashbhangale.github.io/blog",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Yash Bhangale Blog",
    "description": "Thoughts, tutorials, and insights about web development, backend engineering, cloud computing, and modern technologies",
    "url": "https://yashbhangale.github.io/blog",
    "author": {
      "@type": "Person",
      "name": "Yash Bhangale",
      "url": "https://yashbhangale.github.io"
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "url": `https://yashbhangale.github.io/blog/${post.slug}`,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "keywords": post.tags.join(", ")
    }))
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
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-2">
            <BookOpenIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, technology, and more.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <BlogSearch />
          
          {allTags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/10">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Blog Posts */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <PenIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardTitle>No Blog Posts Yet</CardTitle>
              <CardDescription>
                Blog posts will appear here once you start creating them.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Create your first blog post by adding a markdown file to{' '}
                <code className="bg-muted px-2 py-1 rounded text-sm">src/content/blog/</code>
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      <AIWidget />
    </div>
  )
} 