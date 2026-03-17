import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transactions", (table) => {
        table.uuid("id").primary();
        table.uuid("wallet_id")
        .references("id")
        .inTable("wallets");
        table.string("type"); // credit | debit | transfer | withdrawal
        table.decimal("amount", 14, 2);
        table.string("reference").unique();
        table.string("status").defaultTo("success");
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("transactions");
}

