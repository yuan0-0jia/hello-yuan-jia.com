"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on account pages
  if (pathname?.startsWith("/account")) {
    return null;
  }

  return <Footer />;
}
