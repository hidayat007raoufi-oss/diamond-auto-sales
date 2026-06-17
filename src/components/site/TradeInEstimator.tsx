"use client";

import { useState } from "react";
import { submitLead } from "@/lib/leads";

const conditions = ["Excellent", "Good", "Fair", "Rough"];

export default function TradeInEstimator() {
  const [sent, setSent] = useState(false);
  const [condition, setCondition] = useState("Good");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await submitLead({
      type: "trade-in",
      source: "trade-in-estimator",
      name: String(f.get("name") || ""),
      phone: String(f.get("phone") || ""),
      vehicle: `${f.get("year") || ""} ${f.get("make") || ""} ${f.get("model") || ""}`.trim(),
      tradeIn: `${f.get("mileage") || ""} mi · ${condition} condition`,
    });
    setSent(true);
  }

  return (
    <div className="glass rounded-3xl border border-line p-6 sm:p-8">
      {sent ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full border border-line-strong">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-5 text-xl font-semibold text-white">Estimate request received</h3>
          <p className="mt-2 max-w-sm text-sm text-dim">
            We&apos;ll text you a real trade value shortly. (Demo — connect lead delivery to go live.)
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Year" name="year" required />
            <Field label="Make" name="make" required />
            <Field label="Model" name="model" required />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Mileage" name="mileage" />
            <div>
              <span className="mb-2 block text-xs uppercase tracking-widest text-mute">Condition</span>
              <div className="flex flex-wrap gap-2">
                {conditions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCondition(c)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all active:scale-95 ${
                      condition === c
                        ? "border-transparent bg-white text-black"
                        : "border-line text-dim hover:border-line-strong hover:text-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Phone" name="phone" type="tel" required />
          </div>
          <button
            type="submit"
            className="btn-sheen mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-semibold text-black transition-all hover:bg-silver-bright active:scale-[0.98]"
          >
            Get My Trade Value
          </button>
          <p className="mt-3 text-center text-[11px] text-mute">No obligation. Estimate only — final value confirmed in person.</p>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
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
        className="w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-base text-white placeholder:text-mute outline-none transition-colors focus:border-line-strong"
      />
    </div>
  );
}
