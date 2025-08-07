import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { aeonik, inter } from "@/utils/constants/fonts";
import ConditionalFooter from "@/components/conditional-footer";
import { ThemeProvider } from "@/components/theme-provider";
import ConditionalNav from "@/components/conditional-nav";

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
  openGraph: {
    title: "Chatbit - Scalable Real-Time Group Chat Platform",
    description: "Experience lightning-fast group messaging that scales to millions of users. Built with Socket.io, Redis, and Kafka for enterprise-grade performance.",
    type: "website",
    url: "https://chatbit.nawin.xyz",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chatbit - Scalable Chat Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatbit - Scalable Real-Time Group Chat",
    description: "Build group conversations that scale to millions with real-time messaging infrastructure.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
