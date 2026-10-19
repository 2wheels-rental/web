/** @type {import('next').NextConfig} */
const nextConfig = {
  // URLs con slash final, igual que el WordPress original (canonical idéntico)
  trailingSlash: true,
  // 404 global (hay varios layouts raíz: app/(en), app/it, app/de)
  experimental: { globalNotFound: true },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "2wheelsrental.com" },
      { protocol: "https", hostname: "**.booqableshop.com" },
    ],
  },
  async redirects() {
    return [
      // Taxonomía de experiencias del WP → listado de tours
      { source: "/experience_type/:slug*", destination: "/tours/", permanent: true },
      // Alias antiguo del bike shuttle
      { source: "/tours/bike-shuttle", destination: "/tour/bike-shuttle/", permanent: true },
      { source: "/it/tipo_esperienza/:slug*", destination: "/it/tour-2/", permanent: true },
      { source: "/de/erfahrung_art/:slug*", destination: "/de/touren/", permanent: true },
      // Página "Maintenance" del WP (no migrada) → contacto
      { source: "/maintenance", destination: "/contact/", permanent: true },
      { source: "/it/manutenzione", destination: "/it/contatti/", permanent: true },
      { source: "/de/wartung", destination: "/de/kontakt/", permanent: true },
      // Campervan es EN-only (estaba en el menú IT/DE del WP)
      { source: "/it/camper", destination: "/campervan/", permanent: true },
      { source: "/de/campervan", destination: "/campervan/", permanent: true },
      // Bases de /tour sin slug
      { source: "/tour", destination: "/tours/", permanent: true },
      { source: "/it/tour", destination: "/it/tour-2/", permanent: true },
      { source: "/de/tour", destination: "/de/touren/", permanent: true },
      // Sitemaps de Yoast (registrados en Search Console) → sitemap nuevo
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/:name(page|post|tour|category|experience_type|tipo_esperienza|erfahrung_art|author)-sitemap:n(\\d*).xml", destination: "/sitemap.xml", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
