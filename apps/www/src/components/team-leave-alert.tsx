import { leaveTeamModalAtom, userAtom } from "@/jotai/store";
import { leaveTeam } from "@/server/actions/team";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Icons } from "@/components/icons";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

export function TeamLeaveAlert({
    deleteTeam,
    id,
}: {
    deleteTeam: boolean;
    id: string;
}) {
    const router = useRouter();
    const [user] = useAtom(userAtom);
    const [showDeleteAlert, setShowDeleteAlert] = useAtom(leaveTeamModalAtom);
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
    async function handleLeaveTeam() {
        setIsDeleteLoading(true);
        try {
            await leaveTeam({
                teamId: id,
                userId: user?.id ?? "",
                deleteTeam,
            });
            toast({
                title: deleteTeam ? "Team deleted." : "You left the team.",
            });
        } catch (e: any) {
            toast({
                title: "Something went wrong.",
                description: e.message,
                variant: "destructive",
            });
        }
        router.refresh();
        setIsDeleteLoading(false);
        setShowDeleteAlert(false);
    }
    return (
        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to leave this team?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(event) => {
                            event.preventDefault();
                            handleLeaveTeam();
                        }}
                        className="bg-red-600 text-white focus:ring-red-600 dark:bg-red-600 hover:dark:bg-red-700"
                    >
                        {isDeleteLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : deleteTeam ? (
                            <Icons.trash className="mr-2 h-4 w-4" />
                        ) : (
                            <Icons.logout className="mr-2 h-4 w-4" />
                        )}
                        <span>{deleteTeam ? "Delete" : "Leave"}</span>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
