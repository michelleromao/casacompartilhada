import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('home', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary('home_pk');
    table.string('name').notNullable();
    table.timestamps(true, true);

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('home');
}

