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
      <div className="bento flex flex-col items-center justify-center bg-white p-12 text-center ring-1 ring-black/[0.06]">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#0071e3] text-white">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-6 text-xl font-semibold tracking-tight text-[#1d1d1f]">Request received</h3>
        <p className="mt-2 max-w-sm text-sm text-[#6e6e73]">
          We&apos;ll confirm availability and pricing for your dates and follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bento bg-white p-6 ring-1 ring-black/[0.06] sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">Check availability</h3>
      <p className="mt-1 text-sm text-[#6e6e73]">Tell us your dates and we&apos;ll confirm a vehicle.</p>

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
        <label htmlFor="class" className="mb-2 block text-[12px] font-medium text-[#6e6e73]">
          Vehicle class
        </label>
        <select
          id="class"
          name="class"
          defaultValue={rentals[0].name}
          className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[#1d1d1f] outline-none focus:border-[#0071e3]"
        >
          {rentals.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name} — from ${r.dailyFrom}/day
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="rmsg" className="mb-2 block text-[12px] font-medium text-[#6e6e73]">
          Notes
        </label>
        <textarea
          id="rmsg"
          name="message"
          rows={3}
          placeholder="Anything we should know?"
          className="w-full resize-none rounded-xl border border-black/15 bg-white px-4 py-3 text-[#1d1d1f] placeholder:text-[#86868b] outline-none focus:border-[#0071e3]"
        />
      </div>

      <button type="submit" className="pill pill-blue mt-6 w-full justify-center py-3.5">
        Request Availability
      </button>
      <p className="mt-4 text-center text-[11px] text-[#86868b]">
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
      <label htmlFor={name} className="mb-2 block text-[12px] font-medium text-[#6e6e73]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[#1d1d1f] placeholder:text-[#86868b] outline-none focus:border-[#0071e3]"
      />
    </div>
  );
}
