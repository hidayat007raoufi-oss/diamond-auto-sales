"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  // Note: this is a UI-only stub. Wiring it to a route handler / email
  // service is a planned next step.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-emerald-800">
          Thanks for reaching out! This is a demo form — message handling is
          coming soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <Field label="Email" name="email" type="email" required />
      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-navy"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          placeholder="I'm interested in the 2022 Toyota Camry…"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-amber-300"
      >
        Send Message
      </button>
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
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-navy">
        {label}
        {required && <span className="text-gold-dark"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}
