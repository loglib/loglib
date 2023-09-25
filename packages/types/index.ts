import { Website } from "./models";

export type GetInsightResponse = {
  insight: {
    uniqueVisitors: {
      current: number;
      change: number;
    };
    totalPageViews: {
      current: number;
      change: number;
    };
    averageTime: {
      current: string;
      change: number;
    };
    bounceRate: {
      current: number;
      change: number;
    };
    newVisitors: {
      current: number;
      change: number;
    };
    returningVisitor: {
      current: number;
      change: number;
    };
  };
  data: {
    pages: {
      page: string;
      visits: number;
    }[];
    devices: {
      device: string;
      visits: number;
    }[];
    referrer: {
      referrer: string;
      visits: number;
      referrerDomain: string;
    }[];
    locations: {
      city: {
        location: string;
        visits: number;
        country: string;
      }[];
      country: {
        location: string;
        visits: number;
      }[];
    };
    os: {
      os: string;
      visits: number;
    }[];
    browser: {
      browser: string;
      visits: number;
    }[];
    utmSources: {
      utmSource: string;
      visits: number;
    }[];
    utmCampaigns: {
      utmCampaign: string;
      visits: number;
    }[];
    onlineVisitors: number;
  };
  graph: {
    uniqueVisitorsByDate: {
      date: string;
      visits: number;
    }[];
    uniqueSessionByDate: {
      date: string;
      visits: number;
    }[];
  };
};

export type LoglibEvent = {
  id: string;
  timestamp: string;
  event: "hits" | string;
  sessionId: string;
  city: string;
  country: string;
  browser: string;
  language: string;
  currentPath: string;
  referrerPath: string;
  referrerDomain: string;
  queryParams: string;
  device: string;
  duration: number;
  os: string;
  visitorId: string;
  websiteId: string;
  payload?: string;
  type?: string;
};

export type LoglibCustomEvent = {
  currentPath: string | undefined;
  id: string;
  timestamp: string;
  queryParams?: Record<string, any> | null | undefined;
  referrerPath?: string | undefined;
  referrerDomain?: string;
  duration?: number | undefined;
  country?: string | null | undefined;
  city?: string | null | undefined;
  language?: string | null | undefined;
  device?: string | null | undefined;
  os?: string | null | undefined;
  browser?: string | null | undefined;
  visitorId: string;
  websiteId?: string | null | undefined;
  event: string;
  type: string;
  payload: Record<string, string> | null;
  sessionId: string;
};

type StringOperator = "is" | "isNot" | "contains" | "notContains";
type NumberOperator = "lte" | "gte" | "lt" | "gt" | "is" | "isNot";
type DateOperator = "lte" | "gte" | "lt" | "gt" | "is" | "isNot";
type ArrayOperator = "contains" | "notContains";

export type OperatorType<T> = T extends string
  ? StringOperator
  : T extends number
  ? NumberOperator
  : T extends Date
  ? DateOperator
  : T extends Array<any>
  ? ArrayOperator
  : never;

export type FullWebsite = Website & { visitors: number; plan: string };

type Vitals = {
  TTFB: number;
  FCP: number;
  LCP: number;
  CLS: number;
};

export type GetVitalsResponse = {
  cls: number | null;
  lcp: number | null;
  fid: number | null;
  inp: number | null;
  fcp: number | null;
  dataByDate: {
    TTFB: {
      date: string;
      value: number;
      originalDate: string;
    }[];
    FCP: {
      date: string;
      value: number;
      originalDate: string;
    }[];
    LCP: {
      date: string;
      value: number;
      originalDate: string;
    }[];
    CLS: {
      date: string;
      value: number;
      originalDate: string;
    }[];
  };
  data: {
    pages: {
      page: string;
      data: Vitals;
    }[];
    devices: {
      device: string;
      data: Vitals;
    }[];
    location: {
      byCity: {
        location: string;
        country: string;
        data: Vitals;
      };
      byCountry: {
        location: string;
        country: string;
        data: Vitals;
      };
    }[];
    browsers: {
      browser: string;
      data: Vitals;
    }[];
    os: {
      os: string;
      data: Vitals;
    }[];
  };
};
