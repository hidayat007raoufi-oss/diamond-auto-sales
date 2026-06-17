import { NextResponse } from "next/server";

/**
 * AI assistant endpoint (placeholder).
 *
 * The Diamond AI Assistant currently runs scripted flows on the client. When
 * you're ready for real AI, wire a provider HERE (server-side only):
 *
 *   - Anthropic Claude: import Anthropic from "@anthropic-ai/sdk";
 *       const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 *   - OpenAI: similar, using process.env.OPENAI_API_KEY
 *
 * NEVER expose the key on the client. Keep it in an env var and call it here.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({ messages: [] }));
  const messages: { role: string; content: string }[] = body.messages ?? [];
  const last = messages[messages.length - 1]?.content ?? "";

  // TODO: replace this stub with a real model call using the system prompt
  // "You are the Diamond Auto Sales assistant in Raleigh, NC..."
  return NextResponse.json({
    reply:
      "Thanks! A Diamond Auto Sales specialist will follow up shortly. (Live AI replies aren't configured yet.)",
    received: last,
    configured: false,
  });
}
