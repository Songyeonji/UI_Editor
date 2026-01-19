// utils/helpers.ts

export function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function formatNow(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = pad2(now.getMonth() + 1);
  const d = pad2(now.getDate());
  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  return `${y}.${m}.${d} ${hh}:${mm}`;
}

export function clampStr(v: string, fallback: string): string {
  const t = (v ?? "").trim();
  return t.length ? t : fallback;
}