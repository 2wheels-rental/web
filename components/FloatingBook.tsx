"use client";

import { useEffect, useState } from "react";

// Botón "Book this tour" fijo: aparece al pasar el hero y se oculta cuando
// hay otro CTA de reserva visible (marcados con data-book-cta).
export default function FloatingBook({ href, label }: { href: string; label: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target));
      setCtaVisible(seen.size > 0);
    });
    document.querySelectorAll("[data-book-cta]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !ctaVisible;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 left-4 right-24 z-50 whitespace-nowrap rounded-full bg-primary px-6 py-4 text-center sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:px-8 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-2xl transition-all duration-300 hover:bg-primary-dark ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {label}
    </a>
  );
}
