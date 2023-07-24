import { CardSkeleton } from "@/components/card-skeleton"
import { WebsiteCreateButton } from "@/components/website-create-button"




export default function LoadingDashboard() {
    return (
        <section className="  pt-16">
            <div className=" grid grid-cols-1 gap-4 md:grid-cols-3 ">
                <CardSkeleton />
            </div>
        </section>
    )
}