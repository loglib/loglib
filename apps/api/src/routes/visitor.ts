import { z } from "zod";
import { publishVisitor } from "../lib/tinybird";
import { RouteType } from "./type";
import { apiResponse } from "../lib/api-response";

const visitorInput = z.object({
    data: z.record(z.any()),
    id: z.string(),
    websiteId: z.string(),
});

export const createVisitor: RouteType = async ({ rawBody, client }) => {
    const body = visitorInput.safeParse(rawBody);
    if (body.success) {
        try {
            const { websiteId, id, data } = body.data;

            return {
                data: {
                    message: "User updated",
                },
                status: 200,
            };
        } catch {
            return apiResponse.serverError;
        }
    } else {
        return apiResponse.badRequest;
    }
};
