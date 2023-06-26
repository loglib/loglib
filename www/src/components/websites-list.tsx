"use client";

import { Prisma, WebSession, Website as WebsiteType } from "../../@prisma"
import { EmptyPlaceholder } from "./empty-placeholder"
import { WebsiteCreateButton } from "./website-create-button"
import { Website } from "./website"

type WebsiteTypeWithSessions = (WebsiteType & {
    WebSession: {
        id: string;
    }[];
})
export const WebsitesList = ({ websites }: { websites: WebsiteTypeWithSessions[], }) => {
    if (websites.length) {
        return (
            <div className=" mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                {websites.map((website) => <Website key={website.id} site={website} visitors={website.WebSession.length} />)}
            </div>
        )
    }
    return (
        <>
            <EmptyPlaceholder className=" my-4">
                <EmptyPlaceholder.Icon name="layout" />
                <EmptyPlaceholder.Title>No Website Added</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                    You haven&apos;t added any website yet. Start adding website
                </EmptyPlaceholder.Description>
                <WebsiteCreateButton websiteCount={websites.length} />
            </EmptyPlaceholder>
        </>
    )
}