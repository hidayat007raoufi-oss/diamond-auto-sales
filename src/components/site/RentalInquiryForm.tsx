"use client";

import { useState } from "react";
import { submitLead } from "@/lib/leads";
import { rentals } from "@/lib/rentals";

/** Light rental availability / reservation request form. */
export default function RentalInquiryForm() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const vehicleClass = String(f.get("class") || "");
    const pickup = String(f.get("pickup") || "");
    const ret = String(f.get("return") || "");
    await submitLead({
      type: "rental",
      source: "rental-form",
      name: String(f.get("name") || ""),
      phone: String(f.get("phone") || ""),
      email: String(f.get("email") || ""),
      vehicle: vehicleClass,
      message: `Pickup: ${pickup} · Return: ${ret} · ${String(f.get("message") || "")}`,
    });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center backdrop-blur-xl">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">Request received</h3>
        <p className="mt-2 max-w-sm text-sm text-white/60">
          We&apos;ll confirm availability and pricing for your dates and follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
      <h3 className="text-xl font-bold tracking-tight text-white">Check availability</h3>
      <p className="mt-1 text-sm text-white/60">Tell us your dates and we&apos;ll confirm a vehicle.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" required />
        <Field label="Phone" name="phone" type="tel" required />
      </div>
      <div className="mt-4">
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Pickup date" name="pickup" type="date" required />
        <Field label="Return date" name="return" type="date" required />
      </div>
      <div className="mt-4">
        <label htmlFor="class" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/40">
          Vehicle class
        </label>
        <select
          id="class"
          name="class"
          defaultValue={rentals[0].name}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white outline-none transition-colors focus:border-blue-500/60"
        >
          {rentals.map((r) => (
            <option key={r.id} value={r.name} className="bg-zinc-900 text-white">
              {r.name} — from ${r.dailyFrom}/day
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="rmsg" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/40">
          Notes
        </label>
        <textarea
          id="rmsg"
          name="message"
          rows={3}
          placeholder="Anything we should know?"
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-blue-500/60"
        />
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-12px_rgba(47,128,255,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_48px_-10px_rgba(47,128,255,0.9)]"
      >
        Request Availability
      </button>
      <p className="mt-4 text-center text-[11px] text-white/40">
        A valid driver&apos;s license and insurance are required at pickup.
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
      <label htmlFor={name} className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/40">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-blue-500/60 [color-scheme:dark]"
      />
    </div>
  );
}
