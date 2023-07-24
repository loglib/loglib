import { PrismaClient } from "generated/client"

declare global {
  // eslint-disable-next-line no-var
  // rome-ignore lint/style/noVar: <explanation>
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma
