import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Star, Zap, Users, TrendingUp, Award, Shield, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Enterprise AWS Landing Zone",
    description: "Designed and implemented an end-to-end AWS landing zone for one of India’s largest supermarket chains. Built a secure multi-account cloud foundation spanning security, centralized logging and configuration, backups, shared infrastructure, and isolated Dev, UAT, and Production workloads, with centralized cost and billing management.",
    technologies: ["AWS", "Terraform", "AWS Organizations", "Control Tower", "IAM Identity Center", "SCPs", "CloudTrail", "AWS Config", "Security Hub", "GuardDuty", "AWS Backup", "Transit Gateway", "Cost Explorer", "AWS Budgets"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/imgs/aws-landing-zone-architecture.png",
    architecture: true,
    architectureAlt: "AWS landing zone architecture showing account isolation, security guardrails, centralized logging, networking, backup, and Dev, UAT, and Production workloads",
    architectureTag: "Dev / UAT / Prod",
    status: "Delivered",
    stats: { stars: "Multi-Account", users: "Dev / UAT / Prod", growth: "Terraform" },
    category: "Cloud Infrastructure",
    achievements: [
      "Established dedicated security, log archive / CloudTrail, configuration, backup, and workload accounts with organizational guardrails",
      "Provisioned isolated Dev, UAT, and Production environments using Terraform for consistent, repeatable infrastructure",
      "Applied security best practices through least-privilege access, centralized audit trails, configuration monitoring, and threat detection",
      "Implemented backup and disaster recovery foundations alongside centralized billing, budgets, tagging, and cost visibility"
    ]
  },
  {
    title: "OmniRoute - Homelab AI Gateway Stack",
    description: "Built a personal AI gateway that connects coding assistants, chat interfaces, and agents to multiple free and low-cost model providers through one OpenAI-compatible endpoint. OmniRoute handles round-robin routing, provider abstraction, and quota-aware model switching, while Tailscale provides private remote access to the stack.",
    technologies: ["OmniRoute", "LLM Gateway", "OpenAI-Compatible API", "Tailscale", "OpenRouter", "AgentRouter", "Claude Code", "Open WebUI", "OpenClaw", "Round-Robin Routing", "Failover", "Quota Management"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/imgs/ai-gateway-stack-architecture.png",
    architecture: true,
    architectureAlt: "Homelab AI gateway architecture: coding tools connect over Tailscale to OmniRoute for round-robin routing, model health and quota management across AgentRouter, OpenRouter, and other providers, with Open WebUI and OpenClaw sharing the backend",
    architectureTag: "One API · Multiple Models",
    status: "Homelab",
    stats: { stars: "Unified API", users: "Multi-Provider", growth: "Smart Routing" },
    category: "AI Infrastructure",
    achievements: [
      "Connected Claude Code through a custom endpoint and integrated Open WebUI and OpenClaw with the same OmniRoute backend",
      "Distributed requests across providers and models with round-robin routing, failover, and model health and availability tracking",
      "Managed rate limits and token quotas with automatic switching to available models as provider allowances are exhausted or reset",
      "Centralized provider keys and usage visibility behind one gateway, with encrypted remote access over a private Tailscale network"
    ]
  },
  {
    title: "Security Scanner - Generic DevSecOps Pipeline",
    description: "Built a reusable, Docker-based Jenkins pipeline that turns a Git repository URL into a consolidated security report. A custom Project Profiler detects languages, frameworks, and infrastructure, selects relevant scanners, and runs scans in parallel without project-specific pipeline configuration.",
    technologies: ["Jenkins", "Docker", "Trivy", "Gitleaks", "Semgrep", "SonarQube", "Syft", "Grype", "Checkov", "Hadolint", "kube-linter", "SARIF", "SBOM"],
    liveUrl: "#",
    githubUrl: "https://github.com/yashbhangale/security-scanner",
    image: "/imgs/devsecops-pipeline-architecture.png",
    imageHeight: 702,
    architecture: true,
    architectureAlt: "Security Scanner architecture: a repository URL flows through Jenkins and the Project Profiler into nine conditional security tools, then a result aggregator produces HTML, JSON, SARIF, and SBOM reports for Jenkins, email, and Slack",
    architectureTag: "9 Tools · One Pipeline",
    pipelineScreenshot: {
      src: "/imgs/devsecops-jenkins-stage-view.png",
      alt: "Jenkins Security Scanner stage view showing project profiling, conditional scanning stages, report generation, archiving, and notifications across pipeline runs",
      width: 1280,
      height: 641,
      caption: "Jenkins pipeline runs — profiling, security scans, report generation, and delivery"
    },
    status: "Open Source",
    stats: { stars: "9 Tools", users: "Auto Profiling", growth: "Unified Reports" },
    category: "DevSecOps",
    achievements: [
      "Built a Project Profiler that maps Dockerfiles to Hadolint, Terraform to Checkov, and Kubernetes manifests to kube-linter",
      "Combined Trivy and Gitleaks with conditional Semgrep / SonarQube analysis and Syft / Grype dependency scanning and SBOM generation",
      "Orchestrated relevant scans in parallel and aggregated findings into a unified report instead of running every tool on every repository",
      "Generated HTML dashboards, JSON, SARIF, and SBOM outputs, with Jenkins artifacts and email / Slack delivery",
      "Containerized the scanner stack with Docker for repeatable setup across projects"
    ]
  },
  {
    title: "Kubernetes Homelab - A Laptop-Sized Datacenter",
    description: "Repurposed an old gaming laptop into a self-hosted platform running a single-node K3s cluster on Ubuntu. Hosts personal cloud storage, media, local AI, home automation, and document services, with dedicated domains through Cloudflare Tunnel and private administration over Tailscale. A hands-on playground for DevOps, networking, and Kubernetes without rented cloud compute.",
    technologies: ["Linux", "Ubuntu", "Kubernetes", "K3s", "Cloudflare Tunnel", "Tailscale", "ArgoCD", "GitOps", "Sealed Secrets", "Prometheus", "Grafana", "Nextcloud", "Jellyfin", "Open WebUI", "Home Assistant", "Paperless-ngx", "Kavita", "Kasm Workspaces", "Filebrowser"],
    liveUrl: "#",
    githubUrl: "https://lnkd.in/d5bJc-BE",
    detailsUrl: "/homelab",
    image: "/imgs/kubernetes-homelab-architecture.png",
    imageHeight: 698,
    architecture: true,
    architectureAlt: "Single-node K3s homelab on an Ubuntu gaming laptop, with Cloudflare Tunnel ingress, Tailscale administrator access, ArgoCD GitOps, Sealed Secrets, application namespaces, and HostPath / PVC storage",
    architectureTag: "Single Node · Self-Hosted",
    status: "Homelab",
    stats: { stars: "K3s", users: "Self-Hosted", growth: "GitOps" },
    category: "Platform Engineering",
    achievements: [
      "Hosted Nextcloud, Jellyfin, Open WebUI with local LLMs, Home Assistant, Paperless-ngx, Kavita, Kasm Workspaces, and Filebrowser on one Kubernetes machine",
      "Exposed services through individual domains using Cloudflare Tunnel while keeping administrative access behind Tailscale",
      "Used ArgoCD to reconcile Kubernetes manifests from Git and Sealed Secrets to manage encrypted credentials",
      "Configured HostPath and persistent volume claims for shared storage, with read-only or read-write mounts suited to each application",
      "Added Prometheus and Grafana observability to support troubleshooting and experimentation across the self-hosted stack"
    ]
  },
  {
    title: "Karpenter - Workload-Driven Autoscaling for AI on EKS",
    description: "Implemented Karpenter-based node autoscaling for bursty AI workloads on Amazon EKS. Provisions capacity when pods cannot be scheduled, selects instances to match workload resource requests, and consolidates underutilized nodes as demand drops. Combines runtime right-sizing and Spot capacity to reduce idle infrastructure spend.",
    technologies: ["Amazon EKS", "Kubernetes", "Karpenter", "Amazon EC2", "Spot Instances", "Node Autoscaling", "Node Consolidation", "AI Infrastructure", "Cost Optimization"],
    liveUrl: "#",
    githubUrl: "#",
    referenceUrl: "https://lnkd.in/dwzJ7sn5",
    image: "/imgs/karpenter-autoscaling-architecture.png",
    imageWidth: 800,
    imageHeight: 358,
    architecture: true,
    architectureAlt: "Karpenter autoscaling flow showing pending and unschedulable pods, just-in-time node provisioning through the cloud provider API, and consolidation into optimized capacity based on pod resource requirements",
    architectureTag: "On-Demand Capacity · Less Idle Spend",
    status: "Featured",
    stats: { stars: "Autoscaling", users: "AI Workloads", growth: "Right-Sizing" },
    category: "Kubernetes Infrastructure",
    achievements: [
      "Provisioned nodes in response to unschedulable pods rather than keeping fixed node-group capacity running for intermittent AI jobs",
      "Matched instance capacity to CPU, memory, and GPU requirements for training and inference workloads",
      "Used Spot capacity where suitable to lower compute costs for interruption-tolerant workloads",
      "Consolidated underutilized capacity and removed unneeded nodes as jobs completed or demand declined"
    ]
  },
  {
    title: "Nanite - Linux Distribution for AI/ML Engineers",
    description: "A Debian-based AI OS optimized for AI/ML workflows with integrated LLMs (LLaMA 3, Mistral), MCP agents, and n8n for AI-driven automation. Features cloud-ready VM templates and automated CI/CD builds.",
    technologies: ["Linux Kernel", "Debian", "Bash", "Python", "Docker", "Azure", "Terraform", "KVM", "GitHub Actions"],
    liveUrl: "https://github.com/Project-Nanite",
    githubUrl: "https://github.com/Project-Nanite",
    image: "/imgs/nanite.png",
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
    image: "/imgs/infrastructure monitoring suite.png",
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
    image: "/imgs/Cryptway.png",
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
    image: "/imgs/Lenovo_Vantage_for_Linux.png",
    status: "Open Source",
    stats: { stars: "Linux", users: "Lenovo", growth: "Community" },
    category: "System Tool",
    achievements: [
      "Power management features tailored for Linux systems",
      "Battery performance optimization tools",
      "System optimization utilities for Lenovo laptops",
      "Community-driven development and support"
    ]
  },
  {
    title: "SubmitMateAi - AI-powered Job Application SaaS",
    description: "A SaaS platform that automates and optimizes the job application process using AI. Features advanced job search, smart job description analysis, resume builder and optimizer, one-click portfolio builder, cover letter and referral message generator, and an AI-powered chatbot for job search, research, and document optimization. Over 200+ users on the waiting list. Early access available.",
    technologies: ["AI", "SaaS", "Resume Parsing", "Job Search", "Chatbot", "Automation", "Web App"],
    liveUrl: "https://lnkd.in/eGzvzdUq",
    githubUrl: "#",
    image: "/imgs/submitmate.png",
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
    case "Homelab": return "bg-gradient-to-r from-violet-500 to-cyan-500";
    case "Delivered": return "bg-gradient-to-r from-orange-500 to-amber-500";
    case "Production": return "bg-gradient-to-r from-green-500 to-emerald-500";
    case "Sold": return "bg-gradient-to-r from-blue-500 to-pink-500";
    case "Open Source": return "bg-gradient-to-r from-blue-500 to-cyan-500";
    default: return "bg-gradient-to-r from-primary to-blue-600";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Featured": return Award;
    case "Homelab": return Code2;
    case "Delivered": return Shield;
    case "Production": return Shield;
    case "Sold": return TrendingUp;
    case "Open Source": return Code2;
    default: return Star;
  }
};

