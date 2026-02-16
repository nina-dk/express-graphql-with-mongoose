import mongoose from 'mongoose';
import dbconfig from './config.js';

export async function connectDB(uri = dbconfig.mongoConnectionString) {
  await mongoose.connect(uri);
  console.log('✅ Database connected');
}
