const request: any = require("supertest");

const app = require("../src/app");

test("deve responder na raiz", () => {
  return request.get("/").then((res: Response) => {
    expect(res.status).toBe(200);
  });
});
