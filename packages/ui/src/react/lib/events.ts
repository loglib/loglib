import { Events, Session } from "@loglib/core";


export type EventsWithSession = ReturnType<typeof getEvents>
const getEvents = (events: Events[], sessions: Session[]) => {
    const eventWithSession = events.map(event => {
        const session = sessions.find(session => session.id === event.sessionId)
        return {
            ...event,
            ...session
        }
    })
    return eventWithSession
}


export { getEvents }
