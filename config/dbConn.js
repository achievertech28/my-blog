import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error; // Re-throw to handle in main file
  }
};
