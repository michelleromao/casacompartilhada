import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('payments', (table) => {
    table.uuid('payer_id').alter().nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('payments', (table) => {
    table.uuid('payer_id').alter().notNullable();
  });
}
