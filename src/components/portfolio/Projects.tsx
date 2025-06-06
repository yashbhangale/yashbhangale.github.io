import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Star, Zap, Users, TrendingUp, Award, Shield, Code2 } from "lucide-react";

const projects = [
  {
    title: "Nanite - Linux Distribution for AI/ML Engineers",
    description: "A Debian-based AI OS optimized for AI/ML workflows with integrated LLMs (LLaMA 3, Mistral), MCP agents, and n8n for AI-driven automation. Features cloud-ready VM templates and automated CI/CD builds.",
    technologies: ["Linux Kernel", "Debian", "Bash", "Python", "Docker", "Azure", "Terraform", "KVM", "GitHub Actions"],
    liveUrl: "https://github.com/Project-Nanite",
    githubUrl: "https://github.com/Project-Nanite",
    image: "/project1.jpg",
    status: "Featured",
    stats: { stars: "Custom OS", users: "AI/ML", growth: "Production" },
    category: "Operating System",
    achievements: [
      "Automated system build with Bash/Python optimization",
      "Cloud-ready VM templates on Azure using Terraform",
      "CI/CD pipelines via Azure DevOps and GitHub Actions",
      "Secure model updates and reproducible environments"
    ]
  },
  {
    title: "Infrastructure Monitoring & Vulnerability Scanning Suite",
    description: "Comprehensive monitoring solution using SigNoz and Prometheus with automated vulnerability scanning. Features 30+ custom alerting rules and multiple dashboard types for system observability.",
    technologies: ["SigNoz", "Prometheus", "Grafana", "Trivy", "Kubernetes", "Docker", "Alerting", "Security"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/project2.jpg",
    status: "Production",
    stats: { stars: "30+ Rules", users: "40% MTTD", growth: "60% Secure" },
    category: "DevOps",
    achievements: [
      "Configured 30+ custom alerting rules and 5 dashboard types",
      "Improved system observability and reduced MTTD by 40%",
      "Automated vulnerability scanning identifying 15+ high-severity issues",
      "Reduced security risks by 60% through continuous monitoring"
    ]
  },
  {
    title: "Cryptway - Cryptocurrency Wallet Platform",
    description: "Secure cryptocurrency transaction wallet enabling transfers and swaps of Ethereum and ERC-20 tokens. Features integrated Web3 APIs, smart contract interaction, and complete product lifecycle management.",
    technologies: ["React", "Web3", "Smart Contracts", "Ethereum", "ERC-20", "Blockchain", "Fintech"],
    liveUrl: "https://cryptway.xyz",
    githubUrl: "#",
    image: "/project3.jpg",
    status: "Sold",
    stats: { stars: "Web3", users: "Fintech", growth: "Acquired" },
    category: "Blockchain",
    achievements: [
      "Full product lifecycle from architecture to delivery",
      "Secure Web3 API integration and smart contract interaction",
      "Successfully sold platform to fintech startup",
      "End-to-end ownership showcasing real-world impact"
    ]
  },
  {
    title: "Lenovo Vantage Features for Linux",
    description: "Linux port of essential Lenovo Vantage features for power management, battery optimization, and system controls. Addresses the gap in official Linux support for Lenovo laptop management tools.",
    technologies: ["Linux", "System Programming", "Power Management", "Bash", "Python", "Hardware Interface"],
    liveUrl: "#",
    githubUrl: "https://github.com/yashbhangale/lenovo-vantage-features-for-linux",
    image: "/project4.jpg",
    status: "Open Source",
    stats: { stars: "Linux", users: "Lenovo", growth: "Community" },
    category: "System Tool",
    achievements: [
      "Power management features tailored for Linux systems",
      "Battery performance optimization tools",
      "System optimization utilities for Lenovo laptops",
      "Community-driven development and support"
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
                <div className="relative h-48 bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
                          <ExternalLinkIcon className="h-4 w-4" />
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
                          <GitHubLogoIcon className="h-4 w-4" />
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
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
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