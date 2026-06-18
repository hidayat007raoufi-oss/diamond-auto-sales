import { NextResponse } from "next/server";

/**
 * Lead intake. Sends an email via Resend when configured, otherwise logs.
 *
 * To go live, add these environment variables in Vercel:
 *   RESEND_API_KEY   – your Resend API key (https://resend.com)
 *   LEAD_TO_EMAIL    – inbox that should receive leads (e.g. sales@diamondautonc.com)
 *   LEAD_FROM_EMAIL  – verified sender (e.g. leads@diamondautonc.com)
 *
 * No keys are exposed to the client. Swap Resend for any provider/CRM here.
 */
export async function POST(req: Request) {
  const lead = await req.json().catch(() => null);
  if (!lead) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  console.log("[diamond-lead]", JSON.stringify(lead));

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (key && to && from) {
    const rows = Object.entries(lead)
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#888">${k}</td><td style="padding:4px 0"><b>${String(v)}</b></td></tr>`)
      .join("");
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          reply_to: lead.email || undefined,
          subject: `New ${lead.type || "lead"} — Diamond Auto Sales`,
          html: `<h2>New ${lead.type || "lead"}</h2><table>${rows}</table>`,
        }),
      });
      if (!res.ok) console.error("[diamond-lead] resend failed", await res.text());
    } catch (e) {
      console.error("[diamond-lead] resend error", e);
    }
  }

  return NextResponse.json({ ok: true });
}
