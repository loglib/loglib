import { defineConfig } from "tsup";

const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig((opts) => ([
    {
        entryPoints: ["src/index.ts"],
        format: ["cjs", "esm"],
        clean: !opts.watch,
        outDir: "dist",
        target: "es2017",
        dts: true,
    },
    {
        clean: true,
        entry: ["src/cli/index.ts"],
        format: ["cjs", "esm"],
        minify: !isDev,
        metafile: !isDev,
        sourcemap: true,
        target: "esnext",
        outDir: "dist/cli",
    }
]));