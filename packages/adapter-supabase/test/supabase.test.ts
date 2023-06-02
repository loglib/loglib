import { createClient } from "@supabase/supabase-js";
import { beforeAll, describe, expect, it } from "vitest";
import { runAdapterTest } from '@loglib/adapter-test';
import { supabaseAdapter } from "../src";



describe("supabaseAdapter", async () => {
    const db = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string)
    beforeAll(async () => {
        await db.from("web_session").delete().eq("id", "session-id")
        await db.from("web_pageview").delete().eq("id", "page-view-id")
        await db.from("web_event").delete().eq("page_id", "page-view-id")
        await db.from("web_user").delete().eq("id", "user-id")
    })
    await runAdapterTest({
        adapter: supabaseAdapter(db),

    })
    it("should work", () => {
        expect(true).toBe(true)
        expect(process.env.SUPABASE_URL).toBeDefined()
        expect(process.env.SUPABASE_KEY).toBeDefined()
    })
})