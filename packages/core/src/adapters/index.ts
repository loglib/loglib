import { Events, PageView, Session, User } from './models'


type operator = "in" | "notIn" | "equals" | "gte" | "lte" | "lt" | "gt"

type value = string | string[] | number | number[] | Date | Date[]

type Filter = {
    [key: string]: {
        [key in operator]?: value
    }
}

export interface Adapter {
    createSession: (data: Session) => Promise<Session>,
    createPageView: (data: PageView) => Promise<PageView | null>,
    upsertPageView: (data: PageView) => Promise<PageView | null>,
    createManyEvents: (data: Events[]) => Promise<Events[] | null>,
    upsertUser: (data: Partial<User>, id: string) => Promise<User | null>,
    updateSession: (data: Partial<Session>, id: string) => Promise<Session | null>,
    connect?: () => Promise<any>,
    disconnect?: () => Promise<any>,
    getUser: (startDate: Date, endDate: Date) => Promise<User[]>
    getSession: (startDate: Date, endDate: Date) => Promise<Session[]>
    getEvents: (startDate: Date, endDate: Date) => Promise<Events[]>
    getPageViews: (startDate: Date, endDate: Date, filter?: Filter[]) => Promise<PageView[]>
}

export * from './models'
export * from './utils'
