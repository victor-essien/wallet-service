
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