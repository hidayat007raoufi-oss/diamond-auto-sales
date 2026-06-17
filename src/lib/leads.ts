export type Lead = {
  /** e.g. "contact" | "financing" | "trade-in" | "test-drive" | "carfax" | "chat" */
  type: string;
  name?: string;
  phone?: string;
  email?: string;
  vehicle?: string;
  budget?: string;
  tradeIn?: string;
  message?: string;
  /** which page/section the lead came from */
  source?: string;
};

/**
 * Submits a lead to the (placeholder) API route. Returns ok=true on success.
 * Swap the backend in src/app/api/lead/route.ts to deliver to email/CRM.
 */
export async function submitLead(lead: Lead): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, ts: new Date().toISOString() }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
