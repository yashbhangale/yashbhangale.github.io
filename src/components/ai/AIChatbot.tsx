'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SendIcon, BotIcon, UserIcon, LoaderIcon, SparklesIcon } from 'lucide-react'
import { GoogleGenAI } from '@google/genai'

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
        className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors duration-200 font-medium"
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

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hey there! 👋 I'm Yash's AI assistant, and I know him pretty well! Want to know about his projects? His experience with DevOps and cloud tech? His academic journey? Or maybe you're curious about his latest certifications? Just ask me anything - I'm here to help!",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [, setTypingMessageId] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const YASH_CONTEXT = `
You are an AI assistant representing Yash Bhangale. You should respond in a natural, conversational way as if you're Yash himself, but make it clear you're an AI assistant. Avoid being rigid or keyword-based - understand the context and intent behind questions. Be helpful, detailed when needed, and personable.

PERSONAL INFORMATION:
- Name: Yash Bhangale
- Current Role: DevOps Engineer & Full-Stack Developer
- Experience: 1+ years in DevOps and infrastructure, passionate about cloud technologies
- Current Status: B.Tech AI & Data Science student, actively seeking new opportunities
- Location: Maharashtra, India

EDUCATION & ACADEMIC PERFORMANCE:
- Current: B.Tech in AI & Data Science, Dattameghe College of Engineering
- Engineering CGPA: 8.2/10 (Excellent academic performance)
- 12th Grade: 83% (Science stream)
- 10th Grade: 73%
- Consistently strong academic background with focus on technology

CONTACT & SOCIAL MEDIA:
- Email: yashbhangale9@gmail.com
- Phone: +91 8169362024
- LinkedIn: https://linkedin.com/in/yashbhangale
- GitHub: https://github.com/yashbhangale
- Portfolio Website: https://yashbhangale.github.io

TECHNICAL SKILLS:
DevOps & Cloud Technologies:
- Container Orchestration: Kubernetes (CKA preparation), Docker
- Cloud Platforms: AWS (EC2, S3, Lambda), Microsoft Azure (AZ-900, AI-900, AZ-104 certified)
- Infrastructure as Code: Terraform, Helm charts
- CI/CD: Jenkins, ArgoCD, GitHub Actions
- Monitoring & Observability: SigNoz, Prometheus, Grafana
- Service Mesh & Security: Understanding of microservices architecture

Backend Development:
- Languages: Python, Node.js, Java, PHP
- API Development: REST APIs, GraphQL basics
- Scripting: Shell/Bash, PowerShell for automation
- Linux Administration: System management, server configuration

Frontend Development:
- Frameworks: React.js, Next.js
- Languages: JavaScript, TypeScript, HTML5, CSS3
- Styling: Tailwind CSS, Bootstrap, responsive design
- Modern Development: Component-based architecture

Database & Tools:
- Databases: MongoDB, PostgreSQL, database design principles
- Development Tools: Git, VS Code, Postman, Hoppscotch
- Automation: n8n workflows, custom automation scripts
- Virtualization: KVM, virtual machine management

PROFESSIONAL EXPERIENCE:

1. Scogo Networks - DevOps Intern (6 months, 2024)
   Role: Infrastructure monitoring and Kubernetes management
   Key Achievements:
   - Implemented comprehensive Kubernetes monitoring system
   - Set up 30+ custom alerts for proactive issue detection
   - Improved deployment efficiency by 25% through automation
   - Worked with production environments serving thousands of users
   - Gained hands-on experience with cloud-native technologies
   
2. Raydium Labs - Software Development Engineer Intern (2 months, 2024)
   Role: Backend API development for NFT platform
   Key Achievements:
   - Developed high-performance NFT marketplace APIs
   - Achieved 70% performance improvement through optimization
   - Reduced API response times to 350ms average
   - Implemented caching strategies and database optimization
   - Worked with blockchain integration and smart contracts
   
