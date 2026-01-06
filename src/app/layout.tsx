import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hire Yash Bhangale | Expert DevOps Engineer & Backend Developer",
    template: "%s | Yash Bhangale - DevOps & Cloud Specialist"
  },
  description: "Hire Yash Bhangale, a skilled DevOps Engineer and Backend Developer specializing in Kubernetes, AWS, Azure, CI/CD pipelines, and cloud-native solutions. 1+ years experience with proven track record in infrastructure automation, monitoring, and scalable application development.",
  keywords: [
    "hire devops engineer",
    "hire backend developer", 
    "yash bhangale",
    "devops engineer for hire",
    "kubernetes expert",
    "aws specialist",
    "azure cloud engineer",
    "ci cd pipeline specialist",
    "infrastructure automation expert",
    "cloud native developer",
    "sigNoz specialist",
    "prometheus monitoring",
    "docker kubernetes consultant",
    "terraform expert",
    "argocd specialist",
    "trivy security scanning",
    "helm charts expert",
    "node.js backend developer",
    "python developer for hire",
    "react developer",
    "mumbai hackathon winner",
    "smart india hackathon finalist",
    "remote devops engineer",
    "freelance cloud engineer",
    "yashbhangale.site",
    "full stack developer india",
    "bangalore devops engineer",
    "mumbai backend developer"
  ],
  authors: [{ name: "Yash Bhangale", url: "https://yashbhangale.site" }],
  creator: "Yash Bhangale",
  publisher: "Yash Bhangale",
  classification: "Technology Portfolio",
  category: "Software Development",
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://yashbhangale.site"),
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/en-US',
      'en': '/'
    }
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://yashbhangale.site",
    title: "Hire Yash Bhangale | Expert DevOps Engineer & Backend Developer",
    description: "Hire a skilled DevOps Engineer with 1+ years experience in Kubernetes, AWS, Azure, CI/CD pipelines, and infrastructure automation. Mumbai Hackathon winner available for remote work.",
    siteName: "Hire Yash Bhangale - DevOps & Cloud Specialist",
    firstName: "Yash",
    lastName: "Bhangale",
    username: "yashbhangale",
    gender: "male",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yash Bhangale - DevOps Engineer and Backend Developer Portfolio",
        type: "image/png"
      },
      {
        url: "/yash-bhangale.webm",
        width: 400,
        height: 400,
        alt: "Yash Bhangale - Video Introduction",
        type: "video/webm"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yashbhangale",
    creator: "@yashbhangale",
    title: "Hire Yash Bhangale | Expert DevOps Engineer & Backend Developer",
    description: "DevOps Engineer specializing in Kubernetes, AWS, Azure, CI/CD pipelines. Mumbai Hackathon winner. Available for hire.",
    images: {
      url: "/og-image.png",
      alt: "Yash Bhangale - DevOps Engineer Portfolio"
    }
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": 30,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": 30,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" }
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.png"]
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code when available
    yandex: "your-yandex-verification-code",
    other: {
      'facebook-domain-verification': 'your-facebook-verification-code'
    }
  },
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Maharashtra, India',
    'geo.position': '19.0760;72.8777',
    'ICBM': '19.0760, 72.8777'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://yashbhangale.site" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Yash Bhangale" />
        <meta name="application-name" content="Yash Bhangale Portfolio" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Enhanced SEO */}
        <meta name="rating" content="general" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        
        {/* Schema.org structured data will be added via JSON-LD in components */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
