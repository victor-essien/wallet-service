import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("wallets", (table) => {
        table.uuid("id").primary();
        table.uuid("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
        table.decimal("balance", 14, 2).defaultTo(0);
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("wallets");
}

