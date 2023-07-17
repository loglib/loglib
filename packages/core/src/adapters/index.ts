import { Events, PageView, Session, Visitor, Website } from "./models";

export interface Adapter {
  createWebsite?: (data: Website) => Promise<Website>;
  createSession: (data: Session) => Promise<Session>;
  createPageView: (data: PageView) => Promise<PageView | null>;
  updatePageView: (data: Partial<PageView>) => Promise<PageView | null>;
  createManyEvents: (data: Events[]) => Promise<Events[] | null>;
  upsertVisitor: (
    data: Partial<Visitor>,
    id: string,
  ) => Promise<Visitor | null>;
  updateSession: (
    data: Partial<Session>,
    id: string,
  ) => Promise<Session | null>;
  connect?: () => Promise<any>;
  disconnect?: () => Promise<any>;
  getVisitor: (
    startDate: Date,
    endDate: Date,
    websiteId?: string,
  ) => Promise<Visitor[]>;
  getData?: (
    startDate: Date,
    endDate: Date,
    websiteId?: string,
  ) => Promise<
    {
      data: Record<string, string>;
      id: string;
      createdAt: Date;
      updatedAt: Date;
      websiteId: string;
      WebEvent: Events[];
      Session: Session[];
      Pageview: PageView[];
    }[]
  >;
  getSession: (
    startDate: Date,
    endDate: Date,
    websiteId?: string,
  ) => Promise<Session[]>;
  getEvents: (
    startDate: Date,
    endDate: Date,
    websiteId?: string,
  ) => Promise<Events[]>;
  getPageViews: (
    startDate: Date,
    endDate: Date,
    websiteId?: string,
  ) => Promise<PageView[]>;
  getWebsite?: (id: string) => Promise<Website | null>;
}

export * from "./models";
export * from "./utils";
