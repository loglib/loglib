import { Events, PageView, Session, User, Website } from './models'



export interface Adapter {
    createWebsite?: (data: Website) => Promise<Website>,
    createSession: (data: Session) => Promise<Session>,
    createPageView: (data: PageView) => Promise<PageView | null>,
    updatePageView: (data: Partial<PageView>) => Promise<PageView | null>,
    createManyEvents: (data: Events[]) => Promise<Events[] | null>,
    upsertUser: (data: Partial<User>, id: string) => Promise<User | null>,
    updateSession: (data: Partial<Session>, id: string) => Promise<Session | null>,
    connect?: () => Promise<any>,
    disconnect?: () => Promise<any>,
    getUser: (startDate: Date, endDate: Date, websiteId?: string) => Promise<User[]>
    getSession: (startDate: Date, endDate: Date, websiteId?: string) => Promise<Session[]>
    getEvents: (startDate: Date, endDate: Date, websiteId?: string) => Promise<Events[]>
    getPageViews: (startDate: Date, endDate: Date, websiteId?: string) => Promise<PageView[]>,
    getWebsite?: (id: string) => Promise<Website | null>,
}

export * from './models'
export * from './utils'
