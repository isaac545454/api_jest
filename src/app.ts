import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("The sedulous hyena ate the antelope!");
});

module.exports = app;
