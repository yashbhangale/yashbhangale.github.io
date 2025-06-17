import { Navigation } from '@/components/portfolio/Navigation'
import { AIChatbot } from '@/components/ai/AIChatbot'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BotIcon, MessageCircleIcon, SparklesIcon } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Ask AI | Yash Bhangale",
  description: "Get instant answers about web development, programming, and technology. Chat with AI assistant powered by advanced language models.",
  keywords: [
    "AI assistant",
    "chatbot",
    "programming help",
    "web development questions",
    "technology support",
    "coding assistance",
    "artificial intelligence",
    "developer tools"
  ],
  openGraph: {
    title: "Ask AI | Yash Bhangale",
    description: "Get instant answers about web development, programming, and technology. Chat with AI assistant.",
    url: "https://yashbhangale.github.io/ask-ai",
    siteName: "Yash Bhangale Portfolio",
    images: [
      {
        url: "/og-ask-ai.png",
        width: 1200,
        height: 630,
        alt: "Ask AI - Get Programming Help & Tech Support",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask AI | Yash Bhangale",
    description: "Get instant answers about web development, programming, and technology.",
    images: ["/og-ask-ai.png"],
  },
  alternates: {
    canonical: "https://yashbhangale.github.io/ask-ai",
  },
};

export default function AskAIPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ask AI Assistant",
    "description": "AI-powered assistant for web development, programming, and technology questions",
    "url": "https://yashbhangale.github.io/ask-ai",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Yash Bhangale",
      "url": "https://yashbhangale.github.io"
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
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-2">
            <BotIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Ask AI</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant answers about web development, programming, and technology. 
            Ask me anything about coding, best practices, or technical concepts.
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="flex items-center gap-1">
              <SparklesIcon className="h-3 w-3" />
              Powered by Gemini AI
            </Badge>
            <Badge variant="outline">Real-time Responses</Badge>
            <Badge variant="outline">Portfolio Knowledge</Badge>
          </div>
        </div>

        {/* Chatbot Interface */}
        <div className="max-w-4xl mx-auto">
          <AIChatbot />
        </div>

        {/* Example Questions */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircleIcon className="h-5 w-5" />
                Example Questions
              </CardTitle>
              <CardDescription>
                Not sure what to ask? Try these sample questions:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">About Skills & Experience</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• &ldquo;What programming languages does Yash know?&rdquo;</li>
                    <li>• &ldquo;Tell me about Yash&apos;s experience with React&rdquo;</li>
                    <li>• &ldquo;What projects has Yash worked on?&rdquo;</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">General Questions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• &ldquo;Where is Yash located?&rdquo;</li>
                    <li>• &ldquo;How can I contact Yash?&rdquo;</li>
                    <li>• &ldquo;What is Yash&apos;s background?&rdquo;</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 