import { websiteDeleteModalAtom } from "@/jotai/store";
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

export function DeleteWebsiteAlert({ id }: { id: string }) {
	const router = useRouter();
	const [showDeleteAlert, setShowDeleteAlert] = useAtom(websiteDeleteModalAtom);
	const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
	async function deleteSite() {
		try {
			await fetch(`/api/website/${id}`, {
				method: "DELETE",
			});
			setIsDeleteLoading(false);
			setShowDeleteAlert(false);
			router.refresh();
			return toast({
				title: "Website deleted.",
			});
		} catch (e: any) {
			setIsDeleteLoading(false);
			toast({
				title: "Something went wrong.",
				description: e.message,
				variant: "destructive",
			});
		}
	}
	return (
		<AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this Website?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={async (event) => {
							event.preventDefault();
							setIsDeleteLoading(true);
							deleteSite();
						}}
						className="bg-red-600 focus:ring-red-600"
					>
						{isDeleteLoading ? (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Icons.trash className="mr-2 h-4 w-4" />
						)}
						<span>Delete</span>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
