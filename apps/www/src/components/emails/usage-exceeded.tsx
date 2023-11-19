import { capitalize, nFormatter } from "@/lib/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
type ProjectProps = {
  id: string;
  name: string;
  usage: number;
  usageLimit: number;
  plan: string;
};

export default function UsageExceeded({
  email = "panic@thedis.co",
  project = {
    id: "ckqf1q3xw0000gk5u2q1q2q1q",
    name: "Acme",
    usage: 2410,
    usageLimit: 1000,
    plan: "free",
  },
  type = "first",
}: {
  email: string;
  project: ProjectProps;
  type: "first" | "second";
}) {
  const { name, usage, usageLimit, plan } = project;
  return (
    <Html>
      <Head />
      <Preview>Usage Limit Exceeded</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={
                  "https://vgssydupjvshgeeeqjvo.supabase.co/storage/v1/object/public/images/Logo%20(5).png"
                }
                width="40"
                height="40"
                alt="Loglib"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Usage Limit Exceeded
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Your Loglib project, <strong> {name} </strong> has exceeded the
              <strong> {capitalize(plan)} Plan </strong>
              limit of <strong>{nFormatter(usageLimit)} events.</strong>You have
              used <strong>{nFormatter(usage)} events</strong> in your current
              billing cycle.
            </Text>
            <Text className="text-sm leading-6 text-black">
              All your existing projects will continue to work, and we are still
              collecting data on them, but you'll need to upgrade in the coming
              {type === "first" ? 7 : 4} days to a higher tier. Please note, If
              you passed the deadline collecting events will be paused and you
              won't be able to access your project.
            </Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://loglib.io/dashboard/settings/billing`}
              >
                Upgrade my plan
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              To respect your inbox,{" "}
              {type === "first"
                ? "we will only send you one more email about this in 3 days"
                : "this will be the last time we'll email you about this for the current billing cycle"}
              . Feel free to ignore this email if you don't plan on upgrading,
              or reply to let us know if you have any questions!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
