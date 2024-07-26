import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const petController = () => {
  const getPets = async (req, res, next) => {
    const { query } = req;

    try {
      const pets = await prisma.pet.findMany({
        where: {
          name: {
            contains: query?.name ?? "",
          },
        },
      });
      const responseFormat = {
        data: pets,
        message: "Pets retrieved successfully",
      };
      return res.status(200).json(responseFormat);
    } catch (err) {
      next(err);
    } finally {
      await prisma.$disconnect();
    }
  };
  const addPet = async (req, res, next) => {
    const addPet = req.body;

    try {
      const addedPet = await prisma.pet.create({
        data: addPet,
      });
      const responseFormat = {
        data: addedPet,
        message: "Pet added successfully",
      };
      return res.status(201).json(responseFormat);
    } catch (err) {
      next(err);
    } finally {
      await prisma.$disconnect();
    }
  };
  const getPetById = async (req, res, next) => {
    const { id } = req.params;
    const petId = parseInt(id);

    try {
      const pet = await prisma.pet.findUnique({
        where: {
          id: petId,
        },
      });
      const responseFormat = {
        data: pet,
        message: "Pet retrieved successfully",
      };
      return res.status(200).json(responseFormat);
    } catch (err) {
      next(err);
    } finally {
      await prisma.$disconnect();
    }
  };
  const deletePetById = async (_req, res, next) => {};
  const updatePetById = async (_req, res, next) => {};

  return {
    getPets,
    addPet,
    getPetById,
    deletePetById,
    updatePetById,
  };
};
