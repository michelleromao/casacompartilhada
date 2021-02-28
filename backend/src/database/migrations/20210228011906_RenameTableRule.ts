import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.renameTable('rule','rules');
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.renameTable('rules','rule');
}

