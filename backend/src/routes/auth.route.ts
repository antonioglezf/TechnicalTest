import { FastifyInstance } from "fastify";
import { register, login } from "../controllers/auth.controller";

function authRoutes(fastify: FastifyInstance, _options: any, done: () => void) {
  fastify.post("/api/register", register);
  fastify.post("/api/login", login);
  done();
}

export { authRoutes };
