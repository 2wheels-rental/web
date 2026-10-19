// Eventos de conversión (GA4 + Meta Pixel). Solo se envían si los tags están cargados
// (dominio real + Consent Mode); en local/Vercel no hacen nada.
type W = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

// Dominios externos de reserva: clics = intención de compra; también se usan para cross-domain en GA4
export const BOOKING_DOMAINS = ["booqableshop.com", "wetravel.com", "tickets.luganoregion.com"];

export function track(event: string, params: Record<string, unknown> = {}, metaEvent?: string) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.gtag?.("event", event, params);
  if (metaEvent) w.fbq?.("track", metaEvent, params);
}

// Clasifica un link clicado → evento GA4 (+ evento estándar de Meta)
export function trackLinkClick(a: HTMLAnchorElement) {
  const href = a.href || "";
  const label = (a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 80);
  const base = { link_url: href, link_text: label, page_path: location.pathname };
  if (BOOKING_DOMAINS.some((d) => href.includes(d))) {
    const provider = BOOKING_DOMAINS.find((d) => href.includes(d))!.split(".")[0];
    return track("booking_click", { ...base, provider }, "InitiateCheckout");
  }
  if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) return track("whatsapp_click", base, "Contact");
  if (href.startsWith("tel:")) return track("phone_click", base, "Contact");
  if (href.startsWith("mailto:")) return track("email_click", base, "Contact");
  if (/\.pdf($|\?)/i.test(href)) return track("brochure_download", base);
}
