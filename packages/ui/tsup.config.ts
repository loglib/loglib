import { defineConfig } from "tsup";

export default defineConfig((opts) => ([
    {
        entryPoints: ["src/index.ts"],
        format: ["cjs", "esm"],
        external: ['react'],
        clean: !opts.watch,
        outDir: "dist",
        target: "es2017",
        dts: true,
        ignoreWatch: [
            "dist",
            "node_modules",
        ],

    }
]));

