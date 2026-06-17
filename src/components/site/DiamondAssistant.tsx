"use client";

import { useEffect, useRef, useState } from "react";
import { submitLead } from "@/lib/leads";

type Msg = { from: "bot" | "user"; text: string };

const GREETING =
  "Hi, I'm the Diamond Auto Sales assistant. I can help you find a vehicle, get pre-approved, schedule a test drive, or value your trade.";

const actions = [
  { key: "find", label: "Find a Car" },
  { key: "preapproved", label: "Get Pre-Approved" },
  { key: "testdrive", label: "Schedule Test Drive" },
  { key: "trade", label: "Value My Trade" },
  { key: "carfax", label: "Request CARFAX" },
] as const;

// Questions collected per intent (always finishes with contact details).
const flows: Record<string, { q: string; field: string }[]> = {
  find: [
    { q: "Great — what kind of vehicle are you looking for? (make/model or body style)", field: "vehicle" },
    { q: "What monthly budget are you targeting?", field: "budget" },
  ],
  preapproved: [
    { q: "Let's get you pre-approved. Which vehicle or budget are you considering?", field: "vehicle" },
    { q: "What monthly payment works for you?", field: "budget" },
  ],
  testdrive: [{ q: "Which vehicle would you like to test drive?", field: "vehicle" }],
  trade: [{ q: "What's your trade-in? (year, make, model, mileage)", field: "tradeIn" }],
  carfax: [{ q: "Which vehicle would you like the CARFAX for?", field: "vehicle" }],
};
const contactSteps = [
  { q: "What's your name?", field: "name" },
  { q: "Best phone number to reach you?", field: "phone" },
  { q: "And your email?", field: "email" },
];

export default function DiamondAssistant() {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: GREETING }]);

  // Reveal elegantly — after the visitor scrolls, or 16s on the page.
  useEffect(() => {
    if (revealed) return;
    const onScroll = () => window.scrollY > 220 && setRevealed(true);
    const timer = setTimeout(() => setRevealed(true), 16000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [revealed]);

  // Allow other components (e.g. service modals) to open the assistant.
  useEffect(() => {
    const openAI = () => {
      setRevealed(true);
      setOpen(true);
    };
    window.addEventListener("diamond:open-ai", openAI);
    return () => window.removeEventListener("diamond:open-ai", openAI);
  }, []);
  const [steps, setSteps] = useState<{ q: string; field: string }[]>([]);
  const [stepIdx, setStepIdx] = useState(-1);
  const [intent, setIntent] = useState<string>("");
  const [data, setData] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const say = (from: Msg["from"], text: string) =>
    setMessages((m) => [...m, { from, text }]);

  function startFlow(key: string, label: string) {
    const seq = [...(flows[key] ?? []), ...contactSteps];
    setIntent(key);
    setData({});
    setSteps(seq);
    setStepIdx(0);
    say("user", label);
    setTimeout(() => say("bot", seq[0].q), 250);
  }

  async function handleAnswer(text: string) {
    say("user", text);
    const cur = steps[stepIdx];
    const next = { ...data, [cur.field]: text };
    setData(next);
    const ni = stepIdx + 1;
    if (ni < steps.length) {
      setStepIdx(ni);
      setTimeout(() => say("bot", steps[ni].q), 250);
    } else {
      setStepIdx(-1);
      await submitLead({ type: intent, source: "ai-assistant", ...next });
      setTimeout(
        () =>
          say(
            "bot",
            `Thanks${next.name ? `, ${next.name}` : ""}! A Diamond specialist will reach out shortly. Anything else I can help with?`
          ),
        250
      );
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    setInput("");
    if (stepIdx >= 0) handleAnswer(t);
    else say("bot", "Tap one of the options below and I'll take it from there. 💎");
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Diamond AI Assistant"
        className={`fixed bottom-24 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full border border-line-strong bg-white text-black shadow-[0_10px_40px_-8px_rgba(108,182,255,0.6)] transition-all duration-500 hover:scale-105 active:scale-95 lg:bottom-6 ${
          revealed ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-90 opacity-0"
        }`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      <div
        className={`glass-strong fixed bottom-40 right-5 z-[60] flex max-h-[70vh] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-line-strong transition-all duration-300 lg:bottom-24 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Diamond AI Assistant</p>
            <p className="text-[11px] text-emerald-300/80">● Online</p>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <p
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.from === "user"
                    ? "bg-white text-black"
                    : "border border-line bg-surface text-zinc-100"
                }`}
              >
                {m.text}
              </p>
            </div>
          ))}
          {stepIdx < 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {actions.map((a) => (
                <button
                  key={a.key}
                  onClick={() => startFlow(a.key, a.label)}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-line-strong hover:bg-white hover:text-black"
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 rounded-full border border-line bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-mute outline-none focus:border-line-strong"
          />
          <button
            type="submit"
            aria-label="Send"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-black transition-transform active:scale-90"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
