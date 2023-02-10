import File from "../../../knexfile";
import { knex } from "knex";

interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export const findAOne = async (id: string): Promise<IUser> => {
  const db = knex(File.test);
  const users = await db("users")
    .select()
    .where({
      id: id,
    })
    .first();

  return users;
};
