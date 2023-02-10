import Request from "supertest";
import { createUser } from "../../src/services/users/createUser";
const app = require("../../src/app");

const email = `isaac@gmail.com22222222222${Math.random()}`;

test("Deve Receber Token ao Logar", () => {
  return Request(app)
    .post("/users")
    .send({
      name: "isaac",
      email: email,
      password: "123456",
    })
    .then((response) => {
      Request(app)
        .post("/auth/signIn")
        .send({ email: email, password: "123456" })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("token");
        });
    });
});
