import { dev } from "$app/environment";
import { allChangelogPosts } from "contentlayer/generated";
import type { ChangelogPost } from "contentlayer/generated";

export const load = (async () => {
    const posts = dev
        ? allChangelogPosts
        : allChangelogPosts.filter((post) => post.draft === false);
    return {
        posts,
    };
}) satisfies ChangelogPost;
