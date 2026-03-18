export type TransactionType =
  | "FUND"
  | "WITHDRAW"
  | "TRANSFER_DEBIT"
  | "TRANSFER_CREDIT";

// Transaction type
export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  created_at?: Date;
}

export type CreateTransactionInput = Omit<Transaction, "created_at">;
