// Consent Mode v2 + tags (Google tag de Site Kit y Meta Pixel del WP original).
// Los tags solo se cargan en el dominio de producción (o si NEXT_PUBLIC_ANALYTICS_ANY_HOST=1)
// para no ensuciar las métricas desde Vercel/localhost.

export const CONSENT_KEY = "2wr-cookie-consent";
export const CONSENT_EVENT = "2wr-consent";
export const OPEN_BANNER_EVENT = "2wr-open-cookie-banner";

export const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID ?? "GT-TNH9V769";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "2737544646598065";

export type Consent = "accepted" | "declined";

export function analyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NEXT_PUBLIC_ANALYTICS_ANY_HOST === "1") return true;
  return /(^|\.)2wheelsrental\.com$/.test(window.location.hostname);
}

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }));
}

export function openCookieBanner() {
  window.dispatchEvent(new Event(OPEN_BANNER_EVENT));
}

// Script inline que corre antes que cualquier tag: consent por defecto "denied"
// (o el valor guardado), región EEA/CH incluida por defecto global.
export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var c=null;try{c=localStorage.getItem('${CONSENT_KEY}')}catch(e){}
var g=c==='accepted'?'granted':'denied';
gtag('consent','default',{ad_storage:g,ad_user_data:g,ad_personalization:g,analytics_storage:g,functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
`;
