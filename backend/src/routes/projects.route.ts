import fastify, { FastifyInstance } from "fastify";
import { getAllProjects } from "../controllers/projects.controller";
import { validate } from "../middlewares/validate";

export function projects(
  fastify: FastifyInstance,
  _options: any,
  done: () => void
) {
  fastify.get(
    "/api/projects",
    {
      preValidation: validate,
    },
    getAllProjects
  );
  done();
}
