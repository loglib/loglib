import { ReactNode } from "react";

export default async function DashboardLoading({
	children,
}: { children: ReactNode }) {
	return <div>{children}</div>;
}
