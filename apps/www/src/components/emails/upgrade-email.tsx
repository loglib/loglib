import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";


export default function UpgradeEmail({
    name = "Brendon Urie",
    plan = "Pro",
}: {
    name: string | null;
    email: string;
    plan: string;
}) {
    return (
        <Html>
            <Head />
            <Preview>Thank you for upgrading to Loglib {plan}!</Preview>
            <Tailwind>
                <Body className="mx-auto my-auto bg-white font-sans">
                    <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
                        <Section className="mt-8">
                            <Img
                                src={
                                    "https://vgssydupjvshgeeeqjvo.supabase.co/storage/v1/object/public/images/Logo%20(5).png"
                                }
                                width="100"
                                height="100"
                                alt="Loglib"
                                className="mx-auto my-0"
                            />
                        </Section>
                        <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
                            Thank you for upgrading to Loglib {plan}!
                        </Heading>
                        {/* <Section className="my-8">
                            <Img
                                src="https://vgssydupjvshgeeeqjvo.supabase.co/storage/v1/object/public/images/Black%20Sky%20Galaxy%20Stars%20Desktop%20Wallpaper.gif"
                                alt="Thank you"
                                className="max-w-[500px]"
                            />
                        </Section> */}
                        <Text className="text-sm leading-6 text-black">
                            Hey{name && ` ${name}`}!
                        </Text>
                        <Text className="text-sm leading-6 text-black">
                            My name is Beka, and I'm the founder of Loglib. I wanted to
                            personally reach out to thank you for upgrading to Loglib {plan}!
                        </Text>
                        <Text className="text-sm leading-6 text-black">
                            Your support means the world to us and helps us continue
                            to build and improve Loglib.
                        </Text>
                        <Text className="text-sm leading-6 text-black">
                            On the {plan} plan, you now have access to:
                        </Text>
                        <Text className="ml-1 text-sm leading-4 text-black">
                            ◆ {plan === "Plus" ? "Unlimited" : "1 Million"} page views
                            per month
                        </Text>
                        <Text className="ml-1 text-sm leading-4 text-black">
                            ◆ {plan === "Plus" ? "Unlimited" : "500K"} custom events
                        </Text>
                        <Text className="ml-1 text-sm leading-4 text-black">
                            ◆ Unlimited Websites
                        </Text>
                        <Text className="ml-1 text-sm leading-4 text-black">
                            ◆ Unlimited Team Members
                        </Text>
                        <Text className="ml-1 text-sm leading-4 text-black">
                            ◆ {plan === "Plus" ? "Configurable" : "Monthly"} Ingested Emails
                        </Text>
                        <Text className="ml-1 text-sm leading-4 text-black">
                            ◆ All time reporting window
                        </Text>
                        <Text className="ml-1 text-sm leading-4 text-black">
                            ◆ Unlimited Data Retention
                        </Text>
                        <Text className="ml-1 text-sm leading-4 text-black">
                            ◆ API access
                        </Text>
                        {plan === "Plus" && (
                            <Text className="ml-1 text-sm leading-4 text-black">
                                ◆ Priority support
                            </Text>
                        )}
                        <Text className="text-sm leading-6 text-black">
                            Let me know if you have any questions or feedback. I'm always
                            happy to help!
                        </Text>
                        <Text className="text-sm font-light leading-6 text-gray-400">
                            Beka form Loglib
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}