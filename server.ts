import Fastify from "fastify";

import helmet from "fastify-helmet";
import cors from "fastify-cors";

import { config as DotEnvConfig } from "dotenv";

import type { VercelRequest, VercelResponse } from "@vercel/node";

DotEnvConfig();

const app = Fastify({ logger: process.env.NODE_ENV === "development" });

if (process.env.NODE_ENV === "development") app.register(cors);
app.register(helmet);

app.get("/*", async () => "Hello There");

export default async function Server(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  await app.ready();
  app.server.emit("request", req, res);
}
