import esbuild from "esbuild";

esbuild.buildSync({
  entryPoints: ["./server.ts"],
  format: "cjs",
  bundle: false,
  platform: "node",
  target: ["node10"],
  outdir: "./dist/api",
  minify: process.env.NODE_ENV === "production",
});
