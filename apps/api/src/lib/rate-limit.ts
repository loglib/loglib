import { kv } from "@vercel/kv";
import { env } from "../../env";

const MAX_TOKENS = 100;
const REFILL_RATE = 10;
const REFILL_INTERVAL = 1000;

export const rateLimitCheck = async (apiKey: string) => {
    if (!env.KV_REST_API_URL) {
        return false;
    }
    const bucket = await kv.get<{ tokens: number; lastRefill: number }>(apiKey);
    const now = Date.now();
    if (!bucket) {
        kv.set(apiKey, {
            tokens: MAX_TOKENS,
            lastRefill: now,
        });
        return false;
    }
    const tokensToAdd = Math.floor((now - bucket.lastRefill) / REFILL_INTERVAL) * REFILL_RATE;
    const tokens = Math.min(bucket.tokens + tokensToAdd, MAX_TOKENS);
    if (tokens < 1) {
        return true;
    } else {
        await kv.set(apiKey, {
            tokens: tokens - 1,
            lastRefill: now,
        });
        return false;
    }
};
