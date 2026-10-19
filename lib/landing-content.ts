// Contenido de las landings Season Pass / Hotel Programs (EN/IT/DE, portado del Elementor original)
// y Campervan (EN; la página no existe en el WP en vivo → copy armado con el contenido de campervan del sitio).
import { pagePath, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export type LandingLink = { label: string; href: string; external?: boolean };
export type Landing = {
  hero: { image: string; eyebrow: string; title: string; body: string[]; cta?: LandingLink };
  card?: { bg: string; title: string; groups: { title: string; intro?: string; items: string[] }[]; button?: LandingLink };
  split?: { title: string; paras: string[]; list?: string[]; after?: string[]; image: string };
  checks?: { image: string; title: string; items: string[]; optionalTitle?: string; optional?: string[] };
  gallery?: string[];
  cta: { title: string; paras: string[]; button: LandingLink };
};

const U = "/wp-content/uploads/2026/";
const BOOQ = SITE.booqable + "/collections/";

const OPTIONAL: Record<Locale, { title: string; items: string[] }> = {
  en: { title: "Optional on Request", items: ["Guided bike tours", "MTB school & summer camps", "Bike shuttle service", "Hiking & via ferrata experiences"] },
  it: { title: "Opzionale su richiesta", items: ["Tour guidati in bicicletta", "Scuola di MTB e campi estivi", "Servizio navetta per biciclette", "Esperienze di escursionismo e vie ferrata"] },
  de: { title: "Optional auf Anfrage", items: ["Geführte Fahrradtouren", "MTB-Schule & Sommercamps", "Fahrrad-Shuttle-Service", "Wandern & Klettersteig-Erlebnisse"] },
};

// ---------------- HOTEL PROGRAMS ----------------
const HOTEL_IMG = {
  hero: `${U}03/portada-2wheels-rental-hotel-bike-program-lugano-ticino-offer-1-e1773606768762.webp`,
  card: `${U}03/galeria-2wheels-rental-road-bike-tour-lago-lugano-maggiore-como-ticino-alps-6.webp`,
  split: `${U}03/galeria-2wheels-rental-road-bike-tour-lago-lugano-maggiore-como-ticino-alps-2.webp`,
  checks: `${U}03/service-2wheels-rental-hotel-bike-program-lugano-ticino-offer-2.webp`,
  gallery: [
    `${U}03/galeria-2wheels-rental-monte-san-lucio-monte-bar-lugano-ticino-11.webp`,
    `${U}03/galeria-2wheels-rental-monte-san-lucio-monte-bar-lugano-ticino-2.webp`,
    `${U}03/galeria-2wheels-rental-monte-san-lucio-monte-bar-lugano-ticino-7.webp`,
    `${U}03/galeria-2wheels-rental-bike-shuttle-lugano-capriasca-ticino-trasporto-biciclette-taxi-4.webp`,
  ],
};
const HOTEL_PDF = `${U}03/Brochure-Hotel-Program-2026-2wheels-Rental-EN.pdf`;

function hotel(locale: Locale): Landing {
  const T = {
    en: {
      eyebrow: "Premium bikes for your guests.", title: "Hotel Bike Program",
      body: ["Offer your guests premium bikes directly at your hotel.", "2wheels Rental manages the bikes, maintenance and logistics — you simply provide a better experience and generate additional revenue."],
      book: "Book now", cardTitle: "Partnership Models",
      groups: [
        { title: "Seasonal Program", items: ["April – October (7 months)", "CHF 330 per bike / month", "Ideal for peak cycling season", "Flexible commitment for hotels starting their bike offering"] },
        { title: "Annual Program", items: ["12-month partnership", "CHF 240 per bike / month", "Lower monthly cost", "Strong positioning as a bike-friendly hotel"] },
        { title: "Minimum recommended fleet", items: ["3–4 bikes per hotel"] },
      ],
      download: "Download hotel program", splitTitle: "Hotel Benefits",
      paras: ["The Hotel Bike Program allows your property to offer premium outdoor experiences without operational complexity.", "There is no upfront investment and no need for internal management. 2wheels Rental provides the bikes, handles maintenance, and ensures everything is ready for your guests.", "The program also creates a clear revenue opportunity. With an average rental price of around CHF 50 per day, even limited usage can quickly cover the monthly cost."],
      checksTitle: "All-Inclusive Service",
      checks: ["Premium Bikes", "On-demand technical support", "Helmets, locks & lights", "Fleet management by 2wheels Rental", "Monthly maintenance & safety checks", "Zero upfront investment for the hotel"],
      ctaTitle: "Ready to offer bikes to your guests?", ctaParas: ["Let’s position your hotel as a leading outdoor destination in Ticino."], contact: "Contact us",
    },
    it: {
      eyebrow: "Biciclette premium per i vostri ospiti.", title: "Hotel Bike Program",
      body: ["Offrite ai vostri ospiti biciclette di prima qualità direttamente nel vostro hotel.", "2wheels Rental gestisce le biciclette, la manutenzione e la logistica: voi vi limitate a offrire un'esperienza migliore e a generare entrate aggiuntive."],
      book: "Prenota ora", cardTitle: "Modelli di partnership",
      groups: [
        { title: "Programma stagionale", items: ["Aprile – ottobre (7 mesi)", "CHF 330 per bicicletta / mese", "Ideale per l'alta stagione ciclistica", "Impegno flessibile per gli hotel che iniziano la loro offerta di biciclette"] },
        { title: "Programma annuale", items: ["Partnership di 12 mesi", "CHF 240 per bicicletta / mese", "Costo mensile inferiore", "Forte posizionamento come hotel bike-friendly"] },
        { title: "Flotta minima consigliata", items: ["3–4 biciclette per hotel"] },
      ],
      download: "Scarica il programma hotel", splitTitle: "Vantaggi per l'hotel",
      paras: ["L'Hotel Bike Program consente alla vostra struttura di offrire esperienze all'aria aperta di alto livello senza complessità operative.", "Non c'è alcun investimento iniziale e non è necessaria una gestione interna. 2wheels Rental fornisce le biciclette, si occupa della manutenzione e si assicura che tutto sia pronto per i vostri ospiti.", "Il programma crea anche una chiara opportunità di guadagno. Con un prezzo medio di noleggio di circa CHF 50 al giorno, anche un utilizzo limitato può coprire rapidamente il costo mensile."],
      checksTitle: "Servizio All-Inclusive",
      checks: ["Biciclette Premium", "Assistenza tecnica su richiesta", "Caschi, lucchetti e luci", "Gestione della flotta da parte di 2wheels Rental", "Controlli mensili di manutenzione e sicurezza", "Zero investimenti iniziali per l'hotel"],
      ctaTitle: "Siete pronti a offrire biciclette ai vostri ospiti?", ctaParas: ["Posizioniamo il vostro hotel come destinazione outdoor leader in Ticino."], contact: "Contattaci",
    },
    de: {
      eyebrow: "Premium-Fahrräder für Ihre Gäste.", title: "Hotel-Fahrradprogramm",
      body: ["Bieten Sie Ihren Gästen hochwertige Fahrräder direkt in Ihrem Hotel an.", "2wheels Rental kümmert sich um die Fahrräder, die Wartung und die Logistik – Sie bieten einfach ein besseres Erlebnis und generieren zusätzliche Einnahmen."],
      book: "Jetzt buchen", cardTitle: "Partnerschaftsmodelle",
      groups: [
        { title: "Saisonprogramm", items: ["April – Oktober (7 Monate)", "CHF 330 pro Fahrrad / Monat", "Ideal für die Hauptradsaison", "Flexibles Engagement für Hotels, die ihr Fahrradangebot starten"] },
        { title: "Jahresprogramm", items: ["12-monatige Partnerschaft", "CHF 240 pro Fahrrad / Monat", "Geringere monatliche Kosten", "Starke Positionierung als fahrradfreundliches Hotel"] },
        { title: "Empfohlene Mindestflotte", items: ["3–4 Fahrräder pro Hotel"] },
      ],
      download: "Hotelprogramm herunterladen", splitTitle: "Vorteile für Hotels",
      paras: ["Das Hotel-Fahrradprogramm ermöglicht es Ihrem Haus, erstklassige Outdoor-Erlebnisse ohne betrieblichen Aufwand anzubieten.", "Es gibt keine Vorabinvestitionen und kein internes Management. 2wheels Rental stellt die Fahrräder bereit, kümmert sich um die Wartung und sorgt dafür, dass alles für Ihre Gäste bereit ist.", "Das Programm schafft auch eine klare Einnahmemöglichkeit. Bei einem durchschnittlichen Mietpreis von rund CHF 50 pro Tag sind die monatlichen Kosten selbst bei geringer Nutzung schnell gedeckt."],
      checksTitle: "All-inclusive-Service",
      checks: ["Premium-Fahrräder", "Technische Unterstützung auf Abruf", "Helme, Schlösser und Lichter", "Flottenmanagement durch 2wheels Rental", "Monatliche Wartungs- und Sicherheitskontrollen", "Keine Vorabinvestition für das Hotel"],
      ctaTitle: "Bereit, Ihren Gästen Fahrräder anzubieten?", ctaParas: ["Positionieren wir Ihr Hotel als führende Outdoor-Destination im Tessin."], contact: "Kontakt",
    },
  }[locale];
  return {
    hero: { image: HOTEL_IMG.hero, eyebrow: T.eyebrow, title: T.title, body: T.body, cta: { label: T.book, href: BOOQ + "hotel-bike-program", external: true } },
    card: { bg: HOTEL_IMG.card, title: T.cardTitle, groups: T.groups, button: { label: T.download, href: HOTEL_PDF, external: true } },
    split: { title: T.splitTitle, paras: T.paras, image: HOTEL_IMG.split },
    checks: { image: HOTEL_IMG.checks, title: T.checksTitle, items: T.checks, optionalTitle: OPTIONAL[locale].title, optional: OPTIONAL[locale].items },
    gallery: HOTEL_IMG.gallery,
    cta: { title: T.ctaTitle, paras: T.ctaParas, button: { label: T.contact, href: pagePath("contact", locale) } },
  };
}

// ---------------- SEASON PASS ----------------
const PASS_IMG = {
  hero: `${U}03/portada-2wheels-rental-bike-season-pass-lugano-ticino-discount-price-offer-11-e1773607000499.webp`,
  card: `${U}03/packs-2wheels-rental-bike-season-pass-lugano-ticino-discount-price-offer-8.webp`,
  split: `${U}03/benefits-2wheels-rental-bike-season-pass-lugano-ticino-discount-price-offer-4.webp`,
  checks: `${U}03/bikes-available-2wheels-rental-bike-season-pass-lugano-ticino-discount-price-offer-9.webp`,
  gallery: ["1-e1779714423716", "6", "7", "2", "5"].map((n) => `${U}03/galeria-2wheels-rental-bike-season-pass-lugano-ticino-discount-price-offer-${n}.webp`),
};
const PASS_PDF = `${U}03/Conditions-2wheels-Season-Pass.pdf`;

function seasonPass(locale: Locale): Landing {
  const T = {
    en: {
      eyebrow: "Ride more. Pay less.", title: "Season Pass",
      body: ["The 2wheels Season Pass is designed for riders who want to enjoy the trails of Ticino throughout the season without the commitment of owning a bike.", "Simply book your bike, ride, return it and repeat whenever you want."],
      get: "Get the Season Pass", cardTitle: "Available Packs",
      groups: [
        { title: "10 Rides Pack", intro: "Perfect for occasional riders who plan several rides during the season.", items: ["Price: **CHF 450**", "Includes: **10 bike rentals**", "Validity: **for the entire season**", "Flexible booking", "Access to: **premium bikes**", "Price per ride: **CHF 45**"] },
        { title: "20 Rides Pack", intro: "The best option for frequent riders who want to enjoy the trails regularly throughout the season.", items: ["Price: **CHF 800**", "Includes: **20 bike rentals**", "Validity: **for the entire season**", "Flexible booking", "Access to: **premium bikes**", "Price per ride: **CHF 40**"] },
        { title: "Comparison", items: ["Regular rental price: ≈ **70 CHF / day**", "Save up to **43%**"] },
      ],
      download: "Download all the conditions", splitTitle: "Season Pass Benefits",
      paras: ["The Season Pass is a simple way to ride more while avoiding the responsibilities of owning a bike.", "**Benefits include:**"],
      list: ["access to **high-quality bikes**", "**no need to buy** an expensive bike", "**no maintenance** or repairs to worry about", "**no cleaning or storage** required", "**no battery charging** or management", "simple booking and flexible use throughout the season"],
      after: ["Just book, ride and return the bike. We take care of everything else."],
      checksTitle: "Bikes Available",
      checks: ["E-Bike Full Suspension", "Road Bike", "E-Bike Hardtail", "Fleet management by 2wheels Rental", "Gravel Bike", "1 credit per day for any bike"],
      ctaTitle: "Ready to ride more this season?", ctaParas: ["Get flexible access to the full 2wheels Rental fleet and enjoy better prices with the **2wheels Season Pass.**", "Ride more, explore more and make the **best** of the cycling in Ticino."], ctaBtn: "Get your Season Pass",
    },
    it: {
      eyebrow: "Pedala di più. Paga di meno.", title: "Season Pass",
      body: ["Il Season Pass 2wheels è pensato per chi vuole godersi i sentieri e le strade del Ticino per tutta la stagione senza l'impegno di possedere una bicicletta.", "È sufficiente prenotare la bicicletta, pedalare, restituirla e ripetere ogni volta che lo si desidera."],
      get: "Ottieni il Season Pass", cardTitle: "Pacchetti disponibili",
      groups: [
        { title: "Pacchetto 10 rides", intro: "Perfetto per i ciclisti occasionali che pianificano diverse uscite durante la stagione.", items: ["Prezzo: **CHF 450**", "Include: **10 noleggi di biciclette**", "Validità: **per tutta la stagione**", "Prenotazione flessibile", "Accesso a: **biciclette premium**", "Prezzo per uscita: **CHF 45**"] },
        { title: "Pacchetto 20 rides", intro: "L'opzione migliore per i ciclisti abituali che vogliono godersi i sentieri regolarmente per tutta la stagione.", items: ["Prezzo: **CHF 800**", "Include: **20 noleggi di biciclette**", "Validità: **per tutta la stagione**", "Prenotazione flessibile", "Accesso a: **biciclette premium**", "Prezzo per uscita: **CHF 40**"] },
        { title: "Confronto", items: ["Prezzo del noleggio regolare: ≈ **70 CHF / giorno**", "Risparmia fino al **43%**"] },
      ],
      download: "Scarica tutte le condizioni", splitTitle: "Vantaggi del Season Pass",
      paras: ["Il Season Pass è un modo semplice per pedalare di più evitando le responsabilità legate al possesso di una bicicletta.", "**I vantaggi includono:**"],
      list: ["accesso a **biciclette di alta qualità**", "**nessun bisogno di acquistare** una bicicletta costosa", "**nessuna manutenzione** o riparazione di cui preoccuparsi", "**nessuna pulizia o rimessaggio**", "**nessuna ricarica della batteria** da gestire", "prenotazione semplice e utilizzo flessibile per tutta la stagione"],
      after: ["Basta prenotare, pedalare e restituire la bici. A tutto il resto pensiamo noi."],
      checksTitle: "Biciclette disponibili",
      checks: ["E-Bike Full Suspension", "Bici da strada", "E-Bike Hardtail", "Gestione della flotta da parte di 2wheels Rental", "Bici Gravel", "1 credito al giorno per qualsiasi bicicletta"],
      ctaTitle: "Pronti a pedalare di più questa stagione?", ctaParas: ["Ottenete un accesso flessibile all'intera flotta 2wheels Rental e prezzi più vantaggiosi con il **2wheels Season Pass.**", "Pedalate di più, esplorate di più e godetevi il **meglio** del ciclismo in Ticino."], ctaBtn: "Ottieni il tuo Season Pass",
    },
    de: {
      eyebrow: "Mehr fahren. Weniger zahlen.", title: "Saisonpass",
      body: ["Der 2wheels-Saisonpass richtet sich an alle, die die Trails im Tessin die ganze Saison über geniessen möchten, ohne ein eigenes Fahrrad zu besitzen.", "Einfach Fahrrad buchen, fahren, zurückgeben – und wiederholen, so oft Sie wollen."],
      get: "Saisonpass holen", cardTitle: "Verfügbare Pakete",
      groups: [
        { title: "10-Fahrten-Paket", intro: "Ideal für Gelegenheitsfahrer, die während der Saison mehrere Ausfahrten planen.", items: ["Preis: **CHF 450**", "Enthält: **10 Fahrradmieten**", "Gültigkeit: **die ganze Saison**", "Flexible Buchung", "Zugang zu: **Premium-Fahrrädern**", "Preis pro Fahrt: **CHF 45**"] },
        { title: "20-Fahrten-Paket", intro: "Die beste Option für Vielfahrer, die die Trails die ganze Saison über regelmässig geniessen möchten.", items: ["Preis: **CHF 800**", "Enthält: **20 Fahrradmieten**", "Gültigkeit: **die ganze Saison**", "Flexible Buchung", "Zugang zu: **Premium-Fahrrädern**", "Preis pro Fahrt: **CHF 40**"] },
        { title: "Vergleich", items: ["Regulärer Mietpreis: ≈ **70 CHF / Tag**", "Sparen Sie bis zu **43%**"] },
      ],
      download: "Alle Bedingungen herunterladen", splitTitle: "Vorteile des Saisonpasses",
      paras: ["Der Saisonpass ist eine einfache Möglichkeit, mehr zu fahren, ohne die Verpflichtungen eines eigenen Fahrrads.", "**Die Vorteile:**"],
      list: ["Zugang zu **hochwertigen Fahrrädern**", "**kein teures Fahrrad kaufen**", "**keine Wartung** oder Reparaturen", "**keine Reinigung oder Lagerung**", "**kein Akku-Laden** oder -Management", "einfache Buchung und flexible Nutzung die ganze Saison über"],
      after: ["Einfach buchen, fahren und das Fahrrad zurückgeben. Um alles andere kümmern wir uns."],
      checksTitle: "Verfügbare Fahrräder",
      checks: ["E-Bike Full Suspension", "Rennrad", "E-Bike Hardtail", "Flottenmanagement durch 2wheels Rental", "Gravelbike", "1 Credit pro Tag für jedes Fahrrad"],
      ctaTitle: "Bereit, diese Saison mehr zu fahren?", ctaParas: ["Flexibler Zugang zur gesamten 2wheels-Rental-Flotte und bessere Preise mit dem **2wheels Saisonpass.**", "Mehr fahren, mehr entdecken und das **Beste** aus dem Radfahren im Tessin herausholen."], ctaBtn: "Saisonpass holen",
    },
  }[locale];
  const buy = { label: T.get, href: BOOQ + "2wheels-season-pass", external: true };
  return {
    hero: { image: PASS_IMG.hero, eyebrow: T.eyebrow, title: T.title, body: T.body, cta: buy },
    card: { bg: PASS_IMG.card, title: T.cardTitle, groups: T.groups, button: { label: T.download, href: PASS_PDF, external: true } },
    split: { title: T.splitTitle, paras: T.paras, list: T.list, after: T.after, image: PASS_IMG.split },
    checks: { image: PASS_IMG.checks, title: T.checksTitle, items: T.checks, optionalTitle: OPTIONAL[locale].title, optional: OPTIONAL[locale].items },
    gallery: PASS_IMG.gallery,
    cta: { title: T.ctaTitle, paras: T.ctaParas, button: { ...buy, label: T.ctaBtn } },
  };
}

// ---------------- CAMPERVAN (EN) ----------------
export const CAMPERVAN: Landing = {
  hero: {
    image: `${U}02/05-Campervan-Rental-2wheels-Rental.webp`,
    eyebrow: "Total freedom on four wheels.",
    title: "Meet maja",
    body: [
      "A fully equipped premium campervan based in Lugano, built for total freedom across Europe.",
      "Perfect for couples and small families who want to combine **cycling adventures** with the freedom of van life.",
    ],
    cta: { label: "Book now", href: BOOQ + "campervan", external: true },
  },
  card: {
    bg: `${U}03/portada-2wheels-rental-camper-campervan-bike-rental-dolomites-bolzano-italia-1.webp`,
    title: "Bike & Camper",
    groups: [
      {
        title: "Dolomites Bike & Camper Experience",
        intro: "5 days of self-guided cycling through the Italian Dolomites, travelling with maja.",
        items: [
          "Ride some of the most iconic alpine roads in Europe",
          "Climb legendary passes like **Passo Gardena, Pordoi and Sella**",
          "Discover scenic valleys such as **Val di Funes**",
          "Reach the famous **Lago di Braies**",
          "Designed for **1 to 4 riders** — road, gravel or e-bike",
        ],
      },
    ],
    button: { label: "View the experience", href: "/tour/dolomites-camper-experience/" },
  },
  checks: {
    image: `${U}03/portada-2wheels-rental-road-bike-tour-lago-lugano-maggiore-como-ticino-alps.webp`,
    title: "Ride & Roam",
    items: [
      "Fully equipped premium campervan",
      "Bike rental: road, gravel or e-bike",
      "Bike setup and preparation",
      "Helmet and basic repair kit",
      "GPX routes and ride recommendations",
      "Based in Lugano, ready for Europe",
    ],
    optionalTitle: OPTIONAL.en.title,
    optional: OPTIONAL.en.items,
  },
  cta: {
    title: "Ready to hit the road?",
    paras: ["Combine the best rides in the Alps with the freedom of travelling in your own **premium campervan**."],
    button: { label: "Book maja", href: BOOQ + "campervan", external: true },
  },
};

export function landingFor(pageKey: string, locale: Locale): Landing | null {
  if (pageKey === "hotel-programs") return hotel(locale);
  if (pageKey === "2wheels-season-pass") return seasonPass(locale);
  return null;
}
