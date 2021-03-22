import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('home', (table) =>{
    table.uuid('creator_id').notNullable();
    table.foreign('creator_id', 'home_user_fk').references('user.id').onUpdate('CASCADE').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('home', (table) =>{
    table.dropForeign(['creator_id'], 'home_user_fk');
    table.dropColumn('creator_id');
  })
}

