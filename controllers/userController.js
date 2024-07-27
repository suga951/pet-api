import { PrismaClient } from "@prisma/client";
import httpStatus from "../helpers/httpStatus.js";

const prisma = new PrismaClient();

export const userController = () => {
  const register = async (_req, res, next) => {};
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
