"use client"

import { createTeamModalAtom, websitesAtom } from "@/jotai/store"
import { createTeam } from "@/server/actions/team"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { teamSchema } from "@/lib/validations/team"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { toast } from "./ui/use-toast"
import { ModalWrapper } from "./modal-wrapper"




export const TeamForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [modal, setModal] = useAtom(createTeamModalAtom)
  const router = useRouter()
  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof teamSchema>) {
    setIsLoading(true)
    try {
      await createTeam(values)
      toast({
        title: "Success!",
        description: "Your team has been created.",
      })
    } catch {
      toast({
        title: "Uh oh!",
        description: "Could not create your team. Please try again later.",
        variant: "destructive",
      })
    }
    setIsLoading(false)
    setModal(false)
    router.refresh()
  }

  return (
    <ModalWrapper
      isLoading={isLoading}
      modal={modal}
      setModal={setModal}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => {
            return toast({
              title: "Uh oh! ",
              description: e.root?.message ?? e.name?.message,
              variant: "destructive",
            })
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
    </ModalWrapper>
  )
}
