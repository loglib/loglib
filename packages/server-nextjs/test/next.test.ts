import { NextApiRequest, NextApiResponse } from 'next'
import { createServer, createServerRoutes } from '../src'
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { Adapter, LogLibOptions, internalRouter } from '@loglib/core'

vi.mock("@loglib/core")

describe('LogLib', () => {
    const options: LogLibOptions = {
        adapter: {} as unknown as Adapter
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return a function and object', () => {
        const middleware = createServer(options)
        const middleware2 = createServerRoutes(options)
        expect(typeof middleware).toBe('function')
        expect(typeof middleware2).toBe('object')
    })

    it('should call internalRouter with the parsed request and options', async () => {
        const middleware = createServer(options)
        const req = { method: 'POST', body: '{"foo": "bar"}', headers: {}, cookies: {} } as NextApiRequest
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as NextApiResponse
        (internalRouter as Mock).mockResolvedValue({ code: 200, message: 'OK' })
        await middleware(req, res)
        expect(internalRouter).toHaveBeenCalledWith({ ...req, body: { foo: "bar" } }, options)
    })
})