import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { aeonik, inter } from "@/utils/constants/fonts";
import ConditionalFooter from "@/components/conditional-footer";
import { ThemeProvider } from "@/components/theme-provider";
import ConditionalNav from "@/components/conditional-nav";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Chatbit - Scalable Real-Time Group Chat Platform",
  description: "Build and scale group conversations with real-time messaging. Powered by Socket.io, Redis, Kafka, Next.js, and modern infrastructure for enterprise-grade communication.",
  keywords: [
    "real-time chat",
    "group chat",
    "scalable messaging",
    "socket.io",
    "redis",
    "kafka",
    "nextjs",
    "turborepo",
    "team communication",
    "instant messaging",
    "chat rooms",
    "enterprise chat",
    "chatbit",
  ],
  authors: [{ name: "Nawin Kumar Sharma" }],
  metadataBase: new URL('https://chatbit.nawin.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Chatbit | Real Time Group Chat Platform",
    description: "A real time group chat platform",
    url: 'https://chatbit.nawin.xyz',
    siteName: 'Chatbit',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'og image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chatbit | Real Time Group Chat Platform",
    description: "A real time group chat platform",
    images: ['/og-image.png'],
    creator: '@nawinscript',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'portfolio',
  other: {
    'msapplication-TileColor': '#FF6B6B',
    'theme-color': '#FF6B6B',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'SumTube',
    'application-name': 'SumTube',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
         <head>
          {/* Favicon Implementation - Comprehensive */}
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Microsoft Tiles */}
          <meta name="msapplication-TileColor" content="#3B82F6" />
          <meta name="msapplication-config" content="/browserconfig.xml" />

          {/* Additional SEO Meta Tags */}
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <meta name="theme-color" content="#3B82F6" />
          <meta name="color-scheme" content="light dark" />
          <meta property="og:logo" content="Chatbit" />


          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* DNS Prefetch for analytics and external services */}
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />
          <link rel="dns-prefetch" href="//www.google-analytics.com" />

          {/* Structured Data for SEO */}
          <StructuredData type="website" />
          <StructuredData type="webapplication" />
          <StructuredData type="organization" />
        </head>
      <body
        className={cn(
          "!font-default min-h-screen overflow-x-hidden bg-background text-foreground antialiased",
          aeonik.variable,
          inter.variable,
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        {/* Background with theme-aware styling */}
        <div className="fixed inset-0 z-[-2] h-screen w-screen bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] bg-neutral-50 dark:bg-neutral-950" />
        </div>
        <ConditionalNav />
        <main className="relative z-0 mx-auto w-full">{children}</main>
        <Toaster richColors position="top-right" />
        <ConditionalFooter />
        <NextTopLoader showSpinner={false} height={6} color="#000000" />
        </ThemeProvider>
      </body>
    </html>
  );
}
