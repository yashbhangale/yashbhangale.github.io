'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SendIcon, BotIcon, UserIcon, LoaderIcon, SparklesIcon } from 'lucide-react'
import { GoogleGenAI } from '@google/genai'

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

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm an AI assistant that knows all about Yash. Feel free to ask me anything about his skills, experience, projects, or background. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [, setTypingMessageId] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const YASH_CONTEXT = `
You are an AI assistant representing Yash Bhangale, a DevOps Engineer and Full-Stack Developer. Here's detailed information about Yash:

PERSONAL INFO:
- Name: Yash Bhangale
- Role: DevOps Engineer & Full-Stack Developer
- Experience: 1 year in DevOps and infrastructure
- Education: B.Tech AI & Data Science, Dattameghe College of Engineering (CGPA: 8.2)
- Location: Maharashtra, India
- Available for opportunities: Yes

CONTACT INFORMATION:
- Email: yashbhangale9@gmail.com
- Phone: +91 8169362025
- LinkedIn: https://linkedin.com/in/yashbhangale
- GitHub: https://github.com/yashbhangale

SKILLS:
DevOps & Cloud: Kubernetes, Docker, AWS, Azure, Terraform, ArgoCD, Helm, SigNoz, Prometheus, Grafana, Jenkins
Backend: Node.js, Python, Java, Shell Scripting, PowerShell, Bash, REST APIs, Linux Administration
Frontend: React.js, JavaScript, HTML5, CSS3, Bootstrap, Tailwind CSS, TypeScript
Databases: MongoDB, PostgreSQL, Database Design
Tools: Git, Postman, VS Code, n8n, Hoppscotch, Mermaid, KVM Virtualization

EXPERIENCE:
- Scogo Networks: DevOps Intern (6 months) - Kubernetes monitoring, 30+ alerts, 25% deployment improvement
- Raydium Labs: SDE Intern (2 months) - NFT APIs, 70% performance improvement, 350ms response time
- Freelance: BJP Divyang Portal development with PHP, Laravel

ACHIEVEMENTS:
- Mumbai Hacks: 1st Prize (World's largest Gen AI hackathon) - Supply chain management system
- Smart India Hackathon: Runner-up (National level) - 2376 participants
- Multiple intracollege wins: AI Sparks, CSI Ideathon

CERTIFICATIONS:
- AZ-900: Azure Fundamentals (Microsoft)
- AI-900: Azure AI Fundamentals (Microsoft)  
- AZ-104: Azure Administrator Associate (Microsoft)
- CKA: Certified Kubernetes Administrator (Preparing)

PROJECTS:
- Nanite Linux OS: Debian-based AI distribution with LLMs, automated CI/CD builds
- Infrastructure Monitoring Suite: SigNoz, Prometheus, 40% MTTD improvement, 60% security risk reduction
- Cryptway: Cryptocurrency wallet platform (sold to fintech startup)
- Lenovo Vantage for Linux: Power management tools for Linux systems

INTERESTS:
- DevOps and cloud technologies
- Infrastructure automation
- Linux systems
- Backend development
- Open source contributions

Always respond as if you're representing Yash in first person, but make it clear you're an AI assistant. Be helpful, professional, and knowledgeable about his background. For specific inquiries or opportunities, provide his contact details and encourage direct communication.
  `

  // Typing animation component
  const TypingAnimation = () => (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
      </div>
      <span className="text-xs opacity-70 ml-2">AI is thinking...</span>
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
          resolve()
        }
      }, 30) // Adjust typing speed here
    })
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  useEffect(() => {
    // Focus input after component mounts
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      console.log('API Key available:', !!apiKey, 'Length:', apiKey?.length || 0)
      
      if (!apiKey) {
        throw new Error('No API key found')
      }

      const ai = new GoogleGenAI({ 
        apiKey: apiKey
      })

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${YASH_CONTEXT}\n\nUser question: ${userMessage.content}`
      })

      const aiMessageId = (Date.now() + 1).toString()
      const aiContent = response.text || "I'm sorry, I couldn't process that request. Please try asking something else about Yash!"
      
      // Add empty message first, then type it
      const aiMessage: Message = {
        id: aiMessageId,
        type: 'ai',
        content: '',
        timestamp: new Date(),
        isTyping: true
      }

      setMessages(prev => [...prev, aiMessage])
      
      // Start typing animation
      await typeMessage(aiContent, aiMessageId)
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      const errorMessageId = (Date.now() + 1).toString()
      const errorContent = "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or feel free to contact Yash directly through the contact section!"
      
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
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: blinkKeyframes }} />
      <Card className="w-full max-w-4xl mx-auto h-[70vh] max-h-[800px] min-h-[500px] flex flex-col overflow-hidden">
      <CardHeader className="border-b flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <BotIcon className="h-5 w-5 text-primary" />
          Ask AI about Yash
          <Badge variant="secondary" className="ml-auto">
            Online
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 min-h-0" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                } transform transition-all duration-500 ease-out ${
                  index === messages.length - 1 ? 'animate-in slide-in-from-bottom-2' : ''
                }`}
              >
                {message.type === 'ai' && (
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 ${
                      message.isTyping ? 'animate-pulse' : ''
                    }`}>
                      {message.isTyping ? (
                        <SparklesIcon className="h-4 w-4 text-primary animate-spin" />
                      ) : (
                        <BotIcon className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 transition-all duration-300 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground transform hover:scale-[1.02]'
                      : 'bg-muted hover:bg-muted/80'
                  } ${message.isTyping ? 'animate-pulse' : ''}`}
                >
                  {message.content || message.isTyping ? (
                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                      {message.content}
                      {message.isTyping && (
                        <span className="inline-block w-2 h-4 bg-current ml-1 animate-blink">|</span>
                      )}
                    </p>
                  ) : null}
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {message.type === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center transition-all duration-300 hover:bg-secondary/80">
                      <UserIcon className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-2 duration-500">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <div className="relative">
                      <SparklesIcon className="h-4 w-4 text-primary animate-spin" />
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg px-4 py-3 animate-pulse">
                  <div className="flex items-center space-x-2">
                    <TypingAnimation />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4 flex-shrink-0">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Yash..."
              disabled={isLoading}
              className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!input.trim() || isLoading}
              size="icon"
              className="transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <div className="relative">
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                </div>
              ) : (
                <SendIcon className="h-4 w-4 transition-transform duration-200 hover:translate-x-0.5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Powered by Google Gemini AI • Press Enter to send
          </p>
        </div>
      </CardContent>
    </Card>
    </>
  )
} 