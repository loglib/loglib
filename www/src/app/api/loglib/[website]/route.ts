import z from "zod"
import {
  getBrowser,
  getDevices,
  getEvents,
  getLoc,
  getOS,
  getOnlineVisitors,
  getPageViews,
  getPages,
  getReferer,
  getUniqueVisitors,
  getVisitorsByDate,
} from "./utils"
import {
  getAverageTime,
  getBounceRate,
  getNewVisitors,
  getUtmCampaigns,
  getUtmSources,
} from "./utils/analysis"
import {
  Events,
  GenericError,
  LogLibOptions,
  PageView,
  Session,
  Visitor,
} from "@loglib/core"
import { filter } from "./filter/smallFilter"
import { Filter } from "./filter/type"
import { kyselyAdapter } from "@/lib/db/kysely-adapter"

import { NextResponse } from "next/server"
import { db } from "@/server/db"
import { db as prismaDb } from "@/lib/db"
import { prismaAdapter } from "@/lib/db/custom-adapter"
import { getCurrentUser } from "@/lib/session"

const getInsightSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  timeZone: z.string(),
  filter: z.string(),
  websiteId: z.string(),
  path: z.string(),
})

export const GET = async (
  req: Request,
  ctx: { params: { website: string } }
) => {
  const query = new URLSearchParams(req.url.split("?")[1])
  const queryObject = Object.fromEntries(query.entries())
  const adapter = queryObject.kysely
    ? kyselyAdapter(db)
    : prismaAdapter(prismaDb)
  const website = ctx.params.website
  const isAuth = await authenticate(!!queryObject.prisma, website)
  if (!isAuth) {
    return new NextResponse(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: 401,
      }
    )
  }
  const res = await getDashboardData({
    query: {
      ...queryObject,
      websiteId: website,
    },
    options: {
      adapter,
    },
  })

  return new NextResponse(JSON.stringify(res), {
    status: 200,
  })
}

