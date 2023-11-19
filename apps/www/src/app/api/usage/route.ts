import UsageExceeded from "@/components/emails/usage-exceeded";
import { client } from "@/lib/clickhouse";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/resend";
import { PLANS } from "@/lib/stripe/plans";
import { guid } from "@/lib/utils";
import { schema } from "@loglib/db";

export const POST = async () => {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const usages = (await client
    .query({
      query: `SELECT websiteId, COUNT(*) AS events
    FROM loglib.event where timestamp >= '${thisMonth}'
    GROUP BY websiteId`,
      format: "JSONEachRow",
    })
    .then(async (res) => await res.json())) as {
    websiteId: string;
    events: number;
  }[];
  for (let usage of usages) {
    if (usage.events > 100_000) {
      const website = await db.query.website.findFirst({
        where(fields, operator) {
          return operator.eq(fields.id, usage.websiteId);
        },
        with: {
          user: true,
        },
      });
      if (!website) {
        continue;
      }
      const sentEmail = await db.query.sentEmail.findFirst({
        where(field, operator) {
          return operator.eq(field.websiteId, website.id);
        },
      });
      const date = new Date();
      date.setDate(date.getDate() - 4);
      if (
        sentEmail &&
        (sentEmail.createdAt! < date ||
          sentEmail?.type === "second_usage_limit")
      ) {
        continue;
      }
      await sendEmail({
        email: website.user.email,
        subject: `Your website ${website.title} is exceeding usage limits`,
        react: UsageExceeded({
          project: {
            name: website.title!,
            plan: website.user.plan ?? "",
            usage: usage.events,
            usageLimit: PLANS.find((plan) => plan.slug === website.user.plan)
              ?.quota.pageViews as number,
            id: website.id,
          },
          email: website.user.email,
          type: sentEmail ? "second" : "first",
        }),
      }).then(async (res) => {
        if (!sentEmail) {
          await db.insert(schema.sentEmail).values({
            id: guid(),
            type: "first_usage_limit",
            userId: website.user.id,
            websiteId: website.id,
          });
        } else {
          await db.insert(schema.sentEmail).values({
            id: guid(),
            type: "second_usage_limit",
            userId: website.user.id,
            websiteId: website.id,
          });
        }
      });
    }
  }
  return Response.json(null, { status: 200 });
};
