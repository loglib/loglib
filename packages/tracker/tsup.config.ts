import { Options, defineConfig } from "tsup";

const cfg: Options = {
    splitting: false,
    sourcemap: false,
    treeshake: true,
    dts: true,
    format: ["esm"],
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
