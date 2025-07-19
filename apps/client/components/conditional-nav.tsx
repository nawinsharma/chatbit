"use client";

import { usePathname } from "next/navigation";
import Nav from "./navbar";

export default function ConditionalNav() {
  const pathname = usePathname();
  const isChatPage = pathname.startsWith("/chat");

  if (isChatPage) {
    return null;
  }

  return <Nav />;
} 