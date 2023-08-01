"use client";

import { inviteTeamModalAtom, selectedTeamAtom } from "@/jotai/store";
import { inviteTeam } from "@/server/actions/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { z } from "zod";

import { teamInviteSchema } from "@/lib/validations/team";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

export const TeamInviteForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useAtom(inviteTeamModalAtom);
    const [team, setTeam] = useAtom(selectedTeamAtom);
    const router = useRouter();
    const form = useForm<z.infer<typeof teamInviteSchema>>({
        resolver: zodResolver(teamInviteSchema),
        defaultValues: {
            email: "",
            role: "viewer",
        },
    });
    async function onSubmit(values: z.infer<typeof teamInviteSchema>) {
        setIsLoading(true);
        try {
            if (!team) {
                throw new Error("No team selected", {
                    cause: "No team selected",
                });
            }

            if (team.TeamUser.find((tu) => tu.email === values.email)) {
                throw new Error("User is already on the team", {
                    cause: "The user is already a member of the team",
                });
            }

            const res = await inviteTeam(values, team.id);
            if (!res) {
                throw new Error("This user isn't registered yet", {
                    cause: "The user has to be registered before you can invite them to a team",
                });
            }
            setTeam({
                ...team,
                TeamUser: [...team.TeamUser, res],
            });
            toast({
                title: "Success!",
                description: "Your team invite has been sent.",
            });
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (e: any) {
            toast({
                title: e.message ?? "Uh oh!",
                description: e.cause ?? "Could not send your team invite. Please try again later.",
                variant: "destructive",
            });
        }
        router.refresh();
        setIsLoading(false);
        setModal(false);
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
                        className=" animate-in relative flex w-11/12 flex-col  justify-center rounded-md border bg-gradient-to-tr from-gray-100 to-gray-200 px-8 pb-10 pt-4 dark:from-black dark:to-slate-900/20 md:w-3/12"
                    >
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit, (e) => {
                                    return toast({
                                        title: "Uh oh! ",
                                        description:
                                            e.root?.message ?? e.email?.message ?? e.role?.message,
                                        variant: "destructive",
                                    });
                                })}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="">
                                            <FormLabel>Email</FormLabel>
                                            {/* <FormMessage /> */}
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Email"
                                                    {...field}
                                                    className=" "
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className=" w-full">
                                            <FormLabel>Role</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) =>
                                                        field.onChange(value as "admin" | "viewer")
                                                    }
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="viewer">
                                                                Viewer
                                                            </SelectItem>
                                                            <SelectItem value="admin">
                                                                Admin
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className=" flex items-center">
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <Icons.spinner className="h-4 w-4 animate-spin" />
                                        ) : (
                                            "Invite Member"
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
                                </div>
                            </form>
                        </Form>
                    </motion.div>
                </Modal>
            ) : null}
        </AnimatePresence>
    );
};
