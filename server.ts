import Fastify from "fastify";

import helmet from "fastify-helmet";
import cors from "fastify-cors";
import staticServer from "fastify-static";

import path from "path";
import { config as DotEnvConfig } from "dotenv";

import type { VercelRequest, VercelResponse } from "@vercel/node";

DotEnvConfig();

const app = Fastify({ logger: process.env.NODE_ENV === "development" });

if (process.env.NODE_ENV === "development") app.register(cors);
app.register(helmet);
app.register(staticServer, { root: path.join(__dirname, "../dist") });

app.get("/api/cool", async () => "Hello There");

if (process.env.NODE_ENV === "development")
  app.listen(process.env.PORT || 3001, "127.0.0.1", () =>
    console.log(`Listening on ${process.env.PORT || 3001}`)
  );

export default async function Server(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  await app.ready();
  app.server.emit("request", req, res);
}
