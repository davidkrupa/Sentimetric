// Pattern for reduce number of connections in serverles environment - Vercel

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Create an object to store the connection and promise
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  // If a connection already exists, return it immediately
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  // If there is no existing promise, create one connecting to the database
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "sentimetric",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  // Return the established connection
  return cached.conn;
};
