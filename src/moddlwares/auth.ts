import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const jsonSecret = process.env.SECRET;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ errors: ["acesso negado"] });

  try {
    const verified = jwt.verify(token, jsonSecret);

    next();
  } catch (error) {
    res.status(400).json({ errors: ["token invalido"] });
  }
};
