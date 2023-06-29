import { env } from "env.mjs";
import bcrypt from 'bcrypt'

const key = env.API_SECRET;

export function encrypt(text: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(key, salt);
    return hash;
}
