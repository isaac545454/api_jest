import { response } from "express";
import Request from "supertest";
import { db } from "../../src/app";
import { findAOne } from "../../src/services/users/findOne";

const app = require("../../src/app");

const email = `isaac@gmail.com22222222222${Math.random()}`;

test("deve listar os usuarios", () => {
  return Request(app)
    .get("/users")
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("name", "isaac");
    });
});

test("deve inserir o usuario com sucesso", () => {
  return Request(app)
    .post("/users")
    .send({
      name: "isaac",
      email: email,
      password: "123456",
    })
    .then((response) => {
      expect(response.status).toBe(201);
      expect(response.body.name).toBe("isaac");
      expect(response.body).not.toHaveProperty("password");
    });
});

test("não deve inserir usuario sem o nome", () => {
  return Request(app)
    .post("/users")
    .send({
      email: email,
      password: "123456",
    })
    .then((response) => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("nome é um atributo obrigatorio");
    });
});

test("não deve inserir usuario sem o email", async () => {
  const results = await Request(app).post("/users").send({
    name: "isaac",
    password: "123456",
  });
  expect(results.status).toBe(400);
  expect(results.body.error).toBe("email é um atributo obrigatorio");
});

test("não deve inserir usuario sem senha", (done) => {
  Request(app)
    .post("/users")
    .send({
      name: "isaac",
      email: `isaac@gmail.com2222222222`,
    })
    .then((response) => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("senha é um atributo obrigatorio");
      done();
    });
});

test("não deve inserir usuarios com email ja existente", () => {
  return Request(app)
    .post("/users")
    .send({
      name: "isaac",
      email: email,
      password: "123456",
    })
    .then((response) => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("já existe um usuario com esse email");
    });
});

test("Deve armazenar a senha Criptografada", async () => {
  const email2 = `isaac@gmail.com22222222222${Math.random()}`;
  const res = await Request(app).post("/users").send({
    name: "isaac teste",
    email: email2,
    password: "123456",
  });

  expect(res.status).toBe(201);
  const { id } = res.body;
  const userDB = await findAOne(id);
  expect(userDB.password).not.toBeUndefined();

  expect(userDB.password).not.toBe("123456");
});
