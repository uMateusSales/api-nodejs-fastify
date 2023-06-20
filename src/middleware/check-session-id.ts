import { FastifyRequest, FastifyReply } from "fastify";

export async function checkSessionId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    return reply.status(401).send({ error: "Session not found" });
  }
}
