import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/cli.ts"),
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
      ],
      output: {
        banner: "#!/usr/bin/env node",
      },
    },
    sourcemap: true,
    minify: false,
  },
});

