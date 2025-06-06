import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Lightbulb, Heart, Zap, Coffee, Music, GraduationCap, MapPin } from "lucide-react";

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
    icon: Heart,
    title: "Open Source Contributor",
    description: "Building tools and distributions that help the developer community"
  },
  {
    icon: Zap,
    title: "Performance Focused",
    description: "Optimizing CI/CD pipelines, monitoring, and system reliability"
  }
];

const interests = ["DevOps ⚙️", "Cloud ☁️", "Linux 🐧", "Backend 🔧", "Open Source 🚀", "Hackathons 🏆"];

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Get to know me
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="mx-auto max-w-[800px] text-xl text-muted-foreground leading-relaxed">
            A passionate developer specializing in{" "}
            <span className="text-primary font-semibold">DevOps</span>,{" "}
            <span className="text-purple-600 font-semibold">cloud technologies</span>, and{" "}
            <span className="text-primary font-semibold">scalable infrastructure</span>
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
                  <CardTitle className="text-2xl">My Journey</CardTitle>
                  <CardDescription className="text-base">
                    From AI/DS student to DevOps specialist
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Currently pursuing B.Tech in Artificial Intelligence and Data Science at Dattameghe College of Engineering 
                  with a CGPA of 8.2. My journey started with curiosity about AI but evolved into a deep passion for 
                  DevOps, cloud infrastructure, and building scalable systems.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With 1 year of hands-on experience and multiple hackathon victories including Mumbai Hacks (world's largest Gen AI hackathon), 
                  I believe in creating technology that empowers developers and enhances system reliability.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Personal Info:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span>B.Tech AI & Data Science</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>CGPA: 8.2</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">What drives me:</h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-sm px-3 py-1">
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
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">My Approach</CardTitle>
                  <CardDescription className="text-base">
                    Building reliable, scalable infrastructure
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I specialize in DevOps practices, cloud-native technologies, and infrastructure automation. 
                My experience spans Kubernetes orchestration, CI/CD pipeline optimization, and security integration 
                with tools like SigNoz, ArgoCD, and Trivy.
              </p>
              
              <div className="grid gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 p-1">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium mb-1">{item.title}</h5>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 border-0 mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold">Recent Achievements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Zap className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Mumbai Hacks</p>
                  <p className="text-2xl font-bold text-primary">1st</p>
                  <p className="text-sm text-muted-foreground">World's largest Gen AI hackathon winner</p>
                </div>
                <div className="space-y-2">
                  <Code className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Smart India Hackathon</p>
                  <p className="text-2xl font-bold text-primary">Runner-up</p>
                  <p className="text-sm text-muted-foreground">National level competition finalist</p>
                </div>
                <div className="space-y-2">
                  <Music className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Certifications</p>
                  <p className="text-2xl font-bold text-primary">4+</p>
                  <p className="text-sm text-muted-foreground">Azure & Kubernetes certifications</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts Section */}
        <Card className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 border-0">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold">Fun Facts About Me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Coffee className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Scripts Written</p>
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">PowerShell and Bash automation scripts</p>
                </div>
                <div className="space-y-2">
                  <Code className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Favorite OS</p>
                  <p className="text-2xl font-bold text-primary">Linux</p>
                  <p className="text-sm text-muted-foreground">Creator of Nanite AI OS distribution</p>
                </div>
                <div className="space-y-2">
                  <Music className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">Deployment Platform</p>
                  <p className="text-2xl font-bold text-primary">K8s</p>
                  <p className="text-sm text-muted-foreground">Kubernetes orchestration specialist</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 