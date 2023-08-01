import { PrismaClient } from "generated/client"

const db = new PrismaClient()

const paths = [
  "dashboard",
  "signup",
  "sign-up",
  "login",
  "sign-in",
  "register",
  "sign-up",
  "sign_in",
  "sign_up",
  "signin",
  "signup",
  "register",
  "login",
  "auth",
  "authentication",
  "authorize",
  "account",
  "admin",
  "administrator",
  "join",
  "subscribe",
  "unsubscribe",
  "terms",
  "privacy",
  "cookies",
  "cookie",
  "support",
  "help",
  "faq",
  "contact",
  "about",
  "imprint",
  "legal",
  "status",
  "blog",
  "new",
  "news",
  "shop",
  "store",
  "download",
  "downloads",
  "api",
  "cdn",
  "static",
  "assets",
  "img",
  "image",
  "images",
  "js",
  "javascript",
  "css",
  "styles",
  "style",
  "assets",
  "as",
]

async function main() {
  await db.disallowed.createMany({
    data: paths.map((identity) => ({ identity })),
  })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
