import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
let limiter: Ratelimit | null = null;
export function getLimiter() {
  if (limiter) return limiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  limiter = new Ratelimit({ redis: new Redis({ url, token }), limiter: Ratelimit.slidingWindow(5, "1 m"), analytics: true, prefix: "nxr:lead" });
  return limiter;
}
