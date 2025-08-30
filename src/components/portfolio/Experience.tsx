import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, BuildingIcon, GraduationCapIcon, MapPinIcon, TrophyIcon } from "lucide-react";

const workExperience = [
  {
    company: "Trellin (Stealth AI Startup, Sweden)",
    position: "Founding Engineer (Contract)",
    period: "June 2025 – August 2025",
    location: "½ Remote",
    description: "Led technical architecture and development for a stealth AI startup, delivering a comprehensive SaaS CRM with AI-driven analytics in under 4 weeks.",
    achievements: [
      "Secured $5,000 in Azure Startup Credits and architected scalable cloud infrastructure, reducing projected hosting and deployment costs by 100% in the MVP phase",
      "Built a SaaS CRM module (React, Node.js, PostgreSQL) with Gmail API integration for customer interaction logging",
      "Developed an AI-driven customer analytics module using LangChain, Azure OpenAI, pgvector, and Supabase to detect churn/upsell opportunities via Retrieval-Augmented Generation (RAG)",
      "Delivered a functional MVP in under 4 weeks, integrating Conversational AI and Model Context Protocol for advanced client interaction workflow"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Azure", "LangChain", "OpenAI", "pgvector", "Supabase", "Gmail API", "AI/ML", "SaaS", "CRM"],
    type: "work"
  },
  {
    company: "Asynk",
    position: "Software Engineer",
    period: "September 2024 – December 2024",
    location: "Mumbai",
    description: "Designed and delivered the backend system for a travel agency and deployed a client-facing web application on Azure, handling full architecture, deployment, and scalability.",
    achievements: [
      "Designed and delivered the backend system for a travel agency using Django and Render",
      "Designed and deployed a client-facing web application on Azure",
      "Handled full architecture, deployment, and scalability requirements"
    ],
    technologies: ["Django", "Render", "Azure", "Backend Development", "Web Application", "Architecture Design"],
    type: "work"
  },
  {
    company: "Scogo Networks",
    position: "DevOps Intern",
    period: "6 months",
    location: "Remote",
    description: "Specialized in Kubernetes cluster monitoring, CI/CD optimization, and infrastructure automation. Implemented comprehensive monitoring solutions and security scanning processes.",
    achievements: [
      "Implemented SigNoz for Kubernetes Cluster monitoring with 30+ alerting mechanisms",
      "Designed 5 types of dashboards for comprehensive metric visualizations",
      "Deployed infrastructure and applications (n8n, Hoppscotch, Mermaid) on AWS, Azure",
      "Integrated Trivy with GitHub Actions, identifying 15 high-severity vulnerabilities",
      "Improved deployment stability by 25% using ArgoCD and Helm charts with HPA",
      "Built 50+ PowerShell and Bash scripts for IT support automation"
    ],
    technologies: ["Kubernetes", "SigNoz", "ArgoCD", "Helm", "Trivy", "AWS", "Azure", "GitHub Actions", "PowerShell", "Bash"],
    type: "work",
    website: "scogo.ai"
  },
  {
    company: "Raydium Labs",
    position: "SDE Intern",
    period: "2 months",
    location: "Remote",
    description: "Focused on blockchain development and NFT marketplace optimization. Enhanced API performance and implemented secure transaction processing with significant improvements in user experience.",
    achievements: [
      "Integrated NFT APIs with frontend, reducing redundant API calls by 70%",
      "Enhanced API response times from 2-3 seconds to 350 milliseconds",
      "Configured Moralis and Infura achieving 95% transaction success rate",
      "Reduced gas fees by 20% through efficient smart contract execution",
      "Cut average execution time from 4 seconds to 2.5 seconds"
    ],
    technologies: ["React", "Node.js", "Moralis", "Infura", "Smart Contracts", "NFT APIs", "Blockchain"],
    type: "work"
  },
  {
    company: "Freelance Projects",
    position: "Full-Stack Developer",
    period: "Various",
    location: "Remote",
    description: "Developed custom web applications for clients, including government portals and business solutions.",
    achievements: [
      "Built BJP Divyang Portal with comprehensive accessibility features",
      "Implemented user management and government compliance features"
    ],
    technologies: ["PHP", "Laravel", "Bootstrap", "HTML5", "CSS3", "JavaScript"],
    type: "work"
  },
  {
    company: "Dattameghe College of Engineering",
    position: "B.Tech in Artificial Intelligence and Data Science",
    period: "2021 - 2025",
    location: "Maharashtra, India",
    description: "Pursuing comprehensive education in AI, ML, and Data Science with strong focus on practical applications. Active participant in hackathons and technical competitions.",
    achievements: [
      "Current CGPA: 8.2",
      "Mumbai Hacks - 1st Prize (World's largest Gen AI hackathon)",
      "Smart India Hackathon - Runner-up (National level)",
      "Winner of multiple intracollege competitions (AI Sparks, CSI Ideathon)"
    ],
    technologies: ["Python", "Machine Learning", "Data Science", "AI", "Statistics", "Algorithms"],
    type: "education"
  }
];

const certifications = [
  { name: "AZ-900", description: "Azure Fundamentals", issuer: "Microsoft" },
  { name: "AI-900", description: "Azure AI Fundamentals", issuer: "Microsoft" },
  { name: "AZ-104", description: "Azure Administrator Associate", issuer: "Microsoft" },
  { name: "CKA", description: "Certified Kubernetes Administrator (Preparing)", issuer: "CNCF" }
];

export function Experience() {
  return (
    <section 
      id="experience" 
      className="container mx-auto px-4 py-16"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 px-3 py-1">
          Professional Journey
        </Badge>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          DevOps Experience & Education
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
          <span className="text-primary font-semibold">1+ years of hands-on experience</span> in DevOps engineering, cloud technologies, and infrastructure automation
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {workExperience.map((item, index) => (
          <Card 
            key={index} 
            className="overflow-hidden border-l-4 border-l-primary/50 hover:border-l-primary transition-all duration-300 hover:shadow-lg"
            itemScope
            itemType={item.type === "work" ? "https://schema.org/WorkExperience" : "https://schema.org/EducationalOccupationalCredential"}
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {item.type === "work" ? (
                    <BuildingIcon className="h-6 w-6 text-primary" />
                  ) : (
                    <GraduationCapIcon className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                    <div className="space-y-1">
                      <CardTitle className="text-xl" itemProp={item.type === "work" ? "jobTitle" : "name"}>
                        {item.position}
                      </CardTitle>
                      <CardDescription className="text-base font-medium flex items-center gap-2">
                        <span itemProp={item.type === "work" ? "worksFor" : "credentialCategory"}>{item.company}</span>
                        {item.website && (
                          <Badge variant="outline" className="text-xs">
                            <a 
                              href={`https://${item.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              itemProp="url"
                              aria-label={`Visit ${item.company} website`}
                            >
                              {item.website}
                            </a>
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span itemProp="duration">{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span itemProp="location">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed" itemProp="description">
                {item.description}
              </p>
              
              {item.achievements && (
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrophyIcon className="h-4 w-4 text-primary" />
                    Key Achievements:
                  </h4>
                  <ul className="space-y-2 ml-6" itemProp="accomplishment">
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground relative">
                        <span className="absolute -left-4 top-2 w-1 h-1 bg-primary rounded-full"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Technologies & Tools:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs" itemProp="skillsRequired">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications Section */}
      <div className="max-w-5xl mx-auto mt-16">
        <Card className="bg-gradient-to-r from-primary/5 via-blue-500/5 to-primary/5 border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Professional Certifications & Learning</CardTitle>
            <CardDescription>
              Continuous professional development in cloud technologies and DevOps practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((cert, index) => (
                <Card 
                  key={index} 
                  className="text-center p-4 hover:shadow-md transition-shadow"
                  itemScope
                  itemType="https://schema.org/EducationalOccupationalCredential"
                >
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-lg font-bold" itemProp="name">
                      {cert.name}
                    </Badge>
                    <p className="text-sm font-medium" itemProp="description">{cert.description}</p>
                    <p className="text-xs text-muted-foreground" itemProp="credentialCategory">{cert.issuer}</p>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 