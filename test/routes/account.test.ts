import Request from "supertest";
const app = require("../../src/app");
import { createUser } from "../../src/services/users/createUser";

interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

const MAIN_ROUTE = "/accounts";

let user: IUser = {
  id: 13,
  email: "user@example.com",
  name: "user",
  password: "123456",
};

test("deve inserir uma conta com sucesso", () => {
  return Request(app)
    .post(MAIN_ROUTE)
    .send({ name: "Acc #1", user_id: user.id })
    .then((response) => {
      console.log(response.body.name);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Acc #1");
    });
});
