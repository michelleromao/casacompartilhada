import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.renameTable('bill','bills');
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.renameTable('bills','bill');
}

