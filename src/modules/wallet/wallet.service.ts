import { db } from "../../database/knex";
import { WalletRepository } from "./wallet.repository";
import { TransactionRepository } from "../transaction/transaction.repository";
import {
  InvalidAmountError,
  AmountLessError,
  AppError,
  InsufficientFundsError,
  WalletNotFoundError,
} from "../../middleware/error.middleware";
import { v4 as uuid } from "uuid";

export class WalletService {
  private walletRepo = new WalletRepository();
  private transactionRepo = new TransactionRepository();

  // Function to fund wallet
  async fundWallet(userId: string, amount: number) {
    // Check if amount is less than 0
    if (amount <= 0) {
      throw new AmountLessError();
    }

    // Begin the transaction to fund wallet
    return db.transaction(async (trx) => {
      // Find user's wallet
      const wallet = await this.walletRepo.findByUserId(userId, trx);

      // If wallet is not found throw error
      if (!wallet) throw new WalletNotFoundError();

      // Create the new balance - add the wallet balance with the new amount that is being funded
      const newBalance = Number(wallet.balance) + amount;

      // Call the function to update the balance of the wallet
      await this.walletRepo.updateBalance(wallet.id, newBalance, trx);

      // Create a transaction and include the type
      await this.transactionRepo.create(
        {
          id: uuid(),
          type: "FUND",
          amount,
          user_id: userId,
        },
        trx,
      );

      return { balance: newBalance };
    });
  }

  // Function to transfer funds
  async transfer(senderId: string, receiverId: string, amount: number) {
    // Check amount
    if (amount <= 0) {
      throw new InvalidAmountError();
    }

    // Check if the ID's are the same
    if (senderId === receiverId) {
      throw new AppError("Cannot transfer to self");
    }

    return db.transaction(async (trx) => {
      // Get the sender's wallet
      const senderWallet = await this.walletRepo.findByUserId(senderId, trx);
      // Get the receiver's wallet
      const receiverWallet = await this.walletRepo.findByUserId(
        receiverId,
        trx,
      );

      // Check if the wallet exists
      if (!senderWallet || !receiverWallet) {
        throw new WalletNotFoundError();
      }

      // Check if the sender has the sufficient funds to send
      if (Number(senderWallet.balance) < amount) {
        throw new InsufficientFundsError();
      }
      // Deduct amount from sender's wallet balance
      const senderNewBalance = Number(senderWallet.balance) - amount;
      // Increase amount of receiver's wallet balance
      const receiverNewBalance = Number(receiverWallet.balance) + amount;

      // Update balances
      await this.walletRepo.updateBalance(
        senderWallet.id,
        senderNewBalance,
        trx,
      );
      await this.walletRepo.updateBalance(
        receiverWallet.id,
        receiverNewBalance,
        trx,
      );

      // Log transactions
      await this.transactionRepo.create(
        {
          id: uuid(),
          type: "TRANSFER_DEBIT",
          amount,
          user_id: senderId,
        },
        trx,
      );

      await this.transactionRepo.create(
        {
          id: uuid(),
          type: "TRANSFER_CREDIT",
          amount,
          user_id: receiverId,
        },
        trx,
      );

      return { senderBalance: senderNewBalance };
    });
  }

  // Withdraw function
  async withdraw(userId: string, amount: number) {
    // Check amount
    if (amount <= 0) {
      throw new InvalidAmountError();
    }

    return db.transaction(async (trx) => {
      // Get the user's wallet
      const wallet = await this.walletRepo.findByUserId(userId, trx);

      if (!wallet) throw new WalletNotFoundError();

      // Check if there's sufficient funds
      if (Number(wallet.balance) < amount) {
        throw new InsufficientFundsError();
      }
      // Create a new balance - subtract with the balance and the amount being withdrawn
      const newBalance = Number(wallet.balance) - amount;

      // Update wallet with new balance
      await this.walletRepo.updateBalance(wallet.id, newBalance, trx);

      // Create transaction
      await this.transactionRepo.create(
        {
          id: uuid(),
          type: "WITHDRAW",
          amount,
          user_id: userId,
        },
        trx,
      );
      return { balance: newBalance };
    });
  }
}
