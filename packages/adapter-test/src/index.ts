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
        createdAt: new Date(),
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
    describe("createSession", async () => {
        it("should create a session", async () => {
            const response = await adapter.tracker.createSession(session);
            expect(response).toEqual(session);
        })
    })
    describe("updateSession", async () => {
        it("should update a session", async () => {
            const response = await adapter.tracker.updateSession({ ...session, duration: 10 }, session.id);
            expect(response).toEqual({ ...session, duration: 10 });
        })
        it("should return null if session doesn't exist", async () => {
            const data = {
                duration: 10
            };
            const response = await adapter.tracker.updateSession(data, "invalid-id");
            expect(response).toBeNull()
        })
    })

    describe("createPageView", async () => {
        it("should create a page view", async () => {

            const response = await adapter.tracker.createPageView(pageView);
            expect(response).toEqual(pageView);
        })
        it("should return null if session doesn't exist", async () => {
            const response = await adapter.tracker.createPageView({ ...pageView, sessionId: 'invalid-id' });
            expect(response).toBeNull()
        });
    })
    describe("createManyEvents", async () => {
        it("should create events and pages", async () => {
            const response = await adapter.tracker.createManyEvents(events);
            expect(response).toEqual(events);
        })
        it("should still create events and pages when pages doesn't exist", () => {
            const new_events = [
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
            const response = adapter.tracker.createManyEvents(new_events);
            expect(response).resolves.toEqual(new_events);
        })
    })
    describe("updateUser", async () => {
        it('should update a user and return it', async () => {
            const data = {
                id: 'user-id',
                data: {
                    foo: "bar"
                }
            };
            const response = await adapter.tracker.updateUser(data, data.id);
            expect(response).toEqual({ id: data.id, data: data.data, createdAt: response?.createdAt, updatedAt: response?.updatedAt });
        });
    })
}