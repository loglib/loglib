import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export const Tip = ({
	children,
	tip,
}: {
	children: ReactNode;
	tip: string;
}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>{tip}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
