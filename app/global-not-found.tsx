import Link from "next/link";
import type { Metadata } from "next";
import RootShell from "@/components/RootShell";

export const metadata: Metadata = {
  title: "Page not found - 2wheels Rental",
  robots: { index: false, follow: true },
};

// 404 multilingüe (se usa para cualquier URL que no exista, en cualquier idioma)
export default function GlobalNotFound() {
  return (
    <RootShell locale="en">
      <section className="bg-paper">
        <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <p className="font-display text-8xl text-primary">404</p>
          <h1 className="mt-4 text-4xl text-ink sm:text-5xl">Page not found</h1>
          <p className="mt-3 text-ink-soft">Pagina non trovata · Seite nicht gefunden</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/" className="rounded-md bg-primary px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white hover:bg-primary-dark">Home</Link>
            <Link href="/tours/" className="rounded-md bg-ink px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white hover:bg-black">Tours</Link>
            <Link href="/it/" className="rounded-md border border-ink px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-ink hover:bg-ink hover:text-white">IT</Link>
            <Link href="/de/" className="rounded-md border border-ink px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-ink hover:bg-ink hover:text-white">DE</Link>
          </div>
        </div>
      </section>
    </RootShell>
  );
}
