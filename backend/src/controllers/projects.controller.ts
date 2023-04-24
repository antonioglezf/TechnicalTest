import { FastifyRequest, FastifyReply } from "fastify";
import { prismaClient } from "../config/db";
import { PrismaClient, Project } from "@prisma/client";
import jwt from "jsonwebtoken";
import { projects } from "../routes/projects.route";

export const getAllProjects = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers["auth-token"];
  const decodedToken: any = jwt.verify(
    token! as string,
    process.env.JWT_SECRET! as string
  );
  const userId = decodedToken.userId;
  const projects = await prismaClient.project.findMany({
    where: { userId: userId },
  });
  reply
    .status(200)
    .send({ message: "Projects fetched successfully", projects });
};

export const createProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers["auth-token"];

  const decodedToken: any = jwt.verify(
    token! as string,
    process.env.JWT_SECRET! as string
  );
  const userId = decodedToken.userId;
  const newProject = request.body as Project;
  const project = await prismaClient.project.create({
    data: {
      title: newProject.title,
      description: newProject.description,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      status: newProject.status,
      userId: userId,
    },
  });
  reply.status(200).send({ message: "Project added successfully", project });
};

export const updateProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers["auth-token"];
  const decodedToken: any = jwt.verify(
    token! as string,
    process.env.JWT_SECRET! as string
  );
  const userId = decodedToken.userId;

  const updatedProject = request.body as Project;
  try {
    const project = await prismaClient.project.findUnique({
      where: {
        id: updatedProject.id,
      },
    });
    if (!project) {
      reply.status(404).send({ message: "Project not found" });
      return;
    }
    if (project.userId !== userId) {
      reply.status(401).send({ message: "Unauthorized" });
      return;
    }

    const projectUpdate = await prismaClient.project.update({
      where: {
        id: updatedProject.id,
      },
      include: {
        user: true,
      },
      data: {
        title: updatedProject.title,
        description: updatedProject.description,
        startDate: updatedProject.startDate,
        endDate: updatedProject.endDate,
        status: updatedProject.status,
      },
    });
    reply.status(200).send(projectUpdate);
  } catch (error: any) {
    reply.status(500).send({ message: error.message });
  }
};

interface RequestWithParams {
  params: {
    id: string;
  };
}
export const deleteProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers["auth-token"];
  const decodedToken: any = jwt.verify(
    token! as string,
    process.env.JWT_SECRET! as string
  );
  const userId = decodedToken.userId;

  const projectId = (request as RequestWithParams).params.id;

  const projectIdNumber = parseInt(projectId);

  const project = await prismaClient.project.findUnique({
    where: {
      id: projectIdNumber,
    },
  });

  if (!project) {
    reply.status(404).send({ message: "Project not found" });
    return;
  }

  if (project.userId !== userId) {
    reply.status(401).send({ message: "Unauthorized" });
    return;
  }

  const deletedProject = await prismaClient.project.delete({
    where: {
      id: projectIdNumber,
    },
  });

  reply.status(200).send(deletedProject);
};
