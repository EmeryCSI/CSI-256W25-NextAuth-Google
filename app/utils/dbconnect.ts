import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}
//this is a global variable that is used to cache the mongoose connection
let cached = global as any;
cached.mongoose = cached.mongoose || { conn: null, promise: null };

//this is an async function that connects to the database
async function dbConnect() {
  //if the connection is already cached, return the cached connection
  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  //if the connection is not cached, create a new connection
  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: true,
    };

    //this is the promise that is used to connect to the database
    cached.mongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB");
        return mongoose;
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      });
  }

  //this is the connection that is used to connect to the database
  try {
    cached.mongoose.conn = await cached.mongoose.promise;
  } catch (error) {
    cached.mongoose.promise = null;
    throw error;
  }

  return cached.mongoose.conn;
}
//export the dbConnect function
export default dbConnect;
