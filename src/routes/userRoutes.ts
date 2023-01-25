import { Router, Request, Response } from "express";
const router = Router();
import { db } from "../app";

router.get("/users", async (req: Request, res: Response) => {
  const users = await db("users").select();
  res.status(200).json(users);
});

router.post("/users", async (req: Request, res: Response) => {
  const createUser = await db("users").insert(req.body, "*");
  console.log(createUser);

  res.status(201).json(createUser[0]);
});

module.exports = router;
