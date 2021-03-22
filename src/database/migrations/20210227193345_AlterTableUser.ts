import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('user', (table) =>{
    table.uuid('home_id');
    table.foreign('home_id', 'user_home_fk').references('home.id').onUpdate('CASCADE').onDelete('SET NULL');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('user', (table) =>{
    table.dropForeign(['home_id'], 'user_home_fk');
    table.dropColumn('home_id');
  })
}

