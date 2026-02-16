import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import cors from 'cors';
import schema from './src/graphql/schema.js';

const app = express();

app.use(cors());

app.post('/graphql', createHandler({ schema }));

app.get(
  '/graphql',
  createHandler({
    schema,
    graphiql: true,
  }),
);

export default app;