export function Projects() {
  return (
    <section 
      id="projects" 
      className="relative py-24"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Portfolio Showcase
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Products & Projects Built
          </h2>
          <p className="mx-auto max-w-[800px] text-xl text-muted-foreground leading-relaxed">
            Diverse solutions spanning{" "}
            <span className="text-primary font-semibold">cloud infrastructure</span>,{" "}
            <span className="text-primary font-semibold">full-stack applications</span>,{" "}
            <span className="text-blue-600 font-semibold">product development</span>, and{" "}
            <span className="text-primary font-semibold">startup MVPs</span>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 px-8">
          {projects.map((project, index) => {
            const StatusIcon = getStatusIcon(project.status);
            const isArchitecture = "architecture" in project && project.architecture;
            return (
              <Card 
                key={index} 
                className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                {/* Project Image */}
                <div className={`relative overflow-hidden ${isArchitecture ? "bg-white" : "aspect-video bg-gradient-to-br from-muted/10 to-muted/30"}`}>
                  {isArchitecture ? (
                    <a href={project.image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} architecture at full size`}>
                      <Image
                        src={project.image}
                        alt={project.architectureAlt}
                        width={project.imageWidth ?? 1280}
                        height={project.imageHeight ?? 853}
                        className="w-full h-auto"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        itemProp="image"
                      />
                    </a>
                  ) : (
                    <>
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.description.slice(0, 50)}...`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    itemProp="image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className={`${getStatusColor(project.status)} text-white border-0 shadow-lg flex items-center gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      <span itemProp="status">{project.status}</span>
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm" itemProp="genre">
                      {project.category}
                    </Badge>
                  </div>
                  
                  {/* Project Stats */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="flex justify-between items-center text-sm text-white">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                          <Star className="h-3 w-3" />
                          <span className="font-medium text-xs">{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                          <Users className="h-3 w-3" />
                          <span className="font-medium text-xs">{project.stats.users}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                          <TrendingUp className="h-3 w-3" />
                          <span className="font-medium text-xs">{project.stats.growth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                    </>
                  )}
                </div>
                
                <CardHeader className="space-y-4">
                  {isArchitecture && (
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`${getStatusColor(project.status)} text-white border-0`}>{project.status}</Badge>
                      <Badge variant="secondary">{project.category}</Badge>
                      <Badge variant="outline">{project.architectureTag}</Badge>
                    </div>
                  )}
                  <div className="space-y-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors" itemProp="name">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed" itemProp="description">
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
                    <ul className="space-y-1" itemProp="achievements">
                      {project.achievements.slice(0, isArchitecture ? project.achievements.length : 2).map((achievement, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {"pipelineScreenshot" in project && project.pipelineScreenshot && (
                    <figure className="space-y-2">
                      <a
                        href={project.pipelineScreenshot.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Jenkins Security Scanner stage view at full size"
                        className="block overflow-hidden rounded-lg border focus-visible:outline-2 focus-visible:outline-ring"
                      >
                        <Image
                          src={project.pipelineScreenshot.src}
                          alt={project.pipelineScreenshot.alt}
                          width={project.pipelineScreenshot.width}
                          height={project.pipelineScreenshot.height}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="w-full h-auto"
                        />
                      </a>
                      <figcaption className="text-xs text-muted-foreground">
                        {project.pipelineScreenshot.caption}. Select image to view full size.
                      </figcaption>
                    </figure>
                  )}

                  {/* Technologies */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Technologies:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="text-xs px-2 py-1 hover:bg-primary/10 transition-colors"
                          itemProp="keywords"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {"detailsUrl" in project && project.detailsUrl && (
                    <Button variant="outline" className="w-full border-2" size="sm" asChild>
                      <Link href={project.detailsUrl}>
                        <ExternalLinkIcon className="h-4 w-4" />
                        Explore Homelab
                      </Link>
                    </Button>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    {project.liveUrl !== "#" && (
                      <Button 
                        className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300" 
                        size="sm"
                        asChild
                      >
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                          itemProp="url"
                          aria-label={`View ${project.title} live demo`}
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
                          itemProp="codeRepository"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <GitHubLogoIcon className="h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    )}
                    {"referenceUrl" in project && project.referenceUrl && (
                      <Button variant="outline" className="flex-1 border-2" size="sm" asChild>
                        <a href={project.referenceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Read more about ${project.title}`}>
                          <ExternalLinkIcon className="h-4 w-4" />
                          Project Reference
                        </a>
                      </Button>
                    )}
                    {isArchitecture && (
                      <Button variant="outline" className="flex-1 border-2" size="sm" asChild>
                        <a href={project.image} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} architecture`}>
                          <ExternalLinkIcon className="h-4 w-4" />
                          View Architecture
                        </a>
                      </Button>
                    )}
                    {!isArchitecture && project.liveUrl === "#" && project.githubUrl === "#" && (
                      <Button 
                        variant="outline" 
                        className="flex-1 border-2" 
                        size="sm"
                        disabled
                        aria-label={`${project.title} coming soon`}
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
          <Card className="inline-block bg-gradient-to-r from-primary/5 via-blue-500/5 to-primary/5 border-0">
            <CardContent className="p-8">
              <div className="space-y-4">
                <Zap className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">Want to see more products I&apos;ve built?</h3>
                <p className="text-muted-foreground max-w-md">
                  Explore my GitHub for more full-stack applications, startup projects, and innovative solutions
                </p>
                <Button 
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" 
                  asChild
                  aria-label="Visit Yash Bhangale's GitHub profile for more projects"
                >
                  <a href="https://github.com/yashbhangale" target="_blank" rel="noopener noreferrer">
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                    Explore GitHub Portfolio
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