import { Request, Response } from "express";
import { db } from "../../app";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const jwtSecret = process.env.SECRET;

interface IpayloadToken {
  id: string;
  name: string;
  email: string;
}

const generaToken = ({ id, name, email }: IpayloadToken) => {
  return jwt.sign({ id, name, email }, jwtSecret!, {
    expiresIn: "7d",
  });
};

export const SignIn = async (req: Request, res: Response) => {
  const user = await db("users").where({ email: req.body.email }).first();
  if (!user) return { error: "senha ou email incorreto" };

  if (await bcrypt.compare(req.body.password, user.password)) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const generaTokenUser = generaToken(payload);

    return { token: generaTokenUser };
  }

  return { error: "senha ou email incorreto" };
};
