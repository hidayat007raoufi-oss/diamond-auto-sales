import { NextResponse } from "next/server";

const fields = [
  "type", "name", "phone", "email", "vehicle", "budget", "tradeIn", "message", "source",
] as const;

export async function POST(req: Request) {
  const payload = await req.json().catch(() => null);
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const lead = new Map<string, string>();
  for (const field of fields) {
    const value: unknown = payload[field];
    if (value === undefined) continue;
    if (typeof value !== "string" || value.length > 4000) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    if (value.trim()) lead.set(field, value.trim());
  }

  const type = lead.get("type");
  const email = lead.get("email");
  if (!type || !/^[a-z-]{1,40}$/.test(type) || (!email && !lead.has("phone"))) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !to || !from) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New ${type} — Diamond Auto Sales`,
        text: Array.from(lead, ([field, value]) => `${field}: ${value}`).join("\n"),
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (response.ok) return NextResponse.json({ ok: true });
    console.error("[diamond-lead] provider rejected submission", response.status);
  } catch {
    console.error("[diamond-lead] provider unavailable");
  }

  return NextResponse.json({ ok: false }, { status: 502 });
}
