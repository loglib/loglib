import bcrypt from "bcrypt";
import { env } from "env.mjs";

const key = env.API_SECRET;

export function encrypt(_text: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(key, salt);
    return hash;
}
