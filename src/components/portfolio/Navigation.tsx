"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoonIcon, SunIcon, MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export function Navigation() {
  const [isDark, setIsDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleNavigation = (item: { id: string; label: string; href?: string; external?: boolean }) => {
    if (item.href) {
      if (item.external) {
        // Open external links in new tab
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(item.href);
      }
    } else {
      // If we're on a blog page or ask-ai page, navigate back to home with the section anchor
      if (pathname.startsWith('/blog') || pathname.startsWith('/ask-ai')) {
        router.push(`/#${item.id}`);
      } else {
        // If we're on the main page, scroll to the section
        const element = document.getElementById(item.id);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false); // Close mobile menu after navigation
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "blog", label: "Blog", href: "/blog" },
    { id: "ask-ai", label: "Ask AI", href: "/ask-ai" },
    { id: "notes", label: "Notes", href: "https://notes.hiremefor.cloud", external: true },
    { id: "resume", label: "Resume", href: "https://drive.google.com/file/d/1n-1y_jhFgNIF7MCfV0ktf_QFfucBD5cX/view", external: true },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-xl font-bold hover:text-primary transition-colors cursor-pointer">
            Yash Bhangale
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuLink
                    className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary ${
                      item.id === 'resume' 
                        ? 'text-blue-400 relative animate-pulse hover:animate-none bg-blue-400/10 rounded-lg border border-blue-400/30 hover:bg-blue-400/20 hover:border-blue-400/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/25' 
                        : ''
                    }`}
                    onClick={() => handleNavigation(item)}
                  >
                    {item.label}
                    {item.id === 'resume' && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                      </span>
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:block">
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
              <SheetHeader className="flex-shrink-0">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="grid gap-4 py-6">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`justify-start h-12 text-lg font-medium transition-all duration-300 ${
                        item.id === 'resume' 
                          ? 'text-blue-400 bg-blue-400/10 border border-blue-400/30 hover:bg-blue-400/20 hover:border-blue-400/50 animate-pulse hover:animate-none relative' 
                          : ''
                      }`}
                      onClick={() => handleNavigation(item)}
                    >
                      {item.label}
                      {item.id === 'resume' && (
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                      )}
                    </Button>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-muted-foreground mb-4">Quick Actions</p>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleNavigation({ id: "contact", label: "Contact" })}
                      >
                        Get in Touch
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleNavigation({ id: "projects", label: "Projects" })}
                      >
                        View Projects
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleNavigation({ id: "resume", label: "Resume", href: "https://drive.google.com/file/d/1n-1y_jhFgNIF7MCfV0ktf_QFfucBD5cX/view", external: true })}
                      >
                        My Resume
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
} 