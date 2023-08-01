import { migrateVisitors } from "@/lib/tinybird";

export const GET = async () => {
  await migrateVisitors();
  return new Response("OK");
};
