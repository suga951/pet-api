import express from "express";
import dotenv from "dotenv";
// import userRouter from "./routes/userRouter.js";
import { petRoutes } from "./routes/petRouter.js";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3002;
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World! //Login page");
});

app.get("/api/vet", (_req, res) => {
  res.send("Vet endpoint here.");
});

app.get("/api/client", (_req, res) => {
  res.send("Client endpoint here.");
});

app.use("/api", petRoutes());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
