import { Router } from "express";
import { userController } from "../controllers/userController.js";

export const userRouter = () => {
  const userRouter = Router();
  const { register, profile, login } = userController();

  userRouter.route("/register").get(register);
  userRouter.route("/login").post(login);
  userRouter.route("/profile/:id").get(profile);

  return userRouter;
};

export default userRouter;
