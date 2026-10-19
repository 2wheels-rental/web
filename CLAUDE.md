# 2wheels Rental — Web

Réplica en **Next.js** de la web WordPress `www.2wheelsrental.com` (alquiler de bicis, e-bikes, motos, scooters y campervan + tours en Lugano, Ticino), desplegada en **Vercel** manteniendo SEO y URLs. Reemplaza al WordPress (Elementor + Yoast + Booqable + WeTravel) una vez migrado el DNS.

- **Repo:** github.com/2wheels-rental/web · commits como **ticino@2wheelsrental.com**
- **Vercel:** https://2wheelsrental.vercel.app (deploy automático en cada push a `main`)
- **Local:** `Claude Clones/CLIENTES/2wheels/2wheels-web`

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (tokens en `app/globals.css`) · fuentes **Londrina Solid** (títulos) + **Poppins** (texto).

```bash
npm run dev      # dev (localhost:3000/3001)
npm run build    # build de producción (hoy ~81 páginas EN/IT/DE)
```

> Nota: no corras `npm run build` con el dev server abierto (corrompe `.next`). Si pasa: parar dev, `rm -rf .next`, reiniciar dev.

## Identidad visual

Primario `#D23939` · oscuro `#A42F2F` · tinta `#333` · grises `#6C6C6C/#AEAEAE` · paper `#F4F4F4`. Botones oscuros en secciones blancas, rojo para CTAs. Títulos en mayúsculas (Londrina). El patrón del home alterna: secciones imagen+texto (blanco), full-bleed con texto centrado (Tours, Campervan), y bloques oscuros (Reviews, Partners). Hero = video de fondo.

## i18n (EN / IT / DE)

- **EN** sin prefijo; **IT** `/it/…`; **DE** `/de/…`, con **slugs distintos por idioma** (ej: `/about-us` → `/it/chi-siamo` → `/de/uber-uns`).
- Tabla central de rutas: `lib/i18n-routes.json` (pageKey → path por idioma). Helpers en `lib/i18n.ts` (`pagePath`, `tourPath`, `pageAlternates`, `tourAlternates`, `buildNav`, `UI`, `alternatesForPath`, `detectLocale`).
- EN usa rutas explícitas (`app/page.tsx`, `app/tours/…`, `app/tour/[slug]/…`, `app/<slug>/…`, `app/contact/…`). IT/DE usan catch-all `app/it/[[...slug]]/page.tsx` y `app/de/[[...slug]]/page.tsx` que resuelven vía `components/LocaleRoute.tsx`.
- **Vistas compartidas locale-aware** en `components/views/` (`HomeView`, `ToursListView`, `TourView`, `PageView`, `ContactView`) — usadas por EN y por el catch-all.
- Header/Footer/CookieBanner son client components: detectan locale por `usePathname`; el switcher usa `alternatesForPath` (salta a la URL equivalente). `<html lang>` se setea en el Header.
- Strings: `lib/i18n.ts` (UI/nav), `lib/home-content.ts` (home), `lib/tours-content.ts` (página de tours). Campervan es **EN-only** (no estaba traducido) → link siempre a `/campervan`.

## Estructura

```
app/
  layout.tsx                 # fuentes, metadata, Header/Footer/WhatsApp/CookieBanner
  page.tsx                   # Home EN (HomeView)
  sitemap.ts, robots.ts      # SEO (EN/IT/DE con alternates)
  tours/ tour/[slug]/        # listado y detalle EN
  <content>/                 # bikes-e-bikes, motorbikes-scooters, 2wheels-season-pass,
                             # hotel-programs, about-us, for-companies, contact, campervan,
                             # payment-cancellation-refund-policy, cookie-policy-eu (EN, vía PageView)
  it/[[...slug]]/  de/[[...slug]]/   # catch-all IT y DE
components/
  Header Footer WhatsAppButton CookieBanner Reviews ContactForm
  ContentPage.tsx            # renderer de páginas de contenido: variante "rich" y "legal"
  ToursExplorer.tsx          # grid de tours con filtros (client)
  LocaleRoute.tsx            # resolver + render + metadata para catch-all IT/DE
  views/                     # HomeView, ToursListView, TourView, PageView, ContactView
lib/
  site.ts                    # NAV base, contacto, links Booqable
  i18n.ts  i18n-routes.json  # i18n core
  home-content.ts  tours-content.ts
  tours.ts  tours.json  tours.it.json  tours.de.json
  pages.ts  pages.json  pages.it.json  pages.de.json
  routes.ts  img.ts
public/
  images/ (nombres limpios)  videos/hero.mp4 (8.6MB)  wp-content/uploads/… (168 base; Next/Image optimiza)
scripts/                     # generadores de datos desde el mirror (ver abajo)
source-wordpress/            # MIRROR gitignored (HTML, meta, JSON-LD) — material de origen
```

## Datos y scripts (cómo se generan los JSON)

Los JSON de `lib/` se **generan** del mirror `source-wordpress/` con los scripts en `scripts/` (requieren el mirror local; `source-wordpress` está gitignored). Reejecutar en orden si hace falta re-parsear:

