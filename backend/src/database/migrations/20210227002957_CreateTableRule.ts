import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('rule', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary('rule_pk');
    table.string('description').notNullable();
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('rule');
}

