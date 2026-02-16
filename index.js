import app from './app.js';
import { connectDB } from './db.js';

const port = 3000;

try {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}/graphql`);
  });
} catch (err) {
  console.error('❌ Startup error', err);
  process.exit(1);
}
