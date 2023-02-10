import { Request } from "express";
import { db } from "../../app";
import bcript from "bcrypt";

interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

const hashPassword = (password: string) => {
  const salt = bcript.genSaltSync(10);
  return bcript.hashSync(password, salt);
};

export const createUser = async (req: IUser) => {
  if (!req.name) return { error: "nome é um atributo obrigatorio" };
  if (!req.email) return { error: "email é um atributo obrigatorio" };
  if (!req.password) return { error: "senha é um atributo obrigatorio" };
  const dbUser = await db("users")
    .where({ email: req.email })
    .select(["id", "name", "email"]);
  if (dbUser && dbUser.length > 0) {
    return { error: "já existe um usuario com esse email" };
  }

  req.password = hashPassword(req.password);

  const createUser = await db("users").insert(req, ["id", "name", "email"]);

  return createUser as IUser[];
};
