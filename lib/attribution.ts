const STORAGE_KEY = "apex:attribution";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const CLICK_ID_KEYS = ["gclid", "fbclid", "msclkid", "ttclid"] as const;

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  ttclid?: string;
  referrer?: string;
  landingPage?: string;
  userAgent?: string;
};

const trim = (v: string | null) => {
  if (!v) return undefined;
  const t = v.trim().slice(0, 500);
  return t.length > 0 ? t : undefined;
};

const camelKey = (k: string) =>
  k.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());

const parseFromUrl = (url: URL): Attribution => {
  const out: Attribution = {};
  for (const k of UTM_KEYS) {
    const v = trim(url.searchParams.get(k));
    if (v) (out as Record<string, string>)[camelKey(k)] = v;
  }
  for (const k of CLICK_ID_KEYS) {
    const v = trim(url.searchParams.get(k));
    if (v) (out as Record<string, string>)[k] = v;
  }
  return out;
};

const hasAnyTrackingParam = (a: Attribution) =>
  Boolean(
    a.utmSource ||
      a.utmMedium ||
      a.utmCampaign ||
      a.utmTerm ||
      a.utmContent ||
      a.gclid ||
      a.fbclid ||
      a.msclkid ||
      a.ttclid,
  );

const sameOrigin = (referrer: string) => {
  try {
    return new URL(referrer).host === window.location.host;
  } catch {
    return false;
  }
};

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const fromUrl = parseFromUrl(url);

    const existingRaw = window.sessionStorage.getItem(STORAGE_KEY);
    const existing: Attribution = existingRaw ? JSON.parse(existingRaw) : {};

    const incoming: Attribution = { ...fromUrl };
    if (!existing.referrer) {
      const ref = trim(document.referrer);
      if (ref && !sameOrigin(ref)) incoming.referrer = ref;
    }
    if (!existing.landingPage) {
      incoming.landingPage = url.pathname + url.search;
    }
    if (!existing.userAgent) {
      incoming.userAgent = trim(navigator.userAgent);
    }

    const next: Attribution = hasAnyTrackingParam(fromUrl)
      ? { ...existing, ...incoming }
      : { ...incoming, ...existing };

    if (Object.keys(next).length === 0) return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // sessionStorage unavailable (private mode, SSR-ish) — silently ignore
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

export function clearAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}
