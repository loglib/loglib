import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import path from 'path';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	slug: {
		type: 'string',
		resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/')
	},
	slugFull: {
		type: 'string',
		resolve: (doc) => `/${doc._raw.flattenedPath}`
	},
	fileName: {
		type: 'string',
		resolve: (doc) => path.parse(doc._raw.sourceFilePath.split('/').slice(-1).join('/')).name
	},
	suffix: {
		type: 'string',
		resolve: (doc) => path.parse(doc._raw.sourceFilePath.split('/').slice(-1).join('/')).ext
	}
};



export const Doc = defineDocumentType(() => ({
    name: "Doc",
    filePathPattern: "docs/**/*.md",
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
    computedFields
}));


export const ChangelogPost = defineDocumentType(() => ({
    name: "ChangelogPost",
    filePathPattern: "**/changelog/*.md",
    fields: {
        draft: {
			type: 'boolean',
			description: 'Disable in production mode',
			default: false
		},
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
    computedFields
}));


export const LegalPost = defineDocumentType(()=>({
    name: "LegalPost",
    filePathPattern: "**/legal/*.md",
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
}))


export default makeSource({
	contentDirPath: './content',
	documentTypes: [ChangelogPost, LegalPost, Doc],
	disableImportAliasWarning: true
});