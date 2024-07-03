import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3002;
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
