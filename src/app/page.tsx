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
    "@id": "https://hiremefor.cloud/#person",
    "name": "Yash Bhangale",
    "alternateName": ["Yash", "YashBhangale"],
    "givenName": "Yash",
    "familyName": "Bhangale",
    "gender": "Male",
    "email": "yashbhangale9@gmail.com",
    "telephone": "+91-8169362024",
    "url": "https://hiremefor.cloud",
    "image": {
      "@type": "ImageObject",
      "url": "https://hiremefor.cloud/yash-bhangale.webm",
      "contentUrl": "https://hiremefor.cloud/yash-bhangale.mp4",
      "caption": "Yash Bhangale - Software Engineer and Product Builder"
    },
    "jobTitle": ["Software Engineer", "Full-Stack Developer", "Product Builder"],
    "description": "Passionate Software Engineer and Product Builder specializing in full-stack development, rapid prototyping, and scalable applications. Mumbai Hackathon winner with 1+ years of hands-on experience building end-to-end solutions.",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance",
      "description": "Available for hire as Software Engineer and Product Builder"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Engineer",
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
        "Full-Stack Development",
        "Product Engineering",
        "Rapid Prototyping",
        "React",
        "Node.js",
        "Python",
        "TypeScript",
        "Next.js",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "CI/CD Pipelines",
        "API Development",
        "Database Design",
        "System Architecture",
        "Startup Experience",
        "MVP Development"
      ],
      "responsibilities": [
        "Full-stack application development and deployment",
        "Product architecture and system design",
        "Rapid prototyping and MVP development",
        "API development and integration",
        "Database design and optimization"
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
    "@id": "https://hiremefor.cloud/#website",
    "url": "https://hiremefor.cloud",
    "name": "Hire Yash Bhangale - Software Engineer & Product Builder",
    "description": "Professional portfolio of Yash Bhangale, passionate Software Engineer and Product Builder available for hire. Specializing in full-stack development, rapid prototyping, and scalable applications.",
    "publisher": {
      "@id": "https://hiremefor.cloud/#person"
    },
    "inLanguage": "en-US",
    "copyrightYear": "2025",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://hiremefor.cloud/?q={search_term_string}"
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
        "item": "https://hiremefor.cloud"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://hiremefor.cloud/#about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Skills",
        "item": "https://hiremefor.cloud/#skills"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Projects",
        "item": "https://hiremefor.cloud/#projects"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Experience",
        "item": "https://hiremefor.cloud/#experience"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Contact",
        "item": "https://hiremefor.cloud/#contact"
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
