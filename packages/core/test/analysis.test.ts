import { describe, expect } from "vitest";
import { getAverageTime, getBounceRate, getBrowser, getDevices, getLoc, getOS, getPageViews, getPages, getReferer, getUniqueVisitors } from "../src/router/routes/dashboard/utils";
import { Session, User } from "../src";
import { pageViews, pastPageViews, pastSessions, pastUsers, sessions, users } from "./data/demo";





describe("unique visitors", (it) => {

    it('should return the correct total and change when pastUsers is empty', () => {
        const pastUsers: User[] = [];
        const result = getUniqueVisitors(users, pastUsers);
        expect(result.total).toBe(3);
        expect(result.change).toBe(100);
    });

    it('should return the correct total and change when pastUsers is not empty', () => {
        const result = getUniqueVisitors(users, pastUsers);
        expect(result.total).toBe(3);
        expect(result.change).toBe(50);
    });

    it("should never return above 100% change", () => {
        const result = getUniqueVisitors(users, pastUsers);
        expect(result.change).toBeLessThanOrEqual(100);
    })
})

describe('pageViews', (it) => {

    it('should return the correct total and change when pastPageViews is empty', () => {
        const result = getPageViews(pageViews, []);
        expect(result.total).toBe(3);
        expect(result.change).toBe(100);
    });

    it('should return the correct total and change when pastPageViews is not empty', () => {
        const result = getPageViews(pageViews, pastPageViews);
        expect(result.total).toBe(3);
        expect(result.change).toBe(50);
    });

    it("should never return above 100% change", () => {
        const result = getPageViews(pageViews, []);
        expect(result.change).toBeLessThanOrEqual(100);
    })
});

describe("averageTime", (it) => {

    it('should return the average time in minutes when bySecond is false', () => {
        const result = getAverageTime(sessions, pastSessions, pageViews, pastPageViews);
        expect(result.total).toEqual('7 sec');
    });

    it('should return the average time in seconds when bySecond is true', () => {
        const result = getAverageTime(sessions, pastSessions, pageViews, pastPageViews);
        expect(result.total).toEqual('7 sec');
    });

    it('should return a positive percentage change when the total time has increased', () => {
        const result = getAverageTime(sessions, pastSessions, pageViews, pastPageViews);
        expect(result.change).toBeGreaterThan(0);
    });

    // it('should return a negative percentage change when the total time has decreased', () => {
    //     const result = getAverageTime(pastSessions, sessions, pageViews, pastPageViews);
    //     expect(result.change).toBeLessThan(0);
    // });

    // it('should return a change of 0 when the total time has not changed', () => {
    //     const result = getAverageTime(sessions, sessions, pageViews, pastPageViews);
    //     expect(result.change).toEqual(0);
    // });

    // it('Should never return above 100% change', () => {
    //     const result = getAverageTime(sessions, [], pastPageViews, pageViews);
    //     expect(result.change).toBeLessThanOrEqual(100);
    // })
})


describe('getBounceRate', (it) => {
    it('should return 0% when there are no sessions or page views', () => {
        const result = getBounceRate([], [], [], []);
        expect(result.total).toEqual(0);
    });

    it('should return 0% when there are sessions but no page views', () => {
        const result = getBounceRate([], [], sessions, pastSessions);
        expect(result.total).toEqual(0);
    });

    it('should return 0% when there are page views but no sessions', () => {
        const result = getBounceRate(pageViews, pastPageViews, [], []);
        expect(result.total).toEqual(0);
    });

    it('should return the correct bounce rate when there are both sessions and page views', () => {
        const result = getBounceRate(pageViews, pastPageViews, sessions, pastSessions);
        expect(result.total).toEqual(25);
    });

    it('should return a positive percentage change when the bounce rate has increased', () => {
        const result = getBounceRate(pageViews, pastPageViews, sessions, pastSessions);
        expect(result.change).toBeGreaterThan(0);
    });

    it('should return a negative percentage change when the bounce rate has decreased', () => {
        const result = getBounceRate(pastPageViews, pageViews, pastSessions, sessions);
        expect(result.change).toBeLessThan(0);
    });

    it('should return a change of 0 when the bounce rate has not changed', () => {
        const result = getBounceRate(pageViews, pageViews, sessions, sessions);
        expect(result.change).toEqual(0);
    });

    it("should never return above 100% change", () => {
        const result = getBounceRate(pageViews, [], sessions, []);
        expect(result.change).toBeLessThanOrEqual(100);
    })

})

describe('getPages', (it) => {

    it('should return an empty array when there are no page views', () => {
        const result = getPages([]);
        expect(result).toEqual([]);
    });

    it('should return an array with one element when there is one page view', () => {
        const result = getPages(pageViews);
        expect(result).toEqual([
            { page: '/', visits: 1 },
            { page: '/test', visits: 1 },
            { page: '/test-2', visits: 1 }
        ]);
    });
});

