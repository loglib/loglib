import { MDX } from "@/components/blog-mdx";
import BlurImage from "@/components/ui/blur-image";
import { getBlurDataURL } from "@/lib/image";
import { formatDate } from "@/lib/utils";
import { allBlogPosts, allChangelogPosts } from "contentlayer/generated";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return allChangelogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata | undefined> {
    const post = allChangelogPosts.find((post) => post.slug === params.slug);
    if (!post) {
        return;
    }

    const { title, publishedAt: publishedTime, summary: description, image, slug } = post;

    return {
        title: `${title} - Loglib Blog`,
        description,
        openGraph: {
            title: `${title} - Loglib Blog`,
            description,
            type: "article",
            publishedTime,
            url: `https://loglib.io/blog/${slug}`,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

export default async function ChangelogPost({
    params,
}: {
    params: { slug: string };
}) {
    const post = allBlogPosts.find((post) => post.slug === params.slug);
    if (!post) {
        notFound();
    }
    return (
        <div className="mx-auto my-20 grid max-w-screen-xl md:grid-cols-4 md:px-20">
            <div className="sticky top-10 hidden self-start md:col-span-1 md:block">
                <Link
                    href="/blog"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800"
                >
                    ← Back to Blogs
                </Link>
            </div>
            <div className="flex flex-col space-y-8 md:col-span-3">
                <div className="mx-5 grid gap-5 md:mx-0">
                    <div className="flex flex-col">
                        <Link href="/blog" className="my-5 text-sm text-gray-500 md:hidden">
                            ← Back to Blogs
                        </Link>
                        <time
                            dateTime={post.publishedAt}
                            className="flex items-center text-sm text-gray-500 md:text-base"
                        >
                            {formatDate(post.publishedAt)}
                        </time>
                    </div>
                    <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        {post.title}
                    </h1>
                </div>
                <BlurImage
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={900}
                    priority // since it's above the fold
                    placeholder="blur"
                    blurDataURL={await getBlurDataURL(post.image)}
                    className="border border-gray-100 dark:border-stone-800 md:rounded-2xl"
                />
                <MDX code={post.body.code} />
                <div className="mt-10 flex justify-end border-t border-gray-200 pt-5">
                    <Link
                        href={`https://github.com/loglib/loglib/apps/www/content/blog/${params.slug}.mdx`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 transition-colors hover:text-gray-800"
                    >
                        <p>Found a typo? Edit this page →</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
