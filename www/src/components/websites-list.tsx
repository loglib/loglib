"use client"

import { useEffect, useState } from "react"
import { websitesAtom } from "@/jotai/store"
import { useAtom } from "jotai"

import { Website as WebsiteType } from "../../@prisma"
import { DeleteWebsiteAlert } from "./delete-website-alert"
import { EditWebsiteForm } from "./edit-website-form"
import { EmptyPlaceholder } from "./empty-placeholder"
import { Website } from "./website"
import { WebsiteCreateButton } from "./website-create-button"

export const WebsitesList = () => {
  const [websites] = useAtom(websitesAtom)
  const [selected, setSelected] = useState<string>("")
  const [selectedWebsite, setWebsite] = useState<WebsiteType | undefined>(
    undefined
  )
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setWebsite(websites.find((website) => website.id === selected))
  }, [selected, websites])
  return (
    <>
      {websites.length ? (
        <div className=" mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
          {websites.map((website) => (
            <Website
              key={website.id}
              site={website}
              visitors={website.WebSession.length}
              setSelected={setSelected}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder className=" my-4">
          <EmptyPlaceholder.Icon name="layout" />
          <EmptyPlaceholder.Title>No Website Added</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You haven&apos;t added any website yet. Start adding website
          </EmptyPlaceholder.Description>
          <WebsiteCreateButton />
        </EmptyPlaceholder>
      )}
      <EditWebsiteForm
        data={selectedWebsite}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <DeleteWebsiteAlert id={selected} />
    </>
  )
}
