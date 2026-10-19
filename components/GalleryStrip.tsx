"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Galería grande con scroll horizontal (snap), imágenes vecinas asomando, flechas y barra de progreso,
// como el slider de Elementor del original. Se usa en landings, tours y páginas de contenido.
export default function GalleryStrip({ images, alt, title }: { images: string[]; alt: string; title?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edge, setEdge] = useState({ start: true, end: images.length < 2 });

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  };

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const slide = el?.querySelector<HTMLElement>("[data-slide]");
    if (!el || !slide) return;
    el.scrollBy({ left: dir * (slide.offsetWidth + 16), behavior: "smooth" });
  };

  const Arrow = ({ dir }: { dir: 1 | -1 }) => (
    <button
      type="button"
      aria-label={dir === 1 ? "Next" : "Previous"}
      onClick={() => go(dir)}
      disabled={dir === 1 ? edge.end : edge.start}
      className={`absolute top-1/2 z-10 hidden -translate-y-1/2 p-2 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] transition-opacity disabled:opacity-0 sm:block ${
        dir === 1 ? "right-2 lg:right-4" : "left-2 lg:left-4"
      }`}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === 1 ? "m9 5 7 7-7 7" : "m15 5-7 7 7 7"} />
      </svg>
    </button>
  );

  return (
    <section className="bg-paper py-10 md:py-14">
      {title && <h2 className="mb-8 text-center text-4xl text-ink sm:text-5xl">{title}</h2>}
      <div className="relative">
        <div
          ref={track}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[6vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              data-slide
              className="relative aspect-[4/3] w-[88vw] shrink-0 snap-center sm:aspect-[16/9] lg:aspect-auto lg:h-[78vh]"
            >
              <Image src={src} alt={`${alt} ${i + 1}`} fill sizes="88vw" className="object-cover" />
            </div>
          ))}
        </div>
        <Arrow dir={-1} />
        <Arrow dir={1} />
      </div>
      <div className="mx-[6vw] mt-4 h-1 bg-black/10">
        <div className="h-full bg-ink transition-[width] duration-300" style={{ width: `${Math.max(100 / images.length, progress * 100)}%` }} />
      </div>
    </section>
  );
}
