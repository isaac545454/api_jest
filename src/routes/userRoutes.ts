import { Router, Request, Response } from "express";
const router = Router();
import { findAll } from "../services/users/findAll";
import { createUser } from "../services/users/createUser";
import { CreateAccounts } from "../services/accounts/create";
import { getAllAccounts } from "../services/accounts/getAll";
import { getFindOne } from "../services/accounts/getfindOne";
import { putUpdate } from "../services/accounts/putUpdate";
import { deleteAccounts } from "../services/accounts/delete";
import { SignIn } from "../services/users/auth";
import { auth } from "../moddlwares/auth";

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

router.get("/users", auth, async (req: Request, res: Response) => {
  const users: ListUser[] = await findAll();
  res.status(200).json(users);
});

router.post("/users", auth, async (req: Request, res: Response) => {
  const create: any = await createUser(req.body);
  if (create.error) return res.status(400).json(create);
  res.status(201).json(create[0]);
});

router.post("/accounts", auth, async (req: Request, res: Response) => {
  if (!req.body.name)
    return res.status(400).json({ error: "nome é um atributo obrigatorio" });
  const responseCreateAccounts = await CreateAccounts(req.body);
  return res.status(201).json(responseCreateAccounts[0]);
});

router.get("/accounts", auth, async (req: Request, res: Response) => {
  const data = await getAllAccounts();
  return res.status(200).json(data);
});

router.get("/accounts/:id", auth, async (req: Request, res: Response) => {
  const data = await getFindOne(req.params.id);
  return res.status(200).json(data);
});

router.put("/accounts/:id", auth, async (req: Request, res: Response) => {
  const data = await putUpdate(req.params.id, req);
  return res.status(200).json(data[0]);
});

router.delete("/accounts/:id", auth, async (req: Request, res: Response) => {
  const data = await deleteAccounts(req.params.id);
  return res.status(204).json(data);
});

router.post("/auth/signIn", async (req: Request, res: Response) => {
  if (req.body.email === "")
    return res.status(400).json({ error: "email é um atributo obrigatorio" });
  if (req.body.password === "")
    return res
      .status(400)
      .json({ error: "password é um atributo obrigatorio" });
  const data = await SignIn(req, res);
  // if (data.error) return res.status(400).json(data);

  // return res.json(data);
});

router.post("/auth/signUp", async (req: Request, res: Response) => {
  const create: any = await createUser(req.body);
  if (create.error) return res.status(400).json(create);
  res.status(201).json(create[0]);
});

module.exports = router;
