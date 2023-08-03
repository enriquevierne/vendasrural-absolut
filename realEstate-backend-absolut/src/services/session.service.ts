import { compare } from "bcryptjs";
import { User } from "../entities";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn } from "../interfaces";
import { usersRepository } from "../repositories";
import { sign } from "jsonwebtoken";

const create = async ({
  email,
  password,
}: SessionCreate): Promise<SessionReturn> => {
  const foundUser: User | null = await usersRepository.findOneBy({ email });

  if (!foundUser) throw new AppError("Invalid credentials", 401);

  const matchPassword: boolean = await compare(password, foundUser.password);

  if (!matchPassword) throw new AppError("Invalid credentials", 401);

  const token: string = sign(
    { admin: foundUser.admin },
    process.env.SECRET_KEY!,
    { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );
  return { token };
};

export default {create}
