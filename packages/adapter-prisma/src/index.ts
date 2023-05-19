import { Adapter, Events } from "@loglib/core"
import { Prisma, PrismaClient } from "@prisma/client"

const tracker = (db: PrismaClient): Adapter['tracker'] => {
    return {
        async createSession(data) {
            const { userId } = data;
            const response = await db.webSession.create({
                data: {
                    ...data,
                    userId: undefined,
                    User: {
                        connectOrCreate: {
                            where: {
                                id: userId,
                            },
                            create: {
                                id: userId
                            },
                        },
                    },
                },
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
            const response = await db.webPageview.upsert({
                create: {
                    ...data,
                },
                update: {
                    ...data,
                },
                where: {
                    id: data.id
                }
            }).catch((e) => {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    return null
                }
                throw e
            })
            return response
        },
        async createManyEvents(data) {
            const promises = data.map(async (event) => {
                try {
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
                } catch (error) {
                    if (error instanceof Prisma.PrismaClientKnownRequestError) {
                        // incase if user id doesn't exist
                        await this.updateUser({ id: event.userId, data: {} }, event.userId)
                        //  if page id doesn't exist, create the page first
                        const page = await db.webPageview.upsert({
                            create: {
                                id: event.pageId,
                                page: "",
                                sessionId: event.sessionId,
                                userId: event.userId,
                            },
                            update: {
                            },
                            where: {
                                id: event.pageId
                            }

                        });
                        // Run the event creation again with the newly created page
                        return await db.webEvent.create({
                            data: {
                                ...event,
                                pageId: page.id, // Use the newly created page ID
                                userId: event.userId,
                                sessionId: event.sessionId,
                                payload: JSON.stringify(event.payload),
                            },
                        }).then(res => ({ ...res, payload: JSON.parse(res.payload) as Record<string, string> }));
                    } else {
                        throw error;
                    }
                }
            });
            return Promise.all(promises).catch((error) => {
                console.error(error);
                throw error;
            }) as Promise<Events[]>;
        },
        async updateUser(data) {
            const { id, ...rest } = data
            const response = await db.webUser.upsert({
                where: {
                    id
                },
                create: {
                    id,
                    data: JSON.stringify(rest.data)
                },
                update: {
                    data: JSON.stringify(rest.data)
                }
            }).then(res => ({ ...res, data: JSON.parse(res.data) as Record<string, string> }))
            return response
        },
    }
}


export const prismaAdapter = (db: PrismaClient): Adapter => {
    return {
        tracker: tracker(db),
        connect: async () => {
            await db.$connect()
        },
        disconnect: async () => {
            await db.$disconnect()
        }
    }
}