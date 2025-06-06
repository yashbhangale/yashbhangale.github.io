import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Image from 'next/image'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-7">{children}</p>
          ),
          code: ({ inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              )
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        pre: ({ children }) => (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-4">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-4">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="mb-2">{children}</li>
        ),
        a: ({ href, children }) => (
          <a 
            href={href} 
            className="text-primary hover:underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        img: ({ src, alt }: any) => {
          if (!src || typeof src !== 'string') return null
          
          // Handle relative paths for blog images
          const imageSrc = src.startsWith('/') ? src : `/blog/images/${src}`
          
          return (
            <div className="my-6 flex justify-center">
              <div className="relative max-w-full">
                <Image
                  src={imageSrc}
                  alt={alt || 'Blog image'}
                  width={800}
                  height={400}
                  className="rounded-lg shadow-lg"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
                  priority={false}
                />
                {alt && (
                  <p className="text-sm text-muted-foreground text-center mt-2 italic">
                    {alt}
                  </p>
                )}
              </div>
            </div>
          )
        },
      }}
            >
          {content}
        </ReactMarkdown>
      </div>
    )
  } 