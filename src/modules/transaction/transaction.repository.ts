import { db } from "../../database/knex";
import { CreateTransactionInput, Transaction } from "./transaction.types";
import { Knex } from "knex";
export class TransactionRepository {
  async create(data: CreateTransactionInput, trx: Knex.Transaction): Promise<void> {
    return trx<Transaction>("transactions").insert(data);
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return db<Transaction>("transactions")
      .where({ user_id: userId })
      .orderBy("created_at", "desc");
  }

  async getSummary(userId: string) {
    const result = await db("transactions")
      .where({ user_id: userId })
      .select(
        db.raw(`
          SUM(CASE WHEN type = 'FUND' THEN amount ELSE 0 END) as total_funded,
          SUM(CASE WHEN type = 'WITHDRAW' THEN amount ELSE 0 END) as total_withdrawn,
          SUM(CASE WHEN type = 'TRANSFER_DEBIT' THEN amount ELSE 0 END) as total_sent,
          SUM(CASE WHEN type = 'TRANSFER_CREDIT' THEN amount ELSE 0 END) as total_received
        `),
      )
      .first();
    return result;
  }
}
