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
- **Un layout raíz por idioma** (para que `<html lang>` salga correcto del servidor): `app/(en)/layout.tsx`, `app/it/layout.tsx`, `app/de/layout.tsx`, todos usan `components/RootShell.tsx` (fuentes, Header/Footer, banners, JSON-LD). Cambiar de idioma hace recarga completa (normal). 404: `app/global-not-found.tsx` (`experimental.globalNotFound`).
- EN usa rutas explícitas dentro de `app/(en)/` (`page.tsx`, `tours/…`, `tour/[slug]/…`, `<slug>/…`, `contact/…`). IT/DE usan catch-all `app/it/[[...slug]]/page.tsx` y `app/de/[[...slug]]/page.tsx` que resuelven vía `components/LocaleRoute.tsx`.
- **Vistas compartidas locale-aware** en `components/views/` (`HomeView`, `ToursListView`, `TourView`, `PageView`, `ContactView`) — usadas por EN y por el catch-all.
- Header/Footer/CookieBanner son client components: detectan locale por `usePathname`; el switcher usa `alternatesForPath` (salta a la URL equivalente). `<html lang>` lo pone el layout raíz de cada idioma.
- Strings: `lib/i18n.ts` (UI/nav), `lib/home-content.ts` (home), `lib/tours-content.ts` (página de tours). Campervan es **EN-only** (no estaba traducido) → link siempre a `/campervan`.

## Estructura

