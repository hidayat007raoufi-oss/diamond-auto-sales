"use client";

import Link from "next/link";
import { useState } from "react";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  priceFrom: string;
  features: string[];
};

const plans: Plan[] = [
  {
    id: "fleet-maintenance",
    name: "Fleet Maintenance",
    tagline: "Scheduled servicing that keeps every vehicle on the road.",
    priceFrom: "$149/mo",
    features: [
      "Scheduled multi-vehicle servicing on one calendar",
      "Oil, fluids, brakes & filters covered per cycle",
      "Priority shop scheduling with loaner options",
      "Digital service history for your whole fleet",
      "Volume pricing as you add vehicles",
    ],
  },
  {
    id: "tire-care",
    name: "Tire Care",
    tagline: "Rotation, balance, and road-hazard peace of mind.",
    priceFrom: "$29/mo",
    features: [
      "Rotation & road-force balancing every cycle",
      "Free flat repairs and pressure checks",
      "Road-hazard replacement coverage",
      "Tread-depth & alignment inspections",
      "Member pricing on new tire sets",
    ],
  },
  {
    id: "car-care",
    name: "Car Care Plan",
    tagline: "Recurring detailing and inspections, all year round.",
    priceFrom: "$49/mo",
    features: [
      "Monthly maintenance wash & interior wipe-down",
      "Quarterly full detail with wax & sealant",
      "Seasonal multi-point safety inspection",
      "Leather & trim conditioning included",
      "Pickup & return across the Triangle",
    ],
  },
];

export default function PlanSelector() {
  const [active, setActive] = useState(plans[0].id);
  const plan = plans.find((p) => p.id === active) ?? plans[0];

  return (
    <div>
      {/* Segmented control */}
      <div className="inline-flex flex-wrap gap-1 rounded-full bg-[#f5f5f7] p-1 ring-1 ring-black/[0.06]">
        {plans.map((p) => {
          const isActive = p.id === active;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors sm:px-5 ${
                isActive ? "bg-[#1d1d1f] text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]"
              }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="bento mt-8 bg-[#f5f5f7] p-8 ring-1 ring-black/[0.06] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0071e3]">
              Subscription Plan
            </p>
            <h3 className="mt-3 text-[28px] font-semibold leading-tight tracking-tight text-[#1d1d1f]">
              {plan.name}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#6e6e73]">{plan.tagline}</p>
            <p className="mt-6 text-[15px] text-[#86868b]">
              from <span className="text-[28px] font-semibold text-[#1d1d1f]">{plan.priceFrom}</span>
            </p>
            <div className="mt-8">
              <Link
                href={`/contact?intent=subscription&plan=${plan.id}`}
                className="pill pill-blue"
              >
                Start {plan.name}
              </Link>
            </div>
          </div>

          <ul className="grid gap-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px] text-[#1d1d1f]">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#0071e3]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
