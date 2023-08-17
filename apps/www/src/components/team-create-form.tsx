"use client";

import { createTeamModalAtom } from "@/jotai/store";
import { createTeam } from "@/server/actions/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { z } from "zod";

import { teamSchema } from "@/lib/validations/team";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

export const TeamForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useAtom(createTeamModalAtom);
    const router = useRouter();
    const form = useForm<z.infer<typeof teamSchema>>({
        resolver: zodResolver(teamSchema),
        defaultValues: {
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof teamSchema>) {
        setIsLoading(true);
        try {
            await createTeam(values);
            toast({
                title: "Success!",
                description: "Your team has been created.",
            });
        } catch {
            toast({
                title: "Uh oh!",
                description: "Could not create your team. Please try again later.",
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
                        className=" animate-in relative flex w-11/12 flex-col  justify-center rounded-md border bg-gradient-to-tr from-gray-100 to-gray-200 px-8 pb-10 pt-4 dark:from-black dark:to-stone-900/20 md:w-3/12"
                    >
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit, (e) => {
                                    return toast({
                                        title: "Uh oh! ",
                                        description: e.root?.message ?? e.name?.message,
                                        variant: "destructive",
                                    });
                                })}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="">
                                            <FormLabel>Team Name</FormLabel>
                                            {/* <FormMessage /> */}
                                            <FormControl>
                                                <Input
                                                    placeholder="Your Team Name"
                                                    {...field}
                                                    className=" "
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <div className=" flex items-center">
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <Icons.spinner className="h-4 w-4 animate-spin" />
                                        ) : (
                                            "Create Team"
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
