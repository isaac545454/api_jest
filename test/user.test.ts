import { response } from "express";
import Request from "supertest";

const app = require("../src/app");

test("deve listar os usuarios", () => {
  return Request(app)
    .get("/users")
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty("name", "john joe");
    });
});

test("deve inserir o usuario com sucesso", () => {
  return Request(app)
    .post("/users")
    .send({ name: "isaac", email: "isaac@gmail.com" })
    .then((response) => {
      expect(response.status).toBe(201);
      expect(response.body.name).toBe("isaac");
    });
});
