import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("name").notNullable();
    t.string("email").notNullable().unique();
    t.string("password").notNullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("users");
};
