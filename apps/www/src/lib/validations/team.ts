import { z } from "zod";

export const teamSchema = z.object({
    name: z.string().min(3).max(255),
});

export const teamInviteSchema = z.object({
    email: z.string().email(),
    role: z.enum(["owner", "admin", "viewer"]),
});
