import Link from "next/link";
import Image from "next/image";
import { SITE, FOOTER_NAV, FOOTER_RENTALS, FOOTER_LEGAL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo.png"
            alt="2wheels Rental"
            width={160}
            height={52}
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Premium bike, e-bike, scooter and motorcycle rentals and tours in
            Lugano, Ticino.
          </p>
          <a
            href={SITE.contact.instagram}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-block text-sm text-white/70 hover:text-primary"
          >
            Follow us on Instagram {SITE.contact.instagramHandle}
          </a>
        </div>

        <div>
          <h4 className="text-lg text-white">Menu</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {FOOTER_NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg text-white">Rentals</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {FOOTER_RENTALS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg text-white">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>{SITE.contact.address}</li>
            <li>
              <a href={`mailto:${SITE.contact.email}`} className="hover:text-primary">
                {SITE.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`}
                className="hover:text-primary"
              >
                {SITE.contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>©{new Date().getFullYear()} 2wheels Rental. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {FOOTER_LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-primary">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
