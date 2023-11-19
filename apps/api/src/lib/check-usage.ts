import { db } from "../db/drizzle";

export const checkUsage = async (websiteId: string) => {
  const sentEmails = await db.query.sentEmail.findFirst({
    where(fields, operators) {
      return operators.eq(fields.websiteId, websiteId);
    },
  });
  const date = new Date();
  date.setDate(date.getDate() - 4);
  if (sentEmails.type === "second_usage_limit" && sentEmails.createdAt < date) {
    return false;
  }
  return true;
};
