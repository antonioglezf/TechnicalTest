import { FastifyRequest, FastifyReply } from "fastify";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = request.body as {
    name: string;
    email: string;
    password: string;
  };

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    reply.status(409).send({
      message: "User with this email already exists",
    });
    return;
  }

  const newUser = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword,
    },
  });

  console.log("User created:", newUser);

  const token = jwt.sign(
    { userId: newUser.id },
    process.env.JWT_SECRET as string
  );

  reply.send({ message: "User registered successfully", token: token });
}

async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    reply.status(401).send({
      message: "Invalid email or password",
    });
    return;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    reply.status(401).send({
      message: "Invalid email or password",
    });
    return;
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);
}

export { register, login };
