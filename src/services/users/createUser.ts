import { Request } from "express";
import { db } from "../../app";

interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

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

  const createUser = await db("users").insert(req, ["id", "name", "email"]);

  return createUser as IUser[];
};
