import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Code2, ExternalLink, Github, Shield, Star, TrendingUp, Users, Zap } from "lucide-react";

const projects = [
  {
    title: "K8s Workflow Automation & CI/CD Pipeline",
    description: "Comprehensive Kubernetes workflow automation system with advanced CI/CD pipeline featuring Docker containerization, Helm charts, and automated deployment strategies. Integrated monitoring with Prometheus and Grafana for real-time performance tracking.",
    technologies: ["Kubernetes", "Docker", "Jenkins", "Helm", "Prometheus", "Grafana", "GitOps"],
    liveUrl: "#",
    githubUrl: "https://github.com/yashbhangale/k8s-cicd-automation",
    image: "/images/k8s-automation.png",
    status: "Featured",
    stats: { stars: "45", users: "DevOps Teams", growth: "Growing" },
    category: "DevOps Automation",
    achievements: [
      "Reduced deployment time by 70% with automated pipelines",
      "Implemented zero-downtime deployments with rolling updates",
      "Enhanced system reliability with comprehensive monitoring",
      "Streamlined developer workflows with GitOps practices"
    ]
  },
  {
    title: "AWS Infrastructure as Code (Terraform)",
    description: "Production-ready AWS infrastructure automation using Terraform with multi-environment support, auto-scaling capabilities, and cost optimization strategies. Features VPC setup, EKS clusters, RDS databases, and comprehensive security configurations.",
    technologies: ["Terraform", "AWS", "EKS", "RDS", "VPC", "Auto Scaling", "CloudWatch"],
    liveUrl: "#",
    githubUrl: "https://github.com/yashbhangale/aws-terraform-infrastructure",
    image: "/images/aws-terraform.png",
    status: "Production",
    stats: { stars: "38", users: "Cloud Engineers", growth: "Stable" },
    category: "Cloud Infrastructure",
    achievements: [
      "Automated infrastructure provisioning for multiple environments",
      "Implemented cost-effective auto-scaling solutions",
      "Enhanced security with AWS best practices",
      "Reduced manual configuration errors by 90%"
    ]
  },
  {
    title: "Monitoring & Alerting Stack",
    description: "Complete observability solution combining Prometheus, Grafana, and ELK stack for comprehensive monitoring, logging, and alerting. Features custom dashboards, intelligent alerting rules, and performance optimization insights.",
    technologies: ["Prometheus", "Grafana", "ELK Stack", "AlertManager", "Jaeger", "Custom Metrics"],
    liveUrl: "#",
    githubUrl: "https://github.com/yashbhangale/monitoring-stack",
    image: "/images/monitoring-stack.png",
    status: "Open Source",
    stats: { stars: "67", users: "SRE Teams", growth: "Popular" },
    category: "Monitoring & Observability",
    achievements: [
      "Real-time system monitoring with 99.9% uptime visibility",
      "Intelligent alerting reducing false positives by 85%",
      "Custom performance dashboards for business metrics",
      "Distributed tracing for microservices troubleshooting"
    ]
  },
  {
    title: "SubmitMateAi - AI-powered Job Application SaaS",
    description: "A SaaS platform that automates and optimizes the job application process using AI. Features advanced job search, smart job description analysis, resume builder and optimizer, one-click portfolio builder, cover letter and referral message generator, and an AI-powered chatbot for job search, research, and document optimization. Over 200+ users on the waiting list. Early access available.",
    technologies: ["AI", "SaaS", "Resume Parsing", "Job Search", "Chatbot", "Automation", "Web App"],
    liveUrl: "https://lnkd.in/eGzvzdUq",
    githubUrl: "#",
    image: "/images/submitmate.png",
    status: "Beta",
    stats: { stars: "200+ Waitlist", users: "Job Seekers", growth: "Launching Soon" },
    category: "SaaS Platform",
    achievements: [
      "Advanced job search and smart job description analysis",
      "Resume builder and optimizer for higher ATS scores",
      "One-click portfolio builder with 100+ design styles",
      "AI-powered chatbot for job search, research, and document optimization"
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Featured": return "bg-gradient-to-r from-yellow-500 to-orange-500";
    case "Production": return "bg-gradient-to-r from-green-500 to-emerald-500";
    case "Sold": return "bg-gradient-to-r from-purple-500 to-pink-500";
    case "Open Source": return "bg-gradient-to-r from-blue-500 to-cyan-500";
    default: return "bg-gradient-to-r from-primary to-purple-600";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Featured": return Award;
    case "Production": return Shield;
    case "Sold": return TrendingUp;
    case "Open Source": return Code2;
    default: return Star;
  }
};

export function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            My Work
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-[800px] text-xl text-muted-foreground leading-relaxed">
            Innovative solutions spanning{" "}
            <span className="text-primary font-semibold">DevOps automation</span>,{" "}
            <span className="text-purple-600 font-semibold">infrastructure monitoring</span>, and{" "}
            <span className="text-primary font-semibold">system optimization</span>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => {
            const StatusIcon = getStatusIcon(project.status);
            return (
              <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Project Header */}
                <div className="relative h-96 overflow-hidden rounded-t-2xl">
                  {/* Project Image */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getStatusColor(project.status)} text-white border-0 shadow-lg flex items-center gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                  
                  {/* Project Stats */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center text-sm text-white/80">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{project.stats.users}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{project.stats.growth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="space-y-4">
                  <div className="space-y-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Key Achievements */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {project.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Technologies:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs px-2 py-1 hover:bg-primary/10 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    {project.liveUrl !== "#" && (
                      <Button 
                        className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300" 
                        size="sm"
                        asChild
                      >
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {project.status === "Sold" ? "View Site" : "Live Demo"}
                        </a>
                      </Button>
                    )}
                    {project.githubUrl !== "#" && (
                      <Button 
                        variant="outline" 
                        className="flex-1 border-2 hover:bg-primary/5 transition-all duration-300" 
                        size="sm"
                        asChild
                      >
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    )}
                    {project.liveUrl === "#" && project.githubUrl === "#" && (
                      <Button 
                        variant="outline" 
                        className="flex-1 border-2" 
                        size="sm"
                        disabled
                      >
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="inline-block bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 border-0">
            <CardContent className="p-8">
              <div className="space-y-4">
                <Zap className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">Want to see more?</h3>
                <p className="text-muted-foreground max-w-md">
                  Explore my GitHub for more DevOps projects, automation scripts, and infrastructure solutions
                </p>
                <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" asChild>
                  <a href="https://github.com/yashbhangale" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Visit GitHub Profile
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 