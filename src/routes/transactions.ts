import { FastifyInstance } from "fastify";
import { knex } from "../database";
import z from "zod";
import { randomUUID } from "crypto";
import { checkSessionId } from "../middleware/check-session-id";
import cookie from "@fastify/cookie";
export async function transactionRoutes(app: FastifyInstance) {
  app.get("/", { preHandler: checkSessionId }, async (request) => {
    const { sessionId } = request.cookies;

    const transactions = await knex("transactions")
      .select()
      .where({ session_id: sessionId });

    return { transactions };
  }),
    app.get("/summary", { preHandler: checkSessionId }, async (request) => {
      const { sessionId } = request.cookies;
      const summary = await knex("transactions")
        .where({ session_id: sessionId })
        .sum("amount", { as: "amount" })
        .first();

      return { summary };
    }),
    app.get("/:id", { preHandler: checkSessionId }, async (request) => {
      const getTransacationParamsSchema = z.object({
        id: z.string().uuid(),
      });
      const { id } = getTransacationParamsSchema.parse(request.params);
      const { sessionId } = request.cookies;
      const transaction = await knex("transactions")
        .where({ session_id: sessionId, id: id })
        .first();
      return { transaction };
    });

  app.post("/", { preHandler: checkSessionId }, async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    const transaction = await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId,
    });
    return reply.status(201).send(transaction);
  });
}
