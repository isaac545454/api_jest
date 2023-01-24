import { response } from "express";
import Request from "supertest";

const app = require("../src/app");

interface IResponse {
  name: string | null;
}

test("deve listar os usuarios", () => {
  return Request(app)
    .get("/users")
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty("name", "john joe");
    });
});
