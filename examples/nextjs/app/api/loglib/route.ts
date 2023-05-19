import { Next13 } from "@loglib/next"
import { prismaAdapter } from "@loglib/prisma-adapter"
import { PrismaClient } from "@prisma/client"


const db = new PrismaClient()
const POST = Next13({
    adapter: prismaAdapter(db),
    disableLocation: true
})
export { POST }