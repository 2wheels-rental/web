"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import {
  buildNav, detectLocale, alternatesForPath, pagePath, LOCALES, LOCALE_NAMES, UI,
} from "@/lib/i18n";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const locale = detectLocale(pathname);
  const nav = buildNav(locale);
  const alts = alternatesForPath(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Link href={pagePath("home", locale)} className="flex items-center" aria-label="2wheels Rental">
          <Image src="/images/logo.png" alt="2wheels Rental" width={150} height={48} priority className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <Link href={item.href} className="flex items-center gap-1 py-2 text-[13px] font-medium uppercase tracking-wide text-ink transition-colors hover:text-primary">
                {item.label}
                {item.children && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mt-0.5">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full min-w-56 translate-y-1 rounded-xl border border-black/5 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((c) =>
                    c.external ? (
                      <a key={c.href} href={c.href} target="_blank" rel="noopener" aria-label={c.label} className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-paper">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {c.logo ? <img src={c.logo} alt={c.label} className="h-6 w-auto" /> : c.label}
                      </a>
                    ) : (
                      <Link key={c.href} href={c.href} className="block rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-paper hover:text-primary">
                        {c.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 text-sm font-medium lg:flex">
          {LOCALES.map((l, i) => (
            <span key={l} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted">·</span>}
              {l === locale ? (
                <span className="text-ink">{LOCALE_NAMES[l]}</span>
              ) : (
                <Link href={alts[l]} className="text-ink-soft hover:text-primary">{LOCALE_NAMES[l]}</Link>
              )}
            </span>
          ))}
        </div>

        <button onClick={() => setOpen((v) => !v)} className="lg:hidden" aria-label="Menu" aria-expanded={open}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d={open ? "M6 6l12 12M18 6 6 18" : "M3 6h18M3 12h18M3 18h18"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <nav className="container-site flex flex-col py-3">
            {nav.map((item) => (
              <div key={item.label} className="py-1">
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-2 font-medium text-ink">{item.label}</Link>
                {item.children && (
                  <div className="ml-4 flex flex-col">
                    {item.children.map((c) =>
                      c.external ? (
                        <a key={c.href} href={c.href} target="_blank" rel="noopener" onClick={() => setOpen(false)} className="py-1.5 text-sm text-ink-soft">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {c.logo ? <img src={c.logo} alt={c.label} className="h-5 w-auto" /> : c.label}
                        </a>
                      ) : (
                        <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="py-1.5 text-sm text-ink-soft">{c.label}</Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 flex items-center gap-3 border-t border-black/5 pt-3 text-sm">
              {LOCALES.map((l) => (
                <Link key={l} href={alts[l]} onClick={() => setOpen(false)} className={l === locale ? "font-semibold text-primary" : "text-ink-soft"}>
                  {LOCALE_NAMES[l]}
                </Link>
              ))}
            </div>
            <a href={SITE.booqable} target="_blank" rel="noopener" className="mt-3 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white">
              {UI[locale].bookNow}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
