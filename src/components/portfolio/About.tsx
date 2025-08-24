import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Lightbulb, Heart, Zap, Coffee, Award, GraduationCap, MapPin, Globe } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "DevOps & Cloud Advocate",
    description: "Specializing in Kubernetes, AWS, Azure, and cloud-native solutions"
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Turning complex infrastructure challenges into automated solutions"
  },
  {
    icon: Globe,
    title: "Cloud Integration",
    description: "Deploying and scaling applications using AWS, Azure, and containerization technologies"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Optimizing application performance, API response times, and system reliability"
  }
];

const interests = ["DevOps ⚙️", "Cloud ☁️", "Linux 🐧", "Backend 🔧", "Open Source 🚀", "Hackathons 🏆"];

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
            A DevOps-focused{" "}
            <span className="text-primary font-semibold" itemProp="jobTitle">Software Engineer</span> with expertise in{" "}
            <span className="text-blue-600 font-semibold">infrastructure automation and cloud technologies</span>. I specialize in building reliable{" "}
            <span className="text-primary font-semibold">Kubernetes clusters, CI/CD pipelines, and scalable cloud applications</span> that solve complex infrastructure challenges.
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
                  <CardTitle className="text-2xl">My DevOps Journey</CardTitle>
                  <CardDescription className="text-base">
                    From AI Studies → DevOps Expertise → Full-Stack Engineering
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Currently pursuing <span itemProp="alumniOf">B.Tech in Artificial Intelligence and Data Science at Dattameghe College of Engineering</span> 
                  with a CGPA of 8.2. My journey evolved from AI fundamentals to DevOps mastery, focusing on 
                  infrastructure automation, monitoring, and cloud-native development.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, I combine software engineering principles with advanced DevOps practices to deliver 
                  production-grade solutions. With <span itemProp="experienceLevel">1+ years of hands-on experience</span> and multiple hackathon victories including 
                  <span itemProp="award">Mumbai Hacks (1st place)</span> and <span itemProp="award">Smart India Hackathon (Runner-up)</span>, 
                  I&apos;m passionate about creating scalable infrastructure and robust monitoring systems.
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
                  <CardTitle className="text-2xl">My DevOps Approach</CardTitle>
                  <CardDescription className="text-base">
                    Designing and automating scalable, secure infrastructure systems
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I specialize in <span itemProp="knowsAbout">Kubernetes orchestration</span>, <span itemProp="knowsAbout">CI/CD pipeline optimization</span>, 
                and <span itemProp="knowsAbout">infrastructure automation</span>. My experience spans container management, 
                cloud deployment strategies, and comprehensive monitoring solutions using industry-leading tools.
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
                  <p className="font-semibold" itemProp="credentialCategory">Cloud Certifications</p>
                  <p className="text-2xl font-bold text-primary">4+</p>
                  <p className="text-sm text-muted-foreground" itemProp="about">Azure & Kubernetes certifications</p>
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
                  <p className="font-semibold">DevOps Technologies</p>
                  <p className="text-2xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">Kubernetes, Docker, AWS, Azure, CI/CD tools</p>
                </div>
                <div className="space-y-2">
                  <Code className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Preferred Platform</p>
                  <p className="text-2xl font-bold text-primary">Linux</p>
                  <p className="text-sm text-muted-foreground">Creator of Nanite AI OS distribution</p>
                </div>
                <div className="space-y-2">
                  <Globe className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Cloud Platforms</p>
                  <p className="text-2xl font-bold text-primary">Multi-Cloud</p>
                  <p className="text-sm text-muted-foreground">AWS, Azure, Digital Ocean expertise</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 