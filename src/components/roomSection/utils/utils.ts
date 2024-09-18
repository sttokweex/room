import dayjs from 'dayjs';
import ContractAbi from '../../../abi/PoolOfChance.abi.json';
import EverVaultAbi from '../../../abi/StEverVault.abi.json';
import {
  Address,
  ProviderRpcClient,
  Contract,
} from 'everscale-inpage-provider';
import { RoomProps as Room } from 'componentsPath/room/Room';
import { Filters } from '../RoomSection';
import { Pool } from '@/api/Pools';

export async function getPoolInfo(
  id: number,
  address: string,
  provider: ProviderRpcClient,
): Promise<Room> {
  const contractAddress = new Address(address);
  const contract = new provider.Contract(ContractAbi, contractAddress);
  const poolInfo: any = await contract.methods
    .getPoolInfo({ answerId: 0 } as never)
    .call();
  const vaultContract = new provider.Contract(
    EverVaultAbi,
    poolInfo.value0.stEverVault,
  );
  const activeDeposits = await contract.methods
    .getActiveDepositsAmount({ answerId: 0 } as never)
    .call();
  const rewardInfo: any = await contract.methods
    .getRewardInfo({ answerId: 0 } as never)
    .call();
  const poolRewardDate = dayjs.unix(Number(rewardInfo.value0.rewardTimestamp));
  const roundEnds = poolRewardDate.format('DD MMM h a');

  const now = dayjs();
  const roundedNow = now.startOf('minute').unix();
  const poolEnds = poolRewardDate.unix();

  const stAmountForTotalSupply: any =
    roundedNow < poolEnds
      ? await vaultContract.methods
          .getDepositStEverAmountFor({
            _amount: poolInfo.value0.totalSupply,
            _time: rewardInfo.rewardTimestamp,
          } as never)
          .call()
      : await vaultContract.methods
          .getDepositStEverAmount({
            _amount: poolInfo.value0.totalSupply,
          } as never)
          .call();

  console.log('stAmountForTotalSupply', stAmountForTotalSupply);

  const stReward =
    Number(poolInfo.value0.totalStSupply) -
    Number(stAmountForTotalSupply.value0);

  let reward = 0;

  if (stReward > 0) {
    const _reward: any =
      roundedNow < poolEnds
        ? await vaultContract.methods
            .getWithdrawEverAmountFor({
              _amount: stReward,
              _time: rewardInfo.rewardTimestamp,
            } as never)
            .call()
        : await vaultContract.methods
            .getWithdrawEverAmount({
              _amount: stReward,
            } as never)
            .call();
    reward = _reward;
    console.log('reward', reward);
  }

  console.log('roundEnds', roundEnds);
  console.log('rewardInfo', rewardInfo);
  return {
    id,
    state: now.unix() > poolEnds ? 'close' : 'open',
    nominal: 'yellow',
    isIn: true,
    count: Number((activeDeposits as any).value0),
    remainingTime: 19,
  };
}

export const isRoomVisible = (
  pool: Pool,
  number: number,
  filters: Filters,
  filterActive: string,
  setFilterActive: (v: string) => void,
  hasDeposit: boolean,
  hasReward: boolean,
) => {
  const nominal = 'red'; //
  const isTimeLeft =
    dayjs().unix() > dayjs.unix(Number(pool.rewardTimestamp)).unix();
  const rewardTime = dayjs.unix(Number(pool.rewardTimestamp));
  const now = dayjs();
  const state = pool.status == 'InProcess' ? 'pending' : 'default';
  const diff = rewardTime.diff(now);
  const totalDuration = rewardTime.diff(
    dayjs.unix(Number(pool.rewardTimestamp) - Number(pool.rewardPeriod)),
  );
  const storedFavoriteRooms = localStorage.getItem('favoriteRooms');
  const favoriteRooms = storedFavoriteRooms
    ? JSON.parse(storedFavoriteRooms)
    : [];

  const isRoomFavorite = favoriteRooms.includes(number + 1);
  if (filterActive === 'state') {
    const allFiltersInactive =
      !filters[filterActive].open &&
      !filters[filterActive].close &&
      !filters[filterActive].win &&
      !filters[filterActive].lose;

    if (allFiltersInactive) {
      setFilterActive('all');
    }
    return (
      (filters[filterActive].open &&
        (state === 'default' || state === 'pending') &&
        hasDeposit == true &&
        hasReward == false &&
        pool.depositsAmountForReward > pool.countOfParticipants) ||
      (filters[filterActive].close &&
        (state === 'default' || state === 'pending') &&
        hasDeposit == false) ||
      (filters[filterActive].win &&
        state === 'default' &&
        hasDeposit &&
        hasReward) ||
      (filters[filterActive].lose &&
        state === 'default' &&
        hasDeposit == true &&
        hasReward == false &&
        pool.depositsAmountForReward <= pool.countOfParticipants)
    );
  } else if (filterActive === 'status') {
    const allFiltersInactive =
      !filters[filterActive].openStatus &&
      !filters[filterActive].closed &&
      !filters[filterActive].closedErr &&
      !filters[filterActive].closedTime;
    if (allFiltersInactive) {
      setFilterActive('all');
    }
    return (
      (filters[filterActive].openStatus && !isTimeLeft) ||
      (filters[filterActive].closed &&
        isTimeLeft &&
        pool.countOfParticipants >= pool.depositsAmountForReward &&
        hasDeposit) ||
      (filters[filterActive].closedErr &&
        isTimeLeft &&
        pool.countOfParticipants < pool.depositsAmountForReward) ||
      (filters[filterActive].closedTime &&
        isTimeLeft &&
        pool.countOfParticipants >= pool.depositsAmountForReward &&
        !hasDeposit &&
        !hasDeposit)
    );
  } else if (filterActive === 'nominal') {
    const allFiltersInactive =
      !filters[filterActive].blue &&
      !filters[filterActive].yellow &&
      !filters[filterActive].red;
    if (allFiltersInactive) {
      setFilterActive('all');
    }
    return (
      (filters[filterActive].blue && nominal === 'blue') ||
      (filters[filterActive].yellow && nominal === 'yellow') ||
      (filters[filterActive].red && nominal === 'red')
    );
  } else if (filterActive === 'favorites') {
    return filters[filterActive].marked ? isRoomFavorite : true;
  } else if (filterActive === 'all') {
    return true;
  } else if (filterActive === 'date') {
    const allFiltersInactive =
      !filters[filterActive].new &&
      !filters[filterActive].closedSoon &&
      !filters[filterActive].closedDate;
    if (allFiltersInactive) {
      setFilterActive('all');
    }
    return (
      (filters[filterActive].new &&
        totalDuration / diff < 2 &&
        totalDuration / diff > 1) ||
      (filters[filterActive].closedSoon && totalDuration / diff >= 2) ||
      (filters[filterActive].closedDate && totalDuration / diff <= 1)
    );
  }
};
