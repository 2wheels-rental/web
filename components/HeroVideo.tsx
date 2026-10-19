"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type NetInfo = { saveData?: boolean; effectiveType?: string };

// Poster optimizado (Next/Image, LCP) siempre; el video (8MB) solo se monta si
// la conexión y las preferencias lo permiten, y aparece con fade al poder reproducirse.
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
    const slow = conn?.saveData || /(^|-)2g$|^3g$/.test(conn?.effectiveType ?? "");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!slow && !reduced) setLoad(true);
  }, []);

  return (
    <>
      <Image src={poster} alt="" fill priority sizes="100vw" className="object-cover" />
      {load && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </>
  );
}
