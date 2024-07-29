import Joi from "joi";

export const petSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(40).required(),
    species: Joi.string().max(40).required(),
    breed: Joi.string().max(40).required(),
    age: Joi.number().required(),
    ownerId: Joi.number().required(),
  }),
});
