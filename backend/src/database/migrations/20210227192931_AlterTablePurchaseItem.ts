import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('purchase_item', (table) =>{
    table.uuid('creator_id').notNullable();
    table.uuid('home_id').notNullable();

    table.foreign('creator_id', 'purchase_item_user_fk').references('user.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('home_id', 'purchase_item_home_fk').references('home.id').onUpdate('CASCADE').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('purchase_item', (table) =>{
    table.dropForeign(['creator_id'], 'purchase_item_user_fk');
    table.dropForeign(['home_id'], 'purchase_item_home_fk');

    table.dropColumn('creator_id');
    table.dropColumn('home_id');
  })
}

