import { Request, Response } from "express";
import { db } from "../../app";
import jwt from "jsonwebtoken";

export const SignIn = async (req: Request, res: Response) => {
  const user = await db("users").where({ email: req.body.email }).first();
  if (!user) return res.status(400).json({ error: "usuario não encontrado" });

  return user;
};
