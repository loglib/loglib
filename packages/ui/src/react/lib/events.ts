import { Events, PageView, Session } from "@loglib/core";


export type EventsWithData = ReturnType<typeof getEvents>
const getEvents = (events: Events[], sessions: Session[], pages: PageView[]) => {
    const eventWithSession = events.map(event => {
        const session = sessions.find(session => session.id === event.sessionId)
        const page = pages.find(page => page.id === event.pageId)
        return {
            ...event,
            ...session,
            page
        }
    })
    return eventWithSession.filter(event => event.eventName)
}


export { getEvents }
