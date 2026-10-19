"use client";

import Link from "next/link";
import { useState } from "react";
import type { PracticalBlock, PracticalTab } from "@/lib/tours";

function Block({ b }: { b: PracticalBlock }) {
  switch (b.t) {
    case "ul":
      return (
        <ul className="space-y-3">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" /><span>{it}</span></li>
          ))}
        </ul>
      );
    case "p":
      return <p className="[&_a]:text-white [&_a]:underline [&_a:hover]:text-primary" dangerouslySetInnerHTML={{ __html: b.html }} />;
    case "h":
      return <h3 className="pt-4 text-3xl text-white sm:col-span-2">{b.text}</h3>;
    case "cta":
      return (
        <div className="sm:col-span-2">
          <Link href={b.href} className="inline-block rounded-md border border-white/50 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-ink">
            {b.text}
          </Link>
        </div>
      );
    case "faq":
      return (
        <div className="divide-y divide-white/10 sm:col-span-2">
          {b.items.map((f, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-white">
                {f.q}
                <span className="text-2xl leading-none text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-white/75" dangerouslySetInnerHTML={{ __html: f.a }} />
            </details>
          ))}
        </div>
      );
  }
}

export default function PracticalInfo({
  title, tabs, bookingUrl, bookingLabel,
}: { title: string; tabs: PracticalTab[]; bookingUrl: string; bookingLabel: string }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  // "What's included" con dos listas → dos columnas; el resto, una
  const twoCols = tab.blocks.filter((b) => b.t === "ul").length >= 2;

  return (
    <section className="bg-paper py-20">
      <div className="container-site">
        <h2 className="text-center text-5xl text-ink sm:text-6xl">{title}</h2>

        <div role="tablist" className="mt-10 flex flex-wrap justify-center gap-3">
          {tabs.map((t, i) => (
            <button
              key={t.title}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`px-6 py-4 text-xs font-medium uppercase tracking-[0.3em] transition-colors sm:px-10 sm:text-sm ${
                i === active ? "bg-ink text-white" : "bg-black/5 text-ink hover:bg-black/10"
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        <div className="relative mt-4 bg-ink px-6 pb-16 pt-10 text-lg text-white/90 shadow-lg sm:px-16 sm:pt-14 lg:px-28">
          <div role="tabpanel" className={`grid gap-x-16 gap-y-5 ${twoCols ? "sm:grid-cols-2" : ""}`}>
            {tab.blocks.map((b, i) => <Block key={`${active}-${i}`} b={b} />)}
          </div>
          <a
            data-book-cta
            href={bookingUrl}
            target="_blank"
            rel="noopener"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-md bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition-colors hover:bg-primary-dark"
          >
            {bookingLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
