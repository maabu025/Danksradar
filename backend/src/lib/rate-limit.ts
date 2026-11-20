// Simple in-memory limit: 5 submissions per IP every 10 minutes.
// If you run more than one backend server, swap this for a shared store such as Redis.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}
