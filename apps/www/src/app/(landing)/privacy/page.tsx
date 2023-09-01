import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import LegalPage from "@/components/legal";
import { allLegalPosts } from "contentlayer/generated";

export const metadata: Metadata = constructMetadata({
	title: "Privacy Policy – Dub",
});

export default function Privacy() {
	const post = allLegalPosts.find((post) => post.slug === "privacy");
	if (!post) throw new Error("Privacy policy not found");
	return <LegalPage post={post} />;
}
