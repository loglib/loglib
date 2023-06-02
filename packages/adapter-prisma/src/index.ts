/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Adapter } from "@loglib/core"
import { PrismaClient } from "@prisma/client"


export const prismaAdapter = (db: PrismaClient): Adapter => {
    return {
        async createSession(data) {
            const response = await db.webSession.create({
                data: {
                    ...data,
                    queryParams: data.queryParams ? JSON.stringify(data.queryParams) : undefined
                }
            })
            return { ...response, queryParams: JSON.parse(response.queryParams) }
        },
        async updateSession(data, id) {
            const res = await db.webSession.update({
                where: {
                    id
                },
                data: {
                    ...data,
                    queryParams: data.queryParams ? JSON.stringify(data.queryParams) : undefined
                }
            })
            return { ...res, queryParams: JSON.parse(res?.queryParams) }
        },
        async createPageView(data) {
            const response = await db.webPageview.create({
                data: {
                    ...data,
                    queryParams: data.queryParams ? JSON.stringify(data.queryParams) : undefined
                }
            })
            return { ...response, queryParams: JSON.parse(response.queryParams) }
        },
        async createManyEvents(data) {
            const promises = data.map(async (event) => {
                const response = await db.webEvent.create({
                    data: {
                        ...event,
                        pageId: event.pageId,
                        userId: event.userId,
                        sessionId: event.sessionId,
                        payload: JSON.stringify(event.payload),
                    },
                }).then(res => ({ ...res, payload: JSON.parse(res.payload) as Record<string, string> }));
                return response;
            });
            return Promise.all(promises).catch((error) => {
                console.log(error)
                throw error;
            });
        },
        async upsertUser(data) {
            const response = await db.webUser.upsert({
                where: {
                    id: data.id
                },
                create: {
                    id: data.id,
                    data: JSON.stringify(data.data),
                },
                update: {
                    data: JSON.stringify(data.data)
                }
            }).then(res => ({ ...res, data: JSON.parse(res.data) as Record<string, string> }))
            return response
        },
        connect: async () => {
            await db.$connect()
        },
        disconnect: async () => {
            await db.$disconnect()
        },

        async getUser(startDate, endDate) {
            return await db.webUser.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            }).then(res => {
                const users = res.map(user => ({ ...user, data: JSON.parse(user.data) as Record<string, string> }))
                return users
            })
        },
        async getPageViews(startDate, endDate) {
            return await db.webPageview.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            }).then(res => {
                const pageViews = res.map(pageView => ({ ...pageView, queryParams: JSON.parse(pageView.queryParams) as Record<string, string> }))
                return pageViews
            })
        },
        async getEvents(startDate, endDate) {
            return await db.webEvent.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            }).then(res => {
                const events = res.map(event => ({ ...event, payload: JSON.parse(event.payload) as Record<string, string> }))
                return events
            })
        },
        async getSession(startDate, endDate) {
            const res = await db.webSession.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    }
                }
            })
            return res.map(session => ({ ...session, queryParams: JSON.parse(session.queryParams) as Record<string, string> }))

        },
        async upsertPageView(data) {
            const res = await db.webPageview.upsert({
                create: {
                    ...data,
                    queryParams: data.queryParams ? JSON.stringify(data.queryParams) : undefined
                },
                update: {
                    ...data,
                    queryParams: data.queryParams ? JSON.stringify(data.queryParams) : undefined
                },
                where: {
                    id: data.id
                }
            })
            return { ...res, queryParams: JSON.parse(res.queryParams) }
        },
    }
}

