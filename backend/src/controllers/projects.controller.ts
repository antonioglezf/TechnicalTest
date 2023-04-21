import { FastifyRequest, FastifyReply } from "fastify";
import { prismaClient } from "../config/db";
import { Project } from "@prisma/client";

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

export const createProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  console.log("RequestBody:", request.body);
  const newProject = request.body as Project;
  try {
    const project = await prismaClient.project.create({
      data: {
        title: newProject.title,
        description: newProject.description,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        status: newProject.status,
      },
    });
    reply.send(project);
  } catch (error: any) {
    reply.status(500).send({ message: error.message });
  }
};
