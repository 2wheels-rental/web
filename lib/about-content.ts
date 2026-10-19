// Copy de About Us y For Companies (portado del HTML Elementor del WP original, EN/IT/DE).
import type { Locale } from "@/lib/i18n";

const U = "/wp-content/uploads/2026/02/";

export const ABOUT_IMG = {
  hero: `${U}About-Us-2wheels-Rental.webp`,
  who: `${U}Who-we-are-About-Us-2wheels-Rental.webp`,
  cta: `${U}About-Us-1-2wheels-Rental.webp`,
};

export const COMPANIES_IMG = {
  hero: `${U}For-Companies-13-2wheels-Rental.webp`,
  programs: `${U}10-For-Companies-2wheels-Rental.webp`,
  pillars: [`${U}02-For-Companies-2wheels-Rental.webp`, `${U}03-For-Companies-2wheels-Rental.webp`, `${U}04-For-Companies-2wheels-Rental.webp`],
  gallery: ["05", "06", "07", "08", "09", "11", "12"].map((n) => `${U}${n}-For-Companies-2wheels-Rental.webp`),
  cta: `${U}01-For-Companies-2wheels-Rental.webp`,
};

export const COMPANIES_BROCHURE = "/wp-content/uploads/2026/03/For-Companies.pdf";

type About = {
  h1: string; lead: string; contact: string;
  whoTitle: string; who: string[];
  values: string[];
  teamTitle: string; teamIntro: string; team: { name: string; role: string; photo: string }[];
  ctaTitle: string; ctaBody: string; ctaButton: string;
};

const TEAM = ["Johnny Guggiari", "Eduardo Aldunate", "Daniela Letelier", "Cristian Gübeli", "Yuri Monaco"];
const PHOTOS = ["johnny-guggiari.webp", "eduardo-aldunate.webp", "daniela-letelier.webp", "cristian-gubeli.jpeg", "yuri-monaco.webp"];
const team = (roles: string[]) => TEAM.map((name, i) => ({ name, role: roles[i], photo: `/images/team/${PHOTOS[i]}` }));

export const ABOUT: Record<Locale, About> = {
  en: {
    h1: "About 2wheels Rental",
    lead: "Built in Lugano. Driven by passion for outdoor experiences.",
    contact: "Get in touch",
    whoTitle: "Who we are",
    who: [
      "2wheels Rental was founded in Lugano with a simple idea: outdoor experiences should be well designed, safe and meaningful.",
      "What started as a premium bike rental service evolved into guided tours, corporate programs and tailor-made outdoor experiences across Ticino.",
      "We work with travelers, locals and companies who value quality, nature and human connection.",
    ],
    values: ["Authentic outdoor experiences", "Quality over quantity", "Sustainability and respect for nature", "Human connection and teamwork"],
    teamTitle: "Meet the team",
    teamIntro: "A team united by adventure, local expertise and a shared commitment to delivering exceptional experiences on two wheels in Ticino.",
    team: team(["Founder & CEO", "Director", "Marketing & Design", "Chief Tour Guide", "Travel Guide"]),
    ctaTitle: "Ready to ride?",
    ctaBody: "Whether you’re seeking a relaxed e-bike ride by the lake or a challenging mountain ascent, our guided tours in Ticino are designed to match your level and create unforgettable outdoor experiences.",
    ctaButton: "Check our tours",
  },
  it: {
    h1: "Chi è 2wheels Rental",
    lead: "Nata a Lugano. Guidati dalla passione per le esperienze all'aria aperta.",
    contact: "Contattateci",
    whoTitle: "Chi siamo",
    who: [
      "2wheels Rental è stata fondata a Lugano con un'idea semplice: le esperienze all'aria aperta devono essere ben progettate, sicure e significative.",
      "Quello che è iniziato come un servizio di noleggio di biciclette di alta qualità si è evoluto in tour guidati, programmi aziendali ed esperienze outdoor su misura in tutto il Ticino.",
      "Lavoriamo con viaggiatori, locali e aziende che apprezzano la qualità, la natura e il legame umano.",
    ],
    values: ["Autentiche esperienze outdoor", "Qualità oltre quantità", "Sostenibilità e rispetto per la natura", "Connessione umana e lavoro di squadra"],
    teamTitle: "Conosci il team",
    teamIntro: "Un team unito dall'avventura, dall'esperienza locale e dall'impegno comune di offrire esperienze eccezionali su due ruote in Ticino.",
    team: team(["Fondatore e CEO", "Direttore", "Marketing & Design", "Capo guida turistica", "Guida di viaggio"]),
    ctaTitle: "Pronti a salire in sella?",
    ctaBody: "Che siate alla ricerca di una rilassante pedalata in e-bike in riva al lago o di un sentiero impegnativo in montagna, i nostri tour guidati in Ticino sono pensati per soddisfare il vostro livello e creare esperienze indimenticabili all'aria aperta.",
    ctaButton: "Guarda i nostri tour",
  },
  de: {
    h1: "Über 2wheels Rental",
    lead: "Gebaut in Lugano. Angetrieben von der Leidenschaft für Outdoor-Erlebnisse.",
    contact: "Kontakt aufnehmen",
    whoTitle: "Wer wir sind",
    who: [
      "2wheels Rental wurde in Lugano mit einer einfachen Idee gegründet: Outdoor-Erlebnisse sollten gut gestaltet, sicher und sinnvoll sein.",
      "Was als erstklassiger Fahrradverleih begann, entwickelte sich zu geführten Touren, Firmenprogrammen und maßgeschneiderten Outdoor-Erlebnissen im ganzen Tessin.",
      "Wir arbeiten mit Reisenden, Einheimischen und Unternehmen zusammen, die Wert auf Qualität, Natur und menschliche Nähe legen.",
    ],
    values: ["Authentische Outdoor-Erlebnisse", "Qualität vor Quantität", "Nachhaltigkeit und Respekt vor der Natur", "Menschliche Verbindung und Teamarbeit"],
    teamTitle: "Lernen Sie das Team kennen",
    teamIntro: "Ein Team, das durch Abenteuer, lokales Know-how und ein gemeinsames Engagement für außergewöhnliche Erlebnisse auf zwei Rädern im Tessin vereint ist.",
    team: team(["Gründer & CEO", "Direktor", "Marketing & Design", "Chef-Tourguide", "Reiseleiter"]),
    ctaTitle: "Bereit zur Fahrt?",
    ctaBody: "Ob Sie eine entspannte E-Bike-Tour am See oder einen anspruchsvollen Bergaufstieg suchen, unsere geführten Touren im Tessin sind auf Ihr Niveau abgestimmt und sorgen für unvergessliche Outdoor-Erlebnisse.",
    ctaButton: "Touren ansehen",
  },
};

