import { LegalPost } from "contentlayer/generated";
import { MDX } from "@/components/blog-mdx";
import { formatDate } from "@/lib/utils";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function LegalPage({ post }: { post: LegalPost }) {
	return (
		<div className="">
			<div className=" py-20 sm:py-6">
				<h1 className="mt-5 text-center font-display text-4xl font-extrabold leading-[1.15]  sm:text-6xl sm:leading-[1.15]">
					{post.title}
				</h1>
			</div>
			<MaxWidthWrapper className="flex max-w-screen-md flex-col items-center p-5 sm:pt-20">
				<MDX code={post.body.code} />
				<div className="mt-10 w-full border-t border-gray-200 pt-10 text-center">
					<p className="text-gray-500">
						Last updated: {formatDate(post.updatedAt)}
					</p>
				</div>
			</MaxWidthWrapper>
		</div>
	);
}
