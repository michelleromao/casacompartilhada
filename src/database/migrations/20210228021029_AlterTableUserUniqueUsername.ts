import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.unique(['username']);
    table.unique(['email']);

  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.dropUnique(['username']);
    table.dropUnique(['email']);

  })
}

