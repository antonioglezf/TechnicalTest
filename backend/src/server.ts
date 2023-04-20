import fastify, { FastifyInstance } from "fastify";
import { prismaClient } from "./config/db";
import fastifyCors from "@fastify/cors";
import { authRoutes, testRoutes } from "./routes";

export function Server() {
  const server: FastifyInstance = fastify({ logger: true });

  async function start() {
    server.register(fastifyCors, {});
    server.register(testRoutes);
    server.register(authRoutes);

    if (!prismaClient.$connect) {
      console.error("Prisma client is not connected!");
      return;
    }

    try {
      await server.listen({ port: 3000, host: "0.0.0.0" });
      const address = server.server.address();
      const port = typeof address === "string" ? address : address?.port;
      server.log.info(`Server listening on port ${port}`);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  }

  async function stop() {
    await server.close();
    await prismaClient.$disconnect();
  }

  return { start, stop };
}
