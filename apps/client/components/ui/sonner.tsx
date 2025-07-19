"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:backdrop-blur-sm",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:bg-green-50 group-[.toaster]:text-green-900 group-[.toaster]:border-green-200 dark:group-[.toaster]:bg-green-950 dark:group-[.toaster]:text-green-100 dark:group-[.toaster]:border-green-800",
          error: "group-[.toaster]:bg-red-50 group-[.toaster]:text-red-900 group-[.toaster]:border-red-200 dark:group-[.toaster]:bg-red-950 dark:group-[.toaster]:text-red-100 dark:group-[.toaster]:border-red-800",
          warning: "group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-900 group-[.toaster]:border-yellow-200 dark:group-[.toaster]:bg-yellow-950 dark:group-[.toaster]:text-yellow-100 dark:group-[.toaster]:border-yellow-800",
          info: "group-[.toaster]:bg-blue-50 group-[.toaster]:text-blue-900 group-[.toaster]:border-blue-200 dark:group-[.toaster]:bg-blue-950 dark:group-[.toaster]:text-blue-100 dark:group-[.toaster]:border-blue-800",
        },
      }}
      style={
        {
          "--normal-bg": "hsl(var(--card))",
          "--normal-text": "hsl(var(--card-foreground))",
          "--normal-border": "hsl(var(--border))",
          "--success-bg": theme === "dark" ? "hsl(120, 40%, 10%)" : "hsl(120, 60%, 95%)",
          "--success-text": theme === "dark" ? "hsl(120, 100%, 90%)" : "hsl(120, 100%, 20%)",
          "--success-border": theme === "dark" ? "hsl(120, 40%, 20%)" : "hsl(120, 60%, 80%)",
          "--error-bg": theme === "dark" ? "hsl(0, 40%, 10%)" : "hsl(0, 60%, 95%)",
          "--error-text": theme === "dark" ? "hsl(0, 100%, 90%)" : "hsl(0, 100%, 20%)",
          "--error-border": theme === "dark" ? "hsl(0, 40%, 20%)" : "hsl(0, 60%, 80%)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
