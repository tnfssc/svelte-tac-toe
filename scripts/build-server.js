/* eslint-disable @typescript-eslint/no-var-requires */

require("esbuild").buildSync({
  entryPoints: ["./server.ts"],
  bundle: true,
  platform: "node",
  target: ["node12"],
  outfile: "index.js",
  minify: process.env.NODE_ENV === "production",
  external: ["path"],
});
