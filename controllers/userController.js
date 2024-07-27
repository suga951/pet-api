import { PrismaClient } from "@prisma/client";
import httpStatus from "../helpers/httpStatus.js";
import { encrypt, validate } from "../utils/bcrypt.js";

const prisma = new PrismaClient();

export const userController = () => {
  const register = async (req, res, next) => {
    const newUser = req.body;
    const hashedPassword = await encrypt(newUser.password);
    newUser.password = hashedPassword;

    try {
      const createdUser = await prisma.users.create({
        data: newUser,
      });

      const responseFormat = {
        data: createdUser,
        message: "User created successfully",
      };
      return res.status(201).json(responseFormat);
    } catch (err) {
      next(err);
    } finally {
      await prisma.$disconnect();
    }
  };
  const login = async (_req, res, next) => {};
  const profile = async (req, res, next) => {
    const { id } = req.params;
    const userId = Number(id);
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          error: "User not found",
        });
      }
      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      console.error(error.message);
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    register,
    login,
    profile,
  };
};
