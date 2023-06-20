import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
import { env } from '../env'
import { transactionRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'
const app = fastify()

app.register(cookie);
app.register(transactionRoutes, { prefix: "transactions" });
app.listen({ port: env.PORT }).then(() => {
  console.log('server running');
});
