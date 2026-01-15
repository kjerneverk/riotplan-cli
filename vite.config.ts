import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/cli.ts",
      name: "riotplan-cli",
      fileName: () => "cli.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "commander",
        "chalk",
        "riotplan",
        "node:fs",
        "node:path",
        "node:fs/promises",
        "node:process",
        "node:os",
      ],
    },
    sourcemap: true,
    minify: false,
  },
});