describe('getLoc', (it) => {
    it('should return an empty array when there are no sessions', () => {
        const result = getLoc([]);
        expect(result).toEqual([]);
    });

    it('should group sessions by country by default', () => {
        const result = getLoc(sessions);
        expect(result).toEqual([
            { location: '', visits: 1 },
            { location: 'US', visits: 1 },
            { location: 'ET', visits: 1 },
            { location: 'RU', visits: 1 }
        ]);
    });

    it('should group sessions by city when specified', () => {
        const result = getLoc(sessions, false);
        expect(result).toEqual([
            { location: '', visits: 1 },
            { location: 'New York', visits: 1 },
            { location: 'Addis Ababa', visits: 1 },
            { location: 'Moscow', visits: 1 }
        ]);
    });


    it('should count sessions with null country as "Unknown"', () => {
        const sessionsWithNullCountry = [
            { id: '123', country: 'US' },
            { id: '456', country: null },
            { id: '789', country: 'CA' },
        ] as Session[];
        const result = getLoc(sessionsWithNullCountry);
        expect(result).toEqual([
            { location: 'US', visits: 1 },
            { location: 'Unknown', visits: 1 },
            { location: 'CA', visits: 1 },
        ]);
    });

    it('should count sessions with null city as "Unknown"', () => {
        const sessionsWithNullCity = [
            { id: 'abc', city: 'New York' },
            { id: 'def', city: null },
            { id: 'ghi', city: 'Toronto' },
        ] as Session[];
        const result = getLoc(sessionsWithNullCity, false);
        expect(result).toEqual([
            { location: 'New York', visits: 1 },
            { location: 'Unknown', visits: 1 },
            { location: 'Toronto', visits: 1 },
        ]);
    });
})

describe('getReferer', (it) => {
    it('should return an empty array when there are no sessions', () => {
        const result = getReferer([]);
        expect(result).toEqual([]);
    });

    it('should group sessions by referrer', () => {
        const result = getReferer(sessions);
        expect(result).toEqual([{ referrer: 'Example', visits: 4, referrerDomain: "https://example.com" }]);
    });


    it('should count sessions with empty referrer as "Direct"', () => {
        const sessionsWithEmptyReferrer = [
            { id: '123', referrer: 'https://google.com' },
            { id: '456', referrer: '' },
            { id: '789', referrer: 'https://google.com' },
        ] as Session[];
        const result = getReferer(sessionsWithEmptyReferrer);
        expect(result).toEqual([
            {
                referrer: 'Google', visits: 2, referrerDomain: "https://google.com"
            },
            { referrer: 'Direct', visits: 1, referrerDomain: "" },
        ]);
    });
})


describe('getDevices', (it) => {
    const sessions = [
        { id: '123', device: 'Desktop' },
        { id: '456', device: 'Mobile' },
        { id: '789', device: 'Tablet' },
        { id: 'abc', device: 'Desktop' },
        { id: 'def', device: 'Mobile' },
        { id: 'ghi', device: 'Tablet' },
    ] as Session[];

    it('should return an empty array when there are no sessions', () => {
        const result = getDevices([]);
        expect(result).toEqual([]);
    });

    it('should group sessions by device', () => {
        const result = getDevices(sessions);
        expect(result).toEqual([
            { device: 'Desktop', visits: 2 },
            { device: 'Mobile', visits: 2 },
            { device: 'Tablet', visits: 2 },
        ]);
    });

    it('should count sessions with null device as "unknown"', () => {
        const sessionsWithNullDevice = [
            { id: '123', device: 'Desktop' },
            { id: '456', device: null },
            { id: '789', device: 'Tablet' },
        ] as Session[];
        const result = getDevices(sessionsWithNullDevice);
        expect(result).toEqual([
            { device: 'Desktop', visits: 1 },
            { device: 'unknown', visits: 1 },
            { device: 'Tablet', visits: 1 },
        ]);
    });
});

describe('getOS', (it) => {
    const sessions = [
        { id: '123', os: 'Windows' },
        { id: '456', os: 'MacOS' },
        { id: '789', os: 'Linux' },
        { id: 'abc', os: 'Windows' },
        { id: 'def', os: 'MacOS' },
        { id: 'ghi', os: 'iOS' },
    ] as Session[];

    it('should return an empty array when there are no sessions', () => {
        const result = getOS([]);
        expect(result).toEqual([]);
    });

    it('should group sessions by OS', () => {
        const result = getOS(sessions);
        expect(result).toEqual([
            { os: 'Windows', visits: 2 },
            { os: 'MacOS', visits: 2 },
            { os: 'Linux', visits: 1 },
            { os: 'iOS', visits: 1 },
        ]);
    });

    it('should count sessions with null OS as "unknown"', () => {
        const sessionsWithNullOS = [
            { id: '123', os: 'Windows' },
            { id: '456', os: null },
            { id: '789', os: 'Linux' },
        ] as Session[];
        const result = getOS(sessionsWithNullOS);
        expect(result).toEqual([
            { os: 'Windows', visits: 1 },
            { os: 'unknown', visits: 1 },
            { os: 'Linux', visits: 1 },
        ]);
    });
});

describe('getBrowser', (it) => {
    const sessions = [
        { id: '123', browser: 'Chrome' },
        { id: '456', browser: 'Firefox' },
        { id: '789', browser: 'Safari' },
        { id: 'abc', browser: 'Chrome' },
        { id: 'def', browser: 'Firefox' },
        { id: 'ghi', browser: 'Edge' },
    ] as Session[];

    it('should return an empty array when there are no sessions', () => {
        const result = getBrowser([]);
        expect(result).toEqual([]);
    });

    it('should group sessions by browser', () => {
        const result = getBrowser(sessions);
        expect(result).toEqual([
            { browser: 'Chrome', visits: 2 },
            { browser: 'Firefox', visits: 2 },
            { browser: 'Safari', visits: 1 },
            { browser: 'Edge', visits: 1 },
        ]);
    });

    it('should count sessions with null browser as "unknown"', () => {
        const sessionsWithNullBrowser = [
            { id: '123', browser: 'Chrome' },
            { id: '456', browser: null },
            { id: '789', browser: 'Safari' },
        ] as Session[];
        const result = getBrowser(sessionsWithNullBrowser);
        expect(result).toEqual([
            { browser: 'Chrome', visits: 1 },
            { browser: 'unknown', visits: 1 },
            { browser: 'Safari', visits: 1 },
        ]);
    });
});

