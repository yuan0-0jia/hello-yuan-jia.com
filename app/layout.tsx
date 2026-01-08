import type { Metadata } from "next";
import { Special_Elite, Lora } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConditionalFooter from "./_components/ConditionalFooter";
import NavBar from "./_components/NavBar";
import { ThemeProviders } from "./_components/ThemeProvider";
import "./globals.css";

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-typewriter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
    <html lang="en" suppressHydrationWarning className={`${specialElite.variable} ${lora.variable}`}>
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
        className={`antialiased flex flex-col relative min-h-screen bg-cream dark:bg-warmGray-900 text-warmGray-800 dark:text-cream transition-colors font-serif`}
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
