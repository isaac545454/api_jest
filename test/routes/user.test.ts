import { response } from "express";
import Request from "supertest";

const app = require("../../src/app");

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
  const math = Math.random();
  return Request(app)
    .post("/users")
    .send({
      name: "isaac",
      email: `isaac@gmail.com22222222222${math}`,
      password: "123456",
    })
    .then((response) => {
      expect(response.status).toBe(201);
      expect(response.body.name).toBe("isaac");
    });
});
