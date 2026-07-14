import mongoose, { Mongoose } from "mongoose";

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("MONGO_URI is not defined.");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
};
