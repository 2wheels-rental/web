"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { detectLocale, pagePath, UI, type Locale } from "@/lib/i18n";
import { openCookieBanner } from "@/lib/consent";

const FT: Record<Locale, {
  menu: string; rentals: string; contact: string;
  m: Record<string, string>; legal: { pay: string; cookie: string; settings: string };
}> = {
  en: {
    menu: "Menu", rentals: "Rentals", contact: "Contact",
    m: { home: "Home", about: "About Us", tours: "Tours", companies: "For Companies", contact: "Contact", bikes: "Bikes & E-bikes", motos: "Motorcycles", camper: "Campervan" },
    legal: { pay: "Payment, Cancellation & Refund Policy", cookie: "Cookie Policy", settings: "Cookie settings" },
  },
  it: {
    menu: "Menu", rentals: "Noleggi", contact: "Contatti",
    m: { home: "Home", about: "Chi siamo", tours: "Tour", companies: "Per le aziende", contact: "Contatti", bikes: "Biciclette e e-bike", motos: "Moto", camper: "Camper" },
    legal: { pay: "Politica di pagamento, cancellazione e rimborso", cookie: "Informativa sui cookie", settings: "Impostazioni cookie" },
  },
  de: {
    menu: "Menü", rentals: "Verleih", contact: "Kontakt",
    m: { home: "Home", about: "Über uns", tours: "Touren", companies: "Für Unternehmen", contact: "Kontakt", bikes: "Fahrräder & E-Bikes", motos: "Motorräder", camper: "Wohnmobil" },
    legal: { pay: "Zahlung-, Storno- & Rückerstattungsrichtlinie", cookie: "Cookie-Richtlinie", settings: "Cookie-Einstellungen" },
  },
};

export default function Footer() {
  const locale = detectLocale(usePathname() || "/");
  const f = FT[locale];
  const p = (k: string) => pagePath(k, locale);
  const camperHref = "/campervan";

  return (
    <footer className="bg-ink text-paper">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/images/logo.png" alt="2wheels Rental" width={160} height={52} className="h-12 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-xs text-sm text-white/60">{UI[locale].footerTagline}</p>
          <a href={SITE.contact.instagram} target="_blank" rel="noopener" className="mt-4 inline-block text-sm text-white/70 hover:text-primary">
            {UI[locale].followInstagram} {SITE.contact.instagramHandle}
          </a>
        </div>

        <div>
          <h4 className="text-lg text-white">{f.menu}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link href={p("home")} className="hover:text-primary">{f.m.home}</Link></li>
            <li><Link href={p("about-us")} className="hover:text-primary">{f.m.about}</Link></li>
            <li><Link href={p("tours")} className="hover:text-primary">{f.m.tours}</Link></li>
            <li><Link href={p("for-companies")} className="hover:text-primary">{f.m.companies}</Link></li>
            <li><Link href={p("contact")} className="hover:text-primary">{f.m.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg text-white">{f.rentals}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link href={p("bikes-e-bikes")} className="hover:text-primary">{f.m.bikes}</Link></li>
            <li><Link href={p("motorbikes-scooters")} className="hover:text-primary">{f.m.motos}</Link></li>
            <li><Link href={camperHref} className="hover:text-primary">{f.m.camper}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg text-white">{f.contact}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>{SITE.contact.address}</li>
            <li><a href={`mailto:${SITE.contact.email}`} className="hover:text-primary">{SITE.contact.email}</a></li>
            <li><a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`} className="hover:text-primary">{SITE.contact.phone}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>©{new Date().getFullYear()} 2wheels Rental. {UI[locale].rights}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href={p("payment-cancellation-refund-policy")} className="hover:text-primary">{f.legal.pay}</Link>
            <Link href={p("cookie-policy-eu")} className="hover:text-primary">{f.legal.cookie}</Link>
            <button type="button" onClick={openCookieBanner} className="hover:text-primary">{f.legal.settings}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
