'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  SendIcon, 
  BotIcon, 
  UserIcon, 
  LoaderIcon, 
  SparklesIcon, 
  XIcon,
  MinusIcon
} from 'lucide-react'
import { GoogleGenAI } from '@google/genai'
import { useLoading } from '@/components/LoadingScreen'

// Function to parse markdown links and convert them to JSX
const parseMessageContent = (content: string) => {
  // Regular expression to match markdown links [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(content)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index))
    }
    
    // Add the clickable link
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors duration-200 font-medium text-xs"
      >
        {match[1]}
      </a>
    )
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text after the last link
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex))
  }
  
  return parts.length > 0 ? parts : content
}

// Add blinking animation styles
const blinkKeyframes = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  .animate-blink {
    animation: blink 1s infinite;
  }
`

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  isTyping?: boolean
}

export function AIWidget() {
  const { isLoading } = useLoading();
  const pathname = usePathname()
  const isOnBlogPage = pathname.startsWith('/blog')
  
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: '1',
      type: 'ai',
              content: isOnBlogPage 
        ? "Hey! 👋 I'm Yash's AI assistant. I can tell you about his blog posts, the cool stuff he writes about, or anything else about his work. What would you like to know?"
        : "Hey! 👋 I'm Yash's AI assistant. Want to know about his DevOps projects, coding skills, or maybe his journey? Just ask!",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [, setTypingMessageId] = useState<string | null>(null)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const getBlogContext = () => {
    if (isOnBlogPage) {
      return `

BLOG INFORMATION:
Yash writes technical blog posts about web development. Published posts:

1. "Getting Started with Next.js 15" (Sept 15, 2025)
   - Latest Next.js features, App Router, server components
   - Performance improvements and best practices
   - Tags: Next.js, React, TypeScript

2. "Building Beautiful UIs with shadcn/ui" (Sept 10, 2025) 
   - shadcn/ui component library guide
   - Theming, customization, Tailwind CSS integration
   - Modern accessible components
   - Tags: UI/UX, Design Systems, React, Tailwind

Blog features: markdown support, syntax highlighting, search, tags, responsive design, SEO optimized

When users ask about blog topics, recommend relevant posts and explain concepts from these articles.`
    }
    return ''
  }

  const YASH_CONTEXT = `
You are Yash Bhangale's AI assistant. Keep responses very brief for widget format. Only provide what's specifically asked.

BASIC: Yash Bhangale, DevOps Engineer & Full-Stack Developer, B.Tech AI & Data Science (CGPA: 8.2, 12th: 83%, 10th: 73%), Maharashtra, India

