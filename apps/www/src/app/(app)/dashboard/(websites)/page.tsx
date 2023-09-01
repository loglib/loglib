import { WebsiteCreateButton } from "@/components/website-create-button";
import { WebsiteForm } from "@/components/website-create-form";
import { WebsitesList } from "@/components/websites-list";
import { getWebsite } from "@/server/query/website";

export default async function DashboardPage() {
    const { userWebsites, teamWebsites } = await getWebsite();
    return (
        <section>
            <div className=" flex justify-end">
                <WebsiteCreateButton />
            </div>
            <WebsitesList websites={userWebsites.concat(teamWebsites)} />
            <WebsiteForm />
        </section>
    );
}
