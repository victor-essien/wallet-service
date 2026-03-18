import { TransactionRepository } from "./transaction.repository";
import { AppError } from "../../middleware/error.middleware";

export class TransactionService {
  private transactionRepo = new TransactionRepository();

  async getUserTransactions(userId: string) {
    // Find all transactions tied to user
    const transactions = await this.transactionRepo.findByUserId(userId);

    if (!transactions || transactions.length === 0) {
      throw new AppError("No transactions found", 404);
    }

    return transactions;
  }

  async getUserSummary(userId: string) {
    const summary = await this.transactionRepo.getSummary(userId);

    return {
      totalFunded: Number(summary?.total_funded || 0),
      totalWithdrawn: Number(summary?.total_withdrawn || 0),
      totalSent: Number(summary?.total_sent || 0),
      totalReceived: Number(summary?.total_received || 0),
    };
  }
}
