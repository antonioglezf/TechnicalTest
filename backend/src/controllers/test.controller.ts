import { FastifyRequest, FastifyReply } from "fastify";

async function getTest(_request: FastifyRequest, reply: FastifyReply) {
  return { hello: "world", nombre: "Antonio" };
}

export { getTest };
