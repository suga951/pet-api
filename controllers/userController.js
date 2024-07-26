import { PrismaClient } from "@prisma/client";
// import httpStatus from "../helpers/httpStatus.js";

const prisma = new PrismaClient();

export const userController = () => {
  const register = async (_req, res, next) => {
    console.log("Register working");
    res.send("Hello");
  };
  const login = async (_req, res, next) => {};
  const profile = async (_req, res, next) => {};

  return {
    register,
    login,
    profile,
  };
};
