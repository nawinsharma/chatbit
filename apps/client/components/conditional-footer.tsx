"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/landing/footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't render footer on chat pages
  if (pathname.startsWith('/chat') || pathname.startsWith('/dashboard')) {
    return null;
  }
  
  return <Footer />;
} 