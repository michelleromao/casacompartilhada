import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('todo', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary('todo_pk');
    table.string('task').notNullable();
    table.enu('frequency',['daily','weekly','monthly']).notNullable();
    table.string('day_of_week');
    table.integer('day_of_month');
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('todo');
}


