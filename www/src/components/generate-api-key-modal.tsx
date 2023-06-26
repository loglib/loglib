"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Icons } from "./icons"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { z } from "zod"
import { toast } from "./ui/use-toast"
import Modal from 'react-modal'
import { useAtom } from "jotai"
import { apiKeyGenerateModalAtom } from "@/jotai/store"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { apiKeySchema } from "@/lib/validations/api-key"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Website } from "../../@prisma"

export const GenerateApiKey = ({ websites }: { websites: Website[] }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useAtom(apiKeyGenerateModalAtom)
    const router = useRouter()
    const form = useForm<z.infer<typeof apiKeySchema>>({
        resolver: zodResolver(apiKeySchema),
        defaultValues: {
            name: "",
            expiresIn: 30
        },
    })
    async function onSubmit(values: z.infer<typeof apiKeySchema>) {
        setIsLoading(true)
        try {
            const res = await fetch("/api/api-keys", {
                method: "POST",
                body: JSON.stringify(values),
            })
            if (!res.ok) {
                if (res.status === 400) {
                    throw new Error("Max API keys reached. Please delete an existing API key to create a new one.")
                }
                throw new Error("Couldn't create api key. Please try again later")
            }
            router.refresh()
        } catch (e) {
            toast({
                title: e.message,
                variant: "destructive"
            })
        }
        setIsLoading(false)
        setModal(false)
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
    }
    return (
        <AnimatePresence>
            {
                modal ? <Modal
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
                        className=" animate-in relative mx-6 flex flex-grow flex-col items-center justify-center rounded-md border bg-gradient-to-tr from-black to-slate-900/20 px-8 pb-10 pt-4 md:mx-0 md:flex-initial">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit, (e) => {
                                return toast({
                                    title: "Uh oh! ",
                                    description: e.root?.message ?? e.name?.message ?? e.website?.message ?? e.expiresIn?.message,
                                    variant: "destructive",
                                })
                            })} className="w-full space-y-4">

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className=" w-full">
                                            <FormLabel>Key Name</FormLabel>
                                            {/* <FormMessage /> */}
                                            <FormControl>
                                                <Input placeholder="Your Key Name" {...field} className=" md:w-96 " />
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
                                            <FormControl   >
                                                <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Website" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {
                                                                websites.map(website => (
                                                                    <SelectItem value={website.id}>
                                                                        {website.title}
                                                                    </SelectItem>
                                                                ))
                                                            }
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
                                            {/* <FormMessage /> */}
                                            <FormControl   >
                                                <Select defaultValue={"30"} onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
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

                                <Button type="submit" disabled={
                                    isLoading
                                }>
                                    {
                                        isLoading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : "Generate"
                                    }
                                </Button>

                                <Button type="button" variant="outline" className=" mx-2"
                                    onClick={() => setModal(false)}
                                >
                                    Cancel
                                </Button>
                            </form>
                        </Form>
                    </motion.div>
                </Modal> : null
            }

        </AnimatePresence>
    )
}