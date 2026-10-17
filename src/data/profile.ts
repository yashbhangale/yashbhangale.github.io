export const workExperience = [
  {
    company: "OneTure Technology",
    position: "Cloud / DevOps Engineer",
    period: "November 2025 – Present",
    location: "Remote",
    description: "Working as a Cloud / DevOps Engineer focusing on AWS infrastructure and DevSecOps practices to ensure secure and scalable cloud deployments.",
    achievements: [
      "Managing and optimizing AWS cloud infrastructure for high availability and scalability",
      "Implementing DevSecOps pipelines to integrate security into the CI/CD workflow",
      "Automating infrastructure provisioning and deployment processes using Infrastructure as Code (IaC)"
    ],
    technologies: ["AWS", "DevSecOps", "CI/CD", "Terraform", "Docker", "Kubernetes", "Security"],
    type: "work"
  },
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

export const certifications = [
  { name: "AZ-900", description: "Azure Fundamentals", issuer: "Microsoft" },
  { name: "AI-900", description: "Azure AI Fundamentals", issuer: "Microsoft" },
  { name: "AZ-104", description: "Azure Administrator Associate", issuer: "Microsoft" },
  { name: "CKA", description: "Certified Kubernetes Administrator (Preparing)", issuer: "CNCF" }
];


export const skillCategories = {
  devops: [
    "Kubernetes", "Docker", "ArgoCD", "Helm", "Jenkins", "GitHub Actions", 
    "Trivy", "SigNoz", "Prometheus", "Grafana", "CI/CD", "Infrastructure as Code"
  ],
  cloud: [
    "AWS", "Azure", "Terraform", "KVM", "Azure DevOps", "VM Templates", 
    "Cloud Architecture", "Auto Scaling", "Load Balancing", "Monitoring"
  ],
  backend: [
    "Node.js", "Python", "Java", "Shell Scripting", "PowerShell", "Bash", 
    "REST APIs", "Microservices", "Linux Administration", "System Architecture"
  ],
  frontend: [
    "React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", 
    "TypeScript", "Responsive Design", "Web3 APIs", "Smart Contracts"
  ],
  databases: [
    "MongoDB", "PostgreSQL", "Database Design", "Data Modeling", 
    "Query Optimization", "Backup Strategies", "Performance Tuning"
  ],
  tools: [
    "Git", "Postman", "VS Code", "Linux", "n8n", "Hoppscotch", 
    "Mermaid", "Tactical RMM", "Moralis", "Infura", "KVM Virtualization"
  ]
};

