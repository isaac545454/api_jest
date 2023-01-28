import { db } from "../../app";

export const getAllAccounts = async () => {
  const data = await db("accounts").select();

  return data;
};
