import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Bappaditya Kuilya | AI Systems Engineer",
  description: "Building intelligent systems with precision, discipline, and cinematic engineering.",
  keywords: ["AI", "Machine Learning", "Full Stack", "Python", "React", "TensorFlow"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
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
      </body>
    </html>
  );
}
