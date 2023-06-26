import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { env } from "env.mjs";


const algorithm = "aes-256-cbc";
const key = env.API_SECRET;
const iv = randomBytes(16);

export function encrypt(text: string) {
    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

export function decrypt(text: string) {
    const decipher = createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}