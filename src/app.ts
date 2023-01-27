import express, { Request, Response } from "express";
const routeUser = require("./routes/userRoutes");
import Knex, { knex } from "knex";
import knesFile from "../knexfile";

const app = express();
export const db = knex(knesFile.test);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("The sedulous hyena ate the antelope!");
});

app.use(routeUser);

module.exports = app;
