import fastify, { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import { authRoutes, testRoutes } from "./routes";

export async function Server() {
  const server: FastifyInstance = fastify({ logger: true });
  server.register(fastifyCors, {});
  server.register(testRoutes);
  server.register(authRoutes);

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
