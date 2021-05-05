/* eslint-disable @typescript-eslint/no-var-requires */

require("esbuild").buildSync({
  entryPoints: ["./server.ts"],
  bundle: true,
  platform: "node",
  target: ["node12"],
  outdir: "./build",
  minify: process.env.NODE_ENV === "production",
  external: ["path"],
});
