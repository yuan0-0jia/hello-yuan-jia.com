import { headers } from "next/headers";
import { Footer } from "./Footer";

export default async function ConditionalFooter() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Hide footer on account pages
  if (pathname.startsWith("/account")) {
    return null;
  }

  return <Footer />;
}
