import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import { petRoutes } from "./routes/petRouter.js";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3002;
const app = express();

app.use(express.json());

app.use("/api", petRoutes(), userRouter());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
