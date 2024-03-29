import { FastifyInstance } from "fastify";

import { validate } from "../middlewares/validate";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../controllers";

export function projects(
  fastify: FastifyInstance,
  _options: any,
  done: () => void
) {
  fastify.get("/api/projects", { preValidation: validate }, getAllProjects);
  fastify.post("/api/projects/add", { preValidation: validate }, createProject);
  fastify.put(
    "/api/projects/update",
    { preValidation: validate },
    updateProject
  );
  fastify.delete(
    "/api/projects/delete/:id",
    { preValidation: validate },
    deleteProject
  );
  done();
}
