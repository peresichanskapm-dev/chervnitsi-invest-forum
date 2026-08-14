import { NextResponse } from "next/server";

import { appendLeadToSheet } from "@/lib/googleSheets";
import { isPhoneComplete } from "@/lib/phoneMask";
import { TRACKING_FIELDS, type TrackingField } from "@/lib/utm";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  ticketTitle?: string;
  formSource?: string;
} & Partial<Record<TrackingField, string>>;

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}'’\- ]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sendTelegramMessage(token: string, chatId: string, text: string): Promise<Response> {
  return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Telegram credentials are not configured." },
      { status: 500 },
    );
  }

  const payload = (await request.json()) as Payload;
  const name = payload?.name?.trim();
  const email = payload?.email?.trim();
  const phone = payload?.phone?.trim();
  const ticketTitle = payload?.ticketTitle?.trim();
  const formSource = payload?.formSource?.trim() || "Форма на основному сайті";

  if (!name || !phone) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (name.length < 2 || !NAME_PATTERN.test(name)) {
    return NextResponse.json({ error: "Invalid name." }, { status: 400 });
  }

  if (!isPhoneComplete(phone)) {
    return NextResponse.json({ error: "Invalid phone." }, { status: 400 });
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const tracking = TRACKING_FIELDS.reduce<Partial<Record<TrackingField, string>>>((acc, field) => {
    const value = payload[field]?.trim();

    if (value) {
      acc[field] = value;
    }

    return acc;
  }, {});

  const trackingLines = TRACKING_FIELDS.map((field) => {
    const value = tracking[field];
    return value ? `${field}: ${escapeHtml(value)}` : null;
  });

  const text = [
    "🔔 Нова заявка з сайту Chernivtsi Invest Forum:",
    "",
    `Джерело: ${escapeHtml(formSource)}`,
    `Ім'я: ${escapeHtml(name)}`,
    email ? `Email: ${escapeHtml(email)}` : null,
    `Телефон: ${escapeHtml(phone)}`,
    ticketTitle ? `Квиток: ${escapeHtml(ticketTitle)}` : null,
    ...trackingLines,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const [telegramResult, sheetsResult] = await Promise.allSettled([
    sendTelegramMessage(token, chatId, text),
    appendLeadToSheet({
      name,
      phone,
      email: email ?? "",
      formSource,
      ticketTitle: ticketTitle ?? "",
      tracking,
    }),
  ]);

  if (sheetsResult.status === "rejected") {
    const reason =
      sheetsResult.reason instanceof Error
        ? sheetsResult.reason.message
        : String(sheetsResult.reason);

    console.error("[sheets] append failed:", sheetsResult.reason);

    /* the lead itself already reached Telegram, so this only has to make the gap visible */
    await sendTelegramMessage(
      token,
      chatId,
      `⚠️ Заявка НЕ записана в таблицю: ${escapeHtml(reason)}`,
    ).catch(() => undefined);
  }

  if (telegramResult.status === "rejected" || !telegramResult.value.ok) {
    return NextResponse.json({ error: "Telegram request failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
