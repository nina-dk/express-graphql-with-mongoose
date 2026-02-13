import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import mongoose from 'mongoose';
import cors from 'cors';

import schema from './src/graphql/schema.js';
import dbconfig from './config.js';

const app = express();
const port = 3000;

/* MongoDB connection */
try {
  await mongoose.connect(dbconfig.mongoConnectionString);
  console.log('✅ Database connected');
} catch (error) {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
}

// app.post(
//   '/graphql',
//   createHandler({
//     schema,
//   }),
// );

// /* GraphQL endpoint */
// app.use(
//   '/graphql',
//   createHandler({
//     schema,
//     graphiql: true,
//   }),
// );

app.use(cors());

/* GraphQL POST (queries & mutations) */
app.post(
  '/graphql',
  createHandler({
    schema,
  }),
);

/* GraphiQL UI (GET request) */
app.get(
  '/graphql',
  createHandler({
    schema,
    graphiql: true,
  }),
);

/* Start server */
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/graphql`);
});
