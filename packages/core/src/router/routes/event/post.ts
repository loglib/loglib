import z from "zod";
import { RootApiTrackerSchema } from "../../schema";
import { ApiPostHandler } from "../../type";
import { GenericError } from "../../../error";
import { Events } from "../../../adapters/models";
import { getIpAddress } from "../session/detect/getIpAddress";

export const EventSchema = z.array(
  z.object({
    id: z.string(),
    eventName: z.string(),
    eventType: z.string(),
    payload: z.record(z.any()),
    page: z.string(),
  }),
);
export const EventsApiSchema = RootApiTrackerSchema.merge(z.object({ data: EventSchema }));
export type EventPostInput = z.infer<typeof EventsApiSchema>;
export const postEvent: ApiPostHandler<EventPostInput, Events[] | null> = async (req, options) => {
  if (!req.body.visitorId) {
    req.body.visitorId = getIpAddress(req) as string;
  }
  const body = EventsApiSchema.safeParse(req.body);
  const adapter = options.adapter;
  if (body.success) {
    const data: Events[] = body.data.data.map((event) => ({
      sessionId: body.data.sessionId,
      visitorId: body.data.visitorId,
      pageId: body.data.pageId,
      payload: event.payload,
      eventName: event.eventName,
      eventType: event.eventType,
      id: event.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      websiteId: body.data.websiteId,
    }));
    try {
      const res = await adapter.createManyEvents(data);

      return {
        message: "success",
        code: 200,
        data: res,
      };
    } catch (e) {
      throw new GenericError("Error creating event", { path: "/event", e });
    }
  } else {
    throw new GenericError("Invalid request body", { path: "/event" });
  }
};
