import fastify, { FastifyInstance } from "fastify";
import { Prisma, PrismaClient } from "@prisma/client";
import fastifyCors from "@fastify/cors";
import { authRoutes, testRoutes } from "./routes";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const server: FastifyInstance = fastify({ logger: true });
server.register(fastifyCors, {});

server.register(testRoutes);
server.register(authRoutes);

const start = async () => {
  if (!prisma.$connect) {
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
};

start();
