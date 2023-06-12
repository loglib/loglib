import { PageView, Session, User } from "../../src";

export const sessions: Session[] = [
    {
        id: '1',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        updatedAt: new Date('2022-01-01T00:01:00Z'),
        queryParams: { foo: 'bar' },
        referrer: 'https://example.com',
        duration: 120,
        country: '',
        city: '',
        language: 'en-US',
        device: 'iPhone',
        os: 'iOS',
        browser: 'Safari',
        userId: '456',
    },
    {
        id: '2',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        updatedAt: new Date('2022-01-01T00:01:00Z'),
        queryParams: { foo: 'bar' },
        referrer: 'https://example.com',
        duration: 180,
        country: 'US',
        city: 'New York',
        language: 'en-US',
        device: 'iPhone',
        os: 'iOS',
        browser: 'Safari',
        userId: '456',
    },
    {
        id: '3',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        updatedAt: new Date('2022-01-01T00:01:00Z'),
        queryParams: { foo: 'bar' },
        referrer: 'https://example.com',
        duration: 90,
        country: 'ET',
        city: 'Addis Ababa',
        language: 'en-US',
        device: 'iPhone',
        os: 'iOS',
        browser: 'Safari',
        userId: '456',
    },
    {
        id: '4',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        updatedAt: new Date('2022-01-01T00:01:00Z'),
        queryParams: { foo: 'bar' },
        referrer: 'https://example.com',
        duration: 240,
        country: 'RU',
        city: 'Moscow',
        language: 'en-US',
        device: 'iPhone',
        os: 'iOS',
        browser: 'Safari',
        userId: '456',
    }
];
export const pastSessions: Session[] = [
    {
        id: '6',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        updatedAt: new Date('2022-01-01T00:01:00Z'),
        queryParams: { foo: 'bar' },
        referrer: 'https://example.com',
        duration: 120,
        country: 'US',
        city: 'New York',
        language: 'en-US',
        device: 'iPhone',
        os: 'iOS',
        browser: 'Safari',
        userId: '456',
    },
    {
        id: '8',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        updatedAt: new Date('2022-01-01T00:01:00Z'),
        queryParams: { foo: 'bar' },
        referrer: 'https://example.com',
        duration: 120,
        country: 'US',
        city: 'New York',
        language: 'en-US',
        device: 'iPhone',
        os: 'iOS',
        browser: 'Safari',
        userId: '456',
    },
    {
        id: '7',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        updatedAt: new Date('2022-01-01T00:01:00Z'),
        queryParams: { foo: 'bar' },
        referrer: 'https://example.com',
        duration: 120,
        country: 'ET',
        city: 'Addis Ababa',
        language: 'en-US',
        device: 'iPhone',
        os: 'iOS',
        browser: 'Safari',
        userId: '456',
    },
    {
        id: '02',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        updatedAt: new Date('2022-01-01T00:01:00Z'),
        queryParams: { foo: 'bar' },
        referrer: 'https://example.com',
        duration: 120,
        country: '',
        city: 'New York',
        language: 'en-US',
        device: 'iPhone',
        os: 'iOS',
        browser: 'Safari',
        userId: '456',
    },
    {
        id: '134',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        updatedAt: new Date('2022-01-01T00:01:00Z'),
        queryParams: { foo: 'bar' },
        referrer: 'https://example.com',
        duration: 120,
        country: 'CA',
        city: 'New York',
        language: 'en-US',
        device: 'iPhone',
        os: 'iOS',
        browser: 'Safari',
        userId: '456',
    },
];

export const pageViews: PageView[] = [{
    id: "1", createdAt: new Date(), updatedAt: new Date(), userId: "1", sessionId: "1", page: "/", referrer: "/about", queryParams: {
        key: "value"
    }, duration: 10
}, {
    id: "2", createdAt: new Date(), updatedAt: new Date(), userId: "1", sessionId: "1", page: "/test", referrer: "/about", queryParams: {
        key: "value"
    }, duration: 10
}, {
    id: "3", createdAt: new Date(), updatedAt: new Date(), userId: "1", sessionId: "2", page: "/test-2", referrer: "/about", queryParams: {
        key: "value"
    }, duration: 10
}];

export const pastPageViews: PageView[] = [{
    id: "1", createdAt: new Date(), updatedAt: new Date(), userId: "1", sessionId: "134", page: "/", referrer: "/about", queryParams: {
        key: "value"
    }, duration: 10
}, {
    id: "2", createdAt: new Date(), updatedAt: new Date(), userId: "1", sessionId: "134", page: "/test", referrer: "/about", queryParams: {
        key: "value"
    }, duration: 10
}] as PageView[];


export const users: User[] = [{ id: "1", createdAt: new Date(), updatedAt: new Date(), data: {} }, { id: "2", createdAt: new Date(), updatedAt: new Date(), data: {} }, { id: "3", createdAt: new Date(), updatedAt: new Date(), data: {} }];

export const pastUsers: User[] = [{ id: "1", createdAt: new Date(), updatedAt: new Date(), data: {} }, { id: "2", createdAt: new Date(), updatedAt: new Date(), data: {} }];