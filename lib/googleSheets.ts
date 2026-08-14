import { JWT } from "google-auth-library";

import { TRACKING_FIELDS, type TrackingField } from "@/lib/utm";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const DEFAULT_TAB = "Заявки";

const TIMESTAMP_FORMAT = new Intl.DateTimeFormat("uk-UA", {
  timeZone: "Europe/Kyiv",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export type SheetLead = {
  name: string;
  phone: string;
  email: string;
  formSource: string;
  ticketTitle: string;
  tracking: Partial<Record<TrackingField, string>>;
};

type SheetsConfig = {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  tab: string;
};

let warnedAboutMissingConfig = false;
let cachedClient: JWT | null = null;

function readConfig(): SheetsConfig | null {
  const encoded = process.env.GOOGLE_SERVICE_ACCOUNT_B64?.trim();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID?.trim();

  if (!encoded || !spreadsheetId) {
    if (!warnedAboutMissingConfig) {
      warnedAboutMissingConfig = true;
      console.warn(
        "[sheets] GOOGLE_SERVICE_ACCOUNT_B64 / GOOGLE_SHEETS_ID are not set — leads go to Telegram only.",
      );
    }

    return null;
  }

  let decoded: { client_email?: string; private_key?: string };

  try {
    decoded = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
  } catch {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_B64 is not base64-encoded JSON.");
  }

  if (!decoded.client_email || !decoded.private_key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_B64 has no client_email / private_key.");
  }

  return {
    clientEmail: decoded.client_email,
    privateKey: decoded.private_key,
    spreadsheetId,
    tab: process.env.GOOGLE_SHEETS_TAB?.trim() || DEFAULT_TAB,
  };
}

function formatTracking(tracking: SheetLead["tracking"]): string {
  return TRACKING_FIELDS.map((field) => {
    const value = tracking[field]?.trim();
    return value ? `${field}=${value}` : null;
  })
    .filter((part): part is string => part !== null)
    .join(" | ");
}

function buildRange(tab: string): string {
  return `'${tab.replace(/'/g, "''")}'!A:G`;
}

/** Resolves silently when the integration is unconfigured; throws with a readable reason otherwise. */
export async function appendLeadToSheet(lead: SheetLead): Promise<void> {
  const config = readConfig();

  if (!config) {
    return;
  }

  if (!cachedClient) {
    cachedClient = new JWT({
      email: config.clientEmail,
      key: config.privateKey,
      scopes: SCOPES,
    });
  }

  const { token } = await cachedClient.getAccessToken();

  if (!token) {
    throw new Error("Google issued no access token.");
  }

  /* RAW keeps "+380…" a literal string — USER_ENTERED would read the leading + as a formula */
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(config.spreadsheetId)}` +
    `/values/${encodeURIComponent(buildRange(config.tab))}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const row = [
    lead.name,
    lead.phone,
    lead.email,
    TIMESTAMP_FORMAT.format(new Date()),
    lead.formSource,
    formatTracking(lead.tracking),
    lead.ticketTitle,
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!response.ok) {
    const detail = (await response.text().catch(() => "")).slice(0, 300);
    throw new Error(`Sheets API ${response.status}: ${detail}`);
  }
}