1. `python3 scripts/mirror2.py` — descarga el mirror (HTML, imágenes usadas, assets) a `source-wordpress/`.
2. `python3 scripts/parse_tours.py` — `lib/tours.json` (14 tours EN: title, subtitle, specs, intro, highlights, hero, gallery, booking=WeTravel).
3. `python3 scripts/parse_pages.py` — `lib/pages.json` (contenido de páginas internas EN).
4. `python3 scripts/build_i18n.py` — `lib/i18n-routes.json`, `tours.{it,de}.json`, `pages.{it,de}.json`.
5. `python3 scripts/parse_itinerary.py` — agrega `itinerary` (día a día) a los 3 `tours.*.json`.
6. `python3 scripts/parse_practical.py` — agrega `practical` (tabs Practical Info: Included/Price|Dates/Conditions/FAQ) a los 3 `tours.*.json`; tabs vacíos o con placeholder en el WP se rellenan con la versión estándar del mismo idioma.
7. Campos `experience`/`duration` de tours: se agregaron con un script inline (mapa en el commit de filtros); ver `lib/tours.json`.

**Editar contenido a mano:** se puede editar directamente `lib/tours*.json` y `lib/pages*.json` (no hace falta re-correr los scripts salvo que cambie el sitio origen).

## Tours

- Listado (`ToursListView` + `ToursExplorer`): heading "Our Tours" + intro, **filtros** por Experience Type (custom/local/trips) y Duration (0.5/1/2/3/5/12 días), cards grayscale→color.
- Detalle (`TourView`): hero, specs, intro, highlights, **Itinerary** (`ItineraryCarousel`: scroll horizontal con snap + flechas; 7/14 tours lo tienen), **Practical Info** (`PracticalInfo`: tabs + FAQ acordeón), galería, CTA.
- **Botón flotante "Book this tour"** (`FloatingBook`): aparece al pasar el hero y se oculta cuando otro CTA de reserva (`data-book-cta`) está visible.
- **Reservas → WeTravel** (campo `booking`, link externo por tour; vacío → WhatsApp). Bikes/motos → **Booqable**.

## SEO

Metadata por página (title, description, canonical, Open Graph) + **hreflang** (alternates.languages) en EN/IT/DE. `metadataBase` = `https://2wheelsrental.com`. `sitemap.xml` y `robots.txt` generados (EN/IT/DE con alternates). `trailingSlash: true` (URLs idénticas al WP). Redirects 301 en `next.config.mjs` (`/experience_type/*` → `/tours`, `/tours/bike-shuttle` → `/tour/bike-shuttle`). meta/canonical/JSON-LD originales portados.

## Deploy

- Env `NEXT_PUBLIC_SITE_URL` (Vercel): URL de Vercel en pruebas; `https://2wheelsrental.com` al migrar. Default = dominio real.
- Plan: probar en Vercel → cuando esté perfecto, **migrar DNS** al dominio principal y dar de baja WordPress. El DNS se cambia recién con IT/DE listos (ya lo están) para no 404 URLs indexadas.

## Analytics y cookies

- `lib/consent.ts` + `components/Analytics.tsx`: **Consent Mode v2** (default `denied`) + Google tag `GT-TNH9V769` (Site Kit original) + **Meta Pixel** `2737544646598065` (solo tras aceptar). IDs sobreescribibles con `NEXT_PUBLIC_GTAG_ID` / `NEXT_PUBLIC_META_PIXEL_ID`.
- Los tags **solo cargan en `*.2wheelsrental.com`** (no ensucian métricas desde Vercel/localhost); para probarlos fuera: `NEXT_PUBLIC_ANALYTICS_ANY_HOST=1`.
- `CookieBanner` guarda la decisión y emite el evento; el footer tiene "Cookie settings" para reabrirlo. Cookiebot del original no tenía ID cargado → reemplazado por este banner.
- Home hero: `components/HeroVideo.tsx` (poster con Next/Image como LCP; el video solo se monta si no hay Save-Data/2G/3G ni reduced-motion).
- **Landings** Season Pass, Hotel Programs y Campervan: `components/views/LandingView.tsx` (hero + intro 2 col, card sobre foto, texto+imagen, checklist, galería, CTA) con datos en `lib/landing-content.ts` (EN/IT/DE; Campervan EN-only — copy del borrador de Elementor `?page_id=218`, no publicado en el WP).
- **Galerías**: `components/GalleryStrip.tsx` (carrusel grande con snap, flechas y barra de progreso) en tours, landings, For Companies y `ContentPage`.
- About y For Companies tienen vistas propias (`components/views/AboutView.tsx`, `CompaniesView.tsx`) con copy en `lib/about-content.ts` (EN/IT/DE, portado del HTML de Elementor). Fotos del equipo en `public/images/team/`.

## Pendiente (roadmap)

1. **Google Search Console** (verificar dominio, enviar sitemap) al migrar DNS. Verificar en GA/Ads que llegan datos tras el cambio.
2. (Opcional) recomprimir imágenes base y el video hero (8MB; no había ffmpeg) para aligerar el repo (~79MB).
3. Revisión final de diseño por página en Vercel antes del DNS.

## Convenciones

- Commits como `ticino@2wheelsrental.com` (verificar `git config user.email` antes de commitear). Push a `origin main` (cuenta gh `2wheels-rental`).
- Al agregar una página nueva: crear ruta EN en `app/`, usar las vistas/`ContentPage`, añadir el pageKey a `lib/i18n-routes.json` (con slugs it/de), a `lib/routes.ts` (sitemap) y al nav en `lib/i18n.ts` si va en menú.
