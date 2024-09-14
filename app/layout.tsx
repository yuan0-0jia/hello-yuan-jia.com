import type { Metadata } from "next";
// import localFont from "next/font/local";
import NavBar from "./_components/NavBar";
import "./globals.css";
import { Providers } from "./_components/ThemeProvider";
import { Footer } from "./_components/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: { template: "%s - Yuan Jia", default: "Yuan Jia" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` antialiased bg-white dark:bg-black text-slate-700 dark:text-slate-100`}
      >
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
