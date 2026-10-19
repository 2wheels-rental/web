"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "2wr-cookie-consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* private mode: no mostrar persistente */
    }
  }, []);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* noop */
    }
    setShow(false);
    // Aquí luego se dispara GTM/Analytics consent mode según `value`.
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div className="container-site flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          We use cookies to improve your experience and analyse traffic. See our{" "}
          <Link href="/cookie-policy-eu" className="text-primary underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => decide("declined")}
            className="rounded-md border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Decline
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