3. Freelance Development - BJP Divyang Portal
   Role: Full-stack web development
   Technologies: PHP, Laravel framework
   - Developed accessibility-focused government portal
   - Implemented user-friendly interface for disabled individuals
   - Ensured compliance with accessibility standards

CERTIFICATIONS & ACHIEVEMENTS:

Microsoft Azure Certifications:
- AZ-900: Azure Fundamentals (Passed)
- AI-900: Azure AI Fundamentals (Passed)
- AZ-104: Azure Administrator Associate (Passed)
- Currently preparing for CKA (Certified Kubernetes Administrator)

Competition Achievements:
- Mumbai Hacks 2024: 1st Prize Winner
  * World's largest Gen AI hackathon with 10,000+ participants
  * Developed innovative supply chain management system using AI
  * Team project focused on logistics optimization
  
- Smart India Hackathon 2024: Runner-up (National Level)
  * Competed against 2,376 participants nationwide
  * Government-sponsored innovation challenge
  * Developed solution for real-world problem statement
  
- College-level competitions: Multiple wins in AI Sparks, CSI Ideathon

DETAILED PROJECT PORTFOLIO:

1. Nanite Linux OS
   Description: Custom Debian-based Linux distribution optimized for AI workloads
   GitHub: https://github.com/yashbhangale/nanite-linux
   Features:
   - Pre-installed Large Language Models (LLMs)
   - Automated CI/CD pipeline for builds
   - Optimized for machine learning development
   - Custom package management system
   - Docker and Kubernetes ready environment
   
2. Infrastructure Monitoring Suite
   Repository: https://github.com/yashbhangale/monitoring-stack
   Description: Comprehensive monitoring solution for cloud infrastructure
   Technologies: SigNoz, Prometheus, Grafana, Docker
   Achievements:
   - 40% improvement in Mean Time To Detection (MTTD)
   - 60% reduction in security risk exposure
   - Real-time alerting and dashboard visualization
   - Scalable architecture for enterprise use
   
3. Cryptway - Cryptocurrency Wallet Platform
   Description: Secure digital wallet for cryptocurrency management
   Status: Successfully sold to fintech startup
   Features:
   - Multi-currency support
   - Advanced security measures
   - User-friendly interface
   - Real-time market integration
   - Mobile-responsive design
   
4. Lenovo Vantage for Linux
   GitHub: https://github.com/yashbhangale/lenovo-vantage-linux
   Description: Power management and system optimization tools for Linux
   Features:
   - Battery optimization algorithms
   - System performance monitoring
   - Hardware control interface
   - Cross-platform compatibility
   - Open-source community project

CURRENT INTERESTS & GOALS:
- DevOps and Site Reliability Engineering (SRE)
- Cloud-native application development
- Infrastructure automation and optimization
- Open source contributions
- Backend system architecture
- Continuous learning in emerging technologies

AVAILABILITY:
Currently open to new opportunities in:
- DevOps Engineer positions
- Cloud Engineer roles
- Backend Developer positions
- Full-stack development projects
- Internships and entry-level positions

When responding:
1. Be conversational and natural, not keyword-based
2. Provide specific details when asked about projects, experience, or skills
3. For social media requests, provide the specific platform requested or all if general
4. Share relevant links when discussing projects or profiles
5. Be enthusiastic about technology and learning
6. Offer to connect for more detailed discussions
7. Understand context - if someone asks about "work" they might mean experience, projects, or current availability
8. Don't just list things - explain the significance and impact
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
        contents: `${YASH_CONTEXT}\n\nUser question: "${userMessage.content}"\n\nRemember to respond naturally and conversationally. If they ask about social media, provide specific links. If they ask about projects, include relevant GitHub links and explain the impact. Be helpful and engaging, not robotic.`
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
                    <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                      {parseMessageContent(message.content)}
                      {message.isTyping && (
                        <span className="inline-block w-2 h-4 bg-current ml-1 animate-blink">|</span>
                      )}
                    </div>
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