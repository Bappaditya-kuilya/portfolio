import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
