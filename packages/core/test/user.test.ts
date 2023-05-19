import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserPostInput, userPost } from "../src/router/routes/user/post";
import { Adapter } from "../src";


describe('userPost', () => {
    const mockAdapter = {
        tracker: {
            updateUser: vi.fn(),
        },
    } as unknown as Adapter;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should update a user and return success message if request body is valid', async () => {
        const input: UserPostInput = {
            pageId: '',
            sessionId: '',
            userId: 'user-id',
            data: {
                id: 'user-id',
                data: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                }
            }
        };
        const expectedResponse = {
            message: 'User updated',
            code: 200,
        };
        const response = await userPost({ body: input, headers: {} }, { adapter: mockAdapter });
        expect(response).toEqual(expectedResponse);
    });
});