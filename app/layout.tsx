import type { Metadata } from "next";
import { Poppins, Londrina_Solid } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";

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

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${londrina.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
