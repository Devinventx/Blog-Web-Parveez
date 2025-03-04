import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlogFolio - Modern Blog Platform",
  description: "An advanced blog platform built with Next.js, React, and MongoDB",
  keywords: ["blog", "nextjs", "react", "mongodb", "tailwind"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "BlogFolio - Modern Blog Platform",
    description: "An advanced blog platform built with Next.js, React, and MongoDB",
    siteName: "BlogFolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlogFolio - Modern Blog Platform",
    description: "An advanced blog platform built with Next.js, React, and MongoDB",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'