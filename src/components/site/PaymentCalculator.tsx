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

  return (
    <div className="glass rounded-3xl border border-line p-7 sm:p-9">
      <p className="kicker">Estimated Monthly Payment</p>
      <p className="display mt-3 text-6xl text-metal">
        {money(monthly)}
        <span className="text-2xl text-dim">/mo</span>
      </p>
      <p className="mt-2 text-xs text-mute">
        {term} months · {apr.toFixed(1)}% APR · {money(down)} down
      </p>

      <div className="mt-9 space-y-7">
        <Slider label="Vehicle price" value={money(price)} min={15000} max={250000} step={1000} raw={price} onChange={setPrice} />
        <Slider label="Down payment" value={money(down)} min={0} max={60000} step={500} raw={down} onChange={setDown} />
        <Slider label="APR" value={`${apr.toFixed(1)}%`} min={2} max={20} step={0.1} raw={apr} onChange={setApr} />

        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-mute">Term length</span>
            <span className="text-sm font-medium text-white">{term} mo</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[48, 60, 72, 84].map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`rounded-full border py-2.5 text-[13px] font-medium transition-all duration-300 ${
                  term === t
                    ? "border-transparent bg-white text-black"
                    : "border-line text-dim hover:border-line-strong hover:text-white"
                }`}
              >
                {t} mo
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-[11px] leading-relaxed text-mute">
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
        <span className="text-xs uppercase tracking-widest text-mute">{label}</span>
        <span className="text-sm font-medium text-white">{value}</span>
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
          background: `linear-gradient(90deg, #e9ebee ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
        }}
      />
    </div>
  );
}
