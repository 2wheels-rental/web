"use client";

import { useEffect, useRef, useState } from "react";

type Day = { day: string; body: string[] };

const isMeta = (s: string) => /\d+\s*km/i.test(s);

// Itinerario en scroll horizontal (scroll-snap) con flechas, como el original.
export default function ItineraryCarousel({ title, days, prev, next }: { title: string; days: Day[]; prev: string; next: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };
  useEffect(update, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>("[data-day]");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 40), behavior: "smooth" });
  };

  const Arrow = ({ dir }: { dir: 1 | -1 }) => (
    <button
      type="button"
      aria-label={dir === 1 ? next : prev}
      onClick={() => go(dir)}
      disabled={dir === 1 ? edge.end : edge.start}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:bg-white/10 disabled:opacity-25"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === 1 ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} />
      </svg>
    </button>
  );

  return (
    <section className="bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-8 px-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:px-16">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl">{title}</h2>
        <div className="flex min-w-0 items-center gap-2">
          <div className="hidden sm:block"><Arrow dir={-1} /></div>
          <div
            ref={track}
            onScroll={update}
            className="flex min-w-0 flex-1 snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {days.map((d, i) => (
              <article key={i} data-day className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-20px)]">
                <p className="text-2xl font-medium leading-tight text-white sm:text-3xl">{d.day}</p>
                <div className="mt-4 space-y-4">
                  {d.body.map((p, j) => (
                    <p key={j} className={isMeta(p) ? "font-semibold text-white" : "text-white/80"}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="hidden sm:block"><Arrow dir={1} /></div>
        </div>
        <div className="flex justify-center gap-2 sm:hidden">
          <Arrow dir={-1} />
          <Arrow dir={1} />
        </div>
      </div>
    </section>
  );
}
