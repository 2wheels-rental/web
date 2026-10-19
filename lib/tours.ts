import data from "./tours.json";

export type Tour = {
  slug: string;
  title: string;
  subtitle: string;
  specs: Record<string, string>;
  intro: string[];
  highlights: string[];
  hero: string;
  gallery: string[];
  booking: string; // link externo WeTravel (vacío = reservar por WhatsApp)
  slug_it: string;
  slug_de: string;
};

export const TOURS = data as Tour[];

export const getTour = (slug: string): Tour | undefined =>
  TOURS.find((t) => t.slug === slug);

// Orden de specs tal como aparece en el sitio original
export const SPEC_ORDER = [
  "Duration",
  "Distance",
  "Format",
  "Level",
  "Elevation",
  "Bike Type",
];
