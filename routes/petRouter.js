import { Router } from "express";
import { petController } from "../controllers/petController.js";

export const petRoutes = () => {
  const petRouter = Router();
  const { getPets, addPet } = petController();

  petRouter.route("/pets").get(getPets).post(addPet);

  return petRouter;
};
