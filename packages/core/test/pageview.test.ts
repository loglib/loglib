import { beforeEach, describe, expect, it, vi } from "vitest";
import { PageViewPostInput, pageViewPost } from "../src/router/routes/pageview/post";
import { Adapter } from "../src";


describe('pageViewPost', () => {
    const mockAdapter = {
        tracker: {
            createPageView: vi.fn(),
        },
    } as unknown as Adapter;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create a page view and return success message if request body is valid', async () => {
        const input: PageViewPostInput = {
            sessionId: 'session-id',
            userId: 'user-id',
            pageId: 'page-id',
            data: {
                currentUrl: 'https://example.com',
                currentRef: 'https://referrer.com',
                duration: 1000,
                queryParams: { key: 'value' },
            },
        };
        const expectedResponse = {
            message: 'success',
            code: 200,
        };
        const response = await pageViewPost({ body: input, headers: {} }, { adapter: mockAdapter });
        expect(response).toEqual(expectedResponse);
    });
});