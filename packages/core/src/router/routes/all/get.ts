import z from "zod";
import { RootDashboardSchema } from "../../schema";
import { ApiGetHandler } from "../../type";
import { Events, PageView, Session, User } from "../../..";

type GetInsightQuery = {
    startDate: string,
    endDate: string
}

type GetInsightResponse = {
    users: User[],
    pages: PageView[],
    sessions: Session[],
    events: Events[],
}

const getInsightSchema = RootDashboardSchema.merge(z.object({
    startDate: z.string(),
    endDate: z.string()
}))

export const getAllTables: ApiGetHandler<GetInsightQuery, GetInsightResponse> = async (req, options) => {
    const adapter = options.adapter
    const query = getInsightSchema.safeParse(req.query)
    if (query.success) {
        const { startDate, endDate } = query.data
        const startDateObj = new Date(startDate)
        const endDateObj = new Date(endDate)
        const users = await adapter.getUser(startDateObj, endDateObj)
        const pages = await adapter.getPageViews(startDateObj, endDateObj)
        const events = await adapter.getEvents(startDateObj, endDateObj)
        const sessions = await adapter.getSession(startDateObj, endDateObj)
        return {
            message: 'success',
            code: 200,
            data: {
                users,
                pages,
                events,
                sessions,
            }
        }
    }
    else {
        throw new Error('Invalid request query param')
    }
}