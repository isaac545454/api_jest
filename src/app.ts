import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("The sedulous hyena ate the antelope!");
});

app.get("/users", (req: Request, res: Response) => {
  const users = [{ name: "john joe", email: "john@gmail.com" }];
  res.status(200).json(users);
});

app.post("/users", (req, res) => {
  res.status(201).json(req.body);
});

module.exports = app;
