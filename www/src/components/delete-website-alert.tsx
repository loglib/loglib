"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { websiteDataAtom, websiteDeleteModalAtom } from "@/jotai/store"
import { useAtom } from "jotai"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"




export function DeleteWebsiteAlert() {
    const router = useRouter()
    const [showDeleteAlert, setShowDeleteAlert] = useAtom(websiteDeleteModalAtom)
    const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
    const [website, setWebsite] = useAtom(websiteDataAtom)
    async function deleteSite(websiteId: string) {
        try {
            await fetch('/api/website/' + website?.id, {
                method: "DELETE",
            })
            setIsDeleteLoading(false)
            setShowDeleteAlert(false)
            router.refresh()
            return toast({
                title: "Website deleted.",
            })
        }
        catch (e) {
            setIsDeleteLoading(false)
            toast({
                title: "Something went wrong.",
                description: e.message,
                variant: "destructive",
            })
        }
    }
    if (!website) return null
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
                            event.preventDefault()
                            setIsDeleteLoading(true)
                            deleteSite(website.id)
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
    )
}
