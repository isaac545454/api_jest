import { Request } from "express";
import { db } from "../../app";

export const createUser = async (req: Request) => {
  const createUser = await db("users").insert(req.body, "*");

  return createUser;
};