```
app/
  (en)/layout.tsx  it/layout.tsx  de/layout.tsx   # layouts raíz por idioma → components/RootShell.tsx
  (en)/page.tsx              # Home EN (HomeView)
  global-not-found.tsx       # 404 único (multilingüe)
  sitemap.ts, robots.ts      # SEO (EN/IT/DE con alternates, x-default e imágenes)
  (en)/tours/ (en)/tour/[slug]/   # listado y detalle EN
  (en)/<content>/                 # bikes-e-bikes, motorbikes-scooters, 2wheels-season-pass,
                             # hotel-programs, about-us, for-companies, contact, campervan,
                             # payment-cancellation-refund-policy, cookie-policy-eu (EN, vía PageView)
  it/[[...slug]]/  de/[[...slug]]/   # catch-all IT y DE
middleware.ts                # X-Robots-Tag noindex fuera de *.2wheelsrental.com
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
7. `python3 scripts/parse_rentals.py [--fetch]` — `lib/rentals.json` (landings Bikes & e-bikes y Motorbikes & Scooters, EN/IT/DE) desde el sitio **en vivo** (`--fetch` re-descarga a `source-wordpress/html/live/`). Incluye un mapa `FIX` de correcciones a traducciones automáticas del WP.
8. `python3 scripts/parse_tour_extras.py` — completa los tours con highlights (+ título tipo "Why Shuttle" y foto), rutas ("Routes Available" del Bike Shuttle) y links de reserva faltantes, desde el sitio en vivo.
9. `python3 scripts/build_seo.py` — `lib/seo.json` (títulos/descripciones SEO por URL; ver sección SEO).
10. Campos `experience`/`duration` de tours: se agregaron con un script inline (mapa en el commit de filtros); ver `lib/tours.json`.

**Editar contenido a mano:** se puede editar directamente `lib/tours*.json` y `lib/pages*.json` (no hace falta re-correr los scripts salvo que cambie el sitio origen).

## Tours

- Listado (`ToursListView` + `ToursExplorer`): heading "Our Tours" + intro, **filtros** por Experience Type (custom/local/trips) y Duration (0.5/1/2/3/5/12 días), cards grayscale→color.
- Detalle (`TourView`, mismo orden que el single-post del WP): hero centrado con botón, specs, intro a 2 columnas, highlights (caja oscura + foto), rutas/itinerario, galería, Practical Info, **Keep Exploring** (3 tours). Antes: **Itinerary** (`ItineraryCarousel`: scroll horizontal con snap + flechas; 7/14 tours lo tienen), **Practical Info** (`PracticalInfo`: tabs + FAQ acordeón), galería, CTA.
- **Botón flotante "Book this tour"** (`FloatingBook`): aparece al pasar el hero y se oculta cuando otro CTA de reserva (`data-book-cta`) está visible.
- **Reservas → WeTravel** (campo `booking`, link externo por tour; vacío → WhatsApp). Bikes/motos → **Booqable**.

## SEO

- **`lib/seo.ts` → `finalizeMeta()`** se aplica a TODA la metadata (EN, IT/DE, landings, tours, blog): títulos/descripciones de `lib/seo.json`, `x-default` en hreflang, canonical con `/` final, Open Graph completo (url, siteName, locale, imagen) y Twitter card.
- **`lib/seo.json`** lo genera `python3 scripts/build_seo.py` desde `source-wordpress/meta/live-seo.json` (títulos/descripciones de Yoast del WP en vivo, conservados tal cual para no mover rankings). `TITLE_FIX` corrige traducciones malas de Yoast ("Casa", "Rundgänge"…); las páginas que en el WP no tenían descripción (Bikes, Motorbikes, Season Pass, Hotel, Cookie) tienen una escrita a partir de su contenido.
- Imagen OG por página: `lib/page-images.ts` (hero de cada landing/About/Companies); tours usan su hero; resto `/images/tours.webp`.
- **JSON-LD** (`components/JsonLd.tsx`): `LocalBusiness` + `WebSite` en todas las páginas (RootShell); `TouristTrip` + `BreadcrumbList` en cada tour.
- `sitemap.xml`: 76 URLs EN/IT/DE con hreflang + `x-default` e **image sitemap** de los tours (hero + highlights + galería). Excluye el Blog (noindex). `robots.txt` apunta al sitemap del dominio real.
- **noindex fuera de producción**: `middleware.ts` agrega `X-Robots-Tag: noindex` en vercel.app/previews/localhost (los canonical ya apuntan a 2wheelsrental.com).
- `trailingSlash: true` (URLs idénticas al WP). **Redirects 301/308** en `next.config.mjs`: `/experience_type/*`, `/it/tipo_esperienza/*`, `/de/erfahrung_art/*` → listado de tours; `/maintenance` (+IT/DE) → contacto; `/it/camper`, `/de/campervan` → `/campervan/`; `/tour`, `/it/tour`, `/de/tour` → listados; sitemaps de Yoast (`/sitemap_index.xml`, `/*-sitemap.xml`) → `/sitemap.xml`; `/feed` → `/`. Verificado: las 87 URLs del WP responden 200 o redirigen.
- Imágenes: todas por `next/image` (AVIF/WebP, `sizes` correctos); originales en `public/` con el **mismo nombre/ruta que en el WP** (`/wp-content/uploads/...`) para no perder indexación en Google Imágenes. Fondos decorativos con `alt=""`.

## Deploy

- Env `NEXT_PUBLIC_SITE_URL` (Vercel): URL de Vercel en pruebas; `https://2wheelsrental.com` al migrar. Default = dominio real.
- Plan: probar en Vercel → cuando esté perfecto, **migrar DNS** al dominio principal y dar de baja WordPress. El DNS se cambia recién con IT/DE listos (ya lo están) para no 404 URLs indexadas.

## Blog

`/blog` (`/it/blog`, `/de/blog`) es un placeholder "Coming soon" (`components/views/BlogView.tsx`), en el menú, con `noindex` y excluido del sitemap (`NOINDEX` en `app/sitemap.ts`). Al publicar artículos: quitar `robots` en `blogMetadata` y sacarlo de `NOINDEX`.

## Analytics y cookies

- `lib/consent.ts` + `components/Analytics.tsx`: **Consent Mode v2** (default `denied`) + Google tag `GT-TNH9V769` (Site Kit original) + **Meta Pixel** `2737544646598065` (solo tras aceptar). IDs sobreescribibles con `NEXT_PUBLIC_GTAG_ID` / `NEXT_PUBLIC_META_PIXEL_ID`.
- Los tags **solo cargan en `*.2wheelsrental.com`** (no ensucian métricas desde Vercel/localhost); para probarlos fuera: `NEXT_PUBLIC_ANALYTICS_ANY_HOST=1`.
- `CookieBanner` guarda la decisión y emite el evento; el footer tiene "Cookie settings" para reabrirlo. Cookiebot del original no tenía ID cargado → reemplazado por este banner.
- Home hero: `components/HeroVideo.tsx` (poster con Next/Image como LCP; el video solo se monta si no hay Save-Data/2G/3G ni reduced-motion). Video recomprimido: `hero.mp4` 720p 3.3MB y `hero-mobile.mp4` 540p 1.5MB (<768px); original 8MB.
- **Eventos de conversión** (`lib/analytics.ts`, listener en `Analytics.tsx`): `booking_click` (Booqable/WeTravel/Lugano Region; Meta `InitiateCheckout`), `whatsapp_click`, `phone_click`, `email_click` (Meta `Contact`), `brochure_download`, `generate_lead` en el formulario (Meta `Lead`). `gtag config` con `linker` cross-domain.
- **Landings** Bikes & e-bikes, Motorbikes & Scooters (datos en `lib/rentals.json`), Season Pass, Hotel Programs y Campervan: `components/views/LandingView.tsx` (hero + intro 2 col, card sobre foto, texto+imagen, checklist, galería, CTA) con datos en `lib/landing-content.ts` (EN/IT/DE; Campervan EN-only — copy del borrador de Elementor `?page_id=218`, no publicado en el WP).
- **Galerías**: `components/GalleryStrip.tsx` (carrusel grande con snap, flechas y barra de progreso) en tours, landings, For Companies y `ContentPage`.
- About y For Companies tienen vistas propias (`components/views/AboutView.tsx`, `CompaniesView.tsx`) con copy en `lib/about-content.ts` (EN/IT/DE, portado del HTML de Elementor). Fotos del equipo en `public/images/team/`.

## Pendiente — lado del cliente (antes/después del DNS)

**Antes de cambiar DNS**
1. Revisión final de diseño/contenido por página en `2wheelsrental.vercel.app` (EN/IT/DE). Revisar el copy de Campervan (transcrito del borrador `?page_id=218`) y las correcciones de traducción en `scripts/parse_rentals.py` (`FIX`).
2. **Formulario de contacto**: hoy solo abre el cliente de email (`mailto:`), no envía nada. Decidir servicio (Resend, Formspree, etc.) y pasar la API key → se conecta en `components/ContactForm.tsx`.
3. **GA4**: confirmar en Google Tag / GA4 que `GT-TNH9V769` (creado por Site Kit) está ligado a la propiedad GA4 correcta y que no depende del plugin (al borrar WordPress debe seguir funcionando). En GA4 → Admin → Data streams → *Configure tag settings*: agregar dominios `2wheelsrental.com`, `booqableshop.com`, `wetravel.com`, `tickets.luganoregion.com` (cross-domain; el código ya envía `linker`). Marcar como **eventos clave**: `booking_click`, `generate_lead`, `whatsapp_click` (también existen `phone_click`, `email_click`, `brochure_download`).
4. Datos del negocio para el JSON-LD (opcional pero recomendado): **código postal, horario de apertura y coordenadas** → `components/JsonLd.tsx`.

**Al cambiar DNS**
5. Apuntar `2wheelsrental.com` y `www` a Vercel (dominio principal sin www, como el WP). Variable `NEXT_PUBLIC_SITE_URL=https://2wheelsrental.com` en Vercel. Dar de baja WordPress solo después de verificar.
6. **Google Search Console**: propiedad de dominio verificada por DNS (TXT); enviar `https://2wheelsrental.com/sitemap.xml`; quitar sitemaps viejos de Yoast si aparecen. Usar *Inspección de URL* en home, un tour y una página IT/DE.
7. Verificar que llegan datos: GA4 *Realtime* (con cookies aceptadas), Meta *Events Manager* (Pixel `2737544646598065`: PageView, InitiateCheckout, Contact, Lead).
8. **Google Business Profile**: sitio web = `https://2wheelsrental.com/`.

**Después (2–4 semanas)**
9. Search Console → *Páginas*: revisar 404 / "rastreada sin indexar"; si aparece alguna URL vieja con error, agregar redirect en `next.config.mjs`.
10. (Opcional) Bing Webmaster Tools (importar desde Search Console).
11. (Opcional) Comprimir los PDFs (Campervan 14.6MB, For Companies 10.3MB, Season Pass 5MB): solo afectan a quien los descarga.

## Convenciones

- Commits como `ticino@2wheelsrental.com` (verificar `git config user.email` antes de commitear). Push a `origin main` (cuenta gh `2wheels-rental`).
- Al agregar una página nueva: crear ruta EN en `app/`, usar las vistas/`ContentPage`, añadir el pageKey a `lib/i18n-routes.json` (con slugs it/de), a `lib/routes.ts` (sitemap) y al nav en `lib/i18n.ts` si va en menú.
