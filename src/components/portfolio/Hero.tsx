  "use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Mail, Code, FileText } from "lucide-react";
import { HomelabShowcase } from "@/components/portfolio/HomelabShowcase";

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
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      itemScope
      itemType="https://schema.org/Person"
    >
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
              <span itemProp="jobTitle">Software Engineer & Product Builder</span>
            </Badge>

            <div className="space-y-8">
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                itemProp="name"
              >
                Hey, I&apos;m{" "}
                <span className="relative">
                  <span 
                    className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent"
                    itemProp="givenName"
                  >
                    Yash
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-xl -z-10" />
                </span>
              </h1>

              <div className="max-w-3xl mx-auto">
                <p 
                  className="text-xl sm:text-2xl text-muted-foreground leading-relaxed"
                  itemProp="description"
                >
                  I build end-to-end products and scalable applications{" "}
                  <span className="text-primary font-semibold">with expertise in</span>{" "}
                  <span className="text-blue-200 font-semibold">full-stack development, rapid prototyping,</span> and{" "}
                  <span className="text-blue-200 font-semibold">product engineering.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Interactive homelab architecture showcase */}
          <HomelabShowcase />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center" itemProp="award">
              <div className="text-2xl sm:text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">products built</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">1+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center" itemProp="award">
              <div className="text-2xl sm:text-3xl font-bold text-primary">2</div>
              <div className="text-sm text-muted-foreground">Hackathons won</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Contact Yash Bhangale for hiring opportunities"
            >
              <Mail className="mr-2 h-4 w-4" />
              Hire Me
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToProjects}
              className="w-full sm:w-auto border-2 hover:bg-primary/5 transition-all duration-300"
              aria-label="View Yash Bhangale's portfolio projects"
            >
              <Code className="mr-2 h-4 w-4" />
              View Portfolio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 hover:bg-primary/5 transition-all duration-300"
              asChild
              aria-label="Download Yash Bhangale's resume"
            >
              <a href="https://drive.google.com/file/d/1n-1y_jhFgNIF7MCfV0ktf_QFfucBD5cX/view" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center">
            <Button 
              variant="ghost" 
              size="lg" 
              className="hover:bg-primary/10 transition-colors" 
              asChild
              aria-label="Visit Yash Bhangale's GitHub profile"
            >
              <a 
                href="https://github.com/yashbhangale" 
                target="_blank" 
                rel="noopener noreferrer"
                itemProp="sameAs"
              >
                <GitHubLogoIcon className="h-8 w-8" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="hover:bg-primary/10 transition-colors" 
              asChild
              aria-label="Connect with Yash Bhangale on LinkedIn"
            >
              <a 
                href="https://linkedin.com/in/yashbhangale" 
                target="_blank" 
                rel="noopener noreferrer"
                itemProp="sameAs"
              >
                <LinkedInLogoIcon className="h-8 w-8" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="hover:bg-primary/10 transition-colors" 
              asChild
              aria-label="Email Yash Bhangale"
            >
              <a 
                href="mailto:yashbhangale9@gmail.com"
                itemProp="email"
              >
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