import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export function Contact() {
  return (
    <section id="contact" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Get In Touch
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
          I&apos;m always interested in new opportunities and collaborations. Let&apos;s connect!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6 sm:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Feel free to reach out through any of these channels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <a 
                    href="mailto:yashbhangale9@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    yashbhangale9@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a 
                    href="tel:+918169362025" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 8169362025
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Maharashtra, India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Let&apos;s Work Together</CardTitle>
            <CardDescription>
              Interested in collaborating or have a project in mind?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              I&apos;m currently available for DevOps internships and full-time opportunities. 
              Whether you&apos;re looking to improve your infrastructure, implement CI/CD pipelines, 
              or need expertise in cloud technologies, I&apos;d love to hear about your project.
            </p>
            
            <div className="space-y-4">
              <Button className="w-full" asChild>
                <a href="mailto:yashbhangale9@gmail.com">
                  <MailIcon className="mr-2 h-4 w-4" />
                  Send me an email
                </a>
              </Button>
              
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com/yashbhangale" target="_blank" rel="noopener noreferrer">
                    <GitHubLogoIcon className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://linkedin.com/in/yashbhangale" target="_blank" rel="noopener noreferrer">
                    <LinkedInLogoIcon className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:+918169362025">
                    <PhoneIcon className="h-4 w-4" />
                    <span className="sr-only">Phone</span>
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12 pt-8 border-t">
        <p className="text-muted-foreground">
          © 2025 Yash Bhangale. Built with Next.js and shadcn/ui.
        </p>
      </div>
    </section>
  );
} 