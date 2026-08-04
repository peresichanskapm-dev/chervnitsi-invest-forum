const STORAGE_KEY = "cif:lead-source";
const EVENT_NAME = "cif:lead-source-updated";

export type LeadSource = {
  formSource: string;
  ticketTitle?: string;
};

export const EMPTY_LEAD_SOURCE: LeadSource = { formSource: "" };

/** useSyncExternalStore compares snapshots by reference, so a fresh parse per read would loop forever */
let cachedRaw: string | null = null;
let cachedSource: LeadSource = EMPTY_LEAD_SOURCE;

function readRaw(): string | null {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setLeadSource(source: LeadSource): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(source));
  } catch {
    // Ignore storage failures (private mode, disabled storage).
  }

  window.dispatchEvent(new CustomEvent<LeadSource>(EVENT_NAME, { detail: source }));
}

export function getLeadSource(): LeadSource {
  if (typeof window === "undefined") {
    return EMPTY_LEAD_SOURCE;
  }

  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;

    try {
      cachedSource = raw ? (JSON.parse(raw) as LeadSource) : EMPTY_LEAD_SOURCE;
    } catch {
      cachedSource = EMPTY_LEAD_SOURCE;
    }
  }

  return cachedSource;
}

export function getServerLeadSource(): LeadSource {
  return EMPTY_LEAD_SOURCE;
}

export function subscribeToLeadSource(onChange: () => void): () => void {
  window.addEventListener(EVENT_NAME, onChange);
  return () => window.removeEventListener(EVENT_NAME, onChange);
}
