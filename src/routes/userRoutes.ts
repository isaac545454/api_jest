import { Router, Request, Response } from "express";
const router = Router();
import { findAll } from "../services/users/findAll";
import { createUser } from "../services/users/createUser";
import { CreateAccounts } from "../services/accounts/create";
import { getAllAccounts } from "../services/accounts/getAll";

interface Create {
  error?: {
    error: string;
  };
  createUser?: ListUser[];
}

interface ListUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

router.get("/users", async (req: Request, res: Response) => {
  const users: ListUser[] = await findAll();
  res.status(200).json(users);
});

router.post("/users", async (req: Request, res: Response) => {
  const create: any = await createUser(req.body);
  if (create.error) return res.status(400).json(create);
  res.status(201).json(create[0]);
});

router.post("/accounts", async (req: Request, res: Response) => {
  const responseCreateAccounts = await CreateAccounts(req.body);
  return res.status(201).json(responseCreateAccounts[0]);
});

router.get("/accounts", async (req, res) => {
  const data = await getAllAccounts();
  return res.status(200).json(data);
});

module.exports = router;
