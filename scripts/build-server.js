/* eslint-disable */

require("esbuild").buildSync({
  entryPoints: ["./server.ts"],
  format: "cjs",
  bundle: false,
  platform: "node",
  target: ["node10"],
  outdir: "./build",
  minify: process.env.NODE_ENV === "production",
});