CONTACT:
- Email: yashbhangale9@gmail.com, Phone: +91 8169362024
- LinkedIn: [https://linkedin.com/in/yashbhangale](https://linkedin.com/in/yashbhangale)
- GitHub: [https://github.com/yashbhangale](https://github.com/yashbhangale)
- Portfolio: [https://yashbhangale.github.io](https://yashbhangale.github.io)

SKILLS: Kubernetes, Docker, AWS, Azure (certified), Terraform, Jenkins, Python, React, Node.js, Linux

EXPERIENCE: Scogo Networks (DevOps, 6mo), Raydium Labs (SDE, 2mo), Freelance projects

ACHIEVEMENTS: Mumbai Hacks 2024 (1st), Smart India Hackathon 2024 (Runner-up)

PROJECTS:
1. Nanite Linux OS - [GitHub](https://github.com/yashbhangale/nanite-linux)
2. Infrastructure Monitoring - [GitHub](https://github.com/yashbhangale/monitoring-stack)
3. Cryptway wallet (sold to startup)
4. Lenovo Vantage Linux - [GitHub](https://github.com/yashbhangale/lenovo-vantage-linux)${getBlogContext()}

RULES: Keep responses short, provide links when relevant, suggest contacting for details.
  `

  // Typing animation component
  const TypingAnimation = () => (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-1">
        <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
      </div>
      <span className="text-xs opacity-70 ml-1">Thinking...</span>
    </div>
  )

  // Simulate typing effect for AI responses
  const typeMessage = (text: string, messageId: string) => {
    return new Promise<void>((resolve) => {
      setTypingMessageId(messageId)
      let index = 0
      const interval = setInterval(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, content: text.slice(0, index + 1), isTyping: true }
              : msg
          )
        )
        index++
        if (index >= text.length) {
          clearInterval(interval)
          setMessages(prev => 
            prev.map(msg => 
              msg.id === messageId 
                ? { ...msg, isTyping: false }
                : msg
            )
          )
          setTypingMessageId(null)
          setHasNewMessage(true)
          resolve()
        }
      }, 20) // Faster typing for widget
    })
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages, isSending])

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false)
      inputRef.current?.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim() || isSending) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsSending(true)

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      console.log('Widget API Key available:', !!apiKey, 'Length:', apiKey?.length || 0)
      
      if (!apiKey) {
        throw new Error('No API key found')
      }

      const ai = new GoogleGenAI({ 
        apiKey: apiKey
      })

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${YASH_CONTEXT}\n\nUser question: "${userMessage.content}"\n\nRespond in 1-2 sentences maximum. Be very brief and direct. Widget format requires short answers.`
      })

      const aiMessageId = (Date.now() + 1).toString()
      const aiContent = response.text || "I'm sorry, I couldn't process that request. Please try asking something else!"
      
      const aiMessage: Message = {
        id: aiMessageId,
        type: 'ai',
        content: '',
        timestamp: new Date(),
        isTyping: true
      }

      setMessages(prev => [...prev, aiMessage])
      await typeMessage(aiContent, aiMessageId)
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      const errorMessageId = (Date.now() + 1).toString()
      const errorContent = "I'm having trouble connecting. Please try the full Ask AI page or contact Yash directly!"
      
      const errorMessage: Message = {
        id: errorMessageId,
        type: 'ai',
        content: '',
        timestamp: new Date(),
        isTyping: true
      }
      setMessages(prev => [...prev, errorMessage])
      await typeMessage(errorContent, errorMessageId)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Don't render AI widget during loading (after all hooks are called)
  if (isLoading) return null;

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-12 px-4 sm:h-14 sm:px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 hover:scale-110 group whitespace-nowrap"
        >
          <div className="relative flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium group-hover:scale-110 transition-transform">Ask AI</span>
            {hasNewMessage && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:animate-none"></div>
          </div>
        </Button>
      </div>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: blinkKeyframes }} />
      
      {/* Backdrop overlay */}
      {isOpen && !isMinimized && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-[9999]">
        <Card className={`w-[calc(100vw-2rem)] max-w-80 sm:w-80 transition-all duration-300 shadow-2xl border ${
          isMinimized ? 'h-14' : 'h-96'
        } flex flex-col overflow-hidden`}>
          <CardHeader className="p-3 border-b flex-shrink-0">
            <CardTitle className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <BotIcon className="h-4 w-4 text-primary" />
                {isOnBlogPage ? 'Ask AI about Blogs' : 'Ask AI about Yash'}
                <Badge variant="secondary" className="text-xs">
                  {isOnBlogPage ? 'Blog Mode' : 'Online'}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-6 w-6 p-0"
                >
                  <MinusIcon className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="flex flex-col p-0 flex-1 min-h-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 min-h-0" ref={scrollAreaRef}>
                <div className="p-3 space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      } ${index === messages.length - 1 ? 'animate-in slide-in-from-bottom-2' : ''}`}
                    >
                      {message.type === 'ai' && (
                        <div className="flex-shrink-0">
                          <div className={`w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center ${
                            message.isTyping ? 'animate-pulse' : ''
                          }`}>
                            {message.isTyping ? (
                              <SparklesIcon className="h-3 w-3 text-primary animate-spin" />
                            ) : (
                              <BotIcon className="h-3 w-3 text-primary" />
                            )}
                          </div>
                        </div>
                      )}

                      <div
                        className={`max-w-[75%] rounded-lg px-3 py-2 text-xs ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        } ${message.isTyping ? 'animate-pulse' : ''}`}
                      >
                        {message.content || message.isTyping ? (
                          <div className="whitespace-pre-wrap break-words">
                            {parseMessageContent(message.content)}
                            {message.isTyping && (
                              <span className="inline-block w-1 h-3 bg-current ml-1 animate-blink">|</span>
                            )}
                          </div>
                        ) : null}
                      </div>

                      {message.type === 'user' && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                            <UserIcon className="h-3 w-3" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isSending && (
                    <div className="flex gap-2 justify-start animate-in slide-in-from-bottom-2">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                          <SparklesIcon className="h-3 w-3 text-primary animate-spin" />
                        </div>
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2 text-xs">
                        <TypingAnimation />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-3 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isOnBlogPage ? "Ask about blog posts..." : "Ask about Yash..."}
                    disabled={isSending}
                    className="flex-1 text-xs h-8"
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={!input.trim() || isSending}
                    size="sm"
                    className="h-8 w-8 p-0 shrink-0"
                  >
                    {isSending ? (
                      <LoaderIcon className="h-3 w-3 animate-spin" />
                    ) : (
                      <SendIcon className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  )
} 