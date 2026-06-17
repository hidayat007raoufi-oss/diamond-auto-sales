"use client";

import { useState } from "react";
import { submitLead } from "@/lib/leads";

export default function LeadForm() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await submitLead({
      type: "contact",
      source: "contact-form",
      name: String(f.get("name") || ""),
      phone: String(f.get("phone") || ""),
      email: String(f.get("email") || ""),
      vehicle: String(f.get("vehicle") || ""),
      message: String(f.get("message") || ""),
    });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="glass flex flex-col items-center justify-center rounded-2xl border border-line-strong p-12 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full border border-line-strong">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-white">Request received</h3>
        <p className="mt-2 max-w-sm text-sm text-dim">
          A Diamond specialist will confirm availability shortly. (Demo form —
          live lead delivery is the next step.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl border border-line p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" required />
        <Field label="Phone" name="phone" type="tel" required />
      </div>
      <div className="mt-4">
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="mt-4">
        <Field label="Interested Vehicle" name="vehicle" type="text" placeholder="e.g. 2023 Porsche 911" />
      </div>
      <div className="mt-4">
        <label htmlFor="msg" className="mb-2 block text-xs uppercase tracking-widest text-mute">
          Message
        </label>
        <textarea
          id="msg"
          name="message"
          rows={3}
          placeholder="Anything we should know?"
          className="w-full resize-none rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-base text-white placeholder:text-mute outline-none transition-colors focus:border-line-strong"
        />
      </div>

      <button
        type="submit"
        className="btn-sheen mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-semibold text-black transition-colors hover:bg-silver-bright"
      >
        Request Availability
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
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-base text-white placeholder:text-mute outline-none transition-colors focus:border-line-strong"
      />
    </div>
  );
}
