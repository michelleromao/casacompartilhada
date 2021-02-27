import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('home', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary('home_pk');
    table.string('name').notNullable();
    table.uuid('creator_id').notNullable();
    table.timestamps(true, true);

    table.foreign('creator_id', 'home_user_fk').references('user.id').onUpdate('CASCADE').onDelete('SET NULL');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('home');
}

