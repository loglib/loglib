import { defineConfig } from "tsup";



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
        entryPoints: ["src/types/index.ts"],
        format: ["cjs", "esm"],
        clean: !opts.watch,
        outDir: "dist/types",
        target: "es2017",
        dts: true,
    }
]));
