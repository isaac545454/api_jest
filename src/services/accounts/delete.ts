import { db } from "../../app";

export const deleteAccounts = async (id: string) => {
  const account = await db("accounts").where({ id: id }).del();
  return account;
};
