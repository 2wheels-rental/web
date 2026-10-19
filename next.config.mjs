/** @type {import('next').NextConfig} */
const nextConfig = {
  // URLs con slash final, igual que el WordPress original (canonical idéntico)
  trailingSlash: true,
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
      { source: "/experience_type/:slug*", destination: "/tours", permanent: true },
      // Alias antiguo del bike shuttle
      { source: "/tours/bike-shuttle", destination: "/tour/bike-shuttle", permanent: true },
    ];
  },
};

export default nextConfig;
