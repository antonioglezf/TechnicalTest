import { FastifyRequest, FastifyReply } from "fastify";
import { prismaClient } from "../config/db";

export const getAllProjects = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const projects = await prismaClient.project.findMany();
    reply.send(projects);
  } catch (error: any) {
    reply.status(500).send({ message: error.message });
  }
};
