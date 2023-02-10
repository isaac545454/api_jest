import { db } from "../../app";

export const getFindOne = async (id: string) => {
  const accounts = await db("accounts").where({ id: id }).first();
  return accounts;
};
