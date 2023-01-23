test("devo conhecer ", () => {
  let number = null;
  expect(number).toBeNull();
  number = 10;
  expect(number).toBe(10);
  expect(number).toEqual(10);
  expect(number).not.toBeNull();
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test("devo saber trabalhar com obj", () => {
  const obj = { name: "john", mail: "john@gmail.com" };
  expect(obj).toHaveProperty("name", "john");
  expect(obj.name).toBe("john");

  const obj2 = { name: "John", mail: "john@gmail.com" };
  expect(obj).toBe(obj);
});
