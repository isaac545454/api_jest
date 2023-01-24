import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("The sedulous hyena ate the antelope!");
});

app.get("/users", (req: Request, res: Response) => {
  const users = [{ name: "john joe", email: "john@gmail.com" }];
  res.status(200).json(users);
});

module.exports = app;
