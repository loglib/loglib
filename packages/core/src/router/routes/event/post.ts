import z from "zod";
import { RootApiTrackerSchema } from "../../schema";
import { ApiPostHandler } from "../../type";
import { GenericError } from "../../../error";
import { Events } from "../../../adapters/models";
import { getIpAddress } from "../utils/detect/getIpAddress";


export const EventSchema = z.array(z.object({
    id: z.string(),
    eventName: z.string(),
    eventType: z.string(),
    payload: z.record(z.any()),
    page: z.string()
}))
export const EventsApiSchema = RootApiTrackerSchema.merge(z.object({ data: EventSchema }))
export type EventPostInput = z.infer<typeof EventsApiSchema>
export const postEvent: ApiPostHandler<EventPostInput> = async (req, options) => {
    if (!req.body.userId) {
        req.body.userId = getIpAddress(req) as string
    }
    const body = EventsApiSchema.safeParse(req.body)
    const adapter = options.adapter
    if (body.success) {
        const data: Events[] = body.data.data.map(event => ({
            sessionId: body.data.sessionId,
            userId: body.data.userId,
            pageId: body.data.pageId,
            payload: event.payload,
            eventName: event.eventName,
            eventType: event.eventType,
            id: event.id,
            createdAt: new Date(),
            updatedAt: new Date()
        }))
        try {
            adapter.connect && await adapter.connect()
            await adapter.createManyEvents(data)
            adapter.disconnect && await adapter.disconnect()
            return {
                message: "success",
                code: 200,
                data
            }
        } catch {
            throw new GenericError('Error creating event', { path: "/event" })
        }
    } else {
        throw new GenericError('Invalid request body', { path: "/event" })
    }

}