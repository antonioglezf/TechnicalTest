import fastify, { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import { authRoutes, projects } from "./routes";

const server: FastifyInstance = fastify({ logger: true });
server.register(fastifyCors, {});
server.register(authRoutes);
server.register(projects);

export default server;
