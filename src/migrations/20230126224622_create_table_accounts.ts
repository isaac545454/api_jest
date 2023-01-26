import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("accounts", (t) => {
    t.increments("id").primary();
    t.string("name").notNullable();
    t.integer("user_id").references("id").inTable("users").notNullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("accounts");
};
