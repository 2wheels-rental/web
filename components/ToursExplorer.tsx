"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TOURS_PAGE, DURATION_ORDER, EXPERIENCE_ORDER, type ToursPageStrings } from "@/lib/tours-content";
import type { Locale } from "@/lib/i18n";

export type TourCard = {
  slug: string;
  title: string;
  subtitle: string;
  hero: string;
  experience: string;
  duration: string;
  href: string;
};

function Chips({
  label, options, value, onChange, allLabel,
}: {
  label: string;
  options: { key: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
}) {
  const chip = (active: boolean) =>
    `rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
      active ? "bg-primary text-white" : "text-ink-soft hover:text-ink"
    }`;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="mr-2 text-lg font-semibold text-ink">{label}</span>
      <button className={chip(value === "all")} onClick={() => onChange("all")}>{allLabel}</button>
      {options.map((o) => (
        <button key={o.key} className={chip(value === o.key)} onClick={() => onChange(o.key)}>{o.label}</button>
      ))}
    </div>
  );
}

export default function ToursExplorer({ locale, tours, viewLabel }: { locale: Locale; tours: TourCard[]; viewLabel: string }) {
  const s: ToursPageStrings = TOURS_PAGE[locale];
  const [exp, setExp] = useState("all");
  const [dur, setDur] = useState("all");

  const expOptions = EXPERIENCE_ORDER.filter((k) => tours.some((t) => t.experience === k)).map((k) => ({ key: k, label: s.exp[k] }));
  const durOptions = DURATION_ORDER.filter((k) => tours.some((t) => t.duration === k)).map((k) => ({ key: k, label: s.dur[k] }));

  const filtered = useMemo(
    () => tours.filter((t) => (exp === "all" || t.experience === exp) && (dur === "all" || t.duration === dur)),
    [tours, exp, dur]
  );

  return (
    <div className="container-site py-14">
      <div className="flex flex-col gap-5 border-b border-black/10 pb-8 lg:flex-row lg:items-start lg:gap-14">
        <Chips label={s.experienceLabel} options={expOptions} value={exp} onChange={setExp} allLabel={s.all} />
        <Chips label={s.durationLabel} options={durOptions} value={dur} onChange={setDur} allLabel={s.all} />
      </div>

      <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Link key={t.slug} href={t.href} className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden">
              {t.hero && (
                <Image src={t.hero} alt={t.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" />
              )}
            </div>
            <div className="p-6">
              <h2 className="text-2xl uppercase leading-tight text-ink">{t.title}</h2>
              {t.subtitle && <p className="mt-2 text-sm text-ink-soft">{t.subtitle}</p>}
              <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-primary">{viewLabel} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
