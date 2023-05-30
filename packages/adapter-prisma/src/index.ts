/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Adapter } from "@loglib/core"
import { Prisma, PrismaClient } from "@prisma/client"


export const prismaAdapter = (db: PrismaClient): Adapter => {
    return {
        async createSession(data) {
            const response = await db.webSession.create({
                data
            })
            return response;
        },
        async updateSession(data, id) {
            const res = await db.webSession.update({
                where: {
                    id
                },
                data
            }).catch((e) => {
                //check if it's failing because of the session not existing this happens sometime and we just don't wanna keep that session and we don't wanna through this is long ass comment
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    return null
                }
                throw e
            })
            return res
        },
        async createPageView(data) {
            if (data.queryParams) {
                data.queryParams = JSON.stringify(data.queryParams)
            }
            const response = await db.webPageview.create({
                data: data
            }).catch(e => {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    return null
                } else {
                    console.error(e)
                    throw e
                }
            })
            return response
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
            return res
        },
        async upsertPageView(data) {
            const res = await db.webPageview.upsert({
                create: data,
                update: data,
                where: {
                    id: data.id
                }
            })
            return res
        },
    }
}

