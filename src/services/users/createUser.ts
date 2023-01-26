import { Request } from "express";
import { db } from "../../app";

export const createUser = async (req: Request) => {
  if (!req.body.name) return { error: "nome é um atributo obrigatorio" };
  if (!req.body.email) return { error: "email é um atributo obrigatorio" };
  if (!req.body.password) return { error: "senha é um atributo obrigatorio" };
  const dbUser = await db("users").where({ email: req.body.email }).select();
  if (dbUser && dbUser.length > 0) {
    return { error: "já existe um usuario com esse email" };
  }

  const createUser = await db("users").insert(req.body, "*");

  return createUser;
};
