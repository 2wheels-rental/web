import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import GalleryStrip from "@/components/GalleryStrip";
import type { Landing, LandingGroup, LandingLink, SectionKey } from "@/lib/landing-content";

const DEFAULT_ORDER: SectionKey[] = ["card", "split", "checks", "gallery"];

// Plantilla de las páginas tipo landing del WP (Season Pass, Hotel Programs, Campervan):
// hero imagen + intro en dos columnas, card sobre foto, texto+imagen, checklist, carrusel y CTA.

const btn = {
  red: "inline-block rounded-md bg-primary px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-primary-dark",
  dark: "inline-block rounded-md bg-ink px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-black",
};

// **negrita** → <strong>
function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <strong key={i} className="font-semibold text-ink">{p}</strong> : <Fragment key={i}>{p}</Fragment>))}</>;
}

function Btn({ link, kind }: { link: LandingLink; kind: keyof typeof btn }) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener" className={btn[kind]}>{link.label}</a>
  ) : (
    <Link href={link.href} className={btn[kind]}>{link.label}</Link>
  );
}

function Check({ outline }: { outline?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0" aria-hidden="true">
      {outline ? (
        <circle cx="12" cy="12" r="10" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
      ) : (
        <circle cx="12" cy="12" r="11" fill="var(--color-primary)" />
      )}
      <path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke={outline ? "var(--color-primary)" : "#fff"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckGrid({ items, outline, tight }: { items: string[]; outline?: boolean; tight?: boolean }) {
  return (
    <ul className={`grid gap-x-10 sm:grid-cols-2 ${tight ? "gap-y-2" : "gap-y-5"}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-lg text-ink-soft"><Check outline={outline} /><span>{t}</span></li>
      ))}
    </ul>
  );
}

// Subtítulo (Poppins) + intro/párrafos + lista con viñetas
function Group({ g, big }: { g: LandingGroup; big?: boolean }) {
  return (
    <div className={big ? "pt-4" : "mt-8"}>
      <h3 className="text-ink">
        <span className={`font-sans font-medium ${big ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>{g.title}</span>
      </h3>
      {g.intro && <p className={`text-lg text-ink-soft ${big ? "mt-4" : "mt-2"}`}><Rich text={g.intro} /></p>}
      {g.paras?.map((p, i) => <p key={i} className="mt-3 text-lg text-ink-soft"><Rich text={p} /></p>)}
      {g.items && g.items.length > 0 && (
        <ul className={`list-disc space-y-1.5 pl-12 text-lg text-ink-soft marker:text-ink ${big ? "mt-4" : "mt-3"}`}>
          {g.items.map((it) => <li key={it}><Rich text={it} /></li>)}
        </ul>
      )}
    </div>
  );
}

const Title = ({ children }: { children: ReactNode }) => <h2 className="text-5xl text-ink sm:text-6xl">{children}</h2>;

export default function LandingView({ data }: { data: Landing }) {
  const { hero, card, split, checks, gallery, cta } = data;
  const blocks: Record<SectionKey, ReactNode> = {
    // card sobre foto
    card: card && (
      <section className="relative isolate overflow-hidden py-16 md:py-24">
          <Image src={card.bg} alt="" fill sizes="100vw" className="-z-10 object-cover" />
          <div className="container-site">
            <div className="max-w-2xl bg-paper/90 p-8 backdrop-blur-sm sm:p-12">
              <Title>{card.title}</Title>
              {card.groups.map((g) => <Group key={g.title} g={g} />)}
              {card.button && <div className="mt-10"><Btn link={card.button} kind="dark" /></div>}
            </div>
          </div>
        </section>
    ),
    // texto + imagen (imagen a sangre derecha)
    split: split && (
      <section className="bg-paper py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_minmax(0,45%)]">
            <div className="px-4 sm:px-10 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:pr-16">
              <Title>{split.title}</Title>
              <div className="mt-8 space-y-5 text-lg text-ink-soft">
                {split.paras.map((p, i) => <p key={i}><Rich text={p} /></p>)}
                {split.groups?.map((g) => <Group key={g.title} g={g} big />)}
                {split.note && (
                  <div className="pt-4">
                    <p className="font-semibold text-ink">{split.note.title}</p>
                    <p className="mt-3">{split.note.text}</p>
                  </div>
                )}
                {split.list && (
                  <ul className="list-disc space-y-1.5 pl-12 marker:text-ink">
                    {split.list.map((it) => <li key={it}><Rich text={it} /></li>)}
                  </ul>
                )}
                {split.after?.map((p, i) => <p key={i} className="pt-3"><Rich text={p} /></p>)}
              </div>
            </div>
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[560px]">
              <Image src={split.image} alt={split.title} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </section>
    ),
    // checklist (imagen a sangre izquierda)
    checks: checks && (
      <section className="bg-paper py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,42%)_1fr]">
            <div className="relative aspect-[3/2] md:aspect-auto md:h-full md:min-h-[520px]">
              <Image src={checks.image} alt={checks.title} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" />
            </div>
            <div className="px-4 sm:px-10 lg:px-20">
              <Title>{checks.title}</Title>
              <div className="mt-8"><CheckGrid items={checks.items} /></div>
              {checks.optional && (
                <>
                  <h3 className="mt-14 text-ink-soft">
                    <span className="font-sans text-3xl font-medium sm:text-4xl">{checks.optionalTitle}</span>
                  </h3>
                  <div className="mt-6"><CheckGrid items={checks.optional} outline tight /></div>
                </>
              )}
            </div>
          </div>
        </section>
    ),
    gallery: gallery && gallery.length > 0 && <GalleryStrip images={gallery} alt={hero.title} />,
  };

  return (
    <>
      {/* HERO: foto a sangre + intro en dos columnas */}
      <section className="bg-paper">
        <div className="relative h-[52vh] min-h-[320px]">
          <Image src={hero.image} alt={hero.title} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="container-site grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            {/* h1 global usa Londrina (CSS sin layer gana a utilidades) → tipografía en el span */}
            <h1 className="text-ink">
              <span className="font-sans text-base font-medium uppercase leading-snug tracking-[0.2em] sm:text-lg">{hero.eyebrow}</span>
            </h1>
            <p className={`mt-4 font-display text-6xl leading-[0.95] text-ink sm:text-7xl ${hero.keepCase ? "" : "uppercase"}`}>{hero.title}</p>
          </div>
          <div className="space-y-5 text-lg text-ink-soft md:pt-2">
            {hero.body.map((p, i) => <p key={i}><Rich text={p} /></p>)}
            {hero.cta && <div className="pt-3"><Btn link={hero.cta} kind="red" /></div>}
          </div>
        </div>
      </section>

      {(data.order ?? DEFAULT_ORDER).map((k) => <Fragment key={k}>{blocks[k]}</Fragment>)}

      {/* CTA final */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-site flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <Title>{cta.title}</Title>
            <div className="mt-6 space-y-4 text-xl text-ink-soft">
              {cta.paras.map((p, i) => <p key={i}><Rich text={p} /></p>)}
            </div>
          </div>
          <div className="shrink-0"><Btn link={cta.button} kind="red" /></div>
        </div>
      </section>
    </>
  );
}
