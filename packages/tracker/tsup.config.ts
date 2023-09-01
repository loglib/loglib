import { Options, defineConfig } from "tsup";

const cfg: Options = {
	splitting: false,
	sourcemap: true,
	treeshake: false,
	dts: true,
	format: ["cjs", "esm"],
};

export default defineConfig([
	{
		...cfg,
		entry: {
			index: "src/index.ts",
		},
		outDir: "dist",
	},
	{
		...cfg,
		entry: {
			index: "src/react/index.tsx",
		},
		external: ["react"],
		outDir: "dist/react",
		esbuildOptions: (options) => {
			options.banner = {
				js: '"use client";',
			};
		},
	},
	{
		entry: {
			index: "src/cdn.ts",
		},
		outDir: "dist",
		format: "iife",
		minify: true,
	},
]);
