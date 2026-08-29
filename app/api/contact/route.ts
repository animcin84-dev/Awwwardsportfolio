import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactField = "name" | "email" | "brief";
type ContactMessage = {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  brief: string;
};

const RATE_LIMIT_MS = 15_000;
const MAX_BODY_BYTES = 12_000;
const DELIVERY_TIMEOUT_MS = 8_000;
const recent = new Map<string, number>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown) => typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim() : "";

function deliveryMode() {
  const explicit = process.env.CONTACT_DELIVERY_MODE?.trim().toLowerCase();
  if (explicit === "file" || explicit === "webhook" || explicit === "disabled") return explicit;
  if (process.env.CONTACT_WEBHOOK_URL?.trim()) return "webhook";
  if (process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) return "disabled";
  return "file";
}

function pruneRateLimit(now: number) {
  if (recent.size < 500) return;
  for (const [key, timestamp] of recent) if (now - timestamp > RATE_LIMIT_MS) recent.delete(key);
}

function validate(name: string, email: string, brief: string) {
  const fieldErrors: Partial<Record<ContactField, string>> = {};
  if (name.length < 2) fieldErrors.name = "Enter at least 2 characters for your name or studio.";
  else if (name.length > 80) fieldErrors.name = "Keep the name or studio under 80 characters.";
  if (!emailPattern.test(email)) fieldErrors.email = "Enter a reply email in the format name@company.com.";
  else if (email.length > 160) fieldErrors.email = "Keep the reply email under 160 characters.";
  if (brief.length < 20) fieldErrors.brief = "Add at least 20 characters so the project has enough context.";
  else if (brief.length > 2000) fieldErrors.brief = "Keep the project brief under 2,000 characters.";
  return fieldErrors;
}

async function deliverToFile(message: ContactMessage) {
  const inbox = process.env.CONTACT_STORAGE_DIR?.trim() || join(process.cwd(), ".contact-inbox");
  await mkdir(inbox, { recursive: true });
  await appendFile(join(inbox, "messages.ndjson"), `${JSON.stringify(message)}\n`, { encoding: "utf8", mode: 0o600 });
}

async function deliverToWebhook(message: ContactMessage) {
  const url = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!url) throw new Error("CONTACT_WEBHOOK_URL is not configured");
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" && parsed.hostname !== "localhost" && parsed.hostname !== "127.0.0.1") {
    throw new Error("CONTACT_WEBHOOK_URL must use HTTPS");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);
  try {
    const token = process.env.CONTACT_WEBHOOK_BEARER_TOKEN?.trim();
    const response = await fetch(parsed, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ event: "portfolio.contact", message }),
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  pruneRateLimit(now);
  const lastSentAt = recent.get(ip) || 0;
  if (now - lastSentAt < RATE_LIMIT_MS) {
    const retryAfter = Math.max(1, Math.ceil((RATE_LIMIT_MS - (now - lastSentAt)) / 1000));
    return NextResponse.json(
      { message: `Please wait ${retryAfter} seconds before sending another brief.` },
      { status: 429, headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "The project brief is larger than this private channel accepts." }, { status: 413 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "The brief could not be read. Please reload and try again." }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email).toLowerCase();
  const brief = clean(payload.brief);
  const website = clean(payload.website);
  if (website) return NextResponse.json({ ok: true });

  const fieldErrors = validate(name, email, brief);
  if (Object.keys(fieldErrors).length) {
    return NextResponse.json(
      { message: "Review the highlighted fields, then send the brief again.", fieldErrors },
      { status: 422, headers: { "Cache-Control": "no-store" } },
    );
  }

  const message: ContactMessage = {
    id: randomUUID(),
    receivedAt: new Date(now).toISOString(),
    name,
    email,
    brief,
  };

  const mode = deliveryMode();
  if (mode === "disabled") {
    return NextResponse.json(
      { message: "The private inbox is temporarily unavailable. Your brief has not been sent; please keep this page open and try again shortly." },
      { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "60" } },
    );
  }

  try {
    if (mode === "webhook") await deliverToWebhook(message);
    else await deliverToFile(message);
  } catch (error) {
    console.error("Contact delivery failed", { id: message.id, mode, error: error instanceof Error ? error.message : "unknown" });
    return NextResponse.json(
      { message: "The private inbox did not confirm delivery. Your brief is still here; please try again shortly." },
      { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "30" } },
    );
  }

  recent.set(ip, now);
  return NextResponse.json(
    { ok: true, reference: `DB-${message.id.slice(0, 8).toUpperCase()}` },
    { headers: { "Cache-Control": "no-store" } },
  );
}
