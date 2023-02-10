import { db } from "../../app";

export const findAll = async () => {
  const users = await db("users").select(["id", "name", "email"]);

  return users;
};
