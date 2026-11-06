import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Image from 'next/image'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none break-words [&_code]:text-sm [&_code]:font-mono">
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
          p: ({ children, node }) => node?.children.some(child => child.type === 'element' && child.tagName === 'img')
            ? <div className="my-8">{children}</div>
            : <p className="mb-5 leading-8">{children}</p>,
          code: ({ inline, className, children, ...props }: React.ComponentProps<'code'> & { inline?: boolean }) => {
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
          <blockquote className="border-l border-primary pl-4 italic my-4">
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
            className="text-primary underline underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="my-8 max-w-full overflow-x-auto rounded-lg border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" role="region" aria-label="Article reference table" tabIndex={0}>
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-6">{children}</table>
          </div>
        ),
        th: ({ children }) => <th scope="col" className="border-b border-border bg-muted px-4 py-3 font-semibold">{children}</th>,
        td: ({ children }) => <td className="border-b border-border px-4 py-3 align-top">{children}</td>,
        img: ({ src, alt }: React.ComponentProps<'img'>) => {
          if (!src || typeof src !== 'string') return null
          
          // Handle relative paths for blog images
          const imageSrc = src.startsWith('/') ? src : `/blog/images/${src}`
          
          return (
            <figure className="my-6">
              <div className="relative max-w-full">
                <a href={imageSrc} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size diagram: ${alt || 'Blog image'}`}>
                <Image
                  src={imageSrc}
                  alt={alt || 'Blog image'}
                  width={800}
                  height={400}
                  className="h-auto w-full rounded-lg"
                  style={{ height: 'auto', maxWidth: '100%' }}
                  priority={false}
                />
                </a>
                {alt && (
                  <figcaption className="text-sm text-muted-foreground mt-3 leading-6">
                    {alt}
                  </figcaption>
                )}
              </div>
            </figure>
          )
        },
      }}
            >
          {content}
        </ReactMarkdown>
      </div>
    )
  } 