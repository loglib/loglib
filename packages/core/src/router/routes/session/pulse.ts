import z from "zod";
import { ApiPostHandler } from "../../type";
import { RootApiTrackerSchema } from "../../schema";
import { GenericError, Session } from "../../..";
import { isProduction } from "../../../utils/common";

const HeartBeatSchema = RootApiTrackerSchema.merge(
  z.object({
    data: z.object({
      duration: z.number(),
      pageDuration: z.number(),
    }),
  }),
);

type HeartBeatSchemaType = z.infer<typeof HeartBeatSchema>;

export const pulse: ApiPostHandler<HeartBeatSchemaType, Session | null> = async (req, options) => {
  const adapter = options.adapter;
  const data = HeartBeatSchema.safeParse(req.body);
  if (data.success) {
    try {
      const res = await adapter.updateSession(
        {
          updatedAt: new Date(),
          duration: Math.floor(data.data.data.duration),
        },
        data.data.sessionId,
      );
      await adapter
        .updatePageView({
          duration: Math.floor(data.data.data.pageDuration),
          id: data.data.pageId,
        })
        .catch();
      return {
        message: "Session updated",
        code: 200,
        data: res,
      };
    } catch (e) {
      console.error(e, "Error updating session");
      throw new GenericError("Error updating session", {
        path: "/session/pulse",
        e,
      });
    }
  } else {
    if (isProduction(options)) {
      return {
        message: "Invalid request body",
        code: 400,
      };
    }
    throw new GenericError("Invalid request body", { path: "/session/pulse" });
  }
};
