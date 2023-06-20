/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Adapter, Events, PageView, Session } from "@loglib/core";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";


//TODO: //should build a way to skip tests

export interface TestOptions {
    adapter: Adapter
    skipTests?: string[]
    beforeAll?: () => Promise<any>,
    afterAll?: () => Promise<any>,
    beforeEach?: () => Promise<any>,
    afterEach?: () => Promise<any>,
}

/**
 * A wrapper to run the basic adapter tests.
 * Run this at the top of your test file.
 */
export async function runAdapterTest(options: TestOptions) {
    const { adapter } = options

    beforeAll(async () => {
        await adapter.connect?.()
        await options.beforeAll?.()
    });

    afterAll(async () => {
        await adapter.disconnect?.()
        await options.afterAll?.()
    });

    beforeEach(async () => {
        await options.beforeEach?.()
    });

    afterEach(async () => {
        await options.afterEach?.()
    })


    const userData = {
        id: 'user-id',
        data: {
            name: 'test-user',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const pageView: PageView = {
        id: 'page-view-id',
        page: '/test-page',
        sessionId: 'session-id',
        userId: userData.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        referrer: '',
        duration: 0,
        queryParams: { utm_source: 'google' },
    };
    const session: Session = {
        id: 'session-id',
        userId: 'user-id',
        browser: 'browser',
        device: 'device',
        os: 'os',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        updatedAt: new Date(),
        city: 'city',
        country: 'country',
        duration: 0,
        language: 'language',
        queryParams: { utm_source: 'google' },
        referrer: 'referrer',
    }
    const events: Events[] = [
        {
            id: 'event-id-1',
            eventType: 'test-event-1',
            eventName: 'test-name-1',
            pageId: 'page-view-id',
            sessionId: 'session-id',
            userId: 'user-id',
            payload: { foo: 'bar' },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'event-id-2',
            eventType: 'test-event-2',
            eventName: 'test-name-2',
            pageId: 'page-view-id',
            sessionId: 'session-id',
            userId: 'user-id',
            payload: { foo: 'baz' },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]
    describe("upsertUser", async () => {

        it('should update or create user and return it', async () => {
            const response = await adapter.upsertUser(userData, userData.id);
            expect(response).toEqual({ ...userData, createdAt: response?.createdAt, updatedAt: response?.updatedAt });
        });
    })

    describe("createSession", async () => {

        it("should create a session", async () => {
            const response = await adapter.createSession(session);
            expect(response).toEqual({ ...session, createdAt: response?.createdAt, updatedAt: response?.updatedAt });
        })
    })

    describe("updateSession", async () => {

        it("should update a session", async () => {
            const response = await adapter.updateSession({ ...session, duration: 10 }, session.id);
            expect(response).toEqual({ ...session, duration: 10, createdAt: response?.createdAt, updatedAt: response?.updatedAt });
        })
    })

    describe("createPageView", async () => {

        it("should create a page view", async () => {
            const response = await adapter.createPageView(pageView);
            expect(response).toEqual({ ...pageView, createdAt: response?.createdAt, updatedAt: response?.updatedAt });
        })
    })

    describe("createManyEvents", async () => {

        it("should create events and pages", async () => {
            const response = await adapter.createManyEvents(events);
            expect(response?.length).toEqual(2);
        })
    })

    describe("getEvents", async () => {

        it("should return events in time a frame", async () => {
            //yesterday
            const startDate = new Date(new Date().setDate(new Date().getDate() - 2));
            const endDate = new Date();
            const response = await adapter.getEvents(startDate, endDate);
            expect(response.length).toBeGreaterThanOrEqual(2);
        })
    })

    describe("getSessions", async () => {

        it("should return sessions in time a frame", async () => {
            const lastDay = new Date(Date.now() - (25 * 60 * 60 * 1000));
            const endDate = new Date();
            const response = await adapter.getSession(lastDay, endDate);
            expect(response.length).toBeGreaterThanOrEqual(1);
        })
    })

    describe("getUsers", async () => {

        it("should return users in time a frame", async () => {
            const lastDay = new Date(Date.now() - (25 * 60 * 60 * 1000));
            const endDate = new Date();
            const response = await adapter.getUser(lastDay, endDate);
            expect(response.length).toBeGreaterThanOrEqual(1)
        })
    })

    describe("getPageview", async () => {

        it("should return pages in time a frame", async () => {
            const lastDay = new Date(Date.now() - (25 * 60 * 60 * 1000));
            const endDate = new Date();
            const response = await adapter.getPageViews(lastDay, endDate);
            expect(response.length).toBeGreaterThanOrEqual(1)
        })
    }, {
        timeout: 10000
    })

    describe("upsert pageview", async () => {
        it("should u create a page view", async () => {
            const newPageView = { ...pageView, id: "new-page-view-id" }
            const response = await adapter.createPageView(newPageView);
            expect(response).toEqual({ ...newPageView, createdAt: response?.createdAt, updatedAt: response?.updatedAt });
        })
        it("should update page view", async () => {
            const newPageView = { ...pageView, page: "/new-page" }
            const response = await adapter.updatePageView(newPageView);
            expect(response).toEqual({ ...newPageView, createdAt: response?.createdAt, updatedAt: response?.updatedAt });
        })
    })

}

