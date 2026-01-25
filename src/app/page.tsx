import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { Navigation } from "@/components/portfolio/Navigation";
import { AnchorHandler } from "@/components/portfolio/AnchorHandler";
import { AIWidget } from "@/components/ai/AIWidget";

export default function Home() {
  // Comprehensive Schema.org structured data
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://yashbhangale.site/#person",
    "name": "Yash Bhangale",
    "alternateName": ["Yash", "YashBhangale"],
    "givenName": "Yash",
    "familyName": "Bhangale",
    "gender": "Male",
    "email": "yashbhangale9@gmail.com",
    "telephone": "+91-8169362024",
    "url": "https://yashbhangale.site",
    "image": {
      "@type": "ImageObject",
      "url": "https://yashbhangale.site/yash-bhangale.webm",
      "contentUrl": "https://yashbhangale.site/yash-bhangale.mp4",
      "caption": "Yash Bhangale - Cloud / DevOps Engineer"
    },
    "jobTitle": ["Cloud Engineer", "DevOps Engineer", "Software Engineer"],
    "description": "Passionate Cloud / DevOps Engineer specializing in AWS infrastructure, DevSecOps pipelines, and automation. Mumbai Hackathon winner with 1+ years of hands-on experience building secure and scalable solutions.",
    "worksFor": {
      "@type": "Organization",
      "name": "OneTure Technology",
      "description": "Cloud / DevOps Engineer"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Cloud / DevOps Engineer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Remote",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      },
      "skills": [
        "AWS Cloud",
        "DevSecOps",
        "Infrastructure as Code",
        "Terraform",
        "Docker",
        "Kubernetes",
        "CI/CD Pipelines",
        "Cloud Architecture",
        "System Administration",
        "Python",
        "Bash Scripting"
      ],
      "responsibilities": [
        "Cloud infrastructure management and optimization",
        "DevSecOps pipeline implementation",
        "Infrastructure automation using IaC",
        "Container orchestration and management",
        "Security compliance and monitoring"
      ]
    },
    "knowsAbout": [
      {
        "@type": "Thing",
        "name": "Full-Stack Development",
        "description": "End-to-end application development across frontend and backend"
      },
      {
        "@type": "Thing", 
        "name": "Product Engineering",
        "description": "Building scalable products from concept to market"
      },
      {
        "@type": "Thing",
        "name": "Rapid Prototyping",
        "description": "Fast iteration and MVP development for startups"
      },
      {
        "@type": "Thing",
        "name": "React",
        "description": "Modern frontend development with React ecosystem"
      },
      {
        "@type": "Thing",
        "name": "Node.js",
        "description": "Server-side JavaScript development and API creation"
      }
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Dattameghe College of Engineering",
      "location": "Maharashtra, India",
      "description": "B.Tech in Artificial Intelligence and Data Science (2021-2025, CGPA: 8.2)"
    },
    "award": [
      {
        "@type": "Award",
        "name": "Mumbai Hacks Winner",
        "description": "1st Prize winner at Mumbai Hacks - World's largest Gen AI hackathon",
        "dateAwarded": "2024"
      },
      {
        "@type": "Award", 
        "name": "Smart India Hackathon Finalist",
        "description": "Runner-up at Smart India Hackathon - National level competition",
        "dateAwarded": "2024"
      }
    ],
    "sameAs": [
      "https://github.com/yashbhangale",
      "https://linkedin.com/in/yashbhangale",
      "https://twitter.com/yashbhangale"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8169362024",
      "contactType": "professional",
      "email": "yashbhangale9@gmail.com",
      "availableLanguage": "English"
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://yashbhangale.site/#website",
    "url": "https://yashbhangale.site",
    "name": "Hire Yash Bhangale - Cloud / DevOps Engineer",
    "description": "Professional portfolio of Yash Bhangale, passionate Cloud / DevOps Engineer available for hire. Specializing in AWS, DevSecOps, and Infrastructure Automation.",
    "publisher": {
      "@id": "https://yashbhangale.site/#person"
    },
    "inLanguage": "en-US",
    "copyrightYear": "2025",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://yashbhangale.site/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://yashbhangale.site"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://yashbhangale.site/#about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Skills",
        "item": "https://yashbhangale.site/#skills"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Projects",
        "item": "https://yashbhangale.site/#projects"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Experience",
        "item": "https://yashbhangale.site/#experience"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Contact",
        "item": "https://yashbhangale.site/#contact"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      
      <AnchorHandler />
      <Navigation />
      <main className="space-y-16 sm:space-y-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <AIWidget />
    </div>
  );
}
