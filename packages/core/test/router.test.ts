/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, expect, it, vi } from "vitest";
import { Adapter } from "../src/adapters";
import { internalRouter } from "../src/router";
import { ApiRequest, LogLibOptions } from "../src/types";


describe('internalRouter', () => {
    const mockRequest = (method: any, path: any, body: any, headers: any) => ({
        method,
        body: { ...body, path },
        headers: headers
    });

    const mockOptions: LogLibOptions = {
        adapter: vi.fn() as unknown as Adapter
    };

    type ValidRequest = ApiRequest<{ path: string }, any>
    it('should return an error if the request body is not an object', async () => {
        const req = mockRequest('POST', '/test', 'invalid', {}) as unknown as ValidRequest
        req.body = JSON.stringify(req.body) as unknown as { path: '/' }
        const res = await internalRouter(req, mockOptions);
        expect(res).toEqual({ message: 'Invalid request body. Expected an object.', code: 400 });
    });
    it('should return an error if the request method is not a string', async () => {
        const req = mockRequest(null, '/test', { key: 'value' }, {}) as unknown as ValidRequest
        const res = await internalRouter(req, mockOptions);
        expect(res).toEqual({ message: 'Invalid request method. Expected a string.', code: 400 });
    });
    it('should return an error if the path is not specified', async () => {
        const req = mockRequest('POST', null, {}, {}) as unknown as ValidRequest;
        const res = await internalRouter(req, mockOptions);
        expect(res).toEqual({ message: 'Path not specified', code: 400 });
    });
    it('should return an error if the path does not exist', async () => {
        const req = mockRequest('POST', '/invalid', {}, {}) as unknown as ValidRequest;
        const res = await internalRouter(req, mockOptions);
        expect(res).toEqual({ message: "Path doesn't exist", code: 400 });
    });
    it('should return an error if the handler does not implement the method', async () => {
        const req = mockRequest('PUT', '/test', {}, {}) as unknown as ValidRequest;
        const res = await internalRouter(req, mockOptions);
        expect(res).toEqual({ message: "Handler doesn't implement this method!", code: 400 });
    });
    it('should call the handler and return its result if the request is valid', async () => {
        const req = mockRequest('POST', '/test', {}, {});
        const res = await internalRouter(req, mockOptions);
        expect(res).toEqual({ message: 'test', code: 200 });
    });
})


