import z from "zod";
import { ApiPostHandler } from "../../type";
import { RootApiTrackerSchema } from "../../schema";
import { GenericError } from "../../..";


const HeartBeatSchema = RootApiTrackerSchema.merge(z.object({
    data: z.object({
        duration: z.number(),
    })
}))

type HeartBeatSchemaType = z.infer<typeof HeartBeatSchema>

export const pulse: ApiPostHandler<HeartBeatSchemaType> = async (req, options) => {
    const adapter = options.adapter
    const data = HeartBeatSchema.safeParse(req.body)
    if (data.success) {
        try {
            const res = await adapter.updateSession({ updatedAt: new Date(), duration: Math.floor(data.data.data.duration) }, data.data.sessionId)
            return {
                message: 'Session updated',
                code: 200,
                data: res
            }
        } catch (e) {
            throw new GenericError('Error updating session', { path: "/session/end" })
        }
    } else {
        console.log(data.error)
        throw new GenericError('Invalid request body', { path: "/session/end" })
    }
}