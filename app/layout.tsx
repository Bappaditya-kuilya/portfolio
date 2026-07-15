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
    "Bappaditya Kuilya — AI Systems Engineer from Kolkata, India. Building intelligent systems with precision, discipline, and cinematic engineering. Python, React, LLM APIs, and full-stack craft.",
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
    "React",
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
    canonical: "/",
  },
  // Paste the token from Google Search Console (Settings → Ownership
  // verification → HTML tag) into NEXT_PUBLIC_GOOGLE_VERIFICATION to claim
  // the site. This is the single biggest lever for ranking on your name.
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Bappaditya Kuilya",
    title: "Bappaditya Kuilya | AI Systems Engineer",
    description:
      "Building intelligent systems with precision, discipline, and cinematic engineering.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bappaditya Kuilya | AI Systems Engineer",
    description:
      "Building intelligent systems with precision, discipline, and cinematic engineering.",
    creator: "@bappaditya",
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
  themeColor: "#030303",
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
      email: `mailto:${EMAIL}`,
      jobTitle: "AI Systems Engineer",
      description:
        "AI Systems Engineer building intelligent systems with Python, React, and LLM APIs.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Engineering & Management, Kolkata",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Large Language Models",
        "Full Stack Development",
        "Python",
        "React",
      ],
      sameAs: [GITHUB_URL, LINKEDIN_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Bappaditya Kuilya — Portfolio",
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Bappaditya Kuilya | AI Systems Engineer",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
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
        <link
          rel="preload"
          as="image"
          href="/images/cinematic-sakura-noble.webp"
          type="image/webp"
        />
        {/* Noto Serif JP (CJK) is huge and only used for decorative Japanese
            text. It can't be self-hosted via next/font in this Next version,
            so it is loaded from Google with display=swap — only this tiny CSS
            blocks render, the woff2 is swapped in non-blocking. */}
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
      </head>
      <body className="antialiased">
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
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