type Companies = {
  h1: string; lead: string; plan: string;
  programsTitle: string; programs: string;
  stats: { value: string; label: string }[];
  pillars: { title: string; text: string }[];
  brochureTitle: string; brochureButton: string;
  howTitle: string; howIntro: string; steps: { title: string; text: string }[];
  ctaTitle: string; ctaBody: string; ctaButton: string;
};

export const COMPANIES: Record<Locale, Companies> = {
  en: {
    h1: "Corporate Outdoor Programs in Ticino",
    lead: "The outdoor way to empower teams",
    plan: "Plan your corporate experience",
    programsTitle: "Our Company Programs",
    programs: "We design tailor-made outdoor programs for companies seeking to strengthen collaboration, leadership and communication through real, structured experiences in nature.",
    stats: [{ value: "+1000", label: "Participants" }, { value: "+40", label: "Companies" }, { value: "+5", label: "Countries" }],
    pillars: [
      { title: "Rides", text: "Guided bike and e-bike tours adapted to group size and fitness level. Collaborative checkpoints and shared objectives encourage alignment and team cohesion." },
      { title: "Challenges", text: "Outdoor problem-solving dynamics designed to develop trust, resilience and decision-making under pressure." },
      { title: "Workshops", text: "Facilitated sessions that translate outdoor experiences into concrete business insights, focused on leadership, communication and team effectiveness." },
    ],
    brochureTitle: "Detailed Overview of Our B2B Experiences",
    brochureButton: "Download brochure",
    howTitle: "How It Works",
    howIntro: "A clear, collaborative framework that turns outdoor experiences into real business impact.",
    steps: [
      { title: "Company Alignment", text: "We define objectives and expected outcomes." },
      { title: "Program Design", text: "We create a tailored outdoor experience." },
      { title: "Field Execution", text: "We deliver and facilitate the experience." },
      { title: "Strategic Debrief", text: "We turn insights into concrete actions." },
    ],
    ctaTitle: "Ready to design your corporate experience?",
    ctaBody: "Let’s discuss your objectives and build a tailored outdoor program for your team.",
    ctaButton: "Request a proposal",
  },
  it: {
    h1: "Programmi outdoor aziendali in Ticino",
    lead: "Il modo all'aperto per potenziare i team",
    plan: "Pianificate la vostra esperienza aziendale",
    programsTitle: "I nostri programmi aziendali",
    programs: "Progettiamo programmi outdoor su misura per le aziende che vogliono rafforzare la collaborazione, la leadership e la comunicazione attraverso esperienze reali e strutturate nella natura.",
    stats: [{ value: "+1000", label: "Partecipanti" }, { value: "+40", label: "Aziende" }, { value: "+5", label: "Paesi" }],
    pillars: [
      { title: "Rides", text: "Tour guidati in bicicletta e in e-bike adattati alle dimensioni del gruppo e al livello di forma fisica. Punti di controllo collaborativi e obiettivi condivisi incoraggiano l'allineamento e la coesione del team." },
      { title: "Challenges", text: "Dinamiche di problem-solving all'aperto per sviluppare la fiducia, la resilienza e il processo decisionale sotto pressione." },
      { title: "Workshops", text: "Sessioni di facilitazione che traducono le esperienze all'aperto in intuizioni aziendali concrete, incentrate su leadership, comunicazione ed efficacia del team." },
    ],
    brochureTitle: "Panoramica dettagliata delle nostre esperienze B2B",
    brochureButton: "Scarica la brochure",
    howTitle: "Come funziona",
    howIntro: "Un quadro chiaro e collaborativo che trasforma le esperienze all'aperto in un impatto aziendale reale.",
    steps: [
      { title: "Allineamento aziendale", text: "Definiamo gli obiettivi e i risultati attesi." },
      { title: "Progettazione del programma", text: "Creiamo un'esperienza outdoor su misura." },
      { title: "Esecuzione sul campo", text: "Realizziamo e facilitiamo l'esperienza." },
      { title: "Debrief strategico", text: "Trasformiamo le intuizioni in azioni concrete." },
    ],
    ctaTitle: "Siete pronti a progettare la vostra esperienza aziendale?",
    ctaBody: "Discutiamo dei vostri obiettivi e costruiamo un programma outdoor su misura per il vostro team.",
    ctaButton: "Richiedi una proposta",
  },
  de: {
    h1: "Corporate Outdoor-Programme im Tessin",
    lead: "Die Outdoor-Methode zur Stärkung von Teams",
    plan: "Planen Sie Ihr Firmenerlebnis",
    programsTitle: "Unsere Firmenprogramme",
    programs: "Wir entwickeln maßgeschneiderte Outdoor-Programme für Unternehmen, die Zusammenarbeit, Führung und Kommunikation durch reale, strukturierte Erfahrungen in der Natur stärken wollen.",
    stats: [{ value: "+1000", label: "Teilnehmer" }, { value: "+40", label: "Unternehmen" }, { value: "+5", label: "Länder" }],
    pillars: [
      { title: "Rides", text: "Geführte Fahrrad- und E-Bike-Touren, die an die Gruppengröße und das Fitnessniveau angepasst sind. Gemeinsame Kontrollpunkte und Ziele fördern die Ausrichtung und den Zusammenhalt des Teams." },
      { title: "Challenges", text: "Problemlösungsdynamik im Freien, um Vertrauen, Belastbarkeit und Entscheidungsfähigkeit unter Druck zu entwickeln." },
      { title: "Workshops", text: "Moderierte Sitzungen, in denen Outdoor-Erfahrungen in konkrete geschäftliche Erkenntnisse umgesetzt werden, mit Schwerpunkt auf Führung, Kommunikation und Teameffektivität." },
    ],
    brochureTitle: "Detaillierter Überblick über unsere B2B-Erlebnisse",
    brochureButton: "Broschüre herunterladen",
    howTitle: "So funktioniert es",
    howIntro: "Ein klarer, kollaborativer Rahmen, der Outdoor-Erlebnisse in echten geschäftlichen Mehrwert verwandelt.",
    steps: [
      { title: "Ausrichtung", text: "Wir definieren Ziele und erwartete Ergebnisse." },
      { title: "Programmgestaltung", text: "Wir schaffen ein maßgeschneidertes Outdoor-Erlebnis." },
      { title: "Durchführung", text: "Wir setzen das Erlebnis um und moderieren es." },
      { title: "Strategisches Debriefing", text: "Wir setzen Erkenntnisse in konkrete Maßnahmen um." },
    ],
    ctaTitle: "Bereit, Ihr Firmenerlebnis zu gestalten?",
    ctaBody: "Lassen Sie uns Ihre Ziele besprechen und ein maßgeschneidertes Outdoor-Programm für Ihr Team erstellen.",
    ctaButton: "Angebot anfordern",
  },
};
