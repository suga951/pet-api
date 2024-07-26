import { Router } from "express";
import { petController } from "../controllers/petController.js";

export const petRoutes = () => {
  const petRouter = Router();
  const { getPets, addPet, getPetById } = petController();

  petRouter.route("/pets").get(getPets).post(addPet);

  petRouter.route("/pets/:id").get(getPetById);
  return petRouter;
};
