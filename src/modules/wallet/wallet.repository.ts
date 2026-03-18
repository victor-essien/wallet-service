import { db } from "../../database/knex";


export class WalletRepository {

    // Create wallet
    async create(wallet: any, trx: any) { //TODO: Determine the wallet type and replace it with any
        return trx("wallets").insert(wallet)
    }

    // Find wallet by userId
    async findByUserId(userId: string, trx?: any) {
        const query = trx || db;
        return query("wallets").where({user_id: userId}).first();
    }

    // Update wallet balance
    async updateBalance(walletId: string, balance: number, trx: any) {
        return trx("wallets")
            .where({id: walletId})
            .update({balance})
    }
}