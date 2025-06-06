"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MoonIcon, SunIcon, MenuIcon, X } from "lucide-react";
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

  const handleNavigation = (item: { id: string; label: string; href?: string }) => {
    if (item.href) {
      router.push(item.href);
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
                    className="cursor-pointer px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => handleNavigation(item)}
                  >
                    {item.label}
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
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-6">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="justify-start h-12 text-lg font-medium"
                    onClick={() => handleNavigation(item)}
                  >
                    {item.label}
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
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
} 