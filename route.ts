import { NextRequest, NextResponse } from "next/server";
import { getLimiter } from "@/lib/ratelimit";
import { getClientIp } from "@/lib/utils";
import { Resend } from "resend";
import { saveLeadToNotion } from "@/lib/notion";
import { sendMetaLead, sendGA4Lead } from "@/lib/ads";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, note } = body || {};
    if (!name || !phone) return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });

    const ip = getClientIp(req.headers as any);
    const ua = req.headers.get("user-agent") || "-";
    const path = req.nextUrl.pathname;
    const cookie = req.cookies.get("__utm")?.value;
    const utm = cookie ? safeParseJSON(cookie) : null;

    // Optional rate limit
    const limiter = getLimiter();
    if (limiter) {
      const { success, limit, remaining } = await limiter.limit(`lead:${ip}`);
      if (!success) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": String(remaining) } });
    }

    // generate event id
    const event_id = (globalThis.crypto as any)?.randomUUID?.() || (await import("crypto")).randomUUID();

    // Fan-out tasks (all optional by ENV)
    const tasks: Promise<any>[] = [];

    // Telegram
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      const text = `NEXORA Lead\nName: ${name}\nPhone: ${phone}\nNote: ${note || "-"}\nIP: ${ip}\nUA: ${ua}\nPath: ${path}\nUTM: ${utm ? JSON.stringify(utm) : "-"}`;
      tasks.push(fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text }) }));
    }

    // Resend email
    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.LEADS_TO_EMAIL;
    if (resendKey && to) {
      const resend = new Resend(resendKey);
      const html = `<h2>NEXORA Lead</h2><p><b>Name:</b> ${escapeHtml(name)}<br/><b>Phone:</b> ${escapeHtml(phone)}<br/><b>Note:</b> ${escapeHtml(note || "-")}</p><p><b>IP:</b> ${escapeHtml(ip)}<br/><b>UA:</b> ${escapeHtml(ua)}<br/><b>Path:</b> ${escapeHtml(path)}</p><pre>${escapeHtml(JSON.stringify(utm, null, 2) || "-")}</pre>`;
      tasks.push(resend.emails.send({ from: "Nexora Leads <leads@nexoraluxe.ir>", to, subject: `Lead — ${name}`, html }));
    }

    // Notion
    tasks.push(saveLeadToNotion({ name, phone, note, ip, ua, path, utm }));

    // Google Sheets Webhook
    const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;
    if (sheetsUrl) {
      const payload = { ts: new Date().toISOString(), name, phone, note, ip, ua, path, utm };
      tasks.push(fetch(sheetsUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }));
    }

    // Server-side pixels
    tasks.push(sendMetaLead({ ip, ua, event_id }));
    tasks.push(sendGA4Lead({ event_id }));

    await Promise.allSettled(tasks);

    return NextResponse.json({ ok: true, event_id });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function safeParseJSON(t: string) { try { return JSON.parse(t); } catch { return null; } }
function escapeHtml(s: string) { return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" } as any)[c]); }
