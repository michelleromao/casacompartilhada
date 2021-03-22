import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('pay', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary('pay_pk');
    table.uuid('payer_id').notNullable();
    table.uuid('bill_id').notNullable();
    table.timestamps(true, true);

    table.foreign('payer_id', 'pay_user_fk').references('user.id').onUpdate('CASCADE').onDelete('SET NULL');
    table.foreign('bill_id', 'pay_bill_fk').references('bill.id').onUpdate('CASCADE').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('pay');
}

