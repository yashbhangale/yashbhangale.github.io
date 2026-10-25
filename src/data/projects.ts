export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  impact: string;
  description: string;
  technologies: string[];
  category: string;
  status: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  architecture?: boolean;
  architectureAlt?: string;
  architectureTag?: string;
  achievements: string[];
  caseStudy?: { heading: string; body: string }[];
  liveUrl?: string;
  githubUrl?: string;
  referenceUrl?: string;
  detailsUrl?: string;
  pipelineScreenshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
}

export const projects: Project[] = [
  {
    id: "aws-landing-zone",
    caseStudy: [
      {
            "heading": "Problem",
            "body": "Create a consistent AWS foundation for enterprise workloads without mixing development, UAT, production, and security responsibilities in one account."
      },
      {
            "heading": "Architecture & ownership",
            "body": "Designed approximately 12 accounts across workload environments and shared security, logging, configuration, backup, and infrastructure functions. Terraform makes provisioning repeatable; Organizations and Control Tower establish the governance foundation."
      },
      {
            "heading": "Engineering decisions",
            "body": "Account boundaries separate environments and responsibilities. IAM Identity Center centralizes workforce access; SCPs set organization-wide limits. Central audit trails and configuration monitoring provide a shared view across accounts."
      },
      {
            "heading": "Security & operational trade-offs",
            "body": "Account isolation reduces the scope of failures and access mistakes, while adding cross-account IAM and networking complexity. Centralized logging, threat detection, backups, and cost visibility support operations across those boundaries."
      },
      {
            "heading": "Results",
            "body": "Delivered isolated Dev, UAT, and Production environments with centralized governance, security guardrails, audit visibility, and billing controls. Client identity, account IDs, and internal network details are withheld."
      }
],
    shortTitle: "AWS Landing Zone",
    summary: "A secure multi-account AWS foundation for one of India’s largest supermarket chains.",
    impact: "Approximately 12 AWS accounts with security guardrails and centralized governance.",
    title: "Enterprise AWS Landing Zone",
    description: "Designed and implemented an approximately 12-account AWS landing zone for one of India’s largest supermarket chains. Built a secure multi-account cloud foundation spanning security, centralized logging and configuration, backups, shared infrastructure, and isolated Dev, UAT, and Production workloads, with centralized cost and billing management.",
    technologies: ["AWS", "Terraform", "AWS Organizations", "Control Tower", "IAM Identity Center", "SCPs", "CloudTrail", "AWS Config", "Security Hub", "GuardDuty", "AWS Backup", "Transit Gateway", "Cost Explorer", "AWS Budgets"],
    image: "/imgs/aws-landing-zone-architecture.png",
    architecture: true,
    architectureAlt: "AWS landing zone architecture showing account isolation, security guardrails, centralized logging, networking, backup, and Dev, UAT, and Production workloads",
    architectureTag: "Dev / UAT / Prod",
    status: "Delivered",
    category: "Cloud Infrastructure",
    achievements: [
      "Established dedicated security, log archive / CloudTrail, configuration, backup, and workload accounts with organizational guardrails",
      "Provisioned isolated Dev, UAT, and Production environments using Terraform for consistent, repeatable infrastructure",
      "Applied security best practices through least-privilege access, centralized audit trails, configuration monitoring, and threat detection",
      "Implemented backup and disaster recovery foundations alongside centralized billing, budgets, tagging, and cost visibility"
    ]
  },
  {
    id: "omniroute",
    shortTitle: "OmniRoute AI Gateway",
    summary: "One API endpoint for coding assistants, chat tools, and agents across multiple model providers.",
    impact: "Provider routing and quota-aware failover in a private homelab.",
    title: "OmniRoute - Homelab AI Gateway Stack",
    description: "Built a personal AI gateway that connects coding assistants, chat interfaces, and agents to multiple free and low-cost model providers through one OpenAI-compatible endpoint. OmniRoute handles round-robin routing, provider abstraction, and quota-aware model switching, while Tailscale provides private remote access to the stack.",
    technologies: ["OmniRoute", "LLM Gateway", "OpenAI-Compatible API", "Tailscale", "OpenRouter", "AgentRouter", "Claude Code", "Open WebUI", "OpenClaw", "Round-Robin Routing", "Failover", "Quota Management"],
    image: "/imgs/ai-gateway-stack-architecture.png",
    architecture: true,
    architectureAlt: "Homelab AI gateway architecture: coding tools connect over Tailscale to OmniRoute for round-robin routing, model health and quota management across AgentRouter, OpenRouter, and other providers, with Open WebUI and OpenClaw sharing the backend",
    architectureTag: "One API · Multiple Models",
    status: "Homelab",
    category: "AI Infrastructure",
    achievements: [
      "Connected Claude Code through a custom endpoint and integrated Open WebUI and OpenClaw with the same OmniRoute backend",
      "Distributed requests across providers and models with round-robin routing, failover, and model health and availability tracking",
      "Managed rate limits and token quotas with automatic switching to available models as provider allowances are exhausted or reset",
      "Centralized provider keys and usage visibility behind one gateway, with encrypted remote access over a private Tailscale network"
    ]
  },
  {
    id: "security-scanner",
    caseStudy: [
      {
            "heading": "Problem",
            "body": "Different repositories require different security tools. Maintaining a separate pipeline configuration for each stack makes coverage and reporting difficult to keep consistent."
      },
      {
            "heading": "Architecture & decisions",
            "body": "A repository URL enters Jenkins. The Project Profiler detects the stack, selects relevant scanners, and runs them in parallel inside Docker. An aggregator produces HTML, JSON, SARIF, and SBOM artifacts."
      },
      {
            "heading": "Security & operational trade-offs",
            "body": "Conditional scanning avoids irrelevant work, but profiler accuracy affects coverage. Findings still need triage: a unified report supports engineering decisions without treating every tool result as equally actionable."
      },
      {
            "heading": "Results",
            "body": "Delivered one reusable pipeline integrating nine security tools, with consolidated reporting and Jenkins artifacts. The linked source and pipeline stage view document the implementation."
      }
],
    shortTitle: "DevSecOps Security Scanner",
    summary: "One Jenkins pipeline that profiles a repository and selects the security scans it needs.",
    impact: "Nine security tools, automated selection, and unified reporting.",
    title: "Security Scanner - Generic DevSecOps Pipeline",
    description: "Built a reusable, Docker-based Jenkins pipeline that turns a Git repository URL into a consolidated security report. A custom Project Profiler detects languages, frameworks, and infrastructure, selects relevant scanners, and runs scans in parallel without project-specific pipeline configuration.",
    technologies: ["Jenkins", "Docker", "Trivy", "Gitleaks", "Semgrep", "SonarQube", "Syft", "Grype", "Checkov", "Hadolint", "kube-linter", "SARIF", "SBOM"],
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
    id: "kubernetes-homelab",
    shortTitle: "Kubernetes Homelab",
    summary: "An old gaming laptop turned into a self-hosted platform with K3s, GitOps, and private admin access.",
    impact: "Personal cloud, local AI, media, and automation on one machine.",
    title: "Kubernetes Homelab - A Laptop-Sized Datacenter",
    description: "Repurposed an old gaming laptop into a self-hosted platform running a single-node K3s cluster on Ubuntu. Hosts personal cloud storage, media, local AI, home automation, and document services, with dedicated domains through Cloudflare Tunnel and private administration over Tailscale. A hands-on playground for DevOps, networking, and Kubernetes without rented cloud compute.",
    technologies: ["Linux", "Ubuntu", "Kubernetes", "K3s", "Cloudflare Tunnel", "Tailscale", "ArgoCD", "GitOps", "Sealed Secrets", "Prometheus", "Grafana", "Nextcloud", "Jellyfin", "Open WebUI", "Home Assistant", "Paperless-ngx", "Kavita", "Kasm Workspaces", "Filebrowser"],
    githubUrl: "https://lnkd.in/d5bJc-BE",
    detailsUrl: "/homelab",
    image: "/imgs/homelab-public.svg",
    imageWidth: 1672,
    imageHeight: 941,
    architecture: true,
    architectureAlt: "Single-node K3s homelab on an Ubuntu gaming laptop, with Cloudflare Tunnel ingress, Tailscale administrator access, ArgoCD GitOps, Sealed Secrets, application namespaces, and HostPath / PVC storage",
    architectureTag: "Single Node · Self-Hosted",
    status: "Homelab",
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
    id: "karpenter-autoscaling",
    caseStudy: [
      {
            "heading": "Problem",
            "body": "Intermittent AI workloads leave expensive GPU capacity idle between inference requests or jobs. The platform needs to meet workload resource requirements while reclaiming capacity as demand falls."
      },
      {
            "heading": "Architecture & ownership",
            "body": "Implemented Karpenter-driven node provisioning on Amazon EKS. Pending pods express resource requirements; Karpenter provisions suitable EC2 capacity, then consolidates underused nodes as workloads finish."
      },
      {
            "heading": "Engineering decisions",
            "body": "Selected workload-driven provisioning to match CPU, memory, and GPU requirements instead of holding fixed capacity for every peak. Used Spot where workloads tolerate interruptions and consolidation to reduce idle node time."
      },
      {
            "heading": "Scheduling & availability trade-offs",
            "body": "GPU resource requests constrain where inference pods can run. Capacity provisioning introduces startup delay; Spot interruptions and consolidation introduce disruption risk. Instance constraints and disruption settings must reflect model requirements and availability needs."
      },
      {
            "heading": "Results & cost measurement",
            "body": "GPU infrastructure billing fell by approximately 60% in this implementation. This is a workload-specific outcome, not a general savings guarantee. The comparison window, baseline spend, request volume, and detailed billing breakdown are not published here; contact me to discuss the measurement and workload context."
      }
],
    shortTitle: "AI Workload Autoscaling",
    summary: "Karpenter-powered capacity for bursty AI workloads on EKS, with right-sizing and Spot instances.",
    impact: "Approximately 60% lower GPU infrastructure billing with workload-driven capacity.",
    title: "Karpenter - Workload-Driven Autoscaling for AI on EKS",
    description: "Implemented Karpenter-based node autoscaling for bursty AI workloads on Amazon EKS. Provisions capacity when pods cannot be scheduled, selects instances to match workload resource requests, and consolidates underutilized nodes as demand drops. Combines runtime right-sizing and Spot capacity to reduce idle infrastructure spend.",
    technologies: ["Amazon EKS", "Kubernetes", "Karpenter", "Amazon EC2", "Spot Instances", "Node Autoscaling", "Node Consolidation", "AI Infrastructure", "Cost Optimization"],
    referenceUrl: "https://lnkd.in/dwzJ7sn5",
    image: "/imgs/karpenter-autoscaling-architecture.png",
    imageWidth: 800,
    imageHeight: 358,
    architecture: true,
    architectureAlt: "Karpenter autoscaling flow showing pending and unschedulable pods, just-in-time node provisioning through the cloud provider API, and consolidation into optimized capacity based on pod resource requirements",
    architectureTag: "On-Demand Capacity · Less Idle Spend",
    status: "Featured",
    category: "Kubernetes Infrastructure",
    achievements: [
      "Reduced GPU infrastructure billing by approximately 60% through workload-driven scaling and capacity optimization",
      "Provisioned nodes in response to unschedulable pods rather than keeping fixed node-group capacity running for intermittent AI jobs",
      "Matched instance capacity to CPU, memory, and GPU requirements for training and inference workloads",
      "Used Spot capacity where suitable to lower compute costs for interruption-tolerant workloads",
      "Consolidated underutilized capacity and removed unneeded nodes as jobs completed or demand declined"
    ]
  },
  {
    id: "nanite",
    shortTitle: "Nanite Linux",
    summary: "A Debian-based Linux distribution built around AI/ML workflows, model hosting, and automation.",
    impact: "Cloud-ready VM templates and reproducible system builds.",
    title: "Nanite - Linux Distribution for AI/ML Engineers",
    description: "A Debian-based AI OS optimized for AI/ML workflows with integrated LLMs (LLaMA 3, Mistral), MCP agents, and n8n for AI-driven automation. Features cloud-ready VM templates and automated CI/CD builds.",
    technologies: ["Linux Kernel", "Debian", "Bash", "Python", "Docker", "Azure", "Terraform", "KVM", "GitHub Actions"],
    liveUrl: "https://github.com/Project-Nanite",
    githubUrl: "https://github.com/Project-Nanite",
    image: "/imgs/nanite.png",
    status: "Featured",
    category: "Operating System",
    achievements: [
      "Automated system build with Bash/Python optimization",
      "Cloud-ready VM templates on Azure using Terraform",
      "CI/CD pipelines via Azure DevOps and GitHub Actions",
      "Secure model updates and reproducible environments"
    ]
  },
  {
    id: "monitoring-suite",
    shortTitle: "Infrastructure Monitoring",
    summary: "Observability and vulnerability scanning with SigNoz, Prometheus, Grafana, and Trivy.",
    impact: "Custom alerts and dashboards for faster incident detection.",
    title: "Infrastructure Monitoring & Vulnerability Scanning Suite",
    description: "Comprehensive monitoring solution using SigNoz and Prometheus with automated vulnerability scanning. Features 30+ custom alerting rules and multiple dashboard types for system observability.",
    technologies: ["SigNoz", "Prometheus", "Grafana", "Trivy", "Kubernetes", "Docker", "Alerting", "Security"],
    image: "/imgs/infrastructure monitoring suite.png",
    status: "Production",
    category: "DevOps",
    achievements: [
      "Configured 30+ custom alerting rules and 5 dashboard types",
      "Improved system observability and reduced MTTD by 40%",
      "Automated vulnerability scanning identifying 15+ high-severity issues",
      "Reduced security risks by 60% through continuous monitoring"
    ]
  },
  {
    id: "cryptway",
    shortTitle: "Cryptway Wallet",
    summary: "An Ethereum and ERC-20 wallet platform built and delivered through the full product lifecycle.",
    impact: "A Web3 product acquired by a fintech startup.",
    title: "Cryptway - Cryptocurrency Wallet Platform",
    description: "Secure cryptocurrency transaction wallet enabling transfers and swaps of Ethereum and ERC-20 tokens. Features integrated Web3 APIs, smart contract interaction, and complete product lifecycle management.",
    technologies: ["React", "Web3", "Smart Contracts", "Ethereum", "ERC-20", "Blockchain", "Fintech"],
    liveUrl: "https://cryptway.xyz",
    image: "/imgs/Cryptway.png",
    status: "Sold",
    category: "Blockchain",
    achievements: [
      "Full product lifecycle from architecture to delivery",
      "Secure Web3 API integration and smart contract interaction",
      "Successfully sold platform to fintech startup",
      "End-to-end ownership showcasing real-world impact"
    ]
  },
  {
    id: "lenovo-vantage-linux",
    shortTitle: "Lenovo Vantage for Linux",
    summary: "Power management, battery controls, and system utilities for Lenovo laptops running Linux.",
    impact: "Open-source utilities that fill a gap in Linux hardware support.",
    title: "Lenovo Vantage Features for Linux",
    description: "Linux port of essential Lenovo Vantage features for power management, battery optimization, and system controls. Addresses the gap in official Linux support for Lenovo laptop management tools.",
    technologies: ["Linux", "System Programming", "Power Management", "Bash", "Python", "Hardware Interface"],
    githubUrl: "https://github.com/yashbhangale/lenovo-vantage-features-for-linux",
    image: "/imgs/Lenovo_Vantage_for_Linux.png",
    status: "Open Source",
    category: "System Tool",
    achievements: [
      "Power management features tailored for Linux systems",
      "Battery performance optimization tools",
      "System optimization utilities for Lenovo laptops",
      "Community-driven development and support"
    ]
  },
  {
    id: "submitmate",
    shortTitle: "SubmitMateAI",
    summary: "An AI-powered job application platform with resume tools, portfolio creation, and application assistance.",
    impact: "Job search and document automation in one SaaS platform.",
    title: "SubmitMateAi - AI-powered Job Application SaaS",
    description: "A SaaS platform that automates and optimizes the job application process using AI. Features advanced job search, smart job description analysis, resume builder and optimizer, one-click portfolio builder, cover letter and referral message generator, and an AI-powered chatbot for job search, research, and document optimization. Over 200+ users on the waiting list. Early access available.",
    technologies: ["AI", "SaaS", "Resume Parsing", "Job Search", "Chatbot", "Automation", "Web App"],
    liveUrl: "https://lnkd.in/eGzvzdUq",
    image: "/imgs/submitmate.png",
    status: "Beta",
    category: "SaaS Platform",
    achievements: [
      "Advanced job search and smart job description analysis",
      "Resume builder and optimizer for higher ATS scores",
      "One-click portfolio builder with 100+ design styles",
      "AI-powered chatbot for job search, research, and document optimization"
    ]
  }
];

const featuredIds = ["aws-landing-zone", "security-scanner", "karpenter-autoscaling"];

export const featuredProjects = featuredIds.map((id) => projects.find((project) => project.id === id)!);
