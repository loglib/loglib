import { z } from "zod";

export const websiteFormSchema = z.object({
    id: z
        .string({
            required_error: "We're gonna use this as an Id so it's required",
        })
        .min(1, "I don't think you can have an id with 0 characters")
        .max(20, "I don't think you can have an id with more than 20 characters")
        .transform((value) => value.toLowerCase())
        .transform((value) => value.replace(/\s/g, "_")),
    title: z
        .string()
        .min(1, "We kinda hope you give us some kind of title here")
        .max(20, "Can we make it a little shorter than 20 chars"),
    url: z
        .string({ required_error: "Url field is required like every other fields" })
        .url("How do you plan to collect data without providing url?"),
    team: z.string().optional(),
    public: z.boolean().optional(),
});
