import { db } from "../../database/knex";


export class WalletRepository {

    // Create wallet
    async create(wallet: any, trx: any) { //TODO: Determine the wallet type and replace it with any
        return trx("wallets").insert(wallet)
    }
}