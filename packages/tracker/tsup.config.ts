import { Options, defineConfig } from 'tsup';

const cfg: Options = {
    splitting: false,
    sourcemap: true,
    treeshake: false,
    dts: true,
    format: ['cjs', 'esm'],
};

export default defineConfig((opts) => ([
    {
        ...cfg,
        entry: ['src/index.ts'],
        clean: !opts.watch,
    },
    {
        ...cfg,
        entry: {
            index: 'src/react/index.tsx'
        },
        external: ['react'],
        outDir: "dist/react",
        esbuildOptions: (options) => {
            options.banner = {
                js: '"use client";',
            };
        },
        clean: !opts.watch,
    },
    {
        ...cfg,
        entry: {
            index: "src/entry.ts"
        },
        format: ['iife'],
        minify: true,
        clean: !opts.watch,
    }
]));
