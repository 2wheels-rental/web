import { TOURS } from "./tours";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://2wheelsrental.com";

// Rutas EN del sitio (sin prefijo). IT/DE se agregarán con i18n.
export const STATIC_PATHS = [
  "/",
  "/about-us",
  "/bikes-e-bikes",
  "/motorbikes-scooters",
  "/2wheels-season-pass",
  "/for-companies",
  "/hotel-programs",
  "/campervan",
  "/tours",
  "/contact",
  "/payment-cancellation-refund-policy",
  "/cookie-policy-eu",
];

export const ALL_PATHS = [
  ...STATIC_PATHS,
  ...TOURS.map((t) => `/tour/${t.slug}`),
];
