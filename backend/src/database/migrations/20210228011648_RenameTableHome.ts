import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.renameTable('home','homes');
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.renameTable('homes','home');
}

