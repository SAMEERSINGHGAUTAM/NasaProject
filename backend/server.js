import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Testing server's GET request");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
