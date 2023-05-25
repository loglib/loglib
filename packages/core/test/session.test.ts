import { Mock, describe, expect, it, vi } from "vitest";
import { sessionPost, SessionPostInput } from "../src/router/routes/session/post";
import { Adapter, LogLibOptions } from "../src";
import { getIpAddress } from "../src/router/routes/utils/detect/getIpAddress";

vi.mock("../src/router/routes/utils/detect/getIpAddress")

describe('sessionPost', () => {
    const mockAdapter = {
        createSession: vi.fn().mockResolvedValue({ message: 'Success', code: 200 }),
    } as unknown as Adapter
    const mockOptions: LogLibOptions = {
        adapter: mockAdapter,
        getLocation: vi.fn().mockResolvedValue({ city: 'Test City', country: 'Test Country' }),
    };
    const mockRequest = (body: SessionPostInput) => ({
        headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' },
        body,
        method: "POST"
    });

    const validRequest = {
        sessionId: 'test-session-id',
        userId: 'test-user-id',
        pageId: 'test-page-id',
        data: {
            pathname: '/test',
            referrer: 'https://example.com',
            screenWidth: 1920,
            language: 'en-US',
            queryParams: { utm_source: 'test-source' },
            firstTimeUser: true,
            host: 'example.com',
        },
    }

    it('should return an error if the request body is invalid', async () => {
        const req = mockRequest({ invalid: true } as unknown as SessionPostInput);
        await expect(sessionPost(req, mockOptions)).rejects.toThrowError()
    });

    it('should return a success message if the request is valid', async () => {
        const req = mockRequest(validRequest);
        const res = await sessionPost(req, mockOptions);
        expect(res).toEqual({
            message: 'success',
            code: 200,
            data: { message: 'Success', code: 200 },
        });
    });
    it('should return a bot message if the user agent is a bot', async () => {
        const req = { headers: { 'user-agent': 'Googlebot' }, body: validRequest, method: '' };
        const res = await sessionPost(req, mockOptions);
        expect(res).toEqual({ message: 'bot', code: 200 });
    });

    it('should throw error if there is no way to get location', async () => {
        const req = mockRequest(validRequest);
        const mockGetLocation = vi.fn().mockResolvedValue(null);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        expect(sessionPost(req, { ...mockOptions, getLocation: mockGetLocation })).rejects.toThrowError();
    });

    it('should pass on custom location getter implementation', async () => {
        const req = mockRequest(validRequest);
        const mockGetLocation = vi.fn().mockResolvedValue({ city: 'Test City', country: 'Test Country' });
        await sessionPost(req, { ...mockOptions, getLocation: mockGetLocation })
        expect(mockGetLocation).toHaveBeenCalled();
    });

    it('should return a localhost message if the IP address is localhost', async () => {
        //mock get ip location
        (getIpAddress as Mock).mockReturnValue('127.0.0.1');
        const req = mockRequest(validRequest);
        const res = await sessionPost(req, mockOptions);
        expect(res).toEqual({ message: 'localhost', code: 200 });
    });

})