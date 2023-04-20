import { FastifyInstance } from "fastify";
import { getTest } from "../controllers";

function testRoutes(fastify: FastifyInstance, _options: any, done: () => void) {
  fastify.get("/", getTest);
  done();
}

export { testRoutes };
