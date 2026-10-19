import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";
import { UI, type Locale } from "@/lib/i18n";

const T: Record<Locale, { title: string; intro: string }> = {
  en: { title: "Contact", intro: "Questions about rentals or tours? We're based in Lugano and happy to help." },
  it: { title: "Contatti", intro: "Domande su noleggi o tour? Siamo a Lugano e felici di aiutarti." },
  de: { title: "Kontakt", intro: "Fragen zu Verleih oder Touren? Wir sind in Lugano und helfen gerne." },
};

export default function ContactView({ locale }: { locale: Locale }) {
  const u = UI[locale];
  const t = T[locale];
  const mapQuery = encodeURIComponent(SITE.contact.address);
  return (
    <>
      <section className="bg-ink py-20 text-center text-white">
        <div className="container-site">
          <h1 className="text-5xl uppercase sm:text-6xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{t.intro}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl uppercase text-ink">{u.getInTouch}</h2>
            <ul className="mt-6 space-y-4 text-ink-soft">
              <li><span className="font-semibold text-ink">{u.address}</span><br />{SITE.contact.address}</li>
              <li><span className="font-semibold text-ink">{u.email}</span><br /><a href={`mailto:${SITE.contact.email}`} className="hover:text-primary">{SITE.contact.email}</a></li>
              <li><span className="font-semibold text-ink">{u.phone}</span><br /><a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`} className="hover:text-primary">{SITE.contact.phone}</a></li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`https://wa.me/${SITE.contact.whatsapp}`} target="_blank" rel="noopener" className="rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90">{u.whatsappUs}</a>
              <a href={SITE.booqable} target="_blank" rel="noopener" className="rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark">{u.bookOnline}</a>
            </div>
            <div className="mt-8 overflow-hidden rounded-xl border border-black/10">
              <iframe title="2wheels Rental location" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} width="100%" height="280" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0 }} />
            </div>
          </div>
          <div className="rounded-2xl border border-black/5 bg-paper p-8">
            <h2 className="text-2xl uppercase text-ink">{u.sendMessage}</h2>
            <div className="mt-6"><ContactForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
