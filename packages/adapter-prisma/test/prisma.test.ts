import { prismaAdapter } from '../src';
import { PrismaClient } from '@prisma/client';
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