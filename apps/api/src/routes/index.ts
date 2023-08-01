import { createEvents } from "./events";
import { getInsightData } from "./insight";
import { createPageview, createPageDuration } from "./pageview";
import { createSession } from "./session";
import { RouterType } from "./type";
import { createVisitor } from "./visitor";

export const router: RouterType = async ({ path, ...rest }) => {
  switch (path) {
    case "/session":
      return await createSession(rest);
    case "/pageview":
      return await createPageview(rest);
    case "/session/pulse":
      return await createPageDuration(rest);
    case "/events":
      return await createEvents(rest);
    case "/visitor":
      return await createVisitor(rest);
    case "/insight":
      return await getInsightData(rest);
    default:
      return {
        data: {
          message: "Path Not found",
        },
        status: 404,
      };
  }
};
