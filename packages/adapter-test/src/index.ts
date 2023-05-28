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

    const pageView: PageView = {
        id: 'page-view-id',
        page: '/test-page',
        sessionId: 'session-id',
        userId: 'user-id',
        createdAt: new Date(),
        updatedAt: new Date(),
        referrer: '',
        duration: 0,
        queryParams: { "utm_source": "google" }
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
        queryParams: 'queryParams',
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
    const eventsWithNewPageId = [
        {
            id: 'event-id-3',
            eventType: 'test-event-2',
            eventName: 'test-name-2',
            pageId: 'new-page-id',
            sessionId: 'session-id',
            userId: 'user-id',
            payload: { foo: 'baz' },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]
    describe("createSession", async () => {
        it("should create a session", async () => {
            const response = await adapter.createSession(session);
            expect(response).toEqual(session);
        })
    })
    describe("updateSession", async () => {
        it("should update a session", async () => {
            const response = await adapter.updateSession({ ...session, duration: 10 }, session.id);
            expect(response).toEqual({ ...session, duration: 10 });
        })
        it("should return null if session doesn't exist", async () => {
            const data = {
                duration: 10
            };
            const response = await adapter.updateSession(data, "invalid-id");
            expect(response).toBeNull()
        })
    })

    describe("createPageView", async () => {
        it("should create a page view", async () => {

            const response = await adapter.createPageView(pageView);
            expect(response).toEqual(pageView);
        })
        it("should return null if session doesn't exist", async () => {
            const response = await adapter.createPageView({ ...pageView, sessionId: 'invalid-id' });
            expect(response).toBeNull()
        });
    })
    describe("createManyEvents", async () => {
        it("should create events and pages", async () => {
            const response = await adapter.createManyEvents(events);
            expect(response).toEqual(events);
        })
        it("should still create events and pages when pages doesn't exist", () => {
            const response = adapter.createManyEvents(eventsWithNewPageId);
            expect(response).resolves.toEqual(eventsWithNewPageId);
        })
    })
    describe("upsertUser", async () => {
        it('should update a user and return it', async () => {
            const data = {
                id: 'user-id',
                data: {
                    foo: "bar"
                }
            };
            const response = await adapter.upsertUser(data, data.id);
            expect(response).toEqual({ id: data.id, data: data.data, createdAt: response?.createdAt, updatedAt: response?.updatedAt });
        });
    })

    describe("getEvents", async () => {
        it("should return events in time a frame", async () => {
            //yesterday
            const startDate = new Date(new Date().setDate(new Date().getDate() - 2));
            const endDate = new Date();
            const response = await adapter.getEvents(startDate, endDate);
            expect(response).toEqual(events.concat(eventsWithNewPageId));
        })
    })

    describe("getSessions", async () => {
        it("should return sessions in time a frame", async () => {
            const lastDay = new Date(Date.now() - (25 * 60 * 60 * 1000));
            const endDate = new Date();
            const response = await adapter.getSession(lastDay, endDate);
            expect(response.length).toEqual(1);
        })
    })

    describe("getUsers", async () => {
        it("should return users in time a frame", async () => {
            const lastDay = new Date(Date.now() - (25 * 60 * 60 * 1000));
            const endDate = new Date();
            const response = await adapter.getUser(lastDay, endDate);
            expect(response.length).toBe(1)
        })
    })

    describe("getPages", async () => {
        it("should return pages in time a frame", async () => {
            const lastDay = new Date(Date.now() - (25 * 60 * 60 * 1000));
            const endDate = new Date();
            const response = await adapter.getPageViews(lastDay, endDate);
            expect(response.length).toBe(2)
        })
    })
}

