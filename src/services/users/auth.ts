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
  return jwt.sign({ id, name, email }, process.env.SECRET!, {
    expiresIn: "7d",
  });
};

export const SignIn = async (req: Request, res: Response) => {
  db("users")
    .select("*")
    .where({ email: req.body.email })
    .first()
    .then(async (user) => {
      if (!user) {
        return res.status(400).json({ error: "senha ou email incorreto " });
      }

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({ error: "senha ou email incorreto" });
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const generaTokenUser = await generaToken(payload);

      return res.status(200).json({ token: generaTokenUser });
    })
    .catch((err) => {
      return res.status(400).json({ error: "senha ou email incorreto " });
    });
};
