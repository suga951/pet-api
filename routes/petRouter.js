import { Router } from "express";
import { petController } from "../controllers/petController.js";
import { schemaValidator } from "../middlewares/validations.js";
import { petSchema, petIdSchema } from "../schemas/petSchema.js";

export const petRoutes = () => {
  const petRouter = Router();
  const { getPets, addPet, getPetById, deletePetById, updatePetById } =
    petController();

  petRouter
    .route("/pets")
    .get(getPets)
    .post(schemaValidator(petSchema), addPet);

  petRouter
    .route("/pets/:id")
    .get(getPetById)
    .delete(deletePetById)
    .patch(schemaValidator(petIdSchema), updatePetById);
  return petRouter;
};
