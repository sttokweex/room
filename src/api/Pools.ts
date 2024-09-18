export interface Pool {
  assignee?: string;
  countOfParticipants: number;
  createdTimestampBlock: number;
  depositsAmountForReward: number;
  feeReceiverAddress: string;
  fundAddress: string;
  fundFee: string;
  fundFeeNumerator: string;
  lastTimestampBlock: number;
  minDepositValue: string;
  minDepositValueForReward: string;
  nativeTotalSupply: string;
  ownerAddress: string;
  poolAddress: string;
  poolFee: string;
  poolFeeNumerator: string;
  prizeTokenNoRewardValue: string;
  prizeTokenRewardType: number;
  prizeTokenRewardValue: string;
  prizeTokenRoot: string;
  prizeTokenSupply: string;
  reward: string;
  rewardPeriod: number;
  rewardTimestamp: string;
  stReward: string;
  stTokenRoot: string;
  stTotalSupply: string;
  status: 'Cancelled' | 'Finished' | 'InProcess';
  withdrawFee: string;
  jackpot: string;
}

export interface PoolsResponse {
  pools: Pool[];
  totalCount: number;
}
