import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('purchase_item', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary('purchase_item_pk');
    table.string('item').notNullable();
    table.boolean('status').notNullable();
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('purchase_item');
}

