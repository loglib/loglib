


interface uniqueVisitors {
    total: number,
    growthPercent: number,
}

interface views {
    total: number,
    growthPercent: number,
}
interface averageTime {
    total: number,
    growthPercent: number,
}
interface bounceRate {
    total: number,
    growthPercent: number,
}

interface visitors {
    name: string,
    total: number
}

interface page {
    name: string,
    total: number,
}
interface referrer {
    name: string,
    total: number,
}
interface device {
    name: string,
    total: number,
}

interface location {
    city: {
        name: string,
        total: number
    },
    country: {
        name: string,
        total: number
    },
}

type Visitors = visitors[]
type Pages = page[]
type Referrers = referrer[]
type Devices = device[]
type Locations = location[]



interface data {
    uniqueVisitors: uniqueVisitors,
    views: views,
    averageTime: averageTime,
    bounceRate: bounceRate,
    visitors: Visitors,
    pages: Pages,
    referrers: Referrers,
    devices: Devices,
    locations: Locations,
}