import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CatalogModal } from "@/components/CatalogModal";
import { ToastProvider } from "@/components/ToastProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PromoBanner } from "@/components/PromoBanner";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Faveda — Soins naturels à base de plantes",
    template: "%s · Faveda",
  },
  description:
    "Boutique Faveda : traitements, tisanes et lotions corporelles 100 % naturels, issus des plantes médicinales.",
  icons: { icon: "/images/logo-faveda.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${sans.variable} leaf-grid min-h-screen antialiased`}>
        <CartProvider>
          <ToastProvider>
            <PromoBanner />
            <Header />
            {children}
            <Footer />
            <CartDrawer />
            <CatalogModal />
            <WhatsAppButton />
            <ScrollToTop />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
