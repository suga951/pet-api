import { compare, hash } from "bcrypt";

const encrypt = async (password) => {
  return await hash(password, 10);
};

const validate = async (password, hash) => {
  return await compare(password, hash);
};

export { encrypt, validate };
