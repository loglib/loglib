import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const Page = async ({ params }: { params: { token: string } }) => {
    const user = await getCurrentUser();
    const invite = await db.teamUserInvite.findFirst({
        where: {
            AND: {
                token: params.token,
                status: "sent",
            },
        },
    });
    if (!invite) return redirect("/dashboard/team?expired=true");
    if (user?.id !== invite.userId) return redirect("/login");
    await db.teamUser.update({
        where: {
            id: invite.teamUserId,
        },
        data: {
            accepted: true,
        },
    });
    await db.teamUserInvite.update({
        where: {
            id: invite.id,
        },
        data: {
            status: "accepted",
        },
    });
    redirect("/dashboard/team?accepted=true");
    return null;
};

export default Page;
