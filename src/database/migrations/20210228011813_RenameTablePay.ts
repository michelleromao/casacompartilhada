import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.renameTable('pay','payments');
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.renameTable('payments','pay');
}

