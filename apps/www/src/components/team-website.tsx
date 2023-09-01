"use client";

import {
	selectedTeamAtom,
	teamSitesModalAtom,
	userAtom,
	userWebsitesAtom,
} from "@/jotai/store";
import { addWebsiteToTeam, removeAllTeamWebsites } from "@/server/actions/team";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

export const TeamWebsiteModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);
	const [modal, setModal] = useAtom(teamSitesModalAtom);
	const [team] = useAtom(selectedTeamAtom);
	const [websites] = useAtom(userWebsitesAtom);
	const router = useRouter();
	const [selected, setSelected] = useState<string>();
	async function onSubmit() {
		setIsLoading(true);
		try {
			if (!team)
				throw new Error("No team selected", {
					cause: "No team selected",
				});
			if (!selected) throw new Error("No website selected");
			await addWebsiteToTeam(team.id, selected);
			toast({
				title: "Success!",
				description: "Your team website has been updated!",
			});
		} catch (e: any) {
			toast({
				title: e.message ?? "Uh oh!",
				description:
					e.cause ?? "Could not save your team website. Try again later!",
				variant: "destructive",
			});
		}
		router.refresh();
		setIsLoading(false);
		setModal(false);
	}

	async function removeAllSites() {
		if (team) {
			setIsDeleteLoading(true);
			await removeAllTeamWebsites(team?.id ?? "");
			setIsDeleteLoading(false);
			router.refresh();
			setModal(false);
		}
	}

	// Define the animation variants
	const modalVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
		},
	};
	useEffect(() => {
		if (team) {
			team.websites.length && setSelected(team.websites[0]?.id);
		}
	}, [team]);
	const [_user] = useAtom(userAtom);
	return (
		<AnimatePresence>
			{modal ? (
				<Modal
					isOpen={modal}
					onRequestClose={() => setModal(false)}
					className="font-jost flex h-full items-center justify-center border-none outline-none backdrop:blur-xl"
					style={{
						overlay: {
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							backdropFilter: "blur(4px)",
						},
						content: {},
					}}
				>
					<motion.div
						variants={modalVariants} // Apply the animation variants
						initial="hidden" // Set the initial animation state
						animate="visible" // Set the target animation
						exit={{ opacity: 0, transition: { duration: 0.1 } }} // Exit gracefully
						transition={{
							type: "keyframes",
							delay: 0.1,
							ease: "easeInOut",
							duration: 0.3,
						}}
						className=" animate-in relative flex w-11/12 flex-col justify-center  gap-3 rounded-md border bg-gradient-to-tr from-gray-100 to-gray-200 px-8 pb-6 pt-4 dark:from-black dark:to-stone-900/20 md:w-3/12"
					>
						<h3 className=" font-medium">Team Website</h3>

						<div>
							<div></div>
						</div>
						<Select onValueChange={(val) => setSelected(val)} value={selected}>
							<SelectTrigger>
								<SelectValue placeholder="Choose website" />
							</SelectTrigger>
							<SelectContent>
								{websites.map((website) => (
									<SelectItem key={website.id} value={website.id}>
										{website.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{team?.websites.length ? (
							<div>
								<Button
									className=" justify-start p-0 text-sm text-red-500"
									variant="link"
									onClick={removeAllSites}
								>
									{isDeleteLoading ? (
										<Icons.spinner className=" h-4 w-4 animate-spin text-red-500" />
									) : (
										"Remove Websites"
									)}
								</Button>
							</div>
						) : null}
						<div className=" flex items-center gap-2">
							<Button onClick={onSubmit}>
								{isLoading ? (
									<Icons.spinner className=" h-4 w-4 animate-spin" />
								) : (
									"Save"
								)}
							</Button>
							<Button onClick={() => setModal(false)} variant="outline">
								Close
							</Button>
						</div>
					</motion.div>
				</Modal>
			) : null}
		</AnimatePresence>
	);
};
