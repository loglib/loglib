import { Twitter } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ReachOut() {
	return (
		<div className=" my-auto flex max-w-xl flex-col items-center justify-center gap-10 space-y-4">
			<div>
				<p className=" my-2 font-bold text-lg">Reach Out</p>
				<div className="flex items-start gap-2">
					<p className="break-words border-l px-4">
						We&apos;re a small team of two developers from{" "}
						<span className=" font-medium">Addis Ababa,</span>
						<span className=" font-bold text-yellow-500"> Ethiopia </span>
						who enjoy long conversations and building cool things together. If
						you like what we&apos;re doing and want to get in touch, we&apos;d
						love to hear from you.
					</p>
				</div>

				<div className="flex mt-8 justify-between">
					<div className=" ">
						<Link
							href="https://cal.com/loglib/30min"
							className="rounded-sm bg-stone-900 p-3 text-white hover:bg-stone-950 dark:bg-[#cac5c1] dark:text-black dark:hover:bg-gray-300/80"
							id="lets_meet"
						>
							Let&apos;s Meet
						</Link>

						<Link
							href="https://twitter.com/imbereket"
							className=" cursor-pointer"
						>
							<Button variant="link" className=" gap-2">
								<Twitter size={16} />
								<Link href="https://twitter.com/loglib_io">
									Follow us on Twitter
								</Link>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
