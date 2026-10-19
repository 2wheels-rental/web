import type { Metadata } from "next";
import { Poppins, Londrina_Solid } from "next/font/google";
import "@/app/globals.css";
import type { Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import { SiteJsonLd } from "@/components/JsonLd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const londrina = Londrina_Solid({
  subsets: ["latin"],
  weight: ["300", "400", "900"],
  variable: "--font-londrina",
  display: "swap",
});

// Metadata base compartida por los 3 layouts raíz (cada página la sobreescribe)
export const baseMetadata: Metadata = {
  metadataBase: new URL("https://2wheelsrental.com"),
  title: "Home - 2wheels Rental",
  description:
    "Rent bikes, e-bikes, scooters and campervans in Lugano, Ticino. Explore Switzerland on two wheels with premium rentals, tours and outdoor adventures.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Home - 2wheels Rental",
    description:
      "Rent bikes, e-bikes, scooters and campervans in Lugano, Ticino. Explore Switzerland on two wheels with premium rentals, tours and outdoor adventures.",
    url: "https://2wheelsrental.com/",
    siteName: "2wheels Rental",
    locale: "en_GB",
    type: "website",
    images: ["/images/tours.webp"],
  },
  icons: { icon: "/images/icon.png", apple: "/images/icon.png" },
};

// Shell HTML común. Hay un layout raíz por idioma (app/(en), app/it, app/de) para que
// <html lang> salga correcto desde el servidor (antes se corregía solo en el cliente).
export default function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={`${poppins.variable} ${londrina.variable}`}>
      <body>
        <SiteJsonLd locale={locale} />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
