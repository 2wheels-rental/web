// Imagen principal de cada página (para Open Graph / vista previa al compartir)
import type { Locale } from "./i18n";
import { landingFor } from "./landing-content";
import { ABOUT_IMG, COMPANIES_IMG } from "./about-content";
import { getPageL } from "./pages";
import { localImg } from "./img";

export function pageImage(key: string, locale: Locale): string | undefined {
  if (key === "about-us") return ABOUT_IMG.hero;
  if (key === "for-companies") return COMPANIES_IMG.hero;
  const landing = landingFor(key, locale);
  if (landing) return landing.hero.image;
  const img = getPageL(locale, key)?.images?.[0];
  return img ? localImg(img) : undefined;
}
