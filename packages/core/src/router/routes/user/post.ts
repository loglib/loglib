import z from "zod";
import { GenericError } from "../../../error";
import { ApiPostHandler } from "../../type";
import { RootApiTrackerSchema } from "../../schema";
import { getIpAddress } from "../session/detect/getIpAddress";
import { User } from "../../..";




const userInput = z.object({
    data: z.record(z.any()),
    id: z.string()
})
const userInputSchema = RootApiTrackerSchema.merge(z.object({ data: userInput }))
export type UserPostInput = z.infer<typeof userInputSchema>

export const userPost: ApiPostHandler<UserPostInput, User | null> = async (req, options) => {
    if (!req.body.userId) {
        req.body.userId = getIpAddress(req) as string
    }
    const body = userInputSchema.safeParse(req.body)
    const adapter = options.adapter
    if (body.success) {
        try {
            const { data, websiteId } = body.data
            const res = await adapter.upsertUser({ ...data, websiteId }, body.data.userId)

            return {
                message: 'User updated',
                code: 200,
                data: res
            }
        } catch {
            throw new GenericError('Error updating user', { path: "/user" })
        }
    }
    throw new GenericError('Invalid request body', { path: "/user" })
}