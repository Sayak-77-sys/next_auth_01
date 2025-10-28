import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
      throw new Error("MONGODB_URL environment variable is not set");
    }

    await mongoose.connect(mongoUrl);
    const connection = mongoose.connection;

    isConnected = true;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error:", err);
      isConnected = false;
    });

    connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      isConnected = false;
    });
  } catch (error) {
    console.log("Error connecting to database", error);
    isConnected = false;
    throw error;
  }
}
