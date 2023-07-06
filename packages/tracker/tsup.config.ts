import { Options, defineConfig } from "tsup";

const cfg: Options = {
  splitting: false,
  sourcemap: true,
  treeshake: false,
  dts: true,
  format: ["cjs", "esm"],
};

export default defineConfig(() => [
  {
    ...cfg,
    entry: {
      index: "src/lib.ts",
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
    ...cfg,
    entry: {
      index: "src/entry.ts",
    },
    format: ["iife"],
    minify: true,
  },
]);