export const getDashboardData = async (req: {
  query: Record<string, string>
  options: LogLibOptions
}) => {
  const query = getInsightSchema.safeParse(req.query)
  if (query.success) {
    try {
      const adapter = req.options.adapter
      const { startDate, endDate, timeZone, websiteId } = query.data
      const startDateObj = new Date(startDate)
      const endDateObj = new Date(endDate)
      const duration = endDateObj.getTime() - startDateObj.getTime()
      const pastEndDateObj = new Date(startDateObj.getTime() - duration)
      let startTime = performance.now()
      let [
        users,
        pastUsers,
        pageViews,
        pastPageViews,
        sessions,
        pastSessions,
        events,
      ] = await Promise.all([
        adapter.getVisitor(startDateObj, endDateObj, websiteId),
        adapter.getVisitor(pastEndDateObj, startDateObj, websiteId),
        adapter.getPageViews(startDateObj, endDateObj, websiteId),
        adapter.getPageViews(pastEndDateObj, startDateObj, websiteId),
        adapter.getSession(startDateObj, endDateObj, websiteId),
        adapter.getSession(pastEndDateObj, startDateObj, websiteId),
        adapter.getEvents(startDateObj, endDateObj, websiteId),
      ])
      let endTime = performance.now()
      console.log(endTime - startTime, "query")
      //add utmCampaigns as a key in session
      sessions = sessions.map((s) => {
        const utmCampaign = s.queryParams?.utm_campaign ?? ""
        const utmSource = s.queryParams?.utm_source ?? ""
        return { ...s, utmCampaign, utmSource }
      })
      startTime = performance.now()
      //filters
      const filters = JSON.parse(query.data.filter) as
        | Filter<Session, "session">[]
        | Filter<PageView, "pageview">[]
      filters.forEach((f) => {
        if (f.data === "session") {
          sessions = filter(sessions)
            .where(f.key, f.operator, f.value)
            .execute()
          pastSessions = filter(pastSessions)
            .where(f.key, f.operator, f.value)
            .execute()
          pageViews = pageViews.filter((p) => {
            const session = sessions.filter((s) => s.id === p.sessionId)
            return session.length > 0
          })
          pastPageViews = pastPageViews.filter((p) => {
            const session = pastSessions.filter((s) => s.id === p.sessionId)
            return session.length > 0
          })
          users = users.filter((u) => {
            const session = sessions.filter((s) => s.visitorId === u.id)
            return session.length > 0
          })
          pastUsers = pastUsers.filter((u) => {
            const session = pastSessions.filter((s) => s.visitorId === u.id)
            return session.length > 0
          })
          events = events.filter((e) => {
            const session = sessions.filter((s) => s.id === e.sessionId)
            return session.length > 0
          })
        } else if (f.data === "pageview") {
          pageViews = filter(pageViews)
            .where(f.key, f.operator, f.value)
            .execute()
          pastPageViews = filter(pastPageViews)
            .where(f.key, f.operator, f.value)
            .execute()
          sessions = sessions.filter((s) => {
            const pageView = pageViews.filter((p) => p.sessionId === s.id)
            return pageView.length > 0
          })
          pastSessions = pastSessions.filter((s) => {
            const pageView = pastPageViews.filter((p) => p.sessionId === s.id)
            return pageView.length > 0
          })
          users = users.filter((u) => {
            const session = sessions.filter((s) => s.visitorId === u.id)
            return session.length > 0
          })
          pastUsers = pastUsers.filter((u) => {
            const session = pastSessions.filter((s) => s.visitorId === u.id)
            return session.length > 0
          })
          events = events.filter((e) => {
            const session = sessions.filter((s) => s.id === e.sessionId)
            return session.length > 0
          })
        }
      })

      //insights data
      const uniqueVisitors = getUniqueVisitors(sessions, pastSessions)
      const newVisitors = getNewVisitors(users, pastUsers)
      const pageView = getPageViews(pageViews, pastPageViews)
      const averageTime = getAverageTime(
        sessions,
        pastSessions,
        pageViews,
        pastPageViews
      )
      const bounceRate = getBounceRate(
        pageViews,
        pastPageViews,
        sessions,
        pastSessions
      )
      const pages = getPages(pageViews)
      const devices = getDevices(sessions)
      const referrer = getReferer(sessions)
      const locations = {
        city: getLoc(sessions, false),
        country: getLoc(sessions),
      }
      const os = getOS(sessions)
      const browser = getBrowser(sessions)
      const uniqueVisitorsByDate = getVisitorsByDate(
        sessions,
        startDateObj,
        endDateObj,
        true,
        timeZone
      )
      const uniqueSessionByDate = getVisitorsByDate(
        sessions,
        startDateObj,
        endDateObj,
        false,
        timeZone
      )
      const onlineUsers = getOnlineVisitors(sessions)
      const eventsWithData = getEvents(events, sessions, pageViews)
      const utmSources = getUtmSources(sessions)
      const utmCampaigns = getUtmCampaigns(sessions)
      endTime = performance.now()
      console.log(endTime - startTime, "Js")

      return {
        message: "success",
        code: 200,
        data: {
          insight: {
            uniqueVisitors,
            pageView,
            averageTime,
            bounceRate,
            newVisitors,
          },
          data: {
            pages,
            devices,
            referrer,
            locations,
            os,
            browser,
            utmCampaigns,
            utmSources,
          },
          graph: {
            uniqueVisitorsByDate,
            uniqueSessionByDate,
          },
          onlineUsers,
          eventsWithData,
        },
      }
    } catch (e) {
      console.error(e)
      throw new GenericError("Error getting insight data", {
        path: "/insights",
      })
    }
  } else {
    console.log(query.error)
  }
}

const authenticate = async (usePrisma: boolean, id: string) => {
  const user = await getCurrentUser()
  if (!user) {
    return false
  }
  if (usePrisma) {
    const website = await db
      .selectFrom("website")
      .where("id", "=", id)
      .selectAll()
      .execute()
    if (!website) {
      const teamWebsite = await db
        .selectFrom("team_website")
        .where("website_id", "=", id)
        .selectAll()
        .executeTakeFirst()
      if (!teamWebsite) return false
      const team = await db
        .selectFrom("team_users")
        .where("user_id", "=", user.id)
        .where("team_id", "=", teamWebsite?.team_id)
        .selectAll()
        .execute()
      if (!team) {
        return false
      }
    }
  } else {
    const website = await prismaDb.website.findFirst({
      where: {
        AND: {
          id,
          userId: user.id,
        },
      },
    })
    if (!website) {
      const teamWebsite = await prismaDb.teamWebsite.findFirst({
        where: {
          AND: {
            websiteId: id,
            Team: {
              TeamUser: {
                some: {
                  userId: user.id,
                },
              },
            },
          },
        },
      })
      if (!teamWebsite) {
        return false
      }
    }
  }
  return true
}
