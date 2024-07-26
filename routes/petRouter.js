import { Router } from "express";
import { petController } from "../controllers/petController.js";

export const petRoutes = () => {
  const petRouter = Router();
  const { getPets, addPet, getPetById, deletePetById } = petController();

  petRouter.route("/pets").get(getPets).post(addPet);

  petRouter.route("/pets/:id").get(getPetById).delete(deletePetById);
  return petRouter;
};
