import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const computedFields = (type: "changelog" | "docs") => ({
    slug: {
        type: "string",
        resolve: (doc: { _raw: { flattenedPath: string } }) =>
            doc._raw.flattenedPath.replace(`${type}/`, ""),
    },
    slugAsParams: {
        type: "string",
        resolve: (doc: { _raw: { flattenedPath: string } }) =>
            doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
    images: {
        type: "array",
        resolve: (doc: { body: { raw: string } }) => {
            return doc.body.raw.match(/(?<=<BlurImage[^>]*\bsrc=")[^"]+(?="[^>]*\/>)/g);
        },
    },
    tweetIds: {
        type: "array",
        resolve: (doc: { body: { raw: string } }) => {
            const tweetMatches = doc.body.raw.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
            return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)?.[0]) || [];
        },
    },
    githubRepos: {
        type: "array",
        resolve: (doc: { body: { raw: string } }) => {
            // match all <GithubRepo url=""/> and extract the url
            return doc.body.raw.match(/(?<=<GithubRepo[^>]*\burl=")[^"]+(?="[^>]*\/>)/g);
        },
    },
    structuredData: {
        type: "object",
        resolve: (doc: {
            title: string;
            publishedAt: string;
            summary: string;
            image: string;
            _raw: { flattenedPath: string };
            author: string;
        }) => ({
            "@context": "https://schema.org",
            "@type": `${capitalize(type)}Posting`,
            headline: doc.title,
            datePublished: doc.publishedAt,
            dateModified: doc.publishedAt,
            description: doc.summary,
            image: doc.image,
            url: `https://lgolib.io/${doc._raw.flattenedPath}`,
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

export default makeSource({
    contentDirPath: "src/content",
    documentTypes: [Doc, ChangelogPost],
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
