import { Router, Request, Response } from "express";
const router = Router();
import { findAll } from "../services/users/findAll";
import { createUser } from "../services/users/createUser";
import { CreateAccounts } from "../services/accounts/create";
import { getAllAccounts } from "../services/accounts/getAll";
import { getFindOne } from "../services/accounts/getfindOne";
import { putUpdate } from "../services/accounts/putUpdate";
import { deleteAccounts } from "../services/accounts/delete";
import { NextFunction } from "connect";

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
  if (!req.body.name)
    return res.status(400).json({ error: "nome é um atributo obrigatorio" });
  const responseCreateAccounts = await CreateAccounts(req.body);
  return res.status(201).json(responseCreateAccounts[0]);
});

router.get("/accounts", async (req: Request, res: Response) => {
  const data = await getAllAccounts();
  return res.status(200).json(data);
});

router.get("/accounts/:id", async (req: Request, res: Response) => {
  const data = await getFindOne(req.params.id);
  return res.status(200).json(data);
});

router.put("/accounts/:id", async (req: Request, res: Response) => {
  const data = await putUpdate(req.params.id, req);
  return res.status(200).json(data[0]);
});

router.delete("/accounts/:id", async (req: Request, res: Response) => {
  const data = await deleteAccounts(req.params.id);
  return res.status(204).json(data);
});

module.exports = router;
