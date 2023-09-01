import { getTeams } from "@/server/query";

import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { StoreSetter } from "@/components/store-setter";
import { TeamCreateButton } from "@/components/team-create-button";
import { TeamForm } from "@/components/team-create-form";
import { TeamHeader } from "@/components/team-header";
import { TeamJoinedToast } from "@/components/team-joined-toast";
import { TeamMembersTable } from "@/components/team-members-table";
import { TeamUpdateForm } from "@/components/team-update-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";

const Page = async ({
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) => {
	const user = await getCurrentUser();
	if (!user) return null;
	const teams = await getTeams();
	return (
		<section className=" space-y-8">
			<StoreSetter store="teams" data={teams} />
			<TeamHeader teams={teams} />
			{!teams.length ? (
				<EmptyPlaceholder className=" my-4">
					<EmptyPlaceholder.Icon name="users" />
					<EmptyPlaceholder.Title>No Team Added</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						You haven&apos;t created any team yet. Start creating team
					</EmptyPlaceholder.Description>
					<TeamCreateButton teamsCount={teams.length} />
				</EmptyPlaceholder>
			) : (
				<Card className=" bg-gradient-to-tr from-white/80 to-white dark:from-stone-900/30 dark:to-black">
					<CardHeader>
						<TeamUpdateForm />
					</CardHeader>
					<CardContent>
						<TeamMembersTable />
					</CardContent>
				</Card>
			)}
			<TeamForm />
			<TeamJoinedToast
				joined={searchParams?.accepted === "true"}
				expired={searchParams?.expired === "true"}
			/>
		</section>
	);
};

export default Page;
