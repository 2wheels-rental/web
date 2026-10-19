# 2wheels Rental — Web

Réplica en **Next.js** de la web WordPress `www.2wheelsrental.com` (alquiler de bicis, e-bikes, motos, scooters y campervan + tours en Lugano, Ticino), para desplegar en **Vercel** manteniendo el SEO y las URLs originales. Reemplaza al sitio WordPress (Elementor + Yoast + Booqable) una vez migrado el DNS.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens en `app/globals.css`)
- Fuentes: **Londrina Solid** (títulos) + **Poppins** (texto) vía `next/font`
- Deploy: **Vercel**, repo **github.com/2wheels-rental/web**

```bash
npm run dev      # desarrollo (localhost:3000)
npm run build    # build de producción
npm start        # servir build
```

## Identidad visual (del sitio original)

- Primario `#D23939` · primario oscuro `#A42F2F` · tinta `#333333` · grises `#6C6C6C` / `#AEAEAE` · paper `#F4F4F4`
- Botones: oscuros (`btn-dark`) por defecto, rojo como acento. Títulos en mayúsculas (Londrina Solid).

## Estructura de carpetas

```
app/
  layout.tsx              # layout raíz: fuentes, metadata, Header/Footer/WhatsApp/CookieBanner
  page.tsx                # Home
  globals.css             # tokens de diseño + base Tailwind v4
  sitemap.ts, robots.ts   # SEO generados por Next
  tours/page.tsx          # listado de tours
  tour/[slug]/page.tsx    # plantilla de detalle de tour (los 14 salen de lib/tours.json)
  bikes-e-bikes/          # páginas de contenido (usan components/ContentPage)
  motorbikes-scooters/
  2wheels-season-pass/
  hotel-programs/
  about-us/  for-companies/        # ContentPage con copy propia
  contact/                # custom: datos + formulario (mailto) + mapa Google
  campervan/              # "Meet maja"
  payment-cancellation-refund-policy/  cookie-policy-eu/   # políticas
components/
  Header.tsx              # nav + dropdowns + switcher idioma + menú móvil
  Footer.tsx  WhatsAppButton.tsx  CookieBanner.tsx
  ContentPage.tsx         # plantilla genérica (hero + bloques + galería + CTA)
  ContactForm.tsx         # formulario (client)
lib/
  site.ts                 # NAV, FOOTER, contacto, links Booqable
  tours.ts  tours.json    # datos de los 14 tours (parseados del sitio original)
  pages.ts  pages.json    # contenido de páginas internas (parseado)
  routes.ts               # SITE_URL + lista de rutas para sitemap
  img.ts                  # normaliza rutas de imágenes a /public
public/
  images/                 # imágenes con nombres limpios (logo, hero, secciones)
  wp-content/uploads/...  # imágenes originales (solo versión base; Next/Image optimiza)
source-wordpress/         # MATERIAL DE ORIGEN (gitignored): mirror HTML, meta, JSON-LD
```

## URLs e idiomas

- URLs **idénticas** al WordPress original, con **slash final** (`trailingSlash: true`) → canonical idéntico, SEO conservado.
- **EN** (sin prefijo) está implementado. **IT (`/it/`) y DE (`/de/`) pendientes** — el sitio original es trilingüe con **slugs distintos por idioma** (ej: `/about-us` → `/it/chi-siamo` → `/de/uber-uns`); el mapeo está en los `hreflang` de `source-wordpress/meta/meta_map.json` y en `slug_it`/`slug_de` de cada tour/página.
- Redirects en `next.config.mjs`: `/experience_type/*` → `/tours`, `/tours/bike-shuttle` → `/tour/bike-shuttle`.

## Cómo agregar / editar contenido

- **Editar un tour**: `lib/tours.json` (title, subtitle, specs, intro, highlights, hero, gallery, `booking` = link WeTravel). La plantilla `app/tour/[slug]/page.tsx` los renderiza todos; `generateStaticParams` + `generateMetadata` ya incluidos.
- **Editar una página de contenido**: `lib/pages.json` (blocks/images) o el `page.tsx` correspondiente.
- **Nueva página**: crear `app/<slug>/page.tsx` usando `components/ContentPage` y añadir la ruta a `lib/routes.ts` (para el sitemap) y a `NAV`/`FOOTER` en `lib/site.ts` si va en menú.

## Integraciones

- **Tours → WeTravel** (link externo por tour, campo `booking`; si está vacío → WhatsApp). 10/14 tienen link.
- **Bikes/Motos → Booqable** (`2wheels-rental.booqableshop.com`, `/collections/motorcycles`).
- **WhatsApp** flotante (`+41 76 361 96 61`).
- **Weride Academy** (link externo, partner).
- **Cookies**: banner propio (`CookieBanner`, consentimiento en localStorage). El original usa **Cookiebot** — cablear Cookiebot + Google Consent Mode + GA/GTM cuando haya IDs.

## SEO

- Metadata por página (`generateMetadata` / `metadata`): title, description, canonical, Open Graph. `metadataBase` = `https://2wheelsrental.com`.
- `sitemap.xml` y `robots.txt` generados (EN; sumar IT/DE al hacer i18n).
- **Antes del switch de DNS**: tener IT/DE listos (para no 404 URLs ya indexadas), verificar redirects 301 de cualquier slug que cambie, y reconfigurar **Google Search Console** + **Google Analytics/GTM**.

## Deploy

- `NEXT_PUBLIC_SITE_URL`: setear en Vercel. Durante pruebas = URL de Vercel; al migrar = `https://2wheelsrental.com`. Default `https://2wheelsrental.com`.
- Commits con la cuenta **ticino@2wheelsrental.com**.
- Plan: probar en Vercel (URL temporal) → cuando esté perfecto, **migrar DNS** al dominio principal y dar de baja WordPress.

## Pendiente (roadmap)

1. i18n **IT / DE** con slugs exactos + hreflang en `<head>`.
2. Hero real del home (es un **video de fondo** inyectado por JS; capturarlo del sitio en vivo).
3. Cablear **Cookiebot + GA/GTM + Consent Mode**; reconectar **Search Console**.
4. Afinar copy/imágenes de páginas con contenido embebido en imágenes (about, for-companies).
5. (Opcional) recomprimir imágenes base para aligerar el repo.
