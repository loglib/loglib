"use client";

import { websiteFormAtom } from "@/jotai/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { z } from "zod";

import { websiteFormSchema } from "@/lib/validations/website";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

export const WebsiteForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [modal, setModal] = useAtom(websiteFormAtom);
	const router = useRouter();
	const form = useForm<z.infer<typeof websiteFormSchema>>({
		resolver: zodResolver(websiteFormSchema),
		defaultValues: {
			url: "",
			id: "",
		},
	});
	async function onSubmit(values: z.infer<typeof websiteFormSchema>) {
		setIsLoading(true);
		const res = await fetch("/api/website", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});
		if (!res.ok) {
			setIsLoading(false);
			if (res.status === 409) {
				return toast({
					title: "Uh oh!",
					description:
						"This website already exists. Please try again with a different website ID or Website URL.",
					variant: "destructive",
				});
			}
			return toast({
				title: "Uh oh!",
				description:
					"This website already exists. Please try again with a different website ID or Website URL.",
				variant: "destructive",
			});
		}
		setIsLoading(false);
		setModal(false);
		router.refresh();
	}

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
	const fieldValue = form.watch("url");

	useEffect(() => {
		let url = fieldValue.replace("https://", "").replace("https://", "");
		const allCom = fieldValue.split(".");
		url = url.replace(`.${allCom[allCom.length - 1]}`, "").replace(/\./g, "_");

		form.setValue("id", url);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fieldValue]);
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
						className="animate-in relative flex w-11/12 flex-col  justify-center rounded-md border bg-gradient-to-tr from-gray-100 to-gray-200 px-8 pb-10 pt-4 dark:from-black dark:to-stone-900/20 md:w-3/12"
					>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit, (e) => {
									return toast({
										title: "Uh oh! ",
										description:
											e.root?.message ??
											e.id?.message ??
											e.title?.message ??
											e.url?.message,
										variant: "destructive",
									});
								})}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>Website Title</FormLabel>
											{/* <FormMessage /> */}
											<FormControl>
												<Input
													placeholder="Your Website Title"
													{...field}
													className=" "
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="url"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>Website URL</FormLabel>
											{/* <FormMessage /> */}
											<FormControl>
												<Input
													placeholder="https://example.com"
													{...field}
													className=" "
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="id"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>Your website @loglib</FormLabel>
											{/* <FormMessage /> */}
											<FormControl>
												<div className="border-input flex items-center  rounded-md border px-1 focus-within:outline-none">
													<span className=" flex h-10 items-center border-r px-2 text-sm">
														loglib.io/
													</span>
													<input
														placeholder="site_name"
														{...field}
														className="ring-offset-background placeholder:text-muted-foreground flex h-10 rounded-md border border-none bg-transparent p-2 text-sm outline-none file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
													/>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? (
										<Icons.spinner className="h-4 w-4 animate-spin" />
									) : (
										"Add Website"
									)}
								</Button>

								<Button
									type="button"
									variant="outline"
									className=" mx-2"
									onClick={() => setModal(false)}
								>
									Cancel
								</Button>
							</form>
						</Form>
					</motion.div>
				</Modal>
			) : null}
		</AnimatePresence>
	);
};
