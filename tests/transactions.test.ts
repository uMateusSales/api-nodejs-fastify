import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { number, string } from "zod";

describe("transaction routes", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  test("checar se transação pode ser criada", async () => {
    await request(app.server)
      .post("/transactions")
      .send({ title: "nova transação", amount: 500, type: "credit" })
      .expect(201);
  });

  test("checar se consegue listar todas a transações", async () => {
    const createTransaction = await request(app.server)
      .post("/transactions")
      .send({ title: "nova transação", amount: 500, type: "credit" });

    const cookies = createTransaction.get("Set-Cookie");

    const listTransactions = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    expect(listTransactions.body.transactions).toEqual([
      expect.objectContaining({ title: "nova transação", amount: 500 }),
    ]);
  });
});
