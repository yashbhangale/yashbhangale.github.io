"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Mail, Code, FileText } from "lucide-react";

export function Hero() {

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-muted/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted/30 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto text-center space-y-12">

          {/* Code block intro */}
          <div className="space-y-6">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Code className="w-4 h-4 mr-2" />
              Software Engineer
            </Badge>

            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Hey, I&apos;m{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
                    Yash
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-xl -z-10" />
                </span>
              </h1>

              <div className="max-w-3xl mx-auto">
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
                  I build robust applications and scalable systems{" "}
                  <span className="text-primary font-semibold">with a passion for</span>{" "}
                  <span className="text-blue-200 font-semibold">backend engineering, cloud integration,</span> and{" "}
                  <span className="text-blue-200 font-semibold">performance optimization.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Code snippet style showcase */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border rounded-lg overflow-hidden shadow-lg">
              <div className="bg-muted/50 px-4 py-2 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <span className="text-sm text-muted-foreground font-mono ml-2">developer.js</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                  Available for work
                </Badge>
              </div>

              <div className="p-6 font-mono text-sm text-left space-y-3">
                <div className="flex">
                  <span className="text-muted-foreground mr-4 w-6">1</span>
                  <span className="text-blue-500">const</span>
                  <span className="text-white ml-2">developer</span>
                  <span className="text-muted-foreground ml-2">=</span>
                  <span className="text-yellow-500 ml-2">{"{"}</span>
                </div>

                <div className="flex">
                  <span className="text-muted-foreground mr-4 w-6">2</span>
                  <span className="ml-4 text-green-400">name</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-orange-400 ml-2">&apos;Yash Bhangale&apos;</span>
                  <span className="text-muted-foreground">,</span>
                </div>

                <div className="flex">
                  <span className="text-muted-foreground mr-4 w-6">3</span>
                  <span className="ml-4 text-green-400">role</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-orange-400 ml-2">&apos;Software Engineer (Backend &amp; Cloud)&apos;</span>
                  <span className="text-muted-foreground">,</span>
                </div>

                <div className="flex">
                  <span className="text-muted-foreground mr-4 w-6">4</span>
                  <span className="ml-4 text-green-400">skills</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-yellow-500 ml-2">[
                    &apos;Node.js&apos;,
                    &apos;Python&apos;,
                    &apos;React&apos;,
                    &apos;Next.js&apos;,
                    &apos;TypeScript&apos;,
                    &apos;JavaScript&apos;,
                    &apos;Java&apos;,
                    &apos;PostgreSQL&apos;,
                    &apos;AWS&apos;,
                    &apos;Docker&apos;,
                    &apos;Linux&apos;,
                    &apos;Git&apos;,
                    &apos;CI/CD&apos;,
                    &apos;Kubernetes&apos;,
                    &apos;Azure&apos;,
                    &apos;HTML&apos;,
                    &apos;CSS&apos;,
                    &apos;SQL&apos;,
                    &apos;Bash&apos;,
                    &apos;Jenkins&apos;,
                    &apos;Terraform&apos;,
                    &apos;Grafana&apos;,
                    &apos;Prometheus&apos;,
                    &apos;n8n&apos;
                    ]</span>
                  <span className="text-muted-foreground">,</span>
                </div>

                <div className="flex">
                  <span className="text-muted-foreground mr-4 w-6">5</span>
                  <span className="ml-4 text-green-400">experience</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-purple-400 ml-2">1</span>
                  <span className="text-muted-foreground">,</span>
                  <span className="text-gray-500 ml-2">{/* years in software development */}</span>
                </div>

                <div className="flex">
                  <span className="text-muted-foreground mr-4 w-6">6</span>
                  <span className="ml-4 text-green-400">education</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-orange-400 ml-2">&apos;B.Tech AI &amp; Data Science 2025&apos;</span>
                  <span className="text-muted-foreground">,</span>
                </div>

                <div className="flex">
                  <span className="text-muted-foreground mr-4 w-6">7</span>
                  <span className="ml-4 text-green-400">passion</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-orange-400 ml-2">&apos;Building reliable backend systems and scalable applications&apos;</span>
                </div>

                <div className="flex">
                  <span className="text-muted-foreground mr-4 w-6">8</span>
                  <span className="text-yellow-500">{"}"}</span>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-4 w-6">9</span>
                    <span className="text-blue-500">export default</span>
                    <span className="text-white ml-2">developer</span>
                    <span className="bg-white/20 w-2 h-5 ml-1 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">12+</div>
              <div className="text-sm text-muted-foreground">projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">1</div>
              <div className="text-sm text-muted-foreground">Year Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">4+</div>
              <div className="text-sm text-muted-foreground">Hackthons won</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Mail className="mr-2 h-4 w-4" />
              Let&apos;s Connect
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToProjects}
              className="w-full sm:w-auto border-2 hover:bg-primary/5 transition-all duration-300"
            >
              <Code className="mr-2 h-4 w-4" />
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 hover:bg-primary/5 transition-all duration-300"
              asChild
            >
              <a href="https://drive.google.com/file/d/1n-1y_jhFgNIF7MCfV0ktf_QFfucBD5cX/view" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                My Resume
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center">
            <Button variant="ghost" size="lg" className="hover:bg-primary/10 transition-colors" asChild>
              <a href="https://github.com/yashbhangale" target="_blank" rel="noopener noreferrer">
                <GitHubLogoIcon className="h-8 w-8" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="hover:bg-primary/10 transition-colors" asChild>
              <a href="https://linkedin.com/in/yashbhangale" target="_blank" rel="noopener noreferrer">
                <LinkedInLogoIcon className="h-8 w-8" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="hover:bg-primary/10 transition-colors" asChild>
              <a href="mailto:yashbhangale9@gmail.com">
                <Mail className="h-8 w-8" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 