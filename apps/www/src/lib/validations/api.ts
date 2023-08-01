import { z } from "zod";

export const transformToISO = (val?: string) => {
    if (!val) return val;
    return new Date(val).toISOString();
};

export const rootApiSchema = z.object({
    apiKey: z.string(),
    take: z.number().default(10),
    skip: z.number().default(0),
});

export const rootWhereSchema = z.object({
    id: z.string().optional(),
    createdAt: z
        .object({
            gt: z.string().optional().transform(transformToISO),
            lt: z.string().optional().transform(transformToISO),
            gte: z.string().optional().transform(transformToISO),
            lte: z.string().optional().transform(transformToISO),
        })
        .optional(),
});
