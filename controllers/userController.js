import { PrismaClient } from "@prisma/client";
import httpStatus from "../helpers/httpStatus.js";
import { generateToken, verifyToken } from "../utils/tokenManagement.js";
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
  const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          error: "User not found",
        });
      }
      const passwordValid = await validate(password, user.password);

      if (!passwordValid) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          error: "Wrong password",
        });
      }
      const token = generateToken({ data: { email, role: user.role } });
      const refreshToken = generateToken({
        data: { email, role: user.role },
        isRefresh: true,
        expiresIn: "7d",
      });
      return res.status(httpStatus.OK).json({
        success: true,
        token,
        refreshToken,
      });
    } catch (err) {
      next(err);
    } finally {
      await prisma.$disconnect();
    }
  };

  const refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;

    try {
      const { role, email } = verifyToken(refreshToken, true);
      const token = generateToken({
        data: { email, role, message: "Token refreshed successfully" },
      });

      return res.status(httpStatus.OK).json({
        success: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  };

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
    refreshToken,
  };
};
