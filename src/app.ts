import express, { Request, Response } from "express";
const routeUser = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("The sedulous hyena ate the antelope!");
});

app.use(routeUser);

module.exports = app;
