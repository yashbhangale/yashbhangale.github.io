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
          { name: "AI-900", color: "bg-blue-500" },
  { name: "AZ-104", color: "bg-green-500" },
  { name: "CKA Prep", color: "bg-orange-500" }
];

export function Skills() {
  return (
    <section 
      id="skills" 
      className="container mx-auto px-4 py-16"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 px-3 py-1">
          Technical Expertise
        </Badge>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Full-Stack & Product Skills
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
          Comprehensive expertise in <span className="text-primary font-semibold">full-stack development</span>, <span className="text-blue-600 font-semibold">product engineering</span>, and <span className="text-primary font-semibold">rapid prototyping</span>
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="frontend" className="text-xs sm:text-sm">Frontend</TabsTrigger>
            <TabsTrigger value="backend" className="text-xs sm:text-sm">Backend</TabsTrigger>
            <TabsTrigger value="devops" className="text-xs sm:text-sm">DevOps</TabsTrigger>
            <TabsTrigger value="cloud" className="text-xs sm:text-sm">Cloud</TabsTrigger>
            <TabsTrigger value="databases" className="text-xs sm:text-sm">Databases</TabsTrigger>
            <TabsTrigger value="tools" className="text-xs sm:text-sm">Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="frontend">
            <Card>
              <CardHeader>
                <CardTitle>Frontend Development & User Experience</CardTitle>
                <CardDescription>
                  Modern web technologies for building responsive, interactive, and accessible user interfaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.frontend.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors" itemProp="knowsAbout">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Notable Frontend Implementations:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Cryptway</strong> - Cryptocurrency wallet with Web3 integration</li>
                    <li>• <strong>BJP Divyang Portal</strong> - Government compliance and accessibility</li>
                    <li>• <strong>NFT marketplace optimization</strong> - 70% reduction in redundant API calls</li>
                    <li>• <strong>Responsive design</strong> - Mobile-first approach with Tailwind CSS</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="backend">
            <Card>
              <CardHeader>
                <CardTitle>Backend Development & System Programming</CardTitle>
                <CardDescription>
                  Server-side programming, API development, scripting, and system administration expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.backend.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors" itemProp="knowsAbout">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Backend Projects:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Nanite Linux Distribution</strong> - Debian-based AI OS with automated builds</li>
                    <li>• <strong>API performance optimization</strong> - Reduced response time from 3s to 350ms</li>
                    <li>• <strong>Smart contract optimization</strong> - 20% reduction in gas fees</li>
                    <li>• <strong>Microservices architecture</strong> - Scalable backend systems design</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="backend">
            <Card>
              <CardHeader>
                <CardTitle>Backend Development & System Programming</CardTitle>
                <CardDescription>
                  Server-side programming, API development, scripting, and system administration expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.backend.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors" itemProp="knowsAbout">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Backend Projects:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Nanite Linux Distribution</strong> - Debian-based AI OS with automated builds</li>
                    <li>• <strong>API performance optimization</strong> - Reduced response time from 3s to 350ms</li>
                    <li>• <strong>Smart contract optimization</strong> - 20% reduction in gas fees</li>
                    <li>• <strong>Microservices architecture</strong> - Scalable backend systems design</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devops">
            <Card>
              <CardHeader>
                <CardTitle>DevOps & Infrastructure Automation</CardTitle>
                <CardDescription>
                  Container orchestration, CI/CD pipeline optimization, monitoring solutions, and infrastructure automation expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.devops.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors" itemProp="knowsAbout">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">DevOps Specializations:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Kubernetes cluster management</strong> and monitoring with SigNoz and Prometheus</li>
                    <li>• <strong>CI/CD pipeline optimization</strong> with 25% improvement in deployment stability</li>
                    <li>• <strong>Security scanning integration</strong> with Trivy identifying 15+ vulnerabilities</li>
                    <li>• <strong>Infrastructure automation</strong>: 50+ PowerShell and Bash scripts written</li>
                    <li>• <strong>Container orchestration</strong> using Docker and Kubernetes with ArgoCD</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cloud">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Cloud Platform Expertise</CardTitle>
                <CardDescription>
                  AWS, Azure, and infrastructure as code practices with proven deployment experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.cloud.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors" itemProp="knowsAbout">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Azure Certified</h4>
                    <div className="flex flex-wrap gap-1">
                      {certificationBadges.slice(0, 3).map((cert) => (
                        <Badge key={cert.name} className={`${cert.color} text-white text-xs`} itemProp="hasCredential">
                          {cert.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">AWS Services</h4>
                    <p className="text-sm text-muted-foreground">EC2, S3, Lambda, CloudFormation, EKS, Auto Scaling</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="databases">
            <Card>
              <CardHeader>
                <CardTitle>Database Technologies & Data Management</CardTitle>
                <CardDescription>
                  Relational and NoSQL databases with focus on performance, scalability, and optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.databases.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors" itemProp="knowsAbout">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Database Expertise:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>PostgreSQL</strong> - Advanced SQL queries and performance optimization</li>
                    <li>• <strong>MongoDB</strong> - NoSQL database design and aggregation pipelines</li>
                    <li>• <strong>Data modeling</strong> - Relational and document-based schemas</li>
                    <li>• <strong>Query optimization</strong> - Indexing strategies and performance tuning</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tools">
            <Card>
              <CardHeader>
                <CardTitle>Development Tools & Productivity Platforms</CardTitle>
                <CardDescription>
                  Essential tools and platforms that enhance development workflow, productivity, and collaboration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.tools.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary/10 transition-colors" itemProp="knowsAbout">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Platform Deployment Expertise:</h4>
                  <p className="text-sm text-muted-foreground">
                    Successfully deployed and managed production applications including <strong>n8n automation platform</strong>, 
                    <strong>Hoppscotch API testing</strong>, and <strong>Mermaid live editor</strong> on Kubernetes clusters 
                    across AWS and Azure environments with high availability and scalability.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Skills Summary with Structured Data */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 via-blue-500/5 to-primary/5 border-0">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">Professional Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2" itemProp="hasOccupation" itemScope itemType="https://schema.org/Occupation">
                  <h4 className="font-semibold" itemProp="name">Focus Areas</h4>
                  <p className="text-muted-foreground" itemProp="skills">Full-Stack Development, Product Engineering, Rapid Prototyping</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Experience Level</h4>
                  <p className="text-muted-foreground" itemProp="experienceLevel">1+ years hands-on + Multiple production deployments</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Professional Certifications</h4>
                  <p className="text-muted-foreground">Azure certified (AZ-900, AI-900, AZ-104) + Kubernetes preparation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 