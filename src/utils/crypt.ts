import bcrypt from "bcryptjs";

const SALT_ROUNDS = 15;

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return hashedPassword;
};

export default hashPassword;
