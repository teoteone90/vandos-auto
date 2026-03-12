import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vandos Auto Import-Export",
  description: "Le migliori auto di importazione a portata di click.",
};

import { Providers } from "@/components/providers/Providers";
import NewsletterPopup from "@/components/NewsletterPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <NewsletterPopup />
        </Providers>
      </body>
    </html>
  );
}
