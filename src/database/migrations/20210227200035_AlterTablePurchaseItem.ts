import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('purchase_item', (table) =>{
    table.uuid('buyer_id');

    table.foreign('buyer_id', 'purchase_item_buyer_fk').references('user.id').onUpdate('CASCADE').onDelete('SET NULL');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('purchase_item', (table) =>{
    table.dropForeign(['buyer_id'], 'purchase_item_buyer_fk');
    table.dropColumn('buyer_id');
  })
}

