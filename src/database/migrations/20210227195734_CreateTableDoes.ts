import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('does', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary('does_pk');
    table.uuid('doer_id').notNullable();
    table.uuid('todo_id').notNullable();
    table.timestamps(true, true);

    table.foreign('doer_id', 'does_user_fk').references('user.id').onUpdate('CASCADE').onDelete('SET NULL');
    table.foreign('todo_id', 'does_todo_fk').references('todo.id').onUpdate('CASCADE').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('does');
}

