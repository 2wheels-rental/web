import Image from "next/image";
import Link from "next/link";
import type { Block } from "@/lib/pages";
import { localImg } from "@/lib/img";

type CTA = { label: string; href: string; external?: boolean };

export default function ContentPage({
  title,
  subtitle,
  blocks,
  images = [],
  cta,
  heroImage,
}: {
  title: string;
  subtitle?: string;
  blocks: Block[];
  images?: string[];
  cta?: CTA;
  heroImage?: string;
}) {
  // Agrupa <li> consecutivos en listas
  const rendered: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (key: string) => {
    if (list.length) {
      rendered.push(
        <ul key={`ul-${key}`} className="my-4 space-y-2">
          {list.map((t, i) => (
            <li key={i} className="flex gap-3 text-ink-soft">
              <span className="mt-1 text-primary">●</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  blocks.forEach((b, i) => {
    if (b.tag === "li") {
      list.push(b.text);
      return;
    }
    flush(String(i));
    if (b.tag === "h2") {
      rendered.push(
        <h2 key={i} className="mt-12 text-3xl uppercase text-ink">
          {b.text}
        </h2>
      );
    } else if (b.tag === "h3") {
      rendered.push(
        <h3 key={i} className="mt-8 text-xl font-semibold text-ink">
          {b.text}
        </h3>
      );
    } else {
      const strong = b.text.length < 24 && /^[A-Z]/.test(b.text);
      rendered.push(
        <p key={i} className={strong ? "mt-4 font-semibold text-ink" : "mt-3 text-ink-soft"}>
          {b.text}
        </p>
      );
    }
  });
  flush("end");

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white">
        {heroImage && (
          <>
            <Image src={localImg(heroImage)} alt={title} fill className="object-cover opacity-40" />
            <div className="absolute inset-0 bg-black/40" />
          </>
        )}
        <div className="container-site relative text-center">
          <h1 className="text-5xl uppercase sm:text-6xl">{title}</h1>
          {subtitle && <p className="mx-auto mt-4 max-w-2xl text-white/80">{subtitle}</p>}
        </div>
      </section>

      {/* BODY */}
      {rendered.length > 0 && (
        <section className="bg-white">
          <div className="container-site max-w-3xl py-14">{rendered}</div>
        </section>
      )}

      {/* GALLERY */}
      {images.length > 0 && (
        <section className="bg-paper">
          <div className="container-site py-14">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {images.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={localImg(src)} alt={`${title} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {cta && (
        <section className="bg-primary text-white">
          <div className="container-site flex flex-col items-center gap-5 py-14 text-center">
            <h2 className="text-4xl uppercase">Ready to ride?</h2>
            {cta.external ? (
              <a href={cta.href} target="_blank" rel="noopener" className="rounded-md bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary transition-transform hover:scale-105">
                {cta.label}
              </a>
            ) : (
              <Link href={cta.href} className="rounded-md bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary transition-transform hover:scale-105">
                {cta.label}
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  );
}
