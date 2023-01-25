import { Router, Request, Response } from "express";
const router = Router();

router.get("/users", (req: Request, res: Response) => {
  const users = [{ name: "john joe", email: "john@gmail.com" }];
  res.status(200).json(users);
});

router.post("/users", (req: Request, res: Response) => {
  res.status(201).json(req.body);
});

module.exports = router;
