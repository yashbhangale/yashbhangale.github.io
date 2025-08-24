import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export function Contact() {
  return (
    <section 
      id="contact" 
      className="container mx-auto px-4 py-16"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Hire Me for Your Next Project
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
          Ready to bring <span className="text-primary font-semibold">DevOps expertise</span> and <span className="text-blue-600 font-semibold">backend development skills</span> to your team. Let&apos;s build something amazing together!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6 sm:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Ready to hire? Reach out through any of these channels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                <MailIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <a 
                    href="mailto:yashbhangale9@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    itemProp="email"
                    aria-label="Send email to Yash Bhangale"
                  >
                    yashbhangale9@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                <PhoneIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a 
                    href="tel:+918169362024" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    itemProp="telephone"
                    aria-label="Call Yash Bhangale"
                  >
                    +91 8169362024
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground" itemProp="homeLocation">Maharashtra, India (Remote Available)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Let&apos;s Work Together</CardTitle>
            <CardDescription>
              Looking for a DevOps Engineer or Backend Developer?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              I&apos;m currently <span className="text-primary font-semibold">available for DevOps engineering roles</span> and <span className="text-blue-600 font-semibold">backend development positions</span>. 
              Whether you need expertise in Kubernetes orchestration, CI/CD pipeline optimization, 
              cloud infrastructure automation, or scalable backend development, I&apos;d love to discuss your project requirements.
            </p>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">What I can help with:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Kubernetes cluster setup and monitoring</li>
                <li>• CI/CD pipeline design and optimization</li>
                <li>• Cloud infrastructure automation (AWS/Azure)</li>
                <li>• Backend API development and optimization</li>
                <li>• Infrastructure security and monitoring</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" 
                asChild
                aria-label="Send email to hire Yash Bhangale"
              >
                <a href="mailto:yashbhangale9@gmail.com?subject=Hiring Inquiry - DevOps Engineer&body=Hi Yash, I'm interested in discussing a potential opportunity...">
                  <MailIcon className="mr-2 h-4 w-4" />
                  Send Hiring Inquiry
                </a>
              </Button>
              
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  aria-label="Visit Yash Bhangale's GitHub profile"
                >
                  <a 
                    href="https://github.com/yashbhangale" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                  >
                    <GitHubLogoIcon className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  aria-label="Connect with Yash Bhangale on LinkedIn"
                >
                  <a 
                    href="https://linkedin.com/in/yashbhangale" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                  >
                    <LinkedInLogoIcon className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  aria-label="Call Yash Bhangale"
                >
                  <a href="tel:+918169362024">
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
          © 2025 <span itemProp="name">Yash Bhangale</span>. Available for hire as DevOps Engineer & Backend Developer. Built with Next.js and shadcn/ui.
        </p>
      </div>
    </section>
  );
} 