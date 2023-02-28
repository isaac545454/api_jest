import express, { Request, Response } from "express";
const routeUser = require("./routes/userRoutes");
import { knex } from "knex";
import config from "../knexfile";

const app = express();
export const db = knex(config.test);

app.use(express.json());
app.set("db", "../knexfile");

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("The sedulous hyena ate the antelope!");
});

app.use(routeUser);

module.exports = app;
