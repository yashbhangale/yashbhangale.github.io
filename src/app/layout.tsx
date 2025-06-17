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
    default: "Yash Bhangale | Software Engineer & Full-Stack Developer",
    template: "%s | Yash Bhangale"
  },
  description: "Software Engineer specializing in backend development, cloud integration, and scalable applications. Experienced in Node.js, Python, React, AWS, and modern web technologies.",
  keywords: [
    "Yash Bhangale",
    "Software Engineer", 
    "Full-Stack Developer",
    "Backend Developer",
    "Node.js Developer",
    "Python Developer", 
    "React Developer",
    "AWS Cloud Engineer",
    "Web Developer",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "DevOps",
    "API Development",
    "Microservices",
    "Cloud Computing"
  ],
  authors: [{ name: "Yash Bhangale" }],
  creator: "Yash Bhangale",
  publisher: "Yash Bhangale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yashbhangale.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashbhangale.github.io",
    title: "Yash Bhangale | Software Engineer & Full-Stack Developer",
    description: "Software Engineer specializing in backend development, cloud integration, and scalable applications. Experienced in Node.js, Python, React, AWS, and modern web technologies.",
    siteName: "Yash Bhangale Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yash Bhangale - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Bhangale | Software Engineer & Full-Stack Developer",
    description: "Software Engineer specializing in backend development, cloud integration, and scalable applications.",
    images: ["/og-image.png"],
    creator: "@yashbhangale",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://yashbhangale.github.io" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
