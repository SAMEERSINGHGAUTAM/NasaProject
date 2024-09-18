import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import userAuthRouter from "./routes/user-router.js";

const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();
connectDB(process.env.MONGODB_URI);

app.use(express.json());

app.use("/api/users/auth", userAuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
