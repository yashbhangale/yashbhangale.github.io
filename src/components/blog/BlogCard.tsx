import { BlogPost } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, ClockIcon, PinIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {post.image && (
          <Image
            src={post.image}
            alt={post.imageAlt || post.title}
            width={post.imageWidth || 1200}
            height={post.imageHeight || 630}
            className="h-auto w-full rounded-t-xl"
          />
        )}
        <CardHeader>
          <div className="space-y-3">
            {post.pinOrder !== undefined && (
              <Badge variant="outline" className="gap-1">
                <PinIcon className="h-3 w-3" aria-hidden="true" />
                Pinned
              </Badge>
            )}
            <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
              {post.title}
            </CardTitle>

            {post.description && (
              <CardDescription className="line-clamp-3">
                {post.description}
              </CardDescription>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <UserIcon className="h-3 w-3" />
                <span>{post.author}</span>
              </div>

              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                <span>{post.readTime} min</span>
              </div>
            </div>
          </div>
        </CardHeader>

        {post.tags.length > 0 && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
