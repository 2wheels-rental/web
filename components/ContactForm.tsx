"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const name = (f.elements.namedItem("name") as HTMLInputElement).value;
    const email = (f.elements.namedItem("email") as HTMLInputElement).value;
    const message = (f.elements.namedItem("message") as HTMLTextAreaElement).value;
    const subject = encodeURIComponent(`Website enquiry — ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${SITE.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Name"
          className="w-full rounded-md border border-black/15 px-4 py-3 text-ink outline-none focus:border-primary"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-md border border-black/15 px-4 py-3 text-ink outline-none focus:border-primary"
        />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="How can we help?"
        className="w-full rounded-md border border-black/15 px-4 py-3 text-ink outline-none focus:border-primary"
      />
      <button
        type="submit"
        className="rounded-md bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark"
      >
        Send message
      </button>
      {sent && (
        <p className="text-sm text-ink-soft">
          Opening your email app… If nothing happens, write us at{" "}
          <a href={`mailto:${SITE.contact.email}`} className="text-primary underline">
            {SITE.contact.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
