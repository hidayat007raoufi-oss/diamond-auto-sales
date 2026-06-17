import { NextResponse } from "next/server";

/**
 * Lead intake endpoint. Currently logs to the server and returns ok.
 *
 * TODO (production): deliver leads somewhere real, e.g.
 *   - Email via Resend / SendGrid / Postmark
 *   - A CRM webhook (DealerSocket, HubSpot, etc.)
 *   - A database (Supabase / Postgres)
 * Put any credentials in environment variables (e.g. LEAD_WEBHOOK_URL,
 * RESEND_API_KEY) — never hardcode keys in the repo or on the client.
 */
export async function POST(req: Request) {
  const lead = await req.json().catch(() => null);
  if (!lead) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  // Visible in Vercel function logs until a real destination is wired up.
  console.log("[diamond-lead]", JSON.stringify(lead));

  // TODO: forward `lead` to your email/CRM here.
  // await fetch(process.env.LEAD_WEBHOOK_URL!, { method: "POST", body: JSON.stringify(lead) })

  return NextResponse.json({ ok: true });
}
