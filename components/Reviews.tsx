"use client";

import { useState } from "react";

const REVIEWS = [
  {
    quote:
      "This is exactly how a rental bike shop should operate: high-quality equipment in excellent condition, paired with knowledgeable and friendly advice from the owner. I've rented road bikes all over the world, and the service here stands out as truly professional. Other bike rental businesses could learn a lot from Johnny's shop.",
    name: "Josep Flix",
    country: "España",
  },
  {
    quote:
      "I rented a road bike for a few days and my experience was terrific. Quality bike in great condition. Easy transaction. Will definitely rent again when back in Lugano.",
    name: "Jeff Weyenberg",
    country: "USA",
  },
  {
    quote:
      "A wonderful experience! We did a bike tour of about 50 km, which was perfect. We did practically everything, both in the woods and on the road. Thanks to Johnny's assistance in creating a personalised route.",
    name: "Marco Talarico",
    country: "Italy",
  },
  {
    quote:
      "I can highly recommend a tour like this (22 km, 800 m elevation gain) with Johnny on the e-MTBs (in excellent condition). I rarely ride a bike and am not super comfortable, but Johnny was very patient.",
    name: "Adrian Latham",
    country: "UK",
  },
];

export default function Reviews({ title = "Reviews" }: { title?: string }) {
  const [i, setI] = useState(0);
  const r = REVIEWS[i];
  const go = (d: number) => setI((v) => (v + d + REVIEWS.length) % REVIEWS.length);

  return (
    <section className="bg-ink text-white">
      <div className="container-site grid items-center gap-10 py-20 lg:grid-cols-[0.8fr_1.6fr]">
        <div className="text-center lg:text-left">
          <h2 className="text-5xl uppercase">{title}</h2>
          <div className="mt-6 flex items-center justify-center gap-5 lg:justify-start">
            {/* Google */}
            <svg width="40" height="40" viewBox="0 0 48 48" aria-label="Google">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.6 2.4 30.1 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.2 17.7 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.1 5.3-4.6 7l7.1 5.5c4.2-3.9 6.6-9.6 6.6-16.9z" />
              <path fill="#FBBC05" d="M10.5 28.3c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-7.9-6.1C1 16.9 0 20.3 0 24s1 7.1 2.6 10.3l7.9-6z" />
              <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.5l-7.1-5.5c-2 1.3-4.6 2.1-7.9 2.1-6.3 0-11.6-3.7-13.5-9.3l-7.9 6C6.5 42.6 14.6 48 24 48z" />
            </svg>
            {/* TripAdvisor */}
            <svg width="40" height="40" viewBox="0 0 48 48" aria-label="Tripadvisor">
              <circle cx="24" cy="24" r="24" fill="#34E0A1" />
              <circle cx="16" cy="25" r="5.5" fill="none" stroke="#000" strokeWidth="2.2" />
              <circle cx="32" cy="25" r="5.5" fill="none" stroke="#000" strokeWidth="2.2" />
              <circle cx="16" cy="25" r="2" fill="#000" />
              <circle cx="32" cy="25" r="2" fill="#000" />
              <path d="M24 14c-4 0-7.5 1-10 2.7h20C31.5 15 28 14 24 14z" fill="#000" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous" className="shrink-0 text-3xl text-white/50 transition-colors hover:text-white">
            ‹
          </button>
          <div className="min-h-[200px] flex-1">
            <p className="text-lg leading-relaxed text-white/90">“{r.quote}”</p>
            <p className="mt-6 text-right text-xl font-semibold">{r.name}</p>
            <p className="text-right text-xs uppercase tracking-widest text-white/50">{r.country}</p>
          </div>
          <button onClick={() => go(1)} aria-label="Next" className="shrink-0 text-3xl text-white/50 transition-colors hover:text-white">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
