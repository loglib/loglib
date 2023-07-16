import { Adapter, Events, PageView, Session, Visitor } from "@loglib/core"

import { PrismaClient } from "../../../@prisma"

type CustomSession = Session & { websiteId: string }
type CustomPageView = PageView & { websiteId: string }
type CustomEvents = Events & { websiteId: string }
type CustomUser = Visitor & { websiteId: string }

export const prismaAdapter = (db: PrismaClient): Adapter => {
  return {
    async createSession(data: CustomSession) {
      const response = await db.webSession.create({
        data: {
          ...data,
          queryParams: data.queryParams
            ? JSON.stringify(data.queryParams)
            : undefined,
        },
      })
      return {
        ...response,
        queryParams: response.queryParams
          ? JSON.parse(response.queryParams)
          : undefined,
      }
    },
    async updateSession(data: CustomSession, id) {
      const res = await db.webSession.update({
        where: {
          id,
        },
        data: {
          ...data,
          queryParams: data.queryParams
            ? JSON.stringify(data.queryParams)
            : undefined,
        },
      })
      return { ...res, queryParams: JSON.parse(res?.queryParams) }
    },
    async createPageView(data: CustomPageView) {
      const response = await db.webPageview.create({
        data: {
          ...data,
          queryParams: data.queryParams
            ? JSON.stringify(data.queryParams)
            : undefined,
        },
      })
      return { ...response, queryParams: JSON.parse(response.queryParams) }
    },
    async createManyEvents(data: CustomEvents[]) {
      const promises = data.map(async (event) => {
        const response = await db.webEvent
          .create({
            data: {
              ...event,
              pageId: event.pageId,
              visitorId: event.visitorId,
              sessionId: event.sessionId,
              payload: JSON.stringify(event.payload),
            },
          })
          .then((res) => ({
            ...res,
            payload: JSON.parse(res.payload) as Record<string, string>,
          }))
        return response
      })
      return Promise.all(promises).catch((error) => {
        console.log(error)
        throw error
      })
    },
    async upsertVisitor(data: CustomUser) {
      const response = await db.webVisitor
        .upsert({
          where: {
            id: data.id,
          },
          create: {
            id: data.id,
            data: JSON.stringify(data.data),
            websiteId: data.websiteId,
          },
          update: {
            data: JSON.stringify(data.data),
          },
        })
        .then((res) => ({
          ...res,
          data: JSON.parse(res.data) as Record<string, string>,
        }))
      return response
    },
    connect: async () => {
      await db.$connect()
    },
    disconnect: async () => {
      await db.$disconnect()
    },

    async getVisitor(startDate, endDate, websiteId) {
      return await db.webVisitor
        .findMany({
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
            websiteId,
          },
        })
        .then((res) => {
          const users = res.map((user) => ({
            ...user,
            data: JSON.parse(user.data) as Record<string, string>,
          }))
          return users
        })
    },
    async getPageViews(startDate, endDate, websiteId) {
      return await db.webPageview
        .findMany({
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
            websiteId,
          },
        })
        .then((res) => {
          const pageViews = res.map((pageView) => ({
            ...pageView,
            queryParams: JSON.parse(pageView.queryParams) as Record<
              string,
              string
            >,
          }))
          return pageViews
        })
    },
    async getEvents(startDate, endDate, websiteId) {
      return await db.webEvent
        .findMany({
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
            websiteId,
          },
        })
        .then((res) => {
          const events = res.map((event) => ({
            ...event,
            payload: JSON.parse(event.payload) as Record<string, string>,
          }))
          return events
        })
    },
    async getSession(startDate, endDate, websiteId) {
      const res = await db.webSession.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          websiteId,
        },
      })

      return res.map((session) => ({
        ...session,
        queryParams: JSON.parse(session.queryParams) as Record<string, string>,
      }))
    },
    async updatePageView(data: CustomPageView) {
      const res = await db.webPageview.update({
        data: {
          duration: data.duration,
        },
        where: {
          id: data.id,
        },
      })
      return { ...res, queryParams: JSON.parse(res.queryParams) }
    },
  }
}
