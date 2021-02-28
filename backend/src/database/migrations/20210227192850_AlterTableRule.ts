import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('rule', (table) =>{
    table.uuid('creator_id').notNullable();
    table.uuid('home_id').notNullable();

    table.foreign('creator_id', 'rule_user_fk').references('user.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('home_id', 'rule_home_fk').references('home.id').onUpdate('CASCADE').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('rule', (table) =>{
    table.dropForeign(['creator_id'], 'rule_user_fk');
    table.dropForeign(['home_id'], 'rule_home_fk');

    table.dropColumn('creator_id');
    table.dropColumn('home_id');
  })
}

