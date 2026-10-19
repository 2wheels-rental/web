"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { detectLocale, pagePath, UI } from "@/lib/i18n";
import { OPEN_BANNER_EVENT, readConsent, saveConsent, type Consent } from "@/lib/consent";


export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const locale = detectLocale(usePathname() || "/");
  const u = UI[locale];

  useEffect(() => {
    if (!readConsent()) setShow(true);
    const open = () => setShow(true);
    window.addEventListener(OPEN_BANNER_EVENT, open);
    return () => window.removeEventListener(OPEN_BANNER_EVENT, open);
  }, []);

  function decide(value: Consent) {
    saveConsent(value); // Analytics escucha el evento y actualiza Consent Mode / Pixel
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div className="container-site flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          {u.cookieText}{" "}
          <Link href={pagePath("cookie-policy-eu", locale)} className="text-primary underline">
            {u.cookiePolicy}
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => decide("declined")}
            className="rounded-md border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            {u.decline}
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {u.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
