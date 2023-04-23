import { FastifyRequest, FastifyReply } from "fastify";
import { prismaClient } from "../config/db";
import { PrismaClient, Project } from "@prisma/client";
import jwt from "jsonwebtoken";
import { projects } from "../routes/projects.route";

export const getAllProjects = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token = request.headers["auth-token"];
    if (!token || typeof token !== "string") {
      throw new Error("Token is not defined");
    }

    const decodedToken: any = jwt.verify(
      token,
      process.env.JWT_SECRET! as string
    );
    const userId = decodedToken.userId;
    const projects = await prismaClient.project.findMany({
      where: { userId: userId },
    });

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
  const token = request.headers["auth-token"];
  if (!token || typeof token !== "string") {
    throw new Error("Token is not defined");
  }

  const decodedToken: any = jwt.verify(
    token,
    process.env.JWT_SECRET! as string
  );
  const userId = decodedToken.userId;
  const newProject = request.body as Project;
  try {
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
    reply.send(project);
  } catch (error: any) {
    reply.status(500).send({ message: error.message });
  }
};

export const updateProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers["auth-token"];
  if (!token || typeof token !== "string") {
    throw new Error("Token is not defined");
  }

  const decodedToken: any = jwt.verify(
    token,
    process.env.JWT_SECRET! as string
  );
  const userId = decodedToken.userId;

  const updatedProject = request.body as Project;
  try {
    const project = await prismaClient.project.update({
      where: { id: updatedProject.id },
      data: {
        title: updatedProject.title,
        description: updatedProject.description,
        startDate: updatedProject.startDate,
        endDate: updatedProject.endDate,
        status: updatedProject.status,
      },
    });
    reply.send(project);
  } catch (error: any) {
    reply.status(500).send({ message: error.message });
  }
};
