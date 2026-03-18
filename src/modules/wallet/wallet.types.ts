
// Wallet type
export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  created_at?: Date;
  updated_at?: Date;
}

// Type for funding wallet
export interface FundWalletDTO {
    userId: string;
    amount: number;
}
// Type for transfer of funds
export interface TransferDTO {
    senderId: string;
    recieverId: string;
    amount: number;
}

// Type for withrawal of funds
export interface WithDrawDTO {
    userId: string;
    amount: number;
}



export type CreateWalletInput = Omit<Wallet, "created_at" | "updated_at">;