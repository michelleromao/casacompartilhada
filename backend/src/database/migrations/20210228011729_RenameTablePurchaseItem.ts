import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.renameTable('purchase_item','purchase_items');
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.renameTable('purchase_items','purchase_item');
}

