import fastify, { FastifyInstance } from "fastify";
import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "./types/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fastifyCors from "@fastify/cors";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:antonio@localhost:5414/postgres",
    },
  },
});

const server: FastifyInstance = fastify({ logger: true });
server.register(fastifyCors, {
  // your options here, if needed
});

server.get("/", async (_request, reply) => {
  return { hello: "world", nombre: "Antonio" };
});

server.post("/api/register", async (request, reply) => {
  const { name, email, password } = request.body as User;
  console.log(request.body);
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
});

server.post("/api/login", async (request, reply) => {
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

  reply.send({ token: token });
});

const start = async () => {
  if (!prisma.$connect) {
    console.error("Prisma client is not connected!");
    return;
  }
  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    server.log.info(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
