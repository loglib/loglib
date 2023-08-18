"use client";

import { apiKeyGenerateModalAtom } from "@/jotai/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { z } from "zod";

import { apiKeySchema } from "@/lib/validations/api-key";

import { CopyToClipboard } from "./copy-to-clipboard";
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
import { Website } from "@prisma/client";

export const GenerateApiKey = ({ websites }: { websites: Website[] }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useAtom(apiKeyGenerateModalAtom);
    const router = useRouter();
    const [key, setKey] = useState("");
    const form = useForm<z.infer<typeof apiKeySchema>>({
        resolver: zodResolver(apiKeySchema),
        defaultValues: {
            name: "",
            expiresIn: 30,
        },
    });
    async function onSubmit(values: z.infer<typeof apiKeySchema>) {
        setIsLoading(true);
        try {
            const res = await fetch("/api/api-keys", {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (!res.ok) {
                if (res.status === 400) {
                    throw new Error(
                        "Max API keys reached. Please delete an existing API key to create a new one.",
                    );
                }
                throw new Error("Couldn't create api key. Please try again later");
            }
            const data = await res.json();
            setKey(data.key);
            router.refresh();
        } catch (e: any) {
            toast({
                title: e.message,
                variant: "destructive",
            });
        }
        setIsLoading(false);
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
                        className=" animate-in relative mx-6 flex flex-grow flex-col   rounded-md border bg-gradient-to-tr from-white to-white/90 px-8 pb-10 pt-4 dark:from-black dark:to-stone-900/20 md:mx-0 md:flex-initial"
                    >
                        {key ? (
                            <div className=" flex flex-col gap-2">
                                <div className=" flex items-center gap-2">
                                    <Lock size={16} className=" text-logo" />
                                    <p className=" text-logo/90 text-center font-medium">
                                        Save this key somewhere safe. You won&apos;t be able to see
                                        it again.
                                    </p>
                                </div>

                                <div className="border-input flex items-center  rounded-md border px-1 focus-within:outline-none">
                                    <input
                                        value={key}
                                        disabled
                                        className="ring-offset-background placeholder:text-muted-foreground flex h-10 w-full rounded-md border border-none bg-transparent p-2 text-sm outline-none file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    <span className=" flex h-10 items-center  px-2 text-sm ">
                                        <CopyToClipboard text={key} />
                                    </span>
                                </div>
                                <div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className=" "
                                        onClick={() => {
                                            setModal(false);
                                            setKey("");
                                        }}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit, (e) => {
                                        return toast({
                                            title: "Uh oh! ",
                                            description:
                                                e.root?.message ??
                                                e.name?.message ??
                                                e.website?.message ??
                                                e.expiresIn?.message,
                                            variant: "destructive",
                                        });
                                    })}
                                    className="w-full space-y-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className=" w-full">
                                                <FormLabel>Key Name</FormLabel>

                                                <FormControl>
                                                    <Input
                                                        placeholder="Your Key Name"
                                                        {...field}
                                                        className=" md:w-96 "
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem className=" w-full">
                                                <FormLabel>Website</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) =>
                                                            field.onChange(value)
                                                        }
                                                        value={field.value as string}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Website" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {websites.map((website) => (
                                                                    <SelectItem value={website.id}>
                                                                        {website.title}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="expiresIn"
                                        defaultValue={30}
                                        render={({ field }) => (
                                            <FormItem className=" w-full">
                                                <FormLabel>Expires In</FormLabel>

                                                <FormControl>
                                                    <Select
                                                        defaultValue={"30"}
                                                        onValueChange={(value) =>
                                                            field.onChange(parseInt(value))
                                                        }
                                                        value={field.value.toString()}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Expires In" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value={"30"}>
                                                                    30 Days
                                                                </SelectItem>
                                                                <SelectItem value={"60"}>
                                                                    60 Days
                                                                </SelectItem>
                                                                <SelectItem value={"90"}>
                                                                    90 Days
                                                                </SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <Icons.spinner className="h-4 w-4 animate-spin" />
                                        ) : (
                                            "Generate"
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
                        )}
                    </motion.div>
                </Modal>
            ) : null}
        </AnimatePresence>
    );
};
