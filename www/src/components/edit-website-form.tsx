"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Icons } from "./icons"
import { Input } from "./ui/input"
import { Button, buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { ZodError, z } from "zod"
import { signOut } from "next-auth/react"
import { websiteFormSchema } from "@/lib/validations/website"
import { toast } from "./ui/use-toast"
import { LogOut, Trash, X, XCircle } from "lucide-react"
import Link from "next/link"
import Modal from 'react-modal'
import { useAtom } from "jotai"
import { editFormModalAtom, websiteDataAtom, websiteDeleteModalAtom } from "@/jotai/store"
import { AnimatePresence, motion } from "framer-motion"
import { Trash2 } from "lucide-react"


export const EditWebsiteForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [, setDeleteAlert] = useAtom(websiteDeleteModalAtom)
    const [modal, setModal] = useAtom(editFormModalAtom)
    const [data] = useAtom(websiteDataAtom)
    const form = useForm<z.infer<typeof websiteFormSchema>>({
        resolver: zodResolver(websiteFormSchema),
        defaultValues: {
            url: data?.url,
            id: data?.id,
            title: data?.title!
        }
    })
    async function onSubmit(values: z.infer<typeof websiteFormSchema>) {
        setIsLoading(true)
        try {

            const res = await fetch("/api/website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            if (!res.ok) {
                return toast({
                    title: "Uh oh!",
                    description: "This website already exists. Please try again with a different website ID or Website URL.",
                    variant: "destructive",
                })
            }
        } catch {
            return toast({
                title: "Uh oh!",
                description: "This website already exists. Please try again with a different website ID or Website URL.",
                variant: "destructive",
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
                    ariaHideApp
                    className="font-jost mx-4 flex h-full items-center justify-center border-none outline-none backdrop:blur-xl"
                    style={{
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            backdropFilter: "blur(5px)",
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
                        className=" animate-in relative flex w-11/12 flex-col  justify-center rounded-md border bg-gradient-to-tr from-gray-100 to-gray-200 px-8 pb-10 pt-4 dark:from-black dark:to-slate-900/20 md:w-3/12">
                        <div className=" ml-auto">
                            <Button variant="outline" className="" onClick={() => {
                                setModal(false)
                                setDeleteAlert(true)
                            }}>
                                <Trash2 size={16} className=" text-red-500" />
                            </Button>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit, (e) => {
                                return toast({
                                    title: "Uh oh! ",
                                    description: e.root?.message ?? e.title?.message ?? e.url?.message,
                                    variant: "destructive",
                                })
                            })} className="space-y-4 ">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    defaultValue={data?.title!}
                                    render={({ field }) => (
                                        <FormItem className=" w-full">
                                            <FormLabel>Website Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="title" {...field} className=" " />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="url"
                                    defaultValue={data?.url}
                                    render={({ field }) => (
                                        <FormItem className=" w-full">
                                            <FormLabel>Website URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://example.com" {...field} className="" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="id"
                                    defaultValue={data?.id}
                                    render={({ field }) => (
                                        <FormItem className=" w-full flex-grow">
                                            <FormLabel>Your website @loglib</FormLabel>
                                            {/* <FormMessage /> */}
                                            <FormControl>
                                                <div className="border-input flex items-center  rounded-md border px-1 focus-within:outline-none">
                                                    <span className=" flex h-10 items-center border-r px-2 text-sm">
                                                        loglib.io/
                                                    </span>
                                                    <input placeholder="site_name" {...field} className="ring-offset-background placeholder:text-muted-foreground flex h-10 w-full rounded-md border border-none bg-transparent p-2 text-sm outline-none file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50" />
                                                </div>
                                            </FormControl>

                                        </FormItem>
                                    )}
                                />


                                <div className=" space-x-2">
                                    <Button type="submit" disabled={
                                        isLoading
                                    }>
                                        {
                                            isLoading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : "Update Website"
                                        }
                                    </Button>
                                    <Button type="button" variant="outline" className=""
                                        onClick={() => setModal(false)}
                                    >
                                        Cancel
                                    </Button>

                                </div>

                            </form>
                        </Form>
                    </motion.div>
                </Modal> : null
            }
        </AnimatePresence>
    )
}