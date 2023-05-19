import z from "zod";
import { GenericError } from "../../../error";
import { RootApiTrackerSchema } from "../../schema";
import { ApiPutHandler } from "../../type";



const PatchSchema = z.object({
    duration: z.number()
})
const sessionEndPostSchema = RootApiTrackerSchema.merge(z.object({ data: PatchSchema }))
export type sessionEndPostInput = z.infer<typeof sessionEndPostSchema>
export const sessionEndPost: ApiPutHandler<sessionEndPostInput> = async (req, options) => {
    const adapter = options.adapter
    const data = req.body.data
    try {
        await adapter.tracker.updateSession({ duration: Math.floor(req.body.data.duration) }, req.body.sessionId)
        return {
            message: 'Session updated',
            code: 200,
            data
        }
    } catch {
        throw new GenericError('Error updating session', { path: "/session/end" })
    }
}