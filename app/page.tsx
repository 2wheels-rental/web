import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import Reviews from "@/components/Reviews";

const btn = {
  red: "inline-block rounded-md bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark",
  dark: "inline-block rounded-md bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black",
  outline:
    "inline-block rounded-md border border-ink px-8 py-4 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-white",
};

function GoogleBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur">
      <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden>
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.6 2.4 30.1 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.2 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.1 5.3-4.6 7l7.1 5.5c4.2-3.9 6.6-9.6 6.6-16.9z" />
        <path fill="#FBBC05" d="M10.5 28.3c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-7.9-6.1C1 16.9 0 20.3 0 24s1 7.1 2.6 10.3l7.9-6z" />
        <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.5l-7.1-5.5c-2 1.3-4.6 2.1-7.9 2.1-6.3 0-11.6-3.7-13.5-9.3l-7.9 6C6.5 42.6 14.6 48 24 48z" />
      </svg>
      <span className="font-bold text-white">4,9</span>
      <span className="text-[#FBBC05]">★★★★★</span>
    </div>
  );
}

type BtnKey = keyof typeof btn;
function Cta({ label, href, style, external }: { label: string; href: string; style: BtnKey; external?: boolean }) {
  return external ? (
    <a href={href} target="_blank" rel="noopener" className={btn[style]}>{label}</a>
  ) : (
    <Link href={href} className={btn[style]}>{label}</Link>
  );
}

function Split({
  image,
  imageSide = "left",
  eyebrow,
  title,
  body,
  children,
  bg = "white",
}: {
  image: string;
  imageSide?: "left" | "right";
  eyebrow?: string;
  title: string;
  body: React.ReactNode;
  children?: React.ReactNode;
  bg?: "white" | "paper";
}) {
  const img = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
      <Image src={image} alt={title} fill className="object-cover" />
    </div>
  );
  return (
    <section className={bg === "paper" ? "bg-paper" : "bg-white"}>
      <div className="container-site grid items-center gap-12 py-20 md:grid-cols-2">
        <div className={imageSide === "right" ? "md:order-2" : ""}>{img}</div>
        <div className={imageSide === "right" ? "md:order-1" : ""}>
          {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>}
          <h2 className="text-4xl uppercase text-ink sm:text-5xl">{title}</h2>
          <div className="mt-5 space-y-4 text-lg text-ink-soft">{body}</div>
          <div className="mt-7 flex flex-wrap gap-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

function FullBleed({ image, title, body, cta }: { image: string; title: string; body: string; cta: React.ReactNode }) {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="container-site relative text-center text-white">
        <h2 className="text-5xl uppercase sm:text-6xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">{body}</p>
        <div className="mt-8 flex justify-center">{cta}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO (video de fondo) */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-ink">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero.webp"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        <div className="container-site relative">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              Bike Rental &amp; Tours in Ticino
            </p>
            <h1 className="mt-4 text-5xl uppercase sm:text-6xl lg:text-7xl">
              Explore Ticino on Two Wheels
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">
              2wheels Rental is based in Lugano and specializes in premium bike,
              e-bike and campervan rentals, guided tours and outdoor experiences
              across Ticino.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <GoogleBadge />
              <a href={SITE.booqable} target="_blank" rel="noopener" className={btn.red}>
                Rent a bike
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BIKE & MOTORCYCLE RENTAL */}
      <Split
        image="/images/rent-bikes.webp"
        title="Bike & Motorcycle Rental in Lugano"
        body={
          <>
            <p>
              Looking for a reliable bike rental in Lugano? We offer premium
              e-bikes, mountain, road and gravel options to explore Lake Lugano
              and the trails of Ticino.
            </p>
            <p>
              Prefer more power? Discover our scooters and premium motorcycles
              for alpine roads and Swiss mountain passes.
            </p>
          </>
        }
      >
        <Cta label="Explore Bikes" href="/bikes-e-bikes" style="dark" />
        <Cta label="Explore Motorcycles" href="/motorbikes-scooters" style="outline" />
      </Split>

      {/* TOURS */}
      <FullBleed
        image="/images/tours.webp"
        title="Tours"
        body="Guided bike and e-bike tours in Lugano and across Ticino, designed for all levels."
        cta={<Cta label="Check our tours" href="/tours" style="red" />}
      />

      {/* FOR COMPANIES */}
      <Split
        image="/images/for-companies.webp"
        title="For Companies"
        body={
          <p>
            Empower your team with outdoor corporate experiences in Lugano and
            Ticino. We design tailored team building events, leadership rides and
            collaborative challenges that combine nature, strategy and real
            business impact.
          </p>
        }
      >
        <Cta label="Learn More" href="/for-companies" style="dark" />
      </Split>

      {/* CAMPERVAN */}
      <FullBleed
        image="/wp-content/uploads/2026/02/05-Campervan-Rental-2wheels-Rental.webp"
        title="Campervan Rental"
        body="Fully equipped premium campervan in Lugano, built for total freedom across Europe."
        cta={<Cta label="Meet maja" href="/campervan" style="red" />}
      />

      {/* BIKE SHUTTLE */}
      <Split
        image="/images/bike-shuttle.webp"
        imageSide="right"
        title="Bike Shuttle"
        bg="paper"
        body={
          <p>
            Book our bike shuttle service in Lugano and Ticino for easy access to
            the region&apos;s best trails and mountain routes. Fast, reliable
            transfers designed to maximize your riding time.
          </p>
        }
      >
        <Cta label="Learn More" href="/tour/bike-shuttle" style="dark" />
      </Split>

      {/* WERIDE ACADEMY */}
      <Split
        image="/images/weride-section.webp"
        title="We Ride Academy"
        body={
          <p>
            Join We Ride Academy in Lugano — structured cycling training sessions
            and skill clinics designed to improve performance, confidence and
            endurance. Train smarter, ride stronger and elevate your level on
            every terrain.
          </p>
        }
      >
        <Cta label="Visit website" href="https://www.werideacademy.ch" style="dark" external />
      </Split>

      {/* REVIEWS */}
      <Reviews />

      {/* PARTNERS */}
      <section className="bg-[#2b2b2b] text-white">
        <div className="container-site py-14 text-center">
          <h2 className="text-3xl uppercase">Our Partners</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-12">
            <Image src="/images/weride.svg" alt="We Ride Academy" width={160} height={60} className="h-14 w-auto brightness-0 invert" />
          </div>
        </div>
      </section>

      {/* READY TO RIDE */}
      <Split
        image="/images/about.webp"
        title="Ready to ride?"
        body={
          <p>
            Whether you&apos;re seeking a relaxed e-bike ride by the lake or a
            challenging mountain ascent, our guided tours in Ticino are designed
            to match your level and create unforgettable outdoor experiences.
          </p>
        }
      >
        <Cta label="Check our tours" href="/tours" style="red" />
      </Split>
    </>
  );
}
