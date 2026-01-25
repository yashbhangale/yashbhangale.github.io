import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Lightbulb, Heart, Zap, Coffee, Award, GraduationCap, MapPin, Globe } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Cloud / DevOps Engineer",
    description: "Designing and managing scalable cloud infrastructure and secure CI/CD pipelines"
  },
  {
    icon: Lightbulb,
    title: "Product Engineer",
    description: "Turning ideas into scalable products that solve real-world problems"
  },
  {
    icon: Globe,
    title: "Cloud Architect",
    description: "Architecting resilient and high-availability cloud solutions on AWS and Azure"
  },
  {
    icon: Zap,
    title: "Technical Generalist",
    description: "Versatile engineer comfortable across the entire technology stack"
  }
];

const interests = ["Cloud Computing ☁️", "DevSecOps 🔒", "Infrastructure as Code 🏗️", "Open Source 🌟", "Hackathons 🏆", "Problem Solving 🧠"];

export function About() {
  return (
    <section 
      id="about" 
      className="relative py-24"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Get to know me
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            About Yash Bhangale
          </h2>
          
          {/* Profile Video */}
          <div className="flex justify-center mb-8">
            <div className="relative w-[120px] h-[120px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full blur-sm opacity-75 animate-pulse"></div>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                width={120} 
                height={120}
                className="relative rounded-full border-4 border-background shadow-xl object-cover w-full h-full"
                style={{ aspectRatio: '1/1' }}
                itemProp="image"
                aria-label="Yash Bhangale video introduction"
              >
                <source src="/yash-bhangale.webm" type="video/webm" />
                <source src="/yash-bhangale.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <p 
            className="mx-auto max-w-[800px] text-xl text-muted-foreground leading-relaxed"
            itemProp="description"
          >
            A passionate{" "}
            <span className="text-primary font-semibold" itemProp="jobTitle">Cloud / DevOps Engineer</span> who loves building{" "}
            <span className="text-blue-600 font-semibold">secure and scalable infrastructure</span>. I specialize in automating workflows and optimizing cloud environments through{" "}
            <span className="text-primary font-semibold">DevSecOps practices, Infrastructure as Code, and Cloud Architecture</span>.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 mb-12 sm:mb-16">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">My Engineering Journey</CardTitle>
                  <CardDescription className="text-base">
                    From AI Studies → Full-Stack Development → Cloud / DevOps Engineering
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Currently pursuing <span itemProp="alumniOf">B.Tech in Artificial Intelligence and Data Science at Dattameghe College of Engineering</span> 
                  with a CGPA of 8.2. My journey evolved from AI fundamentals to full-stack development, and now to 
                  Cloud and DevOps engineering, focusing on building robust infrastructure.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, I combine software engineering principles with cloud architecture to deliver 
                  scalable solutions. With <span itemProp="experienceLevel">1+ years of hands-on experience</span> and multiple hackathon victories including 
                  <span itemProp="award">Mumbai Hacks (1st place)</span> and <span itemProp="award">Smart India Hackathon (Runner-up)</span>, 
                  I&apos;m passionate about automating and securing the software delivery lifecycle.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Professional Details:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span itemProp="educationalCredential">B.Tech AI & Data Science</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>CGPA: 8.2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span itemProp="homeLocation">Maharashtra, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span>Remote Work Available</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">What drives me:</h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-sm px-3 py-1" itemProp="knowsAbout">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">My Building Philosophy</CardTitle>
                  <CardDescription className="text-base">
                    Creating user-centric products with clean code and scalable architecture
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I specialize in <span itemProp="knowsAbout">full-stack development</span>, <span itemProp="knowsAbout">rapid prototyping</span>, 
                and <span itemProp="knowsAbout">product engineering</span>. My experience spans web applications, mobile development, 
                API design, and scaling products from MVP to production using modern technologies and best practices.
              </p>
              
              <div className="grid gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 p-1">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium mb-1" itemProp="knowsAbout">{item.title}</h5>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="bg-gradient-to-r from-primary/5 via-blue-500/5 to-primary/5 border-0 mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold">Recent Achievements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2" itemProp="award" itemScope itemType="https://schema.org/Award">
                  <Zap className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold" itemProp="name">Mumbai Hacks</p>
                  <p className="text-2xl font-bold text-primary">1st</p>
                  <p className="text-sm text-muted-foreground" itemProp="description">World&apos;s largest Gen AI hackathon winner</p>
                </div>
                <div className="space-y-2" itemProp="award" itemScope itemType="https://schema.org/Award">
                  <Code className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold" itemProp="name">Smart India Hackathon</p>
                  <p className="text-2xl font-bold text-primary">Runner-up</p>
                  <p className="text-sm text-muted-foreground" itemProp="description">National level competition finalist</p>
                </div>
                <div className="space-y-2" itemProp="hasCredential" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
                  <Award className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold" itemProp="credentialCategory">Products Built</p>
                  <p className="text-2xl font-bold text-primary">10+</p>
                  <p className="text-sm text-muted-foreground" itemProp="about">Full-stack applications & MVPs</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Expertise Section */}
        <Card className="bg-gradient-to-r from-primary/5 via-blue-500/5 to-primary/5 border-0">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold">Technical Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Coffee className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Full-Stack Technologies</p>
                  <p className="text-2xl font-bold text-primary">20+</p>
                  <p className="text-sm text-muted-foreground">React, Node.js, Python, TypeScript, Next.js</p>
                </div>
                <div className="space-y-2">
                  <Code className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Development Focus</p>
                  <p className="text-2xl font-bold text-primary">Product</p>
                  <p className="text-sm text-muted-foreground">Building scalable applications & MVPs</p>
                </div>
                <div className="space-y-2">
                  <Globe className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Deployment & Scale</p>
                  <p className="text-2xl font-bold text-primary">Cloud-Native</p>
                  <p className="text-sm text-muted-foreground">AWS, Azure, Docker, Kubernetes expertise</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 