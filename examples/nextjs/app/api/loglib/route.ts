import { createServerRoutes } from "@loglib/next"
import { prismaAdapter } from "@loglib/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()


export const { POST, GET } = createServerRoutes({
    adapter: prismaAdapter(db),
    environment: "test"
})