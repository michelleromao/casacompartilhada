import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('bill', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary('bil_pk');
    table.string('name').notNullable();
    table.uuid('responsible_id').notNullable();
    table.date('due').notNullable();
    table.float('value', 14,2).notNullable();
    table.boolean('home').notNullable();
    table.boolean('status').notNullable();
    table.timestamps(true, true);

    table.foreign('responsible_id', 'bill_user_fk').references('user.id').onUpdate('CASCADE').onDelete('SET NULL');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bill');
}

