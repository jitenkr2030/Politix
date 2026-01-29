import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from '@/components/providers'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Politix - AI-Powered Political Management Platform",
  description: "Comprehensive political management platform with AI-driven insights, voter analysis, and campaign optimization tools.",
  keywords: ["Politix", "Political Management", "AI", "Campaign", "Voter Analysis", "Next.js", "TypeScript"],
  authors: [{ name: "Politix Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Politix - AI-Powered Political Management",
    description: "Comprehensive political management platform with AI-driven insights",
    url: "https://politix.app",
    siteName: "Politix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Politix - AI-Powered Political Management",
    description: "Comprehensive political management platform with AI-driven insights",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
