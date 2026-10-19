// Configuración central del sitio (replicada de 2wheelsrental.com)

export const SITE = {
  name: "2wheels Rental",
  tagline: "Bike Rental in Ticino",
  url: "https://2wheelsrental.com",
  booqable: "https://2wheels-rental.booqableshop.com",
  booqableMotorcycles:
    "https://2wheels-rental.booqableshop.com/collections/motorcycles",
  contact: {
    address: "Via Antonio Adamini 20, Lugano, Switzerland",
    email: "ticino@2wheelsrental.com",
    phone: "+41 76 361 96 61",
    whatsapp: "41763619661",
    instagram: "https://www.instagram.com/2wheels.rental/",
    instagramHandle: "@2wheels.Rental",
  },
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Rent",
    href: "/bikes-e-bikes",
    children: [
      { label: "Bikes & e-bikes", href: "/bikes-e-bikes" },
      { label: "Motorbikes & Scooters", href: "/motorbikes-scooters" },
      { label: "Season Pass", href: "/2wheels-season-pass" },
    ],
  },
  { label: "Tours", href: "/tours" },
  { label: "For Companies", href: "/for-companies" },
  {
    label: "Other Services",
    href: "/hotel-programs",
    children: [
      { label: "Bike Shuttle", href: "/tour/bike-shuttle" },
      { label: "Hotel Programs", href: "/hotel-programs" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Tours", href: "/tours" },
  { label: "For Companies", href: "/for-companies" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_RENTALS = [
  { label: "Bikes & E-bikes", href: "/bikes-e-bikes" },
  { label: "Motorcycles", href: "/motorbikes-scooters" },
  { label: "Campervan", href: "/campervan" },
];

export const FOOTER_LEGAL = [
  {
    label: "Payment, Cancellation & Refund Policy",
    href: "/payment-cancellation-refund-policy",
  },
  { label: "Cookie Policy", href: "/cookie-policy-eu" },
];
