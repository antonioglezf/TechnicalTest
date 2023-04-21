import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const authorization = request.headers["auth-token"] as string;
  console.log("authorization;", authorization);
  if (!authorization) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
  const token = request.headers["auth-token"] as string;
  if (!token) {
    return reply.code(401).send({ message: "Access Denied" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    return payload;
  } catch (err) {
    return reply.code(401).send({ message: "Invalid Token" });
  }
}
