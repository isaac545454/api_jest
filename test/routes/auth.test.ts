import Request from "supertest";
const app = require("../../src/app");

const email = `isaac@gmail.com22222222222${Math.random()}`;

test("deve criar usuario via signUp", () => {
  return Request(app)
    .post("/auth/signUp")
    .send({
      name: "walter",
      email: `walte@gmail.com22222222222${Math.random()}`,
      password: "123456",
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("walter");
      expect(res.body).toHaveProperty("email");
      expect(res.body).not.toHaveProperty("password");
    });
});

test("Deve Receber Token ao Logar", async () => {
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
        .send({ email: response.body.email, password: "123456" })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("token");
        });
    });
});

test("não deve authenticar com senha errada", async () => {
  return Request(app)
    .post("/auth/signIn")
    .send({ name: "isaac", email: "isaacLouc@gmail.com", password: "123456" })
    .then((response) => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("senha ou email incorreto");
    });
});

test("não deve acessar rotas protegidas", async () => {
  return Request(app)
    .get("/users")
    .then((response) => {
      expect(response.status).toBe(401);
    });
});
