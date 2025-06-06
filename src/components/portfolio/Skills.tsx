import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const skillCategories = {
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

const certificationBadges = [
  { name: "AZ-900", color: "bg-blue-500" },
  { name: "AI-900", color: "bg-purple-500" },
  { name: "AZ-104", color: "bg-green-500" },
  { name: "CKA Prep", color: "bg-orange-500" }
];

export function Skills() {
  return (
    <section id="skills" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 px-3 py-1">
          Technical Expertise
        </Badge>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Skills & Technologies
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
          Comprehensive expertise in DevOps, cloud technologies, and modern development practices
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="devops" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="devops" className="text-xs sm:text-sm">DevOps</TabsTrigger>
            <TabsTrigger value="cloud" className="text-xs sm:text-sm">Cloud</TabsTrigger>
            <TabsTrigger value="backend" className="text-xs sm:text-sm">Backend</TabsTrigger>
            <TabsTrigger value="frontend" className="text-xs sm:text-sm">Frontend</TabsTrigger>
            <TabsTrigger value="databases" className="text-xs sm:text-sm">Databases</TabsTrigger>
            <TabsTrigger value="tools" className="text-xs sm:text-sm">Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="devops">
            <Card>
              <CardHeader>
                <CardTitle>DevOps & Infrastructure</CardTitle>
                <CardDescription>
                  Container orchestration, CI/CD pipelines, monitoring, and infrastructure automation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.devops.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Specializations:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Kubernetes cluster management and monitoring with SigNoz</li>
                    <li>• CI/CD pipeline optimization with 25% improvement in deployment stability</li>
                    <li>• Security scanning integration with Trivy identifying 15+ vulnerabilities</li>
                    <li>• Automation scripts: 50+ PowerShell and Bash scripts written</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cloud">
            <Card>
              <CardHeader>
                <CardTitle>Cloud Platforms & Services</CardTitle>
                <CardDescription>
                  Multi-cloud expertise with AWS, Azure, and infrastructure as code practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.cloud.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Azure Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {certificationBadges.slice(0, 3).map((cert) => (
                        <Badge key={cert.name} className={`${cert.color} text-white text-xs`}>
                          {cert.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">AWS Services</h4>
                    <p className="text-sm text-muted-foreground">EC2, S3, Lambda, CloudFormation, EKS</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="backend">
            <Card>
              <CardHeader>
                <CardTitle>Backend Development</CardTitle>
                <CardDescription>
                  Server-side programming, scripting, and system administration expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.backend.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Projects:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Nanite Linux Distribution - Debian-based AI OS with automated builds</li>
                    <li>• API performance optimization - Reduced response time from 3s to 350ms</li>
                    <li>• Smart contract optimization - 20% reduction in gas fees</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="frontend">
            <Card>
              <CardHeader>
                <CardTitle>Frontend Development</CardTitle>
                <CardDescription>
                  Modern web technologies for building responsive and interactive user interfaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.frontend.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Notable Implementations:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Cryptway - Cryptocurrency wallet with Web3 integration</li>
                    <li>• BJP Divyang Portal - Government compliance and accessibility</li>
                    <li>• NFT marketplace optimization - 70% reduction in redundant API calls</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="databases">
            <Card>
              <CardHeader>
                <CardTitle>Database Technologies</CardTitle>
                <CardDescription>
                  Relational and NoSQL databases with focus on performance and scalability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.databases.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tools">
            <Card>
              <CardHeader>
                <CardTitle>Development Tools & Platforms</CardTitle>
                <CardDescription>
                  Essential tools and platforms that enhance development workflow and productivity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.tools.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Platform Deployments:</h4>
                  <p className="text-sm text-muted-foreground">
                    Successfully deployed and managed applications like n8n, Hoppscotch, and Mermaid live editor on Kubernetes clusters across AWS and Azure environments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Skills Summary */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 border-0">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">Professional Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold">Focus Areas</h4>
                  <p className="text-muted-foreground">DevOps, Cloud Architecture, Backend Development</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Experience</h4>
                  <p className="text-muted-foreground">1 year hands-on + Multiple project deployments</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Certifications</h4>
                  <p className="text-muted-foreground">Azure certified + Kubernetes preparation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 