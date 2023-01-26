import { Router, Request, Response } from "express";
const router = Router();
import { findAll } from "../services/users/findAll";
import { createUser } from "../services/users/createUser";

router.get("/users", async (req: Request, res: Response) => {
  const users = await findAll();
  res.status(200).json(users);
});

router.post("/users", async (req: Request, res: Response) => {
  const create = await createUser(req);
  res.status(201).json(create[0]);
});

module.exports = router;
