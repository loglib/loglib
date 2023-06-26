import { encrypt } from "@/lib/crypto";
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { apiKeySchema } from "@/lib/validations/api-key";



export const POST = async (req: Request) => {

    try {
        const user = await getCurrentUser()
        if (!user) return new Response(null, {
            status: 401
        })
        const data = apiKeySchema.parse(await req.json())
        const currentKeysCount = await db.apiKey.count({
            where: {
                userId: user.id
            }
        })
        if (currentKeysCount >= 5) return new Response(JSON.stringify({
            message: "You can only have 5 API keys at a time"
        }), {
            status: 400
        })
        const key = "site_" + Math.random().toString(36).substring(2, 9)
        const res = await db.apiKey.create({
            data: {
                userId: user.id,
                expires: new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * data.expiresIn),
                name: data.name,
                websiteId: data.website,
                key: encrypt(key)
            }
        })
        return new Response(null, {
            status: 200
        })
    } catch (e) {
        return new Response(null, { status: 500 })
    }
}