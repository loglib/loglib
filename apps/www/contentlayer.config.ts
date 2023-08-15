import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";

/** @type {import('contentlayer/source-files').ComputedFields} */

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const computedFields = (type: "blog" | "changelog" | "help" | "legal") => ({
    slug: {
        type: "string",
        resolve: (doc) => doc._raw.flattenedPath.replace(`${type}/`, ""),
    },
    tableOfContents: {
        type: "array",
        resolve: (doc) => {
            // get all markdown heading 2 nodes (##)
            const headings = doc.body.raw.match(/^##\s.+/gm);
            const slugger = new GithubSlugger();
            return (
                headings?.map((heading) => {
                    const title = heading.replace(/^##\s/, "");
                    return {
                        title,
                        slug: slugger.slug(title),
                    };
                }) || []
            );
        },
    },
    images: {
        type: "array",
        resolve: (doc) => {
            return (
                doc.body.raw.match(/(?<=<Image[^>]*\bsrc=")[^"]+(?="[^>]*\/>)/g) || []
            );
        },
    },
    tweetIds: {
        type: "array",
        resolve: (doc) => {
            const tweetMatches = doc.body.raw.match(/<Tweet\sid="[0-9]+"\s\/>/g);
            return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || [];
        },
    },
    githubRepos: {
        type: "array",
        resolve: (doc) => {
            // match all <GithubRepo url=""/> and extract the url
            return doc.body.raw.match(
                /(?<=<GithubRepo[^>]*\burl=")[^"]+(?="[^>]*\/>)/g,
            );
        },
    },
    structuredData: {
        type: "object",
        resolve: (doc) => ({
            "@context": "https://schema.org",
            "@type": `${capitalize(type)}Posting`,
            headline: doc.title,
            datePublished: doc.publishedAt,
            dateModified: doc.publishedAt,
            description: doc.summary,
            image: doc.image,
            url: `https://dub.sh/${doc._raw.flattenedPath}`,
            author: {
                "@type": "Person",
                name: doc.author,
            },
        }),
    },
});

export const Doc = defineDocumentType(() => ({
    name: "Doc",
    filePathPattern: "docs/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true,
        },
        description: {
            type: "string",
        },
        published: {
            type: "boolean",
            default: true,
        },
    },
    //@ts-ignore
    computedFields: computedFields("docs"),
}));

export const ChangelogPost = defineDocumentType(() => ({
    name: "ChangelogPost",
    filePathPattern: "**/changelog/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true,
        },
        publishedAt: {
            type: "string",
            required: true,
        },
        summary: {
            type: "string",
            required: true,
        },
        image: {
            type: "string",
            required: true,
        },
        author: {
            type: "string",
            required: true,
        },
    },
    // @ts-ignore
    computedFields: computedFields("changelog"),
}));

export const LegalPost = defineDocumentType(() => ({
    name: "LegalPost",
    filePathPattern: "**/legal/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true,
        },
        updatedAt: {
            type: "string",
            required: true,
        },
    },
    // @ts-ignore
    computedFields: computedFields("legal"),
}))

export default makeSource({
    contentDirPath: "src/content",
    documentTypes: [Doc, ChangelogPost, LegalPost],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: "github-dark",
                    onVisitLine(node: { children: string | any[] }) {
                        // Prevent lines from collapsing in `display: grid` mode, and allow empty
                        // lines to be copy/pasted
                        if (node.children.length === 0) {
                            node.children = [{ type: "text", value: " " }];
                        }
                    },
                    onVisitHighlightedLine(node: {
                        properties: { className: string[] };
                    }) {
                        node.properties.className.push("line--highlighted");
                    },
                    onVisitHighlightedWord(node: {
                        properties: { className: string[] };
                    }) {
                        node.properties.className = ["word--highlighted"];
                    },
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section",
                    },
                },
            ],
        ],
    },
});
