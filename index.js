import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { expressjwt as ejwt } from "express-jwt";
import userRouter from "./routes/userRouter.js";
import { petRoutes } from "./routes/petRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3002;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.use(
  ejwt({
    secret: process.env.SECRET_KEY,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/login", "/api/register"],
  }),
);

app.use("/api", petRoutes(), userRouter());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
