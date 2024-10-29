import type { Metadata } from "next";
import { Footer } from "./_components/Footer";
import NavBar from "./_components/NavBar";
import { ThemeProviders } from "./_components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: { template: "%s - Yuan Jia", default: "Yuan Jia" },
  verification: { google: "GLWAOr9Q8E8GyyWHIs-vZDuiYE9Q0bm_vxO2avsFZQI" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased flex flex-col relative min-h-screen  bg-white dark:bg-black text-slate-700 dark:text-slate-100 transition-colors`}
      >
        <ThemeProviders>
          <NavBar />
          {children}
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  );
}
