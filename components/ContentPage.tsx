import Image from "next/image";
import Link from "next/link";
import type { Block } from "@/lib/pages";
import { localImg } from "@/lib/img";

type CTA = { label: string; href: string; external?: boolean };

// ---- Procesa los bloques planos en secciones/cards ----
type Card = { title: string | null; paras: string[]; bullets: string[] };
type Section = { heading: string | null; cards: Card[] };

function toSections(blocks: Block[]): Section[] {
  const sections: Section[] = [];
  let cur: Section | null = null;
  const ensure = () => (cur ??= { heading: null, cards: [] });

  for (const b of blocks) {
    if (b.tag === "h2") {
      if (cur) sections.push(cur);
      cur = { heading: b.text, cards: [] };
      continue;
    }
    const sec = ensure();
    let card = sec.cards[sec.cards.length - 1];
    if (b.tag === "h3") {
      card = { title: b.text, paras: [], bullets: [] };
      sec.cards.push(card);
    } else {
      if (!card) {
        card = { title: null, paras: [], bullets: [] };
        sec.cards.push(card);
      }
      if (b.tag === "li") card.bullets.push(b.text);
      else card.paras.push(b.text);
    }
  }
  if (cur) sections.push(cur);
  return sections;
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-primary">
      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2.5 text-ink-soft"><Check /><span>{t}</span></li>
      ))}
    </ul>
  );
}

function CardBlock({ card }: { card: Card }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
      {card.title && <h3 className="text-xl font-semibold text-ink">{card.title}</h3>}
      {card.paras.map((p, i) => (
        <p key={i} className="mt-2 text-ink-soft">{p}</p>
      ))}
      {card.bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {card.bullets.map((t, i) => (
            <li key={i} className="flex gap-2.5 text-ink-soft"><Check /><span>{t}</span></li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RichSection({ section, image, flip }: { section: Section; image?: string; flip: boolean }) {
  const titledCards = section.cards.filter((c) => c.title);
  const loose = section.cards.filter((c) => !c.title);
  const hasCardGrid = titledCards.length >= 2;

  return (
    <section className="bg-white py-14">
      <div className="container-site">
        {section.heading && (
          <h2 className="mb-8 text-center text-3xl uppercase text-ink sm:text-4xl">{section.heading}</h2>
        )}

        {/* párrafos/listas sueltas + imagen lateral */}
        {(loose.length > 0 || image) && (
          <div className={`grid items-center gap-10 ${image ? "md:grid-cols-2" : ""}`}>
            {image && (
              <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${flip ? "md:order-2" : ""}`}>
                <Image src={image} alt={section.heading || "2wheels Rental"} fill className="object-cover" />
              </div>
            )}
            <div className={flip ? "md:order-1" : ""}>
              {loose.map((c, i) => (
                <div key={i} className={i > 0 ? "mt-6" : ""}>
                  {c.paras.map((p, j) => (
                    <p key={j} className="mt-3 text-lg text-ink-soft first:mt-0">{p}</p>
                  ))}
                  {c.bullets.length > 0 && <Bullets items={c.bullets} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* cards con título */}
        {hasCardGrid && (
          <div className={`grid gap-6 ${titledCards.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"} ${loose.length > 0 || image ? "mt-10" : ""}`}>
            {titledCards.map((c, i) => <CardBlock key={i} card={c} />)}
          </div>
        )}
        {!hasCardGrid && titledCards.length === 1 && (
          <div className={loose.length > 0 || image ? "mt-10" : ""}><CardBlock card={titledCards[0]} /></div>
        )}
      </div>
    </section>
  );
}

export default function ContentPage({
  title, subtitle, blocks, images = [], cta, heroImage, variant = "rich",
}: {
  title: string;
  subtitle?: string;
  blocks: Block[];
  images?: string[];
  cta?: CTA;
  heroImage?: string;
  variant?: "rich" | "legal";
}) {
  const hero = heroImage || images[0];
  const sideImages = (heroImage ? images : images.slice(1)).map(localImg);

  // ---- Variante legal: prosa limpia ----
  if (variant === "legal") {
    return (
      <>
        <section className="bg-ink py-20 text-center text-white">
          <div className="container-site">
            <h1 className="text-4xl uppercase sm:text-5xl">{title}</h1>
            {subtitle && <p className="mx-auto mt-4 max-w-2xl text-white/80">{subtitle}</p>}
          </div>
        </section>
        <section className="bg-white">
          <div className="container-site max-w-3xl py-14">
            {blocks.map((b, i) =>
              b.tag === "h2" ? (
                <h2 key={i} className="mt-10 text-2xl uppercase text-ink">{b.text}</h2>
              ) : b.tag === "h3" ? (
                <h3 key={i} className="mt-6 text-lg font-semibold text-ink">{b.text}</h3>
              ) : b.tag === "li" ? (
                <li key={i} className="ml-5 mt-2 list-disc text-ink-soft">{b.text}</li>
              ) : (
                <p key={i} className="mt-3 text-ink-soft">{b.text}</p>
              )
            )}
          </div>
        </section>
      </>
    );
  }

  // ---- Variante rich ----
  const sections = toSections(blocks);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[46vh] items-end overflow-hidden bg-ink py-16 text-white">
        {hero && (
          <>
            <Image src={localImg(hero)} alt={title} fill priority className="object-cover opacity-55" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
          </>
        )}
        <div className="container-site relative">
          <h1 className="text-5xl uppercase sm:text-6xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>}
        </div>
      </section>

      {/* SECCIONES con imágenes intercaladas */}
      {sections.map((s, i) => (
        <RichSection key={i} section={s} image={sideImages[i]} flip={i % 2 === 1} />
      ))}

      {/* Galería con imágenes sobrantes */}
      {sideImages.length > sections.length && (
        <section className="bg-paper py-14">
          <div className="container-site grid grid-cols-2 gap-4 md:grid-cols-3">
            {sideImages.slice(Math.max(sections.length, 0)).map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={src} alt={title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      {cta && (
        <section className="bg-primary text-white">
          <div className="container-site flex flex-col items-center gap-5 py-14 text-center">
            <h2 className="text-4xl uppercase">{title}</h2>
            {cta.external ? (
              <a href={cta.href} target="_blank" rel="noopener" className="rounded-md bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary transition-transform hover:scale-105">{cta.label}</a>
            ) : (
              <Link href={cta.href} className="rounded-md bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary transition-transform hover:scale-105">{cta.label}</Link>
            )}
          </div>
        </section>
      )}
    </>
  );
}
