import { Router } from "express";
import { userController } from "../controllers/userController.js";

export const userRouter = () => {
  const userRouter = Router();
  const { register, profile, login } = userController();

  userRouter.route("/register").get(register);
  userRouter.route("/login").post(login);
  userRouter.route("/profile").get(profile);
};

// const userRouter = Router();
// const { register, profile, login } = userController();
//
// // userRouter.get("/api/register", register);
// // userRouter.post("/api/login", login);
// userRouter.get("/profile", profile);
//
// export default userRouter;
