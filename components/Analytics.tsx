"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  analyticsEnabled,
  CONSENT_DEFAULT_SCRIPT,
  CONSENT_EVENT,
  GTAG_ID,
  META_PIXEL_ID,
  readConsent,
  type Consent,
} from "@/lib/consent";
import { BOOKING_DOMAINS, trackLinkClick } from "@/lib/analytics";

type W = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

function applyConsent(value: Consent) {
  const w = window as W;
  const g = value === "accepted" ? "granted" : "denied";
  w.gtag?.("consent", "update", {
    ad_storage: g,
    ad_user_data: g,
    ad_personalization: g,
    analytics_storage: g,
  });
  w.fbq?.("consent", value === "accepted" ? "grant" : "revoke");
}

export default function Analytics() {
  const [enabled, setEnabled] = useState(false);
  const [pixel, setPixel] = useState(false);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!analyticsEnabled()) return;
    setEnabled(true);
    setPixel(readConsent() === "accepted");
    const onConsent = (e: Event) => {
      const value = (e as CustomEvent<Consent>).detail;
      applyConsent(value);
      if (value === "accepted") setPixel(true);
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    // Conversiones: un solo listener para todos los links (reservas, WhatsApp, teléfono, email, PDFs)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (a) trackLinkClick(a as HTMLAnchorElement);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  // page_view en navegación client-side (la primera la manda el config).
  useEffect(() => {
    if (!enabled) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const w = window as W;
    w.gtag?.("event", "page_view", { page_location: window.location.href, page_title: document.title });
    w.fbq?.("track", "PageView");
  }, [pathname, enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script id="consent-default" strategy="afterInteractive">
        {CONSENT_DEFAULT_SCRIPT}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`gtag('js',new Date());gtag('config','${GTAG_ID}',{linker:{domains:${JSON.stringify(["2wheelsrental.com", ...BOOKING_DOMAINS])}}});`}
      </Script>
      {pixel && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('consent','grant');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
