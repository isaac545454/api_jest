import Request from "supertest";
import { db } from "../../src/app";
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
      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Acc #1");
    });
});

test("deve listar todas as contas ", () => {
  return Request(app)
    .post(MAIN_ROUTE)
    .send({ name: "Acc #1", user_id: user.id })
    .then((res) => {
      Request(app)
        .get(MAIN_ROUTE)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.length).toBeGreaterThan(0);
        });
    });
});

test("deve retornar uma conta por id", () => {
  return Request(app)
    .post(MAIN_ROUTE)
    .send({ name: "Acc #1", user_id: user.id })
    .then((res) =>
      Request(app)
        .get(`${MAIN_ROUTE}/${res.body.id}`)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.name).toBe("Acc #1");
          expect(response.body.user_id).toBe(user.id);
        })
    );
});

test("deve alterar una conta", () => {
  return Request(app)
    .post(MAIN_ROUTE)
    .send({ name: "Acc update", user_id: user.id })
    .then((res) => {
      Request(app)
        .put(`${MAIN_ROUTE}/${res.body.id}`)
        .send({ name: "Acc update 2" })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.name).toBe("Acc update 2");
        });
    });
});

test("deve remover uma conta", () => {
  return Request(app)
    .post(MAIN_ROUTE)
    .send({ name: "Acc update", user_id: user.id })
    .then((res) => {
      Request(app)
        .delete(`${MAIN_ROUTE}/${res.body.id}`)
        .then((response) => {
          expect(response.status).toBe(204);
        });
    });
});
