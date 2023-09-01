import { CardSkeleton } from "@/components/card-skeleton";

export default function LoadingDashboard() {
	return (
		<section className="  pt-16">
			<div className=" grid grid-cols-1 gap-4 md:grid-cols-3 ">
				<CardSkeleton />
			</div>
		</section>
	);
}
