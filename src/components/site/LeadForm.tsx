"use client";

import { useState } from "react";

const interests = [
  "Buy a Vehicle",
  "Financing",
  "Detailing",
  "Window Tint",
  "Mechanic",
  "Fleet Program",
];

export default function LeadForm() {
  const [interest, setInterest] = useState("Buy a Vehicle");
  const [sent, setSent] = useState(false);

  // UI-only for now — next step is wiring to a route handler + CRM/email.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="glass flex flex-col items-center justify-center rounded-2xl border border-line-strong p-12 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full border border-line-strong">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-silver" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-white">Request received</h3>
        <p className="mt-2 max-w-sm text-sm text-dim">
          A Diamond specialist will reach out shortly. (Demo form — connecting it
          to live lead delivery is the next step.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl border border-line p-7 sm:p-9">
      <p className="kicker mb-3">I&apos;m interested in</p>
      <div className="mb-7 flex flex-wrap gap-2">
        {interests.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setInterest(i)}
            className={`rounded-full border px-4 py-2 text-[12px] font-medium transition-all duration-300 ${
              interest === i
                ? "border-transparent bg-white text-black"
                : "border-line text-dim hover:border-line-strong hover:text-white"
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" type="text" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <div className="mt-4">
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="mt-4">
        <label htmlFor="msg" className="mb-2 block text-xs uppercase tracking-widest text-mute">
          Message
        </label>
        <textarea
          id="msg"
          name="message"
          rows={3}
          placeholder={`Tell us about your ${interest.toLowerCase()} needs…`}
          className="w-full resize-none rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-mute outline-none transition-colors focus:border-line-strong"
        />
      </div>

      <button
        type="submit"
        className="btn-sheen mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-medium text-black transition-all duration-300 hover:bg-silver-bright hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.5)]"
      >
        Request a Callback
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      <p className="mt-4 text-center text-[11px] text-mute">
        No spam. Your details stay private and are never sold.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-widest text-mute">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-mute outline-none transition-colors focus:border-line-strong"
      />
    </div>
  );
}
