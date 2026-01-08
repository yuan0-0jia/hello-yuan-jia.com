import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConditionalFooter from "./_components/ConditionalFooter";
import NavBar from "./_components/NavBar";
import { ThemeProviders } from "./_components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: { template: "%s - Yuan Jia", default: "Yuan Jia" },
  verification: {
    google: [
      "GLWAOr9Q8E8GyyWHIs-vZDuiYE9Q0bm_vxO2avsFZQI",
      "LrlN2UweX8hNw3Wcrx7HVdFy3KEUtYl1PbJasrI2-No",
    ],
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
        <link
          rel="preconnect"
          href="https://yltbxotlxxqixuyxsrxm.supabase.co"
        />
        <link
          rel="dns-prefetch"
          href="https://yltbxotlxxqixuyxsrxm.supabase.co"
        />
      </head>
      <body
        className={`antialiased flex flex-col relative min-h-screen  bg-white dark:bg-black text-slate-700 dark:text-slate-100 transition-colors`}
      >
        <ThemeProviders>
          <NavBar />
          {children}
          <ConditionalFooter />
        </ThemeProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
