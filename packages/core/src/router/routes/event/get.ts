import z from "zod";
import { RootDashboardSchema } from "../../schema";
import { ApiGetHandler } from "../../type";
import { Events } from "../../..";


const getEventSchema = RootDashboardSchema.merge(z.object({
    startDate: z.string(),
    endDate: z.string()
}))

export type GetEventsResponse = {
    events: Events[],
    pastEvents: Events[]
}


const getEvent: ApiGetHandler<z.infer<typeof getEventSchema>, GetEventsResponse> = async (req, options) => {
    const adapter = options.adapter
    const query = getEventSchema.safeParse(req.query)
    if (query.success) {
        const { startDate, endDate } = query.data
        const startDateObj = new Date(startDate)
        const endDateObj = new Date(endDate)
        const events = await adapter.getEvents(startDateObj, endDateObj)
        const duration = endDateObj.getTime() - startDateObj.getTime()
        const pastEndDateObj = new Date(endDateObj.getTime() - duration)
        const pastEvents = await adapter.getEvents(pastEndDateObj, startDateObj)
        return {
            message: 'success',
            code: 200,
            data: {
                events,
                pastEvents
            }
        }
    } else {
        throw new Error('Invalid request query param')
    }
}
export { getEvent }