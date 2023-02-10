import { db } from "../../app";
import { Request } from "express";

export const putUpdate = async (id: string, req: Request) => {
  const account = req.body;
  const data = await db("accounts").where({ id: id }).update(account, "*");
  return data;
};
