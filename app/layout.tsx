import type { Metadata, Viewport } from "next";
import {
  Cinzel,
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const fontVariables = `${cinzel.variable} ${cormorant.variable} ${inter.variable} ${jetbrains.variable}`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bappadityakuilya.is-a.dev";

const PERSON_NAME = "Bappaditya Kuilya";
const GITHUB_URL = "https://github.com/Bappaditya-kuilya";
const LINKEDIN_URL = "https://linkedin.com/in/bappaditya-kuilya";
const EMAIL = "bappadityakuilya@gmail.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bappaditya Kuilya | AI Systems Engineer",
    template: "%s | Bappaditya Kuilya",
  },
  description:
    "Bappaditya Kuilya — AI Systems Engineer from Kolkata, India. Building systems with Python, React, and LLM APIs.",
  keywords: [
    "Bappaditya Kuilya",
    "Bappaditya",
    "Bappaditya Kuilya portfolio",
    "Bappaditya Kuilya AI",
    "Bappaditya Kuilya engineer",
    "AI Systems Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Python Developer Kolkata",
    "React Developer India",
    "TensorFlow",
    "LLM APIs",
    "UEM Kolkata",
    "Portfolio",
  ],
  authors: [{ name: PERSON_NAME, url: siteUrl }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  applicationName: "Bappaditya Kuilya — Portfolio",
  alternates: {
    canonical: siteUrl,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Bappaditya Kuilya",
    title: "Bappaditya Kuilya | AI Systems Engineer",
    description:
      "Building systems with Python, React, and LLM APIs.",
    locale: "en_US",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Bappaditya Kuilya — AI Systems Engineer Portfolio",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bappaditya Kuilya | AI Systems Engineer",
    description:
      "Building systems with Python, React, and LLM APIs.",
    creator: "@bappaditya",
    images: ["/og.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: PERSON_NAME,
      alternateName: "Bappaditya",
      url: siteUrl,
      image: `${siteUrl}/images/bappaditya-kuilya.jpeg`,
      email: `mailto:${EMAIL}`,
      jobTitle: "AI Systems Engineer",
      description:
        "AI Systems Engineer building intelligent systems with Python, React, and LLM APIs.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Engineering & Management, Kolkata",
        url: "https://uem.edu.in",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Large Language Models",
        "Full Stack Development",
        "Python",
        "React",
        "TensorFlow",
        "Natural Language Processing",
      ],
      sameAs: [
        GITHUB_URL,
        LINKEDIN_URL,
        "https://bappadityakuilya.is-a.dev",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Bappaditya Kuilya — AI Systems Engineer Portfolio",
      description:
        "Portfolio of Bappaditya Kuilya — AI Systems Engineer from Kolkata, India.",
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Bappaditya Kuilya | AI Systems Engineer",
      description:
        "AI Systems Engineer building systems with Python, React, and LLM APIs.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
      lastReviewed: new Date().toISOString().split("T")[0],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400&display=swap"
        />
        <link rel="me" href={GITHUB_URL} />
        <link rel="me" href={LINKEDIN_URL} />
        <meta name="author" content={PERSON_NAME} />
      </head>
      <body className="antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-sakura/90 focus:px-4 focus:py-2 focus:text-sm focus:font-inter focus:text-black focus:outline-none"
        >
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CEQ63TE871"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CEQ63TE871');
          `}
        </Script>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
