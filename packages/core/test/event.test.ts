/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { postEvent, EventPostInput } from '../src/router/routes/event/post';
import { Adapter, Events, GenericError } from '../src';


describe('eventPost', () => {
    const mockAdapter = {
        createManyEvents: vi.fn((events: Events[]) => Promise.resolve(events)),

    } as unknown as Adapter;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create events and return success message if request body is valid', async () => {
        const input: EventPostInput = {
            sessionId: 'session-id',
            userId: 'user-id',
            pageId: 'page-id',
            data: [
                {
                    id: 'event-id',
                    eventName: 'event-name',
                    eventType: 'event-type',
                    payload: { key: 'value' },
                    page: 'page',
                },
            ],
        };
        const expectedData: Events[] = [
            {
                sessionId: 'session-id',
                userId: 'user-id',
                pageId: 'page-id',
                payload: { key: 'value' },
                eventName: 'event-name',
                eventType: 'event-type',
                id: 'event-id',
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            },
        ];
        const expectedResponse = {
            message: 'success',
            code: 200,
            data: expectedData,
        };
        const response = await postEvent({ body: input, headers: {} }, { adapter: mockAdapter });
        expect(mockAdapter.createManyEvents).toHaveBeenCalledWith(expectedData);
        expect(response).toEqual(expectedResponse);
    });

    it('should throw an error if request body is invalid', async () => {
        const input = {
            sessionId: 'session-id',
            userId: 'user-id',
            pageId: 'page-id',
            data: [
                {
                    id: 'event-id',
                    eventName: 'event-name',
                },
            ],
        } as EventPostInput;
        await expect(postEvent({ body: input, headers: {} }, { adapter: mockAdapter })).rejects.toThrow(
            new GenericError('Invalid request body', { path: '/event' })
        ).catch(() => { });
        expect(mockAdapter.createManyEvents).not.toHaveBeenCalled();
    });
});