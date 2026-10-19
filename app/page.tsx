import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

const btnRed =
  "inline-block rounded-md bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark";
const btnDark =
  "inline-block rounded-md bg-ink px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black";
const btnOutline =
  "inline-block rounded-md border border-ink px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-white";

const reviews = [
  { name: "Josep Flix", country: "España" },
  { name: "Jeff Weyenberg", country: "USA" },
  { name: "Adrian Latham", country: "UK" },
  { name: "Denise Sommer", country: "Switzerland" },
  { name: "Marco Talarico", country: "Italy" },
];

function GoogleBadge({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-lg border px-4 py-2.5 ${
        dark ? "border-black/10 bg-white" : "border-white/20 bg-white/10 backdrop-blur"
      }`}
    >
      <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden>
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.6 2.4 30.1 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.2 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.1 5.3-4.6 7l7.1 5.5c4.2-3.9 6.6-9.6 6.6-16.9z" />
        <path fill="#FBBC05" d="M10.5 28.3c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-7.9-6.1C1 16.9 0 20.3 0 24s1 7.1 2.6 10.3l7.9-6z" />
        <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.5l-7.1-5.5c-2 1.3-4.6 2.1-7.9 2.1-6.3 0-11.6-3.7-13.5-9.3l-7.9 6C6.5 42.6 14.6 48 24 48z" />
      </svg>
      <div className={dark ? "text-ink" : "text-white"}>
        <span className="font-bold">4,9</span>{" "}
        <span className="text-[#FBBC05]">★★★★★</span>
        <span className={`ml-1 text-xs ${dark ? "text-ink-soft" : "text-white/70"}`}>
          Google
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[88vh] items-center">
        <Image src="/images/hero.webp" alt="Explore Ticino on Two Wheels" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
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
              <a href={SITE.booqable} target="_blank" rel="noopener" className={btnRed}>
                Rent a bike
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BIKE & MOTORCYCLE RENTAL */}
      <section className="bg-white">
        <div className="container-site grid items-center gap-12 py-20 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/rent-bikes.webp" alt="Bike & Motorcycle Rental in Lugano" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-4xl uppercase text-ink sm:text-5xl">
              Bike &amp; Motorcycle Rental in Lugano
            </h2>
            <p className="mt-5 text-ink-soft">
              Looking for a reliable bike rental in Lugano? We offer premium
              e-bikes, mountain, road and gravel options to explore Lake Lugano
              and the trails of Ticino.
            </p>
            <p className="mt-4 text-ink-soft">
              Prefer more power? Discover our scooters and premium motorcycles
              for alpine roads and Swiss mountain passes.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/bikes-e-bikes" className={btnDark}>
                Explore Bikes
              </Link>
              <Link href="/motorbikes-scooters" className={btnOutline}>
                Explore Motorcycles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TOURS */}
      <section className="bg-paper">
        <div className="container-site grid items-center gap-12 py-20 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl uppercase text-ink sm:text-5xl">Tours</h2>
            <p className="mt-5 text-lg text-ink-soft">
              Guided bike and e-bike tours in Lugano and across Ticino, designed
              for all levels.
            </p>
            <Link href="/tours" className={`${btnDark} mt-7`}>
              Check our tours
            </Link>
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl md:order-2">
            <Image src="/images/tours.webp" alt="Guided tours in Ticino" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* FOR COMPANIES */}
      <section className="relative isolate overflow-hidden">
        <Image src="/images/for-companies.webp" alt="For Companies" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container-site relative py-24 text-center text-white">
          <h2 className="text-4xl uppercase sm:text-5xl">For Companies</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Team events, corporate rentals and tailor-made experiences for your
            company in Ticino.
          </p>
          <Link href="/for-companies" className={`${btnRed} mt-7`}>
            Learn More
          </Link>
        </div>
      </section>

      {/* CAMPERVAN */}
      <section className="bg-white">
        <div className="container-site py-20 text-center">
          <h2 className="text-4xl uppercase text-ink sm:text-5xl">Campervan Rental</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Fully equipped premium campervan in Lugano, built for total freedom
            across Europe.
          </p>
          <Link href="/campervan" className={`${btnDark} mt-7`}>
            Meet maja
          </Link>
        </div>
      </section>

      {/* BIKE SHUTTLE */}
      <section className="bg-paper">
        <div className="container-site grid items-center gap-12 py-20 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/bike-shuttle.webp" alt="Bike Shuttle" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-4xl uppercase text-ink sm:text-5xl">Bike Shuttle</h2>
            <p className="mt-5 text-lg text-ink-soft">
              Point-to-point bike shuttle service to reach the best mountain bike
              trails around Lugano and the Alps.
            </p>
            <Link href="/tour/bike-shuttle" className={`${btnDark} mt-7`}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* WERIDE ACADEMY */}
      <section className="bg-white">
        <div className="container-site grid items-center gap-12 py-20 md:grid-cols-2">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl md:order-1">
            <Image src="/images/weride-section.webp" alt="We Ride Academy" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <Image src="/images/weride.svg" alt="We Ride Academy" width={240} height={90} className="h-16 w-auto" />
            <p className="mt-6 text-lg text-ink-soft">
              Join We Ride Academy in Lugano — structured cycling training
              sessions and skill clinics designed to improve performance,
              confidence and endurance. Train smarter, ride stronger and elevate
              your level on every terrain.
            </p>
            <a href="https://www.werideacademy.ch" target="_blank" rel="noopener" className={`${btnDark} mt-7`}>
              Visit website
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-paper">
        <div className="container-site py-20">
          <div className="flex flex-col items-center gap-5 text-center">
            <h2 className="text-4xl uppercase text-ink sm:text-5xl">Reviews</h2>
            <GoogleBadge dark />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <div className="text-[#FBBC05]">★★★★★</div>
                <p className="mt-3 font-semibold text-ink">{r.name}</p>
                <p className="text-sm text-ink-soft">{r.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-y border-black/5 bg-white">
        <div className="container-site py-12 text-center">
          <h2 className="text-3xl uppercase text-ink">Our Partners</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-12 opacity-80">
            <Image src="/images/weride.svg" alt="Weride Academy" width={160} height={60} className="h-14 w-auto" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white">
        <div className="container-site flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="text-5xl uppercase">Ready to ride?</h2>
          <Link
            href="/tours"
            className="rounded-md bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary transition-transform hover:scale-105"
          >
            Check our tours
          </Link>
        </div>
      </section>
    </>
  );
}
