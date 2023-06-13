import { describe, expect, it, vi } from "vitest";
import { Adapter, LogLibOptions, Session, internalRouter } from "../src";




describe("middleware", () => {
    const mockAdapter = {
        createSession: vi.fn((data: Session) => data),
        createPageView: vi.fn(),
        upsertUser: vi.fn(),
    } as unknown as Adapter
    const mockRequest = (body: Record<string, any>, method?: string, query?: Record<string, string>) => ({
        headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' },
        body,
        query,
        method: method ?? "POST"
    });
    const mockOptions: LogLibOptions = {
        adapter: mockAdapter,
        getLocation: vi.fn().mockResolvedValue({ city: 'Test City', country: 'Test Country' }),
    };
    it("should return localhost is disallowed if it is local host", async () => {
        const res = await internalRouter(mockRequest({ key: "value", path: "/session" }), mockOptions)
        expect(res).toStrictEqual({
            message: 'Localhost is detected and not allowed. Pass environment=test to allow localhost.',
            code: 200
        })
    })
    it("should pass if environment test is provided even in localhost", async () => {
        await expect(internalRouter(mockRequest({ key: "value", path: "/session" }), { ...mockOptions, environment: "test" })).rejects.toThrowError()
    })
    it("should return unauthorized if auth is enabled", async () => {
        const res = await internalRouter(mockRequest({}, "GET", { path: "/dashboard" }), { ...mockOptions, auth: { secret: "123test" } })
        expect(res).toStrictEqual({
            message: 'Unauthorized',
            code: 401
        })
    })
})