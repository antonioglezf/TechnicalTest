import { FastifyInstance } from "fastify";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";

function authRoutes(fastify: FastifyInstance, _options: any, done: () => void) {
  fastify.post("/api/register", register);
  fastify.post("/api/login", login);
  fastify.get("/api/validate", validate);
  done();
}

export { authRoutes };
