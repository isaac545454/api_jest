import { db } from "../../app";

interface IAccounts {
  name: string;
  user_id: number;
}

interface IAccountsResponse {
  id: number;
  name: string;
  user_id: number;
}

export const CreateAccounts = async (
  accounts: IAccounts
): Promise<IAccountsResponse[]> => {
  const save = async (accounts: IAccounts) => {
    return await db("accounts").insert(accounts, "*");
  };

  return await save(accounts);
};
