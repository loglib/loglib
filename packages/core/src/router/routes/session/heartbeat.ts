import z from "zod";
import { ApiPostHandler } from "../../type";
import { RootApiTrackerSchema } from "../../schema";
import { GenericError } from "../../..";


const HeartBeatSchema = RootApiTrackerSchema.merge(z.object({
    duration: z.number(),
    status: z.boolean()
}))

type HeartBeatSchemaType = z.infer<typeof HeartBeatSchema>

export const postHeartBeat: ApiPostHandler<HeartBeatSchemaType> = async (req, options) => {
    const adapter = options.adapter
    const data = req.body
    try {
        await adapter.updateSession({ updatedAt: new Date(), duration: data.duration }, data.sessionId)
        return {
            message: 'Session updated',
            code: 200,
        }
    } catch {
        throw new GenericError('Error updating session', { path: "/session/end" })
    }
}