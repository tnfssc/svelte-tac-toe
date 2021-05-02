import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import RollupESLintPlugin from "@rollup/plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      plugins: [RollupESLintPlugin()],
    },
  },
});
