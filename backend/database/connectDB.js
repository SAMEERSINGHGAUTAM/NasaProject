import mongoose from "mongoose";

const connectDB = async (dbURL) => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

export default connectDB;
