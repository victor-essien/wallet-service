import { db } from "../../database/knex";
import { Wallet, CreateWalletInput } from "./wallet.types";
import { Knex } from "knex";

export class WalletRepository {

    // Create wallet
    async create(wallet: CreateWalletInput, trx: Knex.Transaction): Promise<void> {
        return trx<Wallet>("wallets").insert(wallet)
    }

    // Find wallet by userId
    async findByUserId(userId: string, trx?: Knex.Transaction): Promise<Wallet | undefined> {
        const query = trx || db;
        return query<Wallet>("wallets").where({user_id: userId}).first();
    }

    // Update wallet balance
    async updateBalance(walletId: string, balance: number, trx: Knex.Transaction): Promise<void> {
        return trx<Wallet>("wallets")
            .where({id: walletId})
            .update({balance})
    }
}