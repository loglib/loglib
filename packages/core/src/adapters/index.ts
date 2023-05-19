import { Events, PageView, Session, User } from './models'

export interface TrackerAdapter {
    createSession: (data: Session) => Promise<Session>,
    createPageView: (data: PageView) => Promise<PageView | null>,
    createManyEvents: (data: Events[]) => Promise<Events[] | null>,
    updateUser: (data: Partial<User>, id: string) => Promise<User | null>,
    updateSession: (data: Partial<Session>, id: string) => Promise<Session | null>,
}

export interface Adapter {
    tracker: TrackerAdapter,
    connect?: () => Promise<any>,
    disconnect?: () => Promise<any>,
}

export * from './models'