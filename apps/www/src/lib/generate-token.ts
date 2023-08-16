import { env } from "env.mjs";
import jwt from "jsonwebtoken";
import { User } from "next-auth";

export const generateToken = (payload: User & { website: string }) => {
    return jwt.sign(payload, env.NEXTAUTH_SECRET);
};
