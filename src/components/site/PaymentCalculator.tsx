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
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Estimated Monthly Payment</p>
      <p className="mt-3 text-6xl font-bold tracking-tight text-zinc-900">
        {money(monthly)}
        <span className="text-2xl font-semibold text-zinc-400">/mo</span>
      </p>
      <p className="mt-2 text-xs text-zinc-500">
        {term} months · {apr.toFixed(1)}% APR · {money(down)} down
      </p>

      {/* live APR balance graph */}
      <div className="mt-6">
        <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="h-24 w-full" aria-hidden>
          <defs>
            <linearGradient id="pc-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#18181b" stopOpacity="0.18" />
              <stop offset="1" stopColor="#18181b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#pc-fill)" />
          <path
            d={linePath}
            fill="none"
            stroke="#18181b"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mt-1 flex justify-between text-[10px] uppercase tracking-widest text-zinc-400">
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
            <span className="text-xs uppercase tracking-widest text-zinc-500">Term length</span>
            <span className="text-sm font-medium text-zinc-900">{term} mo</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[48, 60, 72, 84].map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`rounded-full border py-2.5 text-[13px] font-medium transition-all duration-300 ${
                  term === t
                    ? "border-transparent bg-zinc-900 text-white"
                    : "border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
                }`}
              >
                {t} mo
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-[11px] leading-relaxed text-zinc-400">
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
        <span className="text-xs uppercase tracking-widest text-zinc-500">{label}</span>
        <span className="text-sm font-medium text-zinc-900">{value}</span>
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
          background: `linear-gradient(90deg, #18181b ${pct}%, #e4e4e7 ${pct}%)`,
        }}
      />
    </div>
  );
}
