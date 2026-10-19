import type { Locale } from "./i18n";

export type ToursPageStrings = {
  heading: string;
  intro: string;
  experienceLabel: string;
  durationLabel: string;
  all: string;
  exp: Record<string, string>; // custom|local|trips
  dur: Record<string, string>; // 0.5|1|2|3|5|12
};

export const DURATION_ORDER = ["0.5", "1", "2", "3", "5", "12"];
export const EXPERIENCE_ORDER = ["custom", "local", "trips"];

export const TOURS_PAGE: Record<Locale, ToursPageStrings> = {
  en: {
    heading: "Our Tours",
    intro:
      "Discover over 370 km of scenic routes across lakes, alpine passes and hidden trails. Our guided tours are tailored to your level, group size and riding style — from relaxed e-bike rides to technical MTB experiences.",
    experienceLabel: "Experience Type",
    durationLabel: "Duration",
    all: "All",
    exp: { custom: "Custom", local: "Local", trips: "Trips" },
    dur: { "0.5": "0.5 day", "1": "1 day", "2": "2 days", "3": "3 days", "5": "5 days", "12": "12 days" },
  },
  it: {
    heading: "I nostri tour",
    intro:
      "Scoprite oltre 370 km di percorsi panoramici attraverso laghi, passi alpini e sentieri nascosti. I nostri tour guidati sono personalizzati in base al vostro livello, alle dimensioni del gruppo e allo stile di guida: dalle rilassanti escursioni in e-bike alle esperienze tecniche in MTB.",
    experienceLabel: "Tipo di esperienza",
    durationLabel: "Durata",
    all: "Tutti",
    exp: { custom: "Personalizzato", local: "Locale", trips: "Viaggi" },
    dur: { "0.5": "0,5 giorno", "1": "1 giorno", "2": "2 giorni", "3": "3 giorni", "5": "5 giorni", "12": "12 giorni" },
  },
  de: {
    heading: "Unsere Touren",
    intro:
      "Entdecken Sie über 370 km landschaftlich reizvolle Routen über Seen, Alpenpässe und versteckte Pfade. Unsere geführten Touren sind auf Ihr Niveau, Ihre Gruppengröße und Ihren Fahrstil zugeschnitten – von entspannten E-Bike-Fahrten bis hin zu technischen MTB-Erlebnissen.",
    experienceLabel: "Erlebnistyp",
    durationLabel: "Dauer",
    all: "Alle",
    exp: { custom: "Benutzerdefiniert", local: "Local", trips: "Reisen" },
    dur: { "0.5": "0,5 Tag", "1": "1 Tag", "2": "2 Tage", "3": "3 Tage", "5": "5 Tage", "12": "12 Tage" },
  },
};
