"use client";

import { useMemo, useState } from "react";

function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PaymentCalculator() {
  const [price, setPrice] = useState(46000);
  const [down, setDown] = useState(5000);
  const [apr, setApr] = useState(6.4);
  const [term, setTerm] = useState(72);

  const monthly = useMemo(() => {
    const principal = Math.max(price - down, 0);
    const r = apr / 100 / 12;
    if (r === 0) return principal / term;
    return (principal * r) / (1 - Math.pow(1 + r, -term));
  }, [price, down, apr, term]);

  // Live amortization curve — remaining balance over the term.
  const { linePath, areaPath } = useMemo(() => {
    const principal = Math.max(price - down, 0) || 1;
    const r = apr / 100 / 12;
    const n = term;
    const pts: [number, number][] = [];
    for (let i = 0; i <= n; i++) {
      let bal =
        r === 0
          ? principal - monthly * i
          : principal * Math.pow(1 + r, i) - monthly * ((Math.pow(1 + r, i) - 1) / r);
      bal = Math.max(bal, 0);
      const x = (i / n) * 300;
      const y = 6 + (1 - bal / principal) * 78;
      pts.push([x, y]);
    }
    const line = pts
      .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
      .join(" ");
    return { linePath: line, areaPath: `${line} L300 90 L0 90 Z` };
  }, [price, down, apr, term, monthly]);

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-black/[0.06] sm:p-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0071e3]">Estimated Monthly Payment</p>
      <p className="mt-3 text-6xl font-semibold tracking-tight text-[#1d1d1f]">
        {money(monthly)}
        <span className="text-2xl font-semibold text-[#86868b]">/mo</span>
      </p>
      <p className="mt-2 text-xs text-[#86868b]">
        {term} months · {apr.toFixed(1)}% APR · {money(down)} down
      </p>

      {/* live APR balance graph */}
      <div className="mt-6">
        <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="h-24 w-full" aria-hidden>
          <path d={areaPath} fill="rgba(0,113,227,0.10)" />
          <path
            d={linePath}
            fill="none"
            stroke="#0071e3"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mt-1 flex justify-between text-[10px] uppercase tracking-widest text-[#86868b]">
          <span>Today</span>
          <span>Balance over {term} mo</span>
          <span>Paid off</span>
        </div>
      </div>

      <div className="mt-9 space-y-7">
        <Slider label="Vehicle price" value={money(price)} min={15000} max={250000} step={1000} raw={price} onChange={setPrice} />
        <Slider label="Down payment" value={money(down)} min={0} max={60000} step={500} raw={down} onChange={setDown} />
        <Slider label="APR" value={`${apr.toFixed(1)}%`} min={2} max={20} step={0.1} raw={apr} onChange={setApr} />

        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e73]">Term length</span>
            <span className="text-sm font-medium text-[#1d1d1f]">{term} mo</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[48, 60, 72, 84].map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`rounded-full py-2.5 text-[13px] font-medium transition-all duration-300 ${
                  term === t
                    ? "bg-[#1d1d1f] text-white"
                    : "border border-black/15 text-[#6e6e73] hover:border-black/30 hover:text-[#1d1d1f]"
                }`}
              >
                {t} mo
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-[11px] leading-relaxed text-[#86868b]">
        Estimate only. Actual terms subject to credit approval, taxes, and fees.
      </p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  raw,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  raw: number;
  onChange: (n: number) => void;
}) {
  const pct = ((raw - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[12px] font-medium text-[#6e6e73]">{label}</span>
        <span className="text-sm font-medium text-[#1d1d1f]">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={raw}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lux-range w-full"
        style={{
          background: `linear-gradient(90deg, #0071e3 ${pct}%, #e8e8ed ${pct}%)`,
        }}
      />
    </div>
  );
}
