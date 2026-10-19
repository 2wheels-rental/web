import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact - 2wheels Rental",
  description:
    "Get in touch with 2wheels Rental in Lugano, Ticino. Bike, e-bike, scooter and campervan rentals, tours and outdoor experiences.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact - 2wheels Rental",
    description: "Get in touch with 2wheels Rental in Lugano, Ticino.",
    url: "https://2wheelsrental.com/contact/",
    type: "website",
  },
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(SITE.contact.address);
  return (
    <>
      <section className="bg-ink py-20 text-center text-white">
        <div className="container-site">
          <h1 className="text-5xl uppercase sm:text-6xl">Contact</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Questions about rentals or tours? We&apos;re based in Lugano and happy
            to help.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-2">
          {/* Info */}
          <div>
            <h2 className="text-3xl uppercase text-ink">Get in touch</h2>
            <ul className="mt-6 space-y-4 text-ink-soft">
              <li>
                <span className="font-semibold text-ink">Address</span>
                <br />
                {SITE.contact.address}
              </li>
              <li>
                <span className="font-semibold text-ink">Email</span>
                <br />
                <a href={`mailto:${SITE.contact.email}`} className="hover:text-primary">
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <span className="font-semibold text-ink">Phone / WhatsApp</span>
                <br />
                <a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {SITE.contact.phone}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${SITE.contact.whatsapp}`}
                target="_blank"
                rel="noopener"
                className="rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
              >
                WhatsApp us
              </a>
              <a
                href={SITE.booqable}
                target="_blank"
                rel="noopener"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark"
              >
                Book online
              </a>
            </div>
            <div className="mt-8 overflow-hidden rounded-xl border border-black/10">
              <iframe
                title="2wheels Rental location"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-black/5 bg-paper p-8">
            <h2 className="text-2xl uppercase text-ink">Send us a message</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Fill in the form and we&apos;ll get back to you.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
