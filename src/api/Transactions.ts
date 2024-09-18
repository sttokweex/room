export interface Transaction {
  fee: string;
  messageHash: string;
  nativeAmount: string;
  poolAddress: string;
  reward: string;
  stAmount: string;
  timestampBlock: number;
  transactionHash: string;
  transactionKind: string;
  userAddress: string;
}

export interface TransactionResponse {
  totalCount?: number;
  transactions: Transaction[];
}
