/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { prismaAdapter } from '../src';
import { PrismaClient } from '../src/generated/client';
import { describe } from 'vitest';
import { runAdapterTest } from '@loglib/adapter-test';

describe('prismaAdapter', async () => {
    const db = new PrismaClient()
    await runAdapterTest({
        beforeAll: async () => {
            await db.webSession.deleteMany()
            await db.webEvent.deleteMany()
            await db.webPageview.deleteMany()
            await db.webUser.deleteMany()
        },
        adapter: prismaAdapter(db)
    })
});