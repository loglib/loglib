import { Tinybird } from "@chronark/zod-bird";
import { env } from "env.mjs";
import { z } from "zod";

export const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });

export const getIsWebsiteActive = tb.buildPipe({
    pipe: "get_is_website_active__v1",
    parameters: z.object({
        websiteId: z.string(),
    }),
    data: z.any(),
});
